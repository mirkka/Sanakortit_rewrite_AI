import * as cdk from 'aws-cdk-lib'
import * as cognito from 'aws-cdk-lib/aws-cognito'
import { Construct } from 'constructs'

const DOMAIN_PREFIX = 'cicushik-sanakortit'
const CALLBACK_URLS = ['https://cicushik.com/sanakortit/', 'http://localhost:3000/']
const GOOGLE_CLIENT_ID = '358132593599-gamvi2oj958booi24a5gtlbgaqmlj3rs.apps.googleusercontent.com'

export class AuthStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const userPool = new cognito.UserPool(this, 'UserPool', {
      selfSignUpEnabled: false,
      signInAliases: { email: true },
      standardAttributes: {
        email: { required: true, mutable: true },
      },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    })

    const domain = userPool.addDomain('HostedUiDomain', {
      cognitoDomain: { domainPrefix: DOMAIN_PREFIX },
    })

    const googleIdp = new cognito.UserPoolIdentityProviderGoogle(this, 'GoogleIdp', {
      userPool,
      clientId: GOOGLE_CLIENT_ID,
      clientSecretValue: cdk.SecretValue.secretsManager('/sanakortit/google-oauth-client-secret'),
      scopes: ['openid', 'email', 'profile'],
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
      },
    })

    const client = userPool.addClient('AppClient', {
      generateSecret: false,
      oAuth: {
        flows: { authorizationCodeGrant: true },
        scopes: [cognito.OAuthScope.OPENID, cognito.OAuthScope.EMAIL, cognito.OAuthScope.PROFILE],
        callbackUrls: CALLBACK_URLS,
        logoutUrls: CALLBACK_URLS,
      },
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO,
        cognito.UserPoolClientIdentityProvider.GOOGLE,
      ],
      idTokenValidity: cdk.Duration.days(1),
      accessTokenValidity: cdk.Duration.days(1),
    })
    client.node.addDependency(googleIdp)

    new cdk.CfnOutput(this, 'UserPoolId', { value: userPool.userPoolId })
    new cdk.CfnOutput(this, 'UserPoolClientId', { value: client.userPoolClientId })
    new cdk.CfnOutput(this, 'HostedUiDomain', { value: domain.baseUrl() })
    new cdk.CfnOutput(this, 'GoogleRedirectUri', {
      value: `${domain.baseUrl()}/oauth2/idpresponse`,
    })
  }
}
