# GET /users/:id

The `GET /users/:id` endpoint is used to retrieve a specific user's information.

## Request

### Authorization

This route can be accessed by either the **user themselves** or a **verified administrator.**

### HTTP Request

```HTTP
GET /users/:id
```

#### HTTP Request Example

```HTTP
GET /users/5cdf0c82a3524ddfc40b1e28
```

### Parameters

Do not supply request parameters with this method


### Request Body

Do not supply request body with this method.

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
            <td><code>user{}</code></td>
            <td>object</td>
            <td>The user object</td>
        </tr>
        <tr>
            <td><code>user.verified</code></td>
            <td>boolean</td>
            <td>Whether user account is verified to create and modify records</td>
        </tr>
        <tr>
            <td><code>user.admin</code></td>
            <td>boolean</td>
            <td>Whether user account is an administrator</td>
        </tr>
        <tr>
            <td><code>user._id</code></td>
            <td>string</td>
            <td>Unique id of user</td>
        </tr>
        <tr>
            <td><code>user.name</code></td>
            <td>string</td>
            <td>The name of the user</td>
        </tr>
        <tr>
            <td><code>user.email</code></td>
            <td>string</td>
            <td>The email of the user</td>
        </tr>
    </tbody>
</table>

```json
Code: 200 OK
{
    "user": {
        "verified": true,
        "admin": true,
        "_id": "5cdf0c82a3524ddfc40b1e28",
        "name": "Admin",
        "email": "admin@example.com",
        "__v": 0
    }
}
```

## Error Response

If the user is not authorized, either because they do not supply a valid JWT token or they are not a verified administrator.

#### Example of Invalid JWT Token

```json
Code: 401 Unauthorized
{
    "error": "Please authenticate."
}
```
    
------

#### Example of unverified / non-Administrator

```json
Code: 401 Unauthorized
{
    "error": "Unauthorized to view this page"
}
```