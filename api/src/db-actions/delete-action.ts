const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

class DeleteAction<T> {
  tableName: string;
  data: T;
  constructor(tableName: string, data: T) {
    this.tableName = tableName;
    this.data = data;
  }

  async execute() {
    const params = {
      TableName: this.tableName,
      Key: {
        id: this.data,
      },
    };
    try {
      await docClient.delete(params).promise();
      return this.data;
    } catch (err) {
      console.log("DynamoDB error: ", err);
      return null;
    }
  }
}
export default DeleteAction;
