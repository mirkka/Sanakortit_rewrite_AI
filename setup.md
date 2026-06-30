# General
- install all necessary NPM packages
- always ask if you need more information, do not guess
- you can also create example files if needed
- use node version 24

## Frontend setup
1. Set up webpack, webpack dev server and babel as compiler. Use Typescript and React. Add package.json and package.lock.json. Make sure that packages are correctly placed in dependencies or devDependencies. Use Sass as css preprocessor. Add npm start script into package.json. Use react-router-dom for routing.
2. Add and set up Redux toolkit
3. Add and set up Prettier
4. Add and set up Eslint
5. Add and update Gitignore

## Backend setup
1. Install and set local development environment with AWS CDK
2. Add AWS lambda function and set up Apollo server that can run in AWS lambda. Name the file graphql.
3. Set up Apollo client in /client. Create example graphql query to verify that backend and frontend can communicate
4. Install and set up graphql-codegen both on client and server

## Datasources and persistance
1. Add local DynamoDB setup.
2. Configure graphql data source to use the database that was set up in previous step. Congigure this so that in local environment data source is local DynamoDB and in cloud it's AWS DynamoDB service.
3. Create deck table. Schema: deck id (uuid), name (name of the deck), user id (uuid)
4. Create card table. Schema: deck id (uuid), card id (uuid), text, text translation, weight (number)