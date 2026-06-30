# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

### Overview
Web application for learning new words. Contains decks of cards with words. Each card has two sides - word in familiar language and other side contains word in a langague user would like to learn. User flips though the deck card by card, trying to guess the correct translation of the word that is displayed. When done, card is flipped, reveiling the correct translation. Before proceeding to the next card, user marks the difficulty - done, easy, medium, hard. Cards with higher difficulty are rolled more often. App can have multiple users. Each user can only see their own decks. 

### Features:
- create/rename/delete deck
- add/edit/delete card in deck
- mark card difficulty during studying
- shuffle deck
- flip cards - which side is shown first - new language or known language
- list of decks with number of cards and difficulty level for deck, based on average difficulty level of the containing cards.
- algorhitm that rolles the cards based on difficulty - higher the difficulty, more ofther card is displayed
- login and create account

### Stack
- React
- Typescript
- Redux toolkit
- Graphql
- Apollo Client
- Apollo Server
- Sass
- Webpack
- Babel
- Ant Design
- AWS CDK
- Serverless Express
- AWS lambda
- DynamoDB
- AWS Cognito
- Codegen
- Jest
- API Gateway

## Structure

```
client/   # frontend application
server/   # backend application
```

## Development commands

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) — required by SAM CLI to run Lambda containers
- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) — install via Homebrew: `brew install aws-sam-cli`

### Frontend (`client/`)
```bash
npm start        # dev server at http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
```

### Backend (`server/`)
```bash
npm run start:lambda   # synthesise CDK stack and start Lambda locally via SAM at http://localhost:4000
npm run synth          # synthesise CDK stack only (outputs to cdk.out/)
npm run deploy         # deploy to AWS
npm run diff           # diff against deployed stack
```

`npm run start:lambda` runs two steps automatically:
1. `cdk synth` — bundles the Lambda handler with esbuild and emits a CloudFormation template to `cdk.out/`
2. `sam local start-api` — spins up a Docker container emulating API Gateway + Lambda on port 4000

The frontend dev server proxies GraphQL requests to `http://localhost:4000/graphql` by default, so both servers can be run in parallel for local development.
