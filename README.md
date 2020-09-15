# URL shortener API
A simple URL shortener API.

It allows to create shortened links to registered users and uses JWT tokens for
authentication.

## Users endpoints
All users endpoints are prefixed with `/api/users`

`POST /register`: creates a user
```json
{
  "username": "user",
  "password": "password",
  "passwordConfirmation": "password"
}
```

`POST /authenticate`: return a JWT token if the credentials are correct.
```json
{
  "username": "user",
  "password": "password"
}
```


`GET /current`: returns the current user if a JWT token is provided in the
`Authorization: Bearer <token>` form.

## URLs endpoints
All URLs endpoints are prefixed with `/api/urls`

`POST /`: creates a shortened link and returns the associated ID.
```json
{
  "url": "https://example.com"
}
```

`GET /`: returns all current user's shortened links.

`GET /:id`: redirects to the URL matching the given id.

`DELETE /:id`: deletes the URL matching the given id if the user owns it.


# Running
```
$ node app.js
```
