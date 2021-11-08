import * as iam from '@aws-cdk/aws-iam';
import * as kms from '@aws-cdk/aws-kms';
import * as cdk from '@aws-cdk/core';

interface CustomProps extends cdk.StackProps {
  key: kms.IKey;
  name: string;
  extra?: {
    userName?: string;
    tableName?: string;
  };
}

export class VaultDynamoDBAndKMSStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: CustomProps) {
    super(scope, id, props);

    const userName = props.extra?.userName ?? props.name;
    const tableName = props.extra?.tableName ?? props.name;

    const user = new iam.User(this, userName, {
      userName: userName,
    });

    user.addToPolicy(
      new iam.PolicyStatement({
        resources: [
          `arn:aws:dynamodb:ap-northeast-1:${this.account}:table/${tableName}`,
        ],
        actions: [
          'dynamodb:DescribeLimits',
          'dynamodb:DescribeTimeToLive',
          'dynamodb:ListTagsOfResource',
          'dynamodb:DescribeReservedCapacityOfferings',
          'dynamodb:DescribeReservedCapacity',
          'dynamodb:ListTables',
          'dynamodb:BatchGetItem',
          'dynamodb:BatchWriteItem',
          'dynamodb:CreateTable',
          'dynamodb:DeleteItem',
          'dynamodb:GetItem',
          'dynamodb:GetRecords',
          'dynamodb:PutItem',
          'dynamodb:Query',
          'dynamodb:UpdateItem',
          'dynamodb:Scan',
          'dynamodb:DescribeTable',
        ],
      })
    );

    user.addToPolicy(
      new iam.PolicyStatement({
        resources: [props.key.keyArn],
        actions: ['kms:Encrypt', 'kms:Decrypt', 'kms:DescribeKey'],
      })
    );
  }
}

interface KeyProps extends cdk.StackProps {
  name: string;
}

/**
 * Stack that defines the key
 */
export class KmsStack extends cdk.Stack {
  public readonly key: kms.Key;

  constructor(scope: cdk.App, id: string, props: KeyProps) {
    super(scope, id, props);

    this.key = new kms.Key(this, props.name, {
      alias: props.name,
      description: `Use for auto-unseal on Vault server ${props.name}`,
    });
  }
}
