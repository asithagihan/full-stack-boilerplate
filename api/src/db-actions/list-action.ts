const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

class ListAction<T> {
  tableName: string;
  data: T;
  constructor(tableName: string, data: T) {
    this.tableName = tableName;
    this.data = data;
  }
  async execute() {
    const params = {
      TableName: this.tableName,
    };
    try {
      const data = await docClient.scan(params).promise();
      return data.Items;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  }
}

export default ListAction;
