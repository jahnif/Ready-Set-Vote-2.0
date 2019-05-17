# PATCH /users/me

The `PATCH /users/me` endpoint is used to update a user's individual information. This is a convenience route for our frontend developers. Rather than picking out a user's id and sending a call to [PATCH /users/:id](/server/docs/api/users/id/patch.md), they can simply use this route.

## Request

### Authorization

This route can only be accessed by the **user themselves.**

### HTTP Request

```HTTP
PATCH /users/me
```

### Parameters

Do not supply request parameters with this method


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
            <td colspan='4'>Optional Properties</td>
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

#### Example Request Body

```json
{
    "name": "New Name"
}
```

## Response

If successful, this method returns a response body with the updated user information in the following structure.

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
        "admin": false,
        "_id": "5cdf0d49a3524ddfc40b1e29",
        "name": "New Name",
        "email": "verified@example.com",
        "__v": 0
    }
}
```

## Error Responses

#### Example of Invalid Field Input
If invalid data is submitted (e.g., incorrect fields), then the API will return an invalid response.

Example Request

```json
PATCH /users/me
{
    "random": "data"
}
```

Example Response

```json
{
Code: 400 Bad Request
    "error": "Invalid Fields Submitted."
}
```

#### Example of Invalid JWT Token

If the user did not supply a valid JWT token they will receive an error and be prompted to authenticate.

```json
Code: 401 Unauthorized
{
    "error": "Please authenticate."
}
```