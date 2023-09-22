const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

class GetByIdAction<T> {
  tableName: string;
  data: T;
  constructor(tableName: string, data: T) {
    this.tableName = tableName;
    this.data = data;
  }
  async execute() {
    const params = {
      TableName: this.tableName,
      Key: { id: this.data },
    };
    try {
      const { Item } = await docClient.get(params).promise();
      return Item;
    } catch (err) {
      console.log("DynamoDB error: ", err);
    }
  }
}
export default GetByIdAction;
