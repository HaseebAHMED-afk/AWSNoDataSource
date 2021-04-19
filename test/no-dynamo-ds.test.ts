import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as NoDynamoDs from '../lib/no-dynamo-ds-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NoDynamoDs.NoDynamoDsStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
