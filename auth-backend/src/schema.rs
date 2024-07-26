// @generated automatically by Diesel CLI.

diesel::table! {
    users (id) {
        id -> Uuid,
        #[max_length = 255]
        username -> Varchar,
        #[max_length = 255]
        email -> Varchar,
        #[max_length = 255]
        salt -> Varchar,
        #[max_length = 255]
        passhash -> Varchar,
        created_at -> Nullable<Timestamp>,
    }
}
