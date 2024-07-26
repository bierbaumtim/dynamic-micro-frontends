extern crate diesel;
extern crate diesel_migrations;

use actix_web::{error, get, post, web, App, HttpResponse, HttpServer, Responder, Result};
use serde_json::json;

mod auth;
mod db;
mod errors;
mod schema;
mod users;

use db::Pool as DbPool;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let pool = match db::init() {
        Ok(pool) => pool,
        Err(err) => {
            eprintln!("Failed to initialize db: {}", err);
            return Ok(());
        }
    };

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(ping)
            .service(login)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}

#[get("/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong")
}

#[derive(serde::Deserialize)]
struct LoginArgs {
    username: String,
    password: String,
}

#[post("/api/v1/auth/login")]
async fn login(
    pool: web::Data<DbPool>,
    login_args: web::Json<LoginArgs>,
) -> Result<impl Responder> {
    let username = login_args.username.clone();

    let user = web::block(move || {
        crate::users::User::find_by_username(
            &mut pool.get().expect("Couln't get db connection from pool"),
            &username,
        )
    })
    .await?
    .map_err(error::ErrorInternalServerError)?;

    let user = match user {
        Some(user) => user,
        None => return Ok(HttpResponse::NotFound().finish()),
    };

    let password_match = crate::auth::verify_password(&login_args.password, &user.passhash)
        .map_err(error::ErrorInternalServerError)?;

    if password_match {
        let jwt = crate::auth::generate_jwt(user.id).map_err(error::ErrorInternalServerError)?;

        Ok(HttpResponse::Ok()
            .json(json!({ "id": user.id, "username": user.username, "token": jwt })))
    } else {
        Ok(HttpResponse::Unauthorized().finish())
    }
}

#[post("/api/v1/auth/logout")]
async fn logout() -> Result<String> {
    Ok(format!(""))
}

#[derive(serde::Deserialize)]
struct RegisterArgs {
    username: String,
    password: String,
    email: String,
}

#[post("/api/v1/auth/register")]
async fn register(
    pool: web::Data<DbPool>,
    args: web::Json<RegisterArgs>,
) -> actix_web::Result<impl Responder> {
    let user = web::block(move || {
        let (salt, password_hash) = crate::auth::hash_password(&args.password)?;

        let new_user = crate::users::NewUser {
            username: args.username.clone(),
            email: args.email.clone(),
            created_at: chrono::Local::now().naive_local(),
            salt: salt.to_string(),
            passhash: password_hash,
        };

        crate::users::User::create(
            &mut pool.get().expect("Couln't get db connection from pool"),
            new_user,
        )
    })
    .await?
    .map_err(error::ErrorInternalServerError)?;

    Ok(HttpResponse::Ok().json(json!({ "id": user.id, "username": user.username })))
}
