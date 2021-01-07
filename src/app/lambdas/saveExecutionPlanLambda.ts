import {SQSEvent, SQSHandler} from "aws-lambda"
import {Bootstrap} from "../config/Bootstrap"

const bootstrap = new Bootstrap()
export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  console.log(event.Records[0].body)
  await bootstrap.executionPlanController.saveExecutionPlan(JSON.parse(event.Records[0].body).detail)
}
