import * as cdk from '@aws-cdk/core';
// import * as sqs from '@aws-cdk/aws-sqs';

export interface AwsCdkProps {
  // Define construct properties here
}

export class AwsCdk extends cdk.Construct {

  constructor(scope: cdk.Construct, id: string, props: AwsCdkProps = {}) {
    super(scope, id);

    // Define construct contents here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
