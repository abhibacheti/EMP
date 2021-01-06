import {EventBridgeEvent, EventBridgeHandler} from "aws-lambda"
import {ExecutionPlan} from "../domain/ExecutionPlan"
import {Bootstrap} from "../config/Bootstrap"

export type ExecutionPlanEventBridgeEvent = EventBridgeEvent<"ExecutionPlan", ExecutionPlan>
export type ExecutionPlanEventBridgeHandler = EventBridgeHandler<"ExecutionPlan", ExecutionPlan, void>

const bootstrap = new Bootstrap()
export const handler: ExecutionPlanEventBridgeHandler = async (event: ExecutionPlanEventBridgeEvent): Promise<void> => {
  await bootstrap.executionPlanController.saveExecutionPlan(event.detail)
}
