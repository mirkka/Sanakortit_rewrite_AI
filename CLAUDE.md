# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## General Rules
- do not deploy automatically. Deployment to cloud always requires approval. 
- always ask for approval when stopping any locally running services that weren't started by you.
- always stop and clean up all ports when you are done running services started by you, for example local web server for Cloude in Chrome
- always ask for approval to start debuggin in Chrome. When debuggin locally, once browser access is confirmed, you can go ahead and click on what ever you need, no further approval is needed.

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
- [Docker](https://docs.docker.com/get-docker/) — required for local DynamoDB (via Docker Compose) and by SAM CLI to run Lambda containers
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
npm run start:local   # start local DynamoDB, seed it, and start Lambda locally via SAM at http://localhost:4000
npm run synth         # synthesise CDK stack only (outputs to cdk.out/)
npm run deploy        # deploy to AWS
npm run diff           # diff against deployed stack
```

`npm run start:local` runs three steps automatically:
1. `docker compose up -d` — starts a local DynamoDB container
2. `npm run setup:local-db` — creates/seeds the local DynamoDB tables
3. `npm run watch:synth` — watches `src/` and, on change, re-runs `cdk synth` against the local DynamoDB endpoint, then starts `sam local start-api` emulating API Gateway + Lambda on port 4000

The frontend dev server proxies GraphQL requests to `http://localhost:4000/graphql` by default, so both servers can be run in parallel for local development.

## Deployment

Live at **https://cicushik.com/sanakortit/**, deployed to AWS account `997315957991` via four independent CDK stacks (`server/bin/app.ts`):
- `SanakortitStack` (`eu-west-1`) — Lambda + API Gateway + DynamoDB
- `CertStack` (`us-east-1`) — ACM certificate for `cicushik.com` (CloudFront requires certs in `us-east-1`, wired cross-region into `FrontendStack` via `crossRegionReferences`)
- `FrontendStack` (`eu-west-1`) — S3 + CloudFront, serving the SPA under the `/sanakortit` path prefix, aliased to `cicushik.com` in Route53
- `AuthStack` (`eu-west-1`) — Cognito User Pool + Hosted UI domain + App Client, with Google wired in as a federated identity provider (`server/lib/auth-stack.ts`)

They aren't CloudFormation-linked for app config because the frontend needs several values *baked into the JS bundle* at build time: the backend's URL (`GRAPHQL_URL`, read in `client/src/apollo/client.ts`), the router's path prefix (`BASENAME`, read in `client/src/index.tsx`), and the Cognito Hosted UI domain/App Client id (`COGNITO_DOMAIN`/`COGNITO_CLIENT_ID`, read in `client/src/auth/cognito.ts` — these two default to the deployed `AuthStack` values already, so they only need overriding if `AuthStack` is ever redeployed with different values). Deploy in this order:

```bash
cd client
BASENAME=/sanakortit \
GRAPHQL_URL=<GraphqlApiUrl-from-SanakortitStack-output>/graphql \
COGNITO_DOMAIN=<HostedUiDomain-from-AuthStack-output> \
COGNITO_CLIENT_ID=<UserPoolClientId-from-AuthStack-output> \
npm run build

cd ../server
npx cdk deploy SanakortitStack --profile <your-aws-profile>   # only needed if the backend changed
npx cdk deploy AuthStack --profile <your-aws-profile>         # only needed if auth config changed
npx cdk deploy CertStack FrontendStack --profile <your-aws-profile>
```

`FrontendStack` updates in place on every redeploy — `BucketDeployment` uploads whatever is in `client/dist` under the `sanakortit/` key prefix and auto-invalidates the CloudFront cache.

All resources here (S3, CloudFront, Lambda, API Gateway, DynamoDB on-demand) are pay-per-use and should stay in or near AWS free-tier territory for low personal traffic.
