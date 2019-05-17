# POST /users

The `POST /users` endpoint is used to register new volunteer users and administrator accounts. These accounts are then used to authenticate when accessing other, restricted API endpoints, such as [creating candidate](/server/docs/api/candidates/post.md) or [endorser profiles](/server/docs/api/endorsers/post.md).

## Request

### HTTP Request

```HTTP
POST /users/
```

### Parameters

Do not supply request parameters with this method.

### Request Body

<table>
    <thead>
        <tr>
            <td>Property Name</td>
            <td>Value</td>
            <td>Description</td>
            <td>Notes</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan='4'>Required Properties</td>
        </tr>
        <tr>
            <td><code>name</code></td>
            <td>string</td>
            <td>The name of the user</td>
            <td></td>
        </tr>
        <tr>
            <td><code>email</code></td>
            <td>string</td>
            <td>The email of the user </td>
            <td>Unique</td>
        </tr>
        <tr>
            <td><code>password</code></td>
            <td>string</td>
            <td>The plaintext password of the user</td>
            <td></td>
        </tr>
    </tbody>
</table>

#### Example Request

```json
{
    "name": "Dustin Neighly",
    "email": "dustin.neighly@example.com",
    "password": "hunter2"
}
```

## Response

If successful, this method returns a response body with the following structure.

<table>
    <thead>
        <tr>
            <td>Property Name</td>
            <td>Value</td>
            <td>Description</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>token</code></td>
            <td>string</td>
            <td>The JWT authorization token</td>
        </tr>
        <tr>
            <td><code>user{}</code></td>
            <td>object</td>
            <td>The user object </td>
        </tr>
        <tr>
            <td><code>user{}.verified</code></td>
            <td>boolean</td>
            <td>Whether user account is verified to create and modify records</td>
        </tr>
        <tr>
            <td><code>user{}.admin</code></td>
            <td>boolean</td>
            <td>Whether user account is an administrator</td>
        </tr>
        <tr>
            <td><code>user{}._id</code></td>
            <td>string</td>
            <td>Unique id of user</td>
        </tr>
        <tr>
            <td><code>user{}.name</code></td>
            <td>string</td>
            <td>The name of the user</td>
        </tr>
        <tr>
            <td><code>user{}.email</code></td>
            <td>string</td>
            <td>The email of the user</td>
        </tr>
    </tbody>
</table>

```json
Code: 201 Created
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2RmMGM4MmEzNTI0ZGRmYzQwYjFlMjgiLCJpYXQiOjE1NTgxMjE2MDIsImV4cCI6MTU1OTMzMTIwMn0.8nmI6UAO5dW15gxtzbZB8RbwzGZ_-B2GNc1WlTGpz2c",
    "user": {
        "verified": false,
        "admin": false,
        "_id": "5cdf0c82a3524ddfc40b1e28",
        "name": "Dustin",
        "email": "neighly@example.com",
        "__v": 0
    }
}
```

## Error Responses

There are two main errors thrown by the API.

#### Example of Non-Unique Email Supplied
```json
Code: 400 Bad Request
{
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "errmsg": "E11000 duplicate key error collection: task-app.users index: email_1 dup key: { : \"dustin.neighly@example.com\" }"
}
```

---------
#### Example of Missing Required Fields

```json
Code: 400 Bad Request
{
    "errors": {
        "password": {
            "message": "Path `password` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `password` is required.",
                "type": "required",
                "path": "password"
            },
            "kind": "required",
            "path": "password"
        },
        "email": {
            "message": "Path `email` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `email` is required.",
                "type": "required",
                "path": "email"
            },
            "kind": "required",
            "path": "email"
        },
        "name": {
            "message": "Path `name` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `name` is required.",
                "type": "required",
                "path": "name"
            },
            "kind": "required",
            "path": "name"
        }
    },
    "_message": "User validation failed",
    "message": "User validation failed: password: Path `password` is required., email: Path `email` is required., name: Path `name` is required.",
    "name": "ValidationError"
}
```