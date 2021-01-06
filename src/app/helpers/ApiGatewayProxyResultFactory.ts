import { APIGatewayProxyResult } from "aws-lambda"

export abstract class ApiGatewayProxyResultFactory {
  public static ok(bodyContent: string): APIGatewayProxyResult {
    return ApiGatewayProxyResultFactory.response(200, bodyContent)
  }

  public static internalServerError(): APIGatewayProxyResult {
    return ApiGatewayProxyResultFactory.response(500, "Something went wrong, please try again later.")
  }

  private static response(statusCode: number, bodyContent: string): APIGatewayProxyResult {
    return {
      statusCode,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: bodyContent,
    }
  }
}
