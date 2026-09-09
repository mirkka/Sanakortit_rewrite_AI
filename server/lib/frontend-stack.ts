import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment'
import { Construct } from 'constructs'
import * as path from 'path'

const DOMAIN_NAME = 'cicushik.com'
const APP_PATH = 'sanakortit'

export interface FrontendStackProps extends cdk.StackProps {
  certificate: acm.ICertificate
}

export class FrontendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontendStackProps) {
    super(scope, id, props)

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    // Rewrites requests under /sanakortit so the SPA's index.html is served
    // for the app root and any client-side route, since CloudFront's
    // defaultRootObject only ever applies to the true domain root.
    const pathRewriteFunction = new cloudfront.Function(this, 'PathRewriteFunction', {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri === '/') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: '/${APP_PATH}/' } },
    };
  }

  if (uri === '/${APP_PATH}') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: '/${APP_PATH}/' } },
    };
  }

  if (uri === '/${APP_PATH}/') {
    request.uri = '/${APP_PATH}/index.html';
    return request;
  }

  if (uri.startsWith('/${APP_PATH}/')) {
    var lastSegment = uri.split('/').pop();
    if (lastSegment.indexOf('.') === -1) {
      request.uri = '/${APP_PATH}/index.html';
    }
  }

  return request;
}
`),
    })

    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      domainNames: [DOMAIN_NAME],
      certificate: props.certificate,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            function: pathRewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
    })

    new BucketDeployment(this, 'SiteDeployment', {
      sources: [Source.asset(path.join(__dirname, '../../client/dist'))],
      destinationBucket: siteBucket,
      destinationKeyPrefix: `${APP_PATH}/`,
      distribution,
      distributionPaths: ['/*'],
    })

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: DOMAIN_NAME })

    new route53.ARecord(this, 'SiteAliasRecord', {
      zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    })

    new cdk.CfnOutput(this, 'SiteUrl', {
      value: `https://${DOMAIN_NAME}/${APP_PATH}/`,
    })

    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value: distribution.distributionDomainName,
    })
  }
}
