

## Zuri Faithfuls Backend API Documentation

Welcome to the API documentation for the Zuri Faithfuls Backend. This API provides endpoints to manage persons and retrieve information about the backend service.

## Table of Contents

1. [Introduction](#introduction)
2. [Base URL](#base-url)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
   - [Create a Person](#create-a-person)
   - [Read All Persons](#read-all-persons)
   - [Read a Specific Person](#read-a-specific-person)
   - [Update a Person](#update-a-person)
   - [Delete a Person](#delete-a-person)
   - [Task 1 Endpoint](#task-1-endpoint)

## Introduction

The Zuri Faithfuls Backend API is designed to manage persons and provide information about the backend service. It allows you to create, read, update, and delete persons. Additionally, there is a Task 1 endpoint that provides specific information based on query parameters.

## Base URL

The base URL for all API endpoints is:

```
https://your-api-url.com
```

## Authentication

Authentication is not required to access the endpoints of this API.

## API Endpoints

### Create a Person

- **Endpoint:** `/api`
- **Method:** POST
- **Request Body:**
  - `name` (string): The name of the person.
  - `value` (string): The value associated with the person.

#### Example Request:

```http
POST /api
Content-Type: application/json

{
  "name": "John Doe",
  "value": "Some value"
}
```

#### Example Response:

```json
{
  "message": "Person added successfully",
  "id": 1
}
```

### Read All Persons

- **Endpoint:** `/api`
- **Method:** GET

#### Example Request:

```http
GET /api
```

#### Example Response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "value": "Some value"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "value": "Another value"
  }
]
```

### Read a Specific Person

- **Endpoint:** `/api/:input`
- **Method:** GET
- **Parameters:**
  - `input` (string or number): The name, value, or ID of the person to retrieve.

#### Example Request:

```http
GET /api/1
```

#### Example Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "value": "Some value"
}
```

### Update a Person

- **Endpoint:** `/api/:input`
- **Method:** PUT
- **Parameters:**
  - `input` (string or number): The name, value, or ID of the person to update.
- **Request Body:**
  - `name` (string): The updated name of the person.
  - `value` (string): The updated value associated with the person.

#### Example Request:

```http
PUT /api/1
Content-Type: application/json

{
  "name": "Updated Name",
  "value": "Updated Value"
}
```

#### Example Response:

```json
{
  "message": "Person updated successfully based on ID"
}
```

### Delete a Person

- **Endpoint:** `/api/:input`
- **Method:** DELETE
- **Parameters:**
  - `input` (string or number): The name, value, or ID of the person to delete.

#### Example Request:

```http
DELETE /api/1
```

#### Example Response:

```json
{
  "message": "Person deleted successfully based on ID"
}
```
