#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import {
  KmsStack,
  VaultDynamoDBAndKMSStack,
} from '../lib/vault-dynamo-db-and-kms';

const app = new cdk.App();

const name = process.env.CDK_VAULT_NAME ?? 'vault-test';

const kms = new KmsStack(app, 'vault-kms', {
  name: name,
  description: 'Create KMS key for Vault server',
});
const vault = new VaultDynamoDBAndKMSStack(app, 'vault-user', {
  key: kms.key,
  name: name,
  description: 'Create user with dynamodb policy for Vault server',
});

cdk.Tags.of(kms).add('stack_owner', 'evan.lu');
cdk.Tags.of(vault).add('stack_owner', 'evan.lu');
