
# Grocery Management API

## Project Overview

This is a simple grocery management API built with Node.js, Express.js, TypeScript, TypeORM, and PostgreSQL. The API allows for managing grocery items, including adding, viewing, removing, and updating items in the inventory. It also supports user-side functionality to view available groceries and place orders for them.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)

## Features

- **Admin Features**:
  - Add a new grocery item
  - List all grocery items
  - Remove a grocery item
  - Update grocery item details

- **User Features**:
  - View available grocery items
  - Book groceries (order items)

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **TypeScript** - Typed JavaScript
- **TypeORM** - ORM for interacting with PostgreSQL
- **PostgreSQL** - Relational database
- **Docker** - Containerization
- **Jest** - Testing framework

## Installation

### Prerequisites

- Node.js (version 19 or above)
- Docker (for containerization)
- PostgreSQL (through Docker container)

### Step-by-Step Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd grocery-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup environment variables:
   Create a `.env` file in the root of the project with the following content:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=groceryDB
   ```

4. Start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will build the Docker images and start the app and the PostgreSQL container.

## API Endpoints

### Admin Endpoints

- **POST /admin/add**: Add a new grocery item.
  - Request Body: 
    ```json
    {
      "name": "Banana",
      "price": 1.2,
      "inventory": 50
    }
    ```
  - Response: 
    ```json
    {
      "id": "uuid",
      "name": "Banana",
      "price": 1.2,
      "inventory": 50
    }
    ```

- **GET /admin/list**: View all grocery items.
  - Response:
    ```json
    [
      {
        "id": "uuid",
        "name": "Banana",
        "price": 1.2,
        "inventory": 50
      }
    ]
    ```

- **DELETE /admin/remove/:name**: Remove a grocery item by name.
  - Request Params:
    - `name`: Name of the grocery item to be removed.
  - Response:
    ```json
    {
      "message": "Grocery item removed successfully"
    }
    ```

- **PUT /admin/update/:name**: Update the details of a grocery item.
  - Request Params:
    - `name`: Name of the grocery item to be updated.
  - Request Body:
    ```json
    {
      "name": "Updated Banana",
      "price": 1.5,
      "inventory": 100
    }
    ```

### User Endpoints

- **GET /user/list**: View all available grocery items.
  - Response:
    ```json
    [
      {
        "id": "uuid",
        "name": "Banana",
        "price": 1.2,
        "inventory": 50
      }
    ]
    ```

- **POST /user/book**: Book groceries by providing items and quantities.
  - Request Body:
    ```json
    {
      "items": [
        {
          "name": "Banana",
          "quantity": 2
        }
      ]
    }
    ```
  - Response:
    ```json
    {
      "message": "Groceries booked successfully",
      "bookedItems": [
        {
          "id": "uuid",
          "name": "Banana",
          "bookedQuantity": 2
        }
      ]
    }
    ```

## Running the Application

To start the application, run:

```bash
docker-compose up
```

This will start the API server on `http://localhost:3000` and connect it to the PostgreSQL database.

## Testing

The project includes unit tests using Jest. To run the tests, use the following command:

```bash
npm run test
```

This will run the Jest tests and display the results.

## File Structure

```
qp-assessment
├─ .env
├─ babel.config.js
├─ dist
│  ├─ 1734650805623-migrations.ts
│  ├─ 1734651511138-migrations.ts
│  ├─ config
│  │  └─ database.js
│  ├─ index.js
│  ├─ migrations
│  │  ├─ 1734645686667-AddIdColumnToTable.js
│  │  └─ 1734652608730-AddIdColumnToTable.ts
│  ├─ models
│  │  └─ Grocery.js
│  ├─ routes
│  │  ├─ admin.js
│  │  └─ user.js
│  └─ tests
│     └─ api.test.js
├─ docker-compose.yml
├─ Dockerfile
├─ jest.config.js
├─ ormconfig.ts
├─ package-lock.json
├─ package.json
├─ scripts
│  ├─ wait-for-it.sh
├─ src
│  ├─ config
│  │  └─ database.ts
│  ├─ controllers
│  ├─ index.ts
│  ├─ middleware
│  ├─ migrations
│  ├─ models
│  │  └─ Grocery.ts
│  ├─ routes
│  ├─ tests
│  └─ subscriber
├─ tsconfig.json
└─ typeorm-datasource.ts
```

## Conclusion

This API provides basic CRUD operations for managing grocery items and supports a user interface for browsing and booking groceries. The application is containerized with Docker and connected to a PostgreSQL database.

