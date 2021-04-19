import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync'

export class NoDynamoDsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new appsync.GraphqlApi(this , "noDatasourceApi" , {
      name :'noDatasourceApi',
      logConfig:{
        fieldLogLevel: appsync.FieldLogLevel.ALL
      },
      schema: appsync.Schema.fromAsset('graphql/schema.graphql')
    })


    new cdk.CfnOutput(this , 'GraphQLAPIUrl' , {
      value: api.graphqlUrl
    })

    const datasource = api.addNoneDataSource("noDataSource" , {
      name: "noDataSource",
      description:'Does not save data anywhere'
    })

    datasource.createResolver({
      typeName:"Mutation",
      fieldName:"changeStatus",
      requestMappingTemplate: appsync.MappingTemplate.fromString(`{
        "version":"2017-02-28",
        "payload": $util.toJson($context.arguments)
      }`),
      responseMappingTemplate: appsync.MappingTemplate.fromString(
        "$util.toJson($context.result)"
      )
    })

  }
}
