type AdjustmentSku = {
  sku: String;
  qty: Number;
};

type WorkOrderStep = {
  id: String;
  order: Number;
  workOrderId: String;
  actionName: String;
  adjustmentSkus: Array<AdjustmentSku>;
  averageTime: Number;
  status: String;
  user: String;
  createdUser: String;
  updatedUser: String;
  modifiedAt: Date;
  createdAt: Date;
};

export default WorkOrderStep;
