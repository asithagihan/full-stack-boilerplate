type AdjustmentSku = {
  sku: String;
  qty: Number;
};

class OperationTemplate {
  id: String;
  order: Number;
  workOrderTemplateId: String;
  actionName: String;
  adjustmentSkus: Array<AdjustmentSku>;
  averageTime: Number;
  status: String;
  user: String;
  createdUser: String;
  updatedUser: String;
  modifiedAt: Date;
  createdAt: Date;
}

export default OperationTemplate;
