# Library Management System

## Overview

The Library Management System is a full-stack application that manages users, books, transactions, and more. It consists of a backend API and a frontend web application.

## Backend API

The backend API provides endpoints for managing users, books, and transactions. The API is hosted on:

- **Base URL:** `https://library-management-nu-seven.vercel.app/api/v1`

For detailed documentation on the available endpoints, please refer to the [Backend API Documentation](#backend-api-documentation).

## Frontend Application

The frontend application is a user-friendly interface for interacting with the Library Management System. It allows users to manage books, view transactions, and perform other tasks through a web-based interface.

- **Frontend URL:** [https://library-management-d9up.vercel.app/](https://library-management-d9up.vercel.app/)

## Backend API Documentation

### 1. User Endpoints

#### 1.1 Get All Users
- **Endpoint:** `/users/allusers`
- **Method:** `GET`
- **Description:** Fetches a list of all users in the system.
- **URL:** `http://localhost:8000/api/v1/users/allusers`

### 2. Book Endpoints

#### 2.1 Get All Books
- **Endpoint:** `/books/allbooks`
- **Method:** `GET`
- **Description:** Fetches a list of all books in the library.
- **URL:** `https://library-management-nu-seven.vercel.app/api/v1/books/allbooks`

#### 2.2 Get Books By Name
- **Endpoint:** `/books/search/name`
- **Method:** `GET`
- **Description:** Fetches books by searching for a term in the book name.
- **Query Parameters:**
  - `query`: The search term.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/books/search/name?query=The`

#### 2.3 Get Books By Rent
- **Endpoint:** `/books/search/rent`
- **Method:** `GET`
- **Description:** Fetches books based on rent range.
- **Query Parameters:**
  - `min`: Minimum rent.
  - `max`: Maximum rent.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/books/search/rent?max=2`

#### 2.4 Global Book Search
- **Endpoint:** `/books/search/global`
- **Method:** `GET`
- **Description:** Performs a global search based on category, name, and rent range.
- **Query Parameters:**
  - `category`: Book category.
  - `query`: Search term.
  - `min`: Minimum rent.
  - `max`: Maximum rent.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/books/search/global?category=Fantasy&query=the&min=1.5&max=2`

#### 2.5 Get Book Categories
- **Endpoint:** `/books/categories`
- **Method:** `GET`
- **Description:** Fetches a list of all available book categories.
- **URL:** `https://library-management-nu-seven.vercel.app/api/v1/books/categories`

### 3. Transaction Endpoints

#### 3.1 Issue a Book
- **Endpoint:** `/transactions/issue`
- **Method:** `POST`
- **Description:** Issues a book to a user.
- **Request Body:**
  - `bookName`: The name of the book.
  - `userId`: The ID of the user.
  - `issueDate`: The date the book is issued.
- **URL:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/issue`

#### 3.2 Return a Book
- **Endpoint:** `/transactions/return`
- **Method:** `POST`
- **Description:** Returns a book and updates the transaction record.
- **Request Body:**
  - `bookName`: The name of the book.
  - `userId`: The ID of the user.
  - `returnDate`: The date the book is returned.
- **URL:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/return`

#### 3.3 Get Transactions by Book Name
- **Endpoint:** `/transactions/book`
- **Method:** `GET`
- **Description:** Fetches all transactions for a particular book.
- **Query Parameters:**
  - `bookName`: The name of the book.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/book?bookName=The%20Great%20Gatsby`

#### 3.4 Get Total Rent By Book
- **Endpoint:** `/transactions/book/rent`
- **Method:** `GET`
- **Description:** Fetches the total rent generated by a particular book.
- **Query Parameters:**
  - `bookName`: The name of the book.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/book/rent?bookName=The%20Great%20Gatsby`

#### 3.5 Get Users with Issued Book
- **Endpoint:** `/transactions/users/book`
- **Method:** `GET`
- **Description:** Fetches a list of users who have issued a particular book.
- **Query Parameters:**
  - `bookName`: The name of the book.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/users/book?bookName=The%20Alchemist`

#### 3.6 Books Rented by a User
- **Endpoint:** `/transactions/user/:userId`
- **Method:** `GET`
- **Description:** Fetches a list of books rented by a specific user.
- **Example:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/user/66e0342a9a94ae1b216754a1`

#### 3.7 Get All Transactions
- **Endpoint:** `/transactions/alltransactions`
- **Method:** `GET`
- **Description:** Fetches all transactions in the system.
- **URL:** `https://library-management-nu-seven.vercel.app/api/v1/transactions/alltransactions`
