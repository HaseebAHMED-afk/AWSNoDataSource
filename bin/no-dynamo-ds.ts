#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { NoDynamoDsStack } from '../lib/no-dynamo-ds-stack';

const app = new cdk.App();
new NoDynamoDsStack(app, 'NoDynamoDsStack');
