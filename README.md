# My Full-Stack Template

Welcome to the repository for **GPMweb**

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)

## Introduction

This application is dedicated to show project and members from **GPMecatronica**

## Technologies Used

### Frontend

- **Vite**: A build tool that boasts a faster and leaner development experience for modern web projects.
- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.
- **React-Router-Dom**: A routing library for React, enabling navigation among views.
- **Framer Motion**: A library for adding animations to React components.


### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **TypeScript**: Brings static typing to JavaScript, ensuring a more predictable runtime behavior.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Nodemon**: A utility that monitors for any changes in your source and automatically restarts your server.

## Installation

Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/yuribodo/GPMweb.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd GPMweb
   ```

3. **Install the dependencies**:

   - For Frontend:
   
     ```bash
     cd Front && npm install
     ```

   - For Backend:

     ```bash
     cd Back && npm install
     ```

## Environment Variables

Both the frontend and backend applications require environment variables to be configured. Create the following .env files with the necessary settings:

Frontend .env: Place this file in the Front directory.

- **.env**
```bash
   VITE_API_LINK=http://localhost:8080
  ```

Backend .env: Place this file in the Back directory.

- **.env**
 ```bash
   DATABASE_URL={your postgress database}
  ```


Make sure to replace placeholders with your actual configuration values.

## Running the Application

- **To run the frontend**:

  ```bash
  npm run start-frontend
  ```

  This starts the React application on `http://localhost:5173` (or another available port).

- **To run the backend**:

  ```bash
  npm run dev
  ```

  This initializes the Express server, typically on `http://localhost:8080`.


Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.


If you find any bugs or have a feature request, please open an issue on [GitHub](https://github.com/yuribodo/GPMweb/issues).

**Made with ❤️ by [Mario Mota](https://github.com/yuribodo)**.
