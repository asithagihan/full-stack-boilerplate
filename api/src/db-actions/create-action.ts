const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

class CreateAction<T> {
  tableName: string;
  data: T;
  constructor(tableName: string, data: T) {
    this.tableName = tableName;
    this.data = data;
  }

  async execute() {
    const params = {
      TableName: this.tableName,
      Item: this.data,
    };
    try {
      await docClient.put(params).promise();
      return this.data;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  }
}

export default CreateAction;
