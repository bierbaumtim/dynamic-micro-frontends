use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{errors::CustomError, schema::users};

#[derive(Debug, Serialize, Deserialize, AsChangeset, Insertable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct NewUser {
    pub username: String,
    pub email: String,
    pub created_at: chrono::NaiveDateTime,
    pub salt: String,
    pub passhash: String,
}

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: uuid::Uuid,
    pub username: String,
    pub email: String,
    pub salt: String,
    pub passhash: String,
    pub created_at: Option<chrono::NaiveDateTime>,
}

impl User {
    pub fn find_by_username(
        conn: &mut PgConnection,
        username: &str,
    ) -> Result<Option<Self>, CustomError> {
        let entity = users::table
            .filter(users::username.eq(username))
            .select(User::as_select())
            .first(conn)
            .optional()?;

        Ok(entity)
    }

    pub fn create(conn: &mut PgConnection, user: NewUser) -> Result<Self, CustomError> {
        let user = diesel::insert_into(users::table)
            .values(&user)
            .returning(User::as_returning())
            .get_result(conn)?;

        Ok(user)
    }
}
