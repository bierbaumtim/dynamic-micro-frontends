use diesel::{r2d2::ConnectionManager, PgConnection};
use diesel_migrations::{embed_migrations, EmbeddedMigrations, MigrationHarness};

use std::env;

use crate::errors::CustomError;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();

pub fn init() -> Result<Pool, CustomError> {
    let db_url = env::var("DATABASE_URL").expect("Database url not set");
    let manager = ConnectionManager::<PgConnection>::new(db_url);
    let pool = Pool::new(manager).expect("Failed to create db pool");

    let mut conn = pool
        .get()
        .map_err(|e| CustomError::new(500, format!("Failed getting db connection: {}", e)))?;
    conn.run_pending_migrations(MIGRATIONS).unwrap();

    Ok(pool)
}
