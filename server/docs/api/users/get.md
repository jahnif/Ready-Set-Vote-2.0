# GET /users

The `GET /users` endpoint is used to retrieve a paginated list of volunteer users and administrator accounts.

## Request

### Authorization

This route requires **administrator authorization**.

### HTTP Request

```HTTP
GET /users/
```

### Parameters

Parameters can be supplied to paginate and sort the results.

<table>
    <thead>
        <tr>
            <td>Parameter Name</td>
            <td>Value</td>
            <td>Description</td>
            <td>Default</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan='4'>Required Parameters</td>
        </tr>
        <tr>
            <td><code>stortBy</code></td>
            <td>string:string</td>
            <td>Sort results by a field. E.g. <code>?sortBy=name:asc</code> or <code>?sortBy=email:desc</code></td>
            <td>createdAt</td>
        </tr>
        <tr>
            <td><code>limit</code></td>
            <td>string</td>
            <td>Limit the number of results returned. E.g. <code>?limit=1</code> would return only 1 result.</td>
            <td>10</td>
        </tr>        
        <tr>
            <td><code>offset</code></td>
            <td>string</td>
            <td>Used to skip position in pagination by a certain number of documents. E.g. <code>?offset=10</code> would begin with the 10th item.</td>
            <td>0</td>
        </tr>        
    </tbody>
</table>

#### Example Request Parameters

```HTTP 
GET /users/?sortBy=name:asc&limit=5&offset=10
```

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
            <td><code>users[]</code></td>
            <td>list</td>
            <td>The list of user objects returned</td>
        </tr>
        <tr>
            <td><code>users[].verified</code></td>
            <td>boolean</td>
            <td>Whether user account is verified to create and modify records</td>
        </tr>        
        <tr>
            <td><code>users[].admin</code></td>
            <td>boolean</td>
            <td>Whether user account is an administrator</td>
        </tr>        
        <tr>
            <td><code>users[]._id</code></td>
            <td>string</td>
            <td>Unique id of user</td>
        </tr>
        <tr>
            <td><code>users[].name</code></td>
            <td>string</td>
            <td>The name of the user</td>
        </tr>
        <tr>
            <td><code>users[].email</code></td>
            <td>string</td>
            <td>The email of the user</td>
        </tr>
    </tbody>
</table>

```json
Code: 200 OK
{
    "users": [
        {
            "verified": true,
            "admin": true,
            "_id": "5cdf0c82a3524ddfc40b1e28",
            "name": "Admin",
            "email": "admin@example.com",
            "__v": 0
        },
        {
            "verified": true,
            "admin": false,
            "_id": "5cdf0d49a3524ddfc40b1e29",
            "name": "Verified User",
            "email": "verified@example.com",
            "__v": 0
        },
        {
            "verified": false,
            "admin": false,
            "_id": "5cdf0d50a3524ddfc40b1e2a",
            "name": "Unverified User",
            "email": "unverified@example.com",
            "__v": 0
        }
    ],
    "userCount": 3,
    "offset": 0,
    "limit": 10
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
    "error": "Administrator privileges required"
}
```