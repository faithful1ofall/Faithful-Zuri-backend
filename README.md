# Zuri Faithfuls Backend

This is the backend for the Zuri Faithfuls project. It provides API endpoints for managing persons and tasks.

## Table of Contents

- [Introduction](#introduction)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)


## Introduction

The Zuri Faithfuls Backend is built using Express.js and Firebase Admin SDK. It provides a set of API endpoints for managing persons and retrieving task-related information.

## Usage

You can use this backend to perform various operations on persons and retrieve task-related information. Below are some common API endpoints:

## API Endpoints

### Create a New Person

- **Endpoint**: POST /api
- **Request Body**:
  - `name` (string): The name of the person.
  - `value` (string): The value associated with the person.
- **Response**:
  - 201 Created: Person added successfully.
  - 400 Bad Request: Invalid data.
  - 500 Internal Server Error: Error adding person.

### Read All Persons

- **Endpoint**: GET /api
- **Response**: List of all persons.

### Read a Specific Person

- **Endpoint**: GET /api/:input
- **Request Params**:
  - `input` (string or number): The input can be a name, value, or ID.
- **Response**:
  - 200 OK: Person found.
  - 404 Not Found: Person not found.

### Update a Person

- **Endpoint**: PUT /api/:input
- **Request Params**:
  - `input` (string or number): The input can be a name, value, or ID.
- **Request Body**:
  - `name` (string): The updated name of the person.
  - `value` (string): The updated value associated with the person.
- **Response**:
  - 200 OK: Person updated successfully.
  - 500 Internal Server Error: Error updating person.

### Delete a Person

- **Endpoint**: DELETE /api/:input
- **Request Params**:
  - `input` (string or number): The input can be a name, value, or ID.
- **Response**:
  - 200 OK: Person deleted successfully.
  - 500 Internal Server Error: Error deleting person.

### Get Task Information

- **Endpoint**: GET /api/task1
- **Query Parameters**:
  - `slack_name` (string): Slack username.
  - `track` (string): Track information.
- **Response**:
  - 200 OK: Task information.

## Documentation

For detailed information on how to set up and use the API, please refer to the [DOCUMENTATION.md](DOCUMENTATION.md) file.
