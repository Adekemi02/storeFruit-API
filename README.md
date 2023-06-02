# storeFruit-API

The Store API is a web service that allows you to store and manage items within a store. This API requires authentication for secure access to the functionality it provides. It enables users to create, read, update, and delete items stored in the store.

## Features

- User authentication: The API supports authentication to ensure secure access to the functionality. Users need to provide valid credentials to interact with the API.
- Store management: Users can create, read, update, and delete items in the store. Each item consists of a name, store ID, price, and quantity.
- Access control: The API implements access control mechanisms to ensure that only authorized users can perform certain operations. Users have different roles, such as admin and regular user, with varying levels of permissions.
- Error handling: The API provides appropriate error messages and status codes to indicate the success or failure of a request.

## Authentication

To authenticate with the Store API, users need to include their credentials in each request. The API uses token-based authentication. Users must obtain an access token by providing their valid email and password through the authentication endpoint. This access token should be included in the `Authorization` header of subsequent requests using the Bearer scheme.

Example:

```
Authorization: Bearer <access_token>
```

## Endpoints

The following endpoints are available in the Store API:

### Authentication

- `POST /auth/sigup`: Authenticate the user and obtain an access token.
- `POST /auth/login`: Authenticate the user to login

### Store

- `POST /stores`: Only authenticated users can create a store
- `GET /stores`: Only authenticated users can get all stores they created
- `GET /stores/{storeID}`: Receives details of a specific store
- `PATCH /stores/{storeID}`: Updates an existing store
- `DELETE /stores/{storeID}`: Delete the store

### Store Items

- `GET /items`: Authenticated users retrieve a list of all items.
- `GET /items/{item_id}`: Retrieve details of a specific item.
- `POST /stores/{storeID}/items`: Create a new item in the store.
- `GET /stores/{storeID}/items`: Retrieve all items in a store.
- `PATCH /items/{item_id}`: Update an existing item in the store.
- `DELETE /items/{item_id}`: Delete an item from the store.

## API Responses

The API responses are returned in JSON format and adhere to the following structure:

```json
{
  "success": true,
  "data": { ... }
}
```

In case of an error, the structure is as follows:

```json
{
  "error": {
    "code": 404,
    "message": "Item not found."
  }
}
```

## Getting Started

To use the Store API, follow these steps:

1. Clone the repository: `git clone https://github.com/Adekemi02/storeFruit-API.git`
2. Install the required dependencies: `npm install`
3. Set up the necessary environment variables, such as database connection details and authentication secrets.
4. Run the application: `npm start`
5. The API should now be running on `http://localhost:5000`.

## Conclusion

The Store API provides a secure and straightforward way to manage items within a store. By following the authentication process and using the provided endpoints, you can create, retrieve, update, and delete items based on your authorization level. Feel free to explore and extend the API to suit your specific requirements.

For more detailed information, please refer to the API documentation or contact the API maintainers.

Enjoy using the Store API!
