# Task manager Backend Project

## Overview
This project is the backend system for a Task Manager application. It is built using:
- Node.js framework called Express.js for the server, 
- SQL for the database, The database is hosted on AWS RDS.
- Sequelize as the ORM, 
- GraphQL for the API. 
- JWT for authentication

## Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/).
- You have a Windows, Mac or Linux machine.

## Online access
You can access the backend project repository via this link: https://github.com/Adri-El/task_manager_backend.git


### Installation
To install this project, follow these steps:

1. Clone the repository:
   bash
   git clone https://github.com/Adri-El/task_manager_backend.git

2. Navigate to the project directory:
  bash
  cd task_manager_backend

3. Install the dependencies:
  bash
  npm install

4. Configuration
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


Deployment
The backend is deployed on render.

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

