# API Documentation

The [Ready, Set, Vote!](https://readysetvote.org) API layer uses standard REST protocol to interact with its backend. The following is a description of these endpoints.

## Users

The User endpoints provide the ability to manage volunteer and administrator accounts. They also give volunteers and administrators the means to log in.

***Note:** Logging out is handled entirely on the client-side, as the server issues expiring JWT tokens for authentication. see [`POST /users/login`](/server/docs/api/users/login.md) and/or [`POST /users`](/server/docs/api/users/post.md) for more information on obtaining these tokens*

* [`POST /users`](/server/docs/api/users/post.md)
* [`GET /users`](/server/docs/api/users/get.md)
* [`GET /users/:id`](/server/docs/api/users/id/get.md)
* [`PATCH /users/:id`](/server/docs/api/users/id/patch.md)
* [`GET /users/me`](/server/docs/api/users/me/get.md)
* [`PATCH /users/me`](/server/docs/api/users/me/patch.md)
* [`DELETE /users/:id`](/server/docs/api/users/id/patch.md)
* [`POST /users/login`](/server/docs/api/users/login.md)

## Ballots

*Ballot API endpoints have not been implemented yet.*

**Ballots themselves are not and will never be associated with identifying user information of any kind.**

## Candidates

The `/candidates` API endpoints provide 

* [`POST /candidates`](/server/docs/api/candidates/post.md)
* [`GET /candidates/:id`](/server/docs/api/candidates/id/get.md)
* [`PATCH /candidates/:id`](/server/docs/api/candidates/id/patch.md)
* [`DELETE /candidates/:id`](/server/docs/api/candidates/id/delete.md)

## Endorsers

* [`POST /endorsers`](/server/docs/api/endorsers/post.md)
* [`GET /endorsers`](/server/docs/api/endorsers/get.md)
* [`GET /endorsers/:id`](/server/docs/api/endorsers/id/get.md)
* [`PATCH /endorsers/:id`](/server/docs/api/endorsers/id/patch.md)
* [`DELETE /endorsers/:id`](/server/docs/api/endorsers/id/delete.md)

## Measures

* [`POST /measures`](/server/docs/api/measures/post.md)
* [`GET /measures`](/server/docs/api/measures/get.md)
* [`GET /measures/:id`](/server/docs/api/measures/id/get.md)
* [`PATCH /measures/:id`](/server/docs/api/measures/id/patch.md)
* [`DELETE /measures/:id`](/server/docs/api/measures/id/delete.md)