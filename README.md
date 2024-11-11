# Task manager Backend Project

## Overview
This project is the backend system for a Task Manager application. It is built using Express.js for the server, SQL for the database, Sequelize as the ORM, and GraphQL for the API. The database is hosted on AWS RDS.

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/).
- You have a Windows, Mac or Linux machine.

### Installation
To install this project, follow these steps:

1. Clone the repository:
   bash
   git clone https://github.com/your-username/task-manager-backend.git
Navigate to the project directory:

bash
cd task-manager-backend
Install the dependencies:

bash
npm install
Configuration
Create a .env file in the root directory and add the following variables:

plaintext
jwtKey=your-jwt-key
databaseName=your-database-name
databaseHost=your-database-host
databaseDialect=your-database-dialect
databasePassword=your-database-password
databaseUsername=your-database-username
### Usage
To use this project, follow these steps:

Start the server:

bash
npm run dev
Access the API endpoints at http://localhost:5000 (or your designated port).

API Endpoints
http://localhost:5000/graphql (for login and signup)
http://localhost:5000/graphql/auth (for protected routes)


Example Queries/Mutations
To get all tasks:

graphql
{
  tasks {
    id
    title
    description
    status
  }
}
To create a new task:

graphql
mutation {
  createTask(input: {
    title: "New Task"
    description: "Task description"
  }) {
    id
    title
    description
  }
}
Deployment
The backend is deployed on: render

Contributing
To contribute to this project, follow these steps:

Fork the repository.

Create a new branch:

bash
git checkout -b feature-branch
Make your changes and commit them:

bash
git commit -m 'Add some feature'
Push to the branch:

bash
git push origin feature-branch
Create a pull request.

Contact
If you want to contact me, you can reach me at adrielamadi7@gmail.com.
