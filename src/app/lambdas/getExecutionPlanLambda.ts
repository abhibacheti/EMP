import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler, APIGatewayProxyResult
} from "aws-lambda"
import {Bootstrap} from "../config/Bootstrap"

const bootstrap = new Bootstrap()
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if(!event.pathParameters || !event.pathParameters.id) {
    throw new Error("Id is missing in path")
  }

  return await bootstrap.executionPlanController.getExecutionPlanById(event.pathParameters.id)
}
