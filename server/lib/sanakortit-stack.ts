import * as cdk from 'aws-cdk-lib'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

export const TABLE_NAMES = {
  DECKS: 'sanakortit-decks',
  CARDS: 'sanakortit-cards',
}

const AUTH_USER_POOL_ID = 'eu-west-1_Uibfff2QN'

export class SanakortitStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const decksTable = new dynamodb.Table(this, 'DecksTable', {
      tableName: TABLE_NAMES.DECKS,
      partitionKey: { name: 'deckId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    decksTable.addGlobalSecondaryIndex({
      indexName: 'userId-index',
      partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    })

    const cardsTable = new dynamodb.Table(this, 'CardsTable', {
      tableName: TABLE_NAMES.CARDS,
      partitionKey: { name: 'deckId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'cardId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const apiLambda = new NodejsFunction(this, 'ApiHandler', {
      entry: path.join(__dirname, '../src/lambda/graphql.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
      bundling: {
        loader: { '.graphql': 'text' },
      },
      environment: {
        DYNAMODB_ENDPOINT: this.node.tryGetContext('localDynamoEndpoint') ?? '',
      },
    })

    decksTable.grantReadWriteData(apiLambda)
    cardsTable.grantReadWriteData(apiLambda)

    const userPool = cognito.UserPool.fromUserPoolId(this, 'AuthUserPool', AUTH_USER_POOL_ID)
    const authorizer = new apigateway.CognitoUserPoolsAuthorizer(this, 'ApiAuthorizer', {
      cognitoUserPools: [userPool],
    })

    const api = new apigateway.LambdaRestApi(this, 'SanakortitApi', {
      handler: apiLambda,
      proxy: true,
      defaultMethodOptions: {
        authorizer,
        authorizationType: apigateway.AuthorizationType.COGNITO,
      },
      // CORS preflight (OPTIONS) requests never carry an Authorization header, so they
      // must bypass the authorizer above — this gives API Gateway its own OPTIONS
      // method (authorizationType NONE) instead of routing preflight through it.
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
      },
    })

    new cdk.CfnOutput(this, 'GraphqlApiUrl', {
      value: api.url,
    })
  }
}
