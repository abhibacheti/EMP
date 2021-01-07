import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler, APIGatewayProxyResult
} from "aws-lambda"
import {Bootstrap} from "../config/Bootstrap"

const bootstrap = new Bootstrap()
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event))
  if(!event.pathParameters || !event.pathParameters.id) {
    throw new Error("Id is missing in path")
  }
  const result =  await bootstrap.executionPlanController.getExecutionPlanById(event.pathParameters.id)
  console.log(JSON.stringify(result))

  return result
}
