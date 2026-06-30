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

## Backend functionality
Make sure all queries and mutations are user specific. For now, include user id in every request as parameter. In the future, user id will be obtained from auth token. Do not modify or return any rows that do not belong to the user that is making the request. There is no user management yet, so you can hard code random uuid string to be used everywhere for now. Add error handling for incorrect requests - no card with given id, no deck id found etc.
1. Add create deck mutation. Deck name is sent from frontend.
2. Add add card mutation. Parameters - text, text translation and deck id. All new created cards have weight 3.
3. Add delete deck mutation. Deletion by deck id. Delete also all cards that belong to that deck. 
4. Add delete card mutation. Deletion by card id.
5. Add update card mutation. This mutation is updating only text and text translation fields. 
6. Add get decks query.
7. Add get deck by Id query.
8. Add get cards for deck query. Query by deck id.