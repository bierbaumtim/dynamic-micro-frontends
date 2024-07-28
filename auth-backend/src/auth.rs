use std::{env, error::Error};

use argon2::{
    password_hash::{
        rand_core::OsRng, PasswordHash, PasswordHasher, PasswordVerifier, Result as ArgonResult,
        SaltString,
    },
    Argon2,
};
use jsonwebtoken::EncodingKey;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

pub fn hash_password(password: &str) -> ArgonResult<(String, String)> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2
        .hash_password(password.as_bytes(), &salt)?
        .to_string();

    Ok((salt.to_string(), password_hash))
}

pub fn verify_password(password: &str, hash: &str) -> ArgonResult<bool> {
    let parsed_hash = PasswordHash::new(hash)?;

    let argon2 = Argon2::default();
    let password_match = argon2
        .verify_password(password.as_bytes(), &parsed_hash)
        .is_ok();

    Ok(password_match)
}

pub fn generate_jwt(user_id: Uuid) -> Result<String, Box<dyn Error>> {
    let header = jsonwebtoken::Header::new(jsonwebtoken::Algorithm::HS512);
    let claims = Claims {
        sub: user_id.to_string(),
        role: "user".to_string(),
        exp: (chrono::Utc::now() + chrono::Duration::days(1)).timestamp() as usize,
    };
    let encoding_key = env::var("JWT_SECRET").expect("");

    let jwt = jsonwebtoken::encode(&header, &claims, &EncodingKey::from_secret(encoding_key.as_bytes()))?;

    Ok(jwt)
}

#[derive(Debug, Deserialize, Serialize)]
struct Claims {
    sub: String,
    role: String,
    exp: usize,
}
