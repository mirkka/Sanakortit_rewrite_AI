import * as cdk from 'aws-cdk-lib'
import * as apigateway from 'aws-cdk-lib/aws-apigateway'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import { Construct } from 'constructs'
import * as path from 'path'

export const TABLE_NAMES = {
  DECKS: 'sanakortit-decks',
  CARDS: 'sanakortit-cards',
}

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

    new apigateway.LambdaRestApi(this, 'SanakortitApi', {
      handler: apiLambda,
      proxy: true,
    })
  }
}
