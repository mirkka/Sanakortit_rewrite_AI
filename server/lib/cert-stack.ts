import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import { Construct } from 'constructs'

const DOMAIN_NAME = 'cicushik.com'

export class CertStack extends cdk.Stack {
  public readonly certificate: acm.Certificate

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: DOMAIN_NAME })

    this.certificate = new acm.Certificate(this, 'SiteCertificate', {
      domainName: DOMAIN_NAME,
      validation: acm.CertificateValidation.fromDns(zone),
    })
  }
}
