import CreateAction from "./dbActions/createAction";
import DeleteAction from "./dbActions/deleteAction";
import GetByIdAction from "./dbActions/getByIdAction";
import ListAction from "./dbActions/listAction";
import UpdateAction from "./dbActions/updateAction";
import OperationTemplate from "./models/operationTemplate";

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    operationTemplateId: string;
    operationTemplate: OperationTemplate;
  };
};

exports.handler = async (event: AppSyncEvent) => {
  const TABLE = process.env.OPERATION_TEMPLATE_TABLE || "";
  let action = null;
  switch (event.info.fieldName) {
    case "getOperationTemplateById":
      action = new GetByIdAction<string>(
        TABLE,
        event.arguments.operationTemplateId
      );
      return await action.execute();
    case "createOperationTemplate":
      action = new CreateAction<OperationTemplate>(
        TABLE,
        event.arguments.operationTemplate
      );
      return await action.execute();
    case "listOperationTemplates":
      action = new ListAction<OperationTemplate>(
        TABLE,
        event.arguments.operationTemplate
      );
      return await action.execute();
    case "deleteOperationTemplate":
      action = new DeleteAction<string>(
        TABLE,
        event.arguments.operationTemplateId
      );
      return await action.execute();
    case "updateOperationTemplate":
      action = new UpdateAction<OperationTemplate>(
        TABLE,
        event.arguments.operationTemplateId,
        event.arguments.operationTemplate,
        []
      );
      return await action.execute();
    default:
      return null;
  }
};
