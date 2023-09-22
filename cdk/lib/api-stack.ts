import { Construct } from "constructs";
import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { AuthResource } from "./auth-resource";
import { GraphqlApi } from "./graphql-api";
import { TableResource } from "./table-resource";
import { OperationTemplateResolver } from "./resolvers/operation-template-resolver";

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const STAGE: string = process.env.STAGE || "stage";

    const cognito = new AuthResource(this, "AppUserPoolResource", {
      stage: STAGE,
    });

    const graphqlApi = new GraphqlApi(this, "AppGraphqlApiResource", {
      stage: STAGE,
      name: "app-api",
      schemaPath: "./../graphql/schema.graphql",
      userPool: cognito.userPool,
    });

    const tableResource = new TableResource(this, "DynamoDbTable", {
      stage: STAGE,
      tableEnvValue: "OPERATION_TEMPLATE_TABLE",
      tableName: "OperationTemplate",
      partitionKeyName: "id",
    });

    const operationTemplateResource = new OperationTemplateResolver(
      this,
      "OperationTemplateResource",
      {
        stage: STAGE,
        tableResources: [tableResource],
        dataSourceName: "OperationTemplateDs",
        api: graphqlApi.api,
      }
    );

    // Prints out the stack region to the terminal
    new CfnOutput(this, "Stack Region", {
      value: this.region,
    });
  }
}
