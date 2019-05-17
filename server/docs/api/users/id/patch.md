# PATCH /users/:id

The `PATCH /users/:id` endpoint is used to update a specific user's information.

## Request

### Authorization

This route can be accessed by either the **user themselves** or a **verified administrator.**

### HTTP Request

```HTTP
PATCH /users/:id
```

#### HTTP Request Example

```HTTP
PATCH /users/5cdf0d49a3524ddfc40b1e29
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
        <tr>
            <td><code>verified</code></td>
            <td>boolean</td>
            <td>A flag for whether the user is verified to create and update database records (e.g., candidates, measures, endorsers, etc.).</td>
            <td>Admin Only</td>
        </tr>
    </tbody>
</table>

#### Example Request Body

```json
{
    "verified": "true",
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
PATCH /users/:id
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
    
------

#### Example of unverified / non-Administrator

 If the user attempts to `PATCH` another user's data and does not provide verified administrator credentials, then they will receive the following error.

```json
Code: 401 Unauthorized
{
    "error": "Unauthorized to view this page"
}
```