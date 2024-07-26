use core::fmt;

use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use diesel::result::Error as DieselError;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Debug, Serialize, Deserialize)]
pub struct CustomError {
    status: u16,
    message: String,
}

impl CustomError {
    pub fn new(status: u16, message: String) -> CustomError {
        CustomError { status, message }
    }
}

impl fmt::Display for CustomError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.write_str(&self.message)
    }
}

impl From<DieselError> for CustomError {
    fn from(value: DieselError) -> Self {
        match value {
            DieselError::DatabaseError(_, err) => CustomError::new(409, err.message().to_string()),
            DieselError::NotFound => {
                CustomError::new(404, "The employee record not found".to_string())
            }
            err => CustomError::new(500, format!("Unknown Diesel error: {}", err)),
        }
    }
}

impl From<argon2::password_hash::Error> for CustomError {
    fn from(value: argon2::password_hash::Error) -> Self {
        CustomError::new(500, format!("Argon2 error: {}", value))
    }
}

impl ResponseError for CustomError {
    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        let status_code =
            StatusCode::from_u16(self.status).unwrap_or(StatusCode::INTERNAL_SERVER_ERROR);

        let error_message = match status_code.as_u16() < 500 {
            true => self.message.clone(),
            false => "Internal server error".to_string(),
        };

        HttpResponse::build(status_code).json(json!({ "message": error_message }))
    }
}
