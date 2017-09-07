INSERT INTO Users
    ( userName, email, img, auth_id )
    VALUES
        ( $1, $2, $3, $4 )
            RETURNING *;