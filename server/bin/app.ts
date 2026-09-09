#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SanakortitStack } from '../lib/sanakortit-stack';
import { FrontendStack } from '../lib/frontend-stack';
import { CertStack } from '../lib/cert-stack';
import { AuthStack } from '../lib/auth-stack';

const app = new cdk.App();
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

new SanakortitStack(app, 'SanakortitStack', { env });

// Local dev only synthesizes SanakortitStack for SAM (see server/package.json's
// synth:local script) and has no AWS credentials available — skip the stacks
// below, since CertStack's Route53 lookup needs a real account/region to resolve
// against and would otherwise crash local synth.
const isLocalSynth = Boolean(app.node.tryGetContext('localDynamoEndpoint'));

if (!isLocalSynth) {
  new AuthStack(app, 'AuthStack', { env });

  const certStack = new CertStack(app, 'CertStack', {
    env: { account: env.account, region: 'us-east-1' },
    crossRegionReferences: true,
  });

  new FrontendStack(app, 'FrontendStack', {
    env,
    crossRegionReferences: true,
    certificate: certStack.certificate,
  });
}
