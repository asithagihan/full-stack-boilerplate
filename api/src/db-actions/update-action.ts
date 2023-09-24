const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

type Params = {
  TableName: string | undefined;
  Key: string | {};
  ExpressionAttributeValues: any;
  ExpressionAttributeNames: any;
  UpdateExpression: string;
  ReturnValues: string;
};

interface Condition {
  key: string;
  value: string;
  operand: string; // supported operand = , !=
}

class UpdateAction<T> {
  tableName: string;
  id: string;
  data: T;
  updateConditions: Array<Condition>;
  constructor(
    tableName: string,
    id: string,
    data: T,
    updateConditions: Array<Condition>
  ) {
    this.tableName = tableName;
    this.data = data;
    this.updateConditions = updateConditions;
  }

  async execute() {
    let params: Params = {
      TableName: process.env.NOTES_TABLE,
      Key: {
        id: this.id,
      },
      ExpressionAttributeValues: {},
      ExpressionAttributeNames: {},
      UpdateExpression: "",
      ReturnValues: "UPDATED_NEW",
    };
    let prefix = "set ";
    this.updateConditions.forEach((condition: Condition) => {
      if (condition.key !== "id") {
        params["UpdateExpression"] +=
          prefix +
          "#" +
          condition.key +
          " " +
          condition.operand +
          " :" +
          condition.key;
        params["ExpressionAttributeValues"][":" + condition.key] =
          condition.value;
        params["ExpressionAttributeNames"]["#" + condition.key] = condition.key;
        prefix = ", ";
      }
    });

    console.log("params: ", params);
    try {
      await docClient.update(params).promise();
      return this.data;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  }
}

export default UpdateAction;
