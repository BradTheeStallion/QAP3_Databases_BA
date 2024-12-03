# QAP3

## Q1: Express Task Manager
This repository was generated from https://github.com/menglishca/express-tasks-template

The task uses JavaScript and PostgreSQL to create a simple task management app with a storage database.

Here is an example of the .env file to get the program running (you will need to fill in your own values):

PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=postgres
PG_PASSWORD=password
PG_PORT=port
CONNECTION_STRING=connectionstring

(The last value is used for question 2.)

If you have any difficulty with the .env, don't hesitate to reach out to me.

Once you have your .env set up, run the command:

npm start

And then proceed to run the test cases in the comments of index.js (lines 86 - 96).

## Q2: MongoDB Queries
The task uses MongoDB (via Mongoose) to create a NoSQL book-storage database.

Be sure to replace the connection string value in your .env as outlined in Q1.

Once you have your .env set up, run the command:

node mongodb-books.js

Link to the template repo's readme: https://github.com/menglishca/express-tasks-template/blob/main/README.md
