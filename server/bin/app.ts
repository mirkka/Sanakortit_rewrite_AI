#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SanakortitStack } from '../lib/sanakortit-stack';

const app = new cdk.App();
new SanakortitStack(app, 'SanakortitStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
