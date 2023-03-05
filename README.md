# Walletly

## Manual to run the project
- Install nodejs of v19.7.0 
- Install mysql
- Create a database
- Create .env.development file and write its content as in the .env.example
- Replace the placeholders in .env.development as it is described in the .env.example
- run npm install command
- run npm run migrate:dev command to proceed migrations
- run npm run seed:dev command to seed the database 
- run npm run start:dev command
- project should be running at this moment at the port you specified in the .env.development file or 3000 by default.

## Tools to test backend that we provide
- Install postman
- Export postman collection that is provided in the .zip archive to the postman application

## Other documentations that we provide
- If you are running code in the localhost then you can see the swagger documentation by entering the base url in a browser.
- Also if you have any questions about the database system please have a look at the UML diagram that is also provided in the .zip archive.