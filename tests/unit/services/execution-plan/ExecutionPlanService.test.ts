import {ExecutionPlanService} from "../../../../src/app/services/execution-plan/ExecutionPlanService"
import AWSMock from "aws-sdk-mock"
import AWS, {AWSError, DynamoDB} from "aws-sdk"
import {PutItemInput, GetItemOutput} from "aws-sdk/clients/dynamodb"
import {ExecutionPlan} from "../../../../src/app/domain/ExecutionPlan"
import {
  ExecutionPlanServiceError,
  ExecutionPlanServicePlanNotFoundError
} from "../../../../src/app/services/execution-plan/exceptions/ExecutionPlanServiceError"

describe("ExecutionPlanService", () => {
  const response = { $response: {data: {Item: { Key: "Value" } }}}
  AWS.config.update({region:'us-west-2'})
  AWSMock.setSDKInstance(AWS)
  mockAwsDynamoDbClientWithOkResponse()

  const executionPlanService = new ExecutionPlanService("test-execution-plan-table", new DynamoDB.DocumentClient())

  it("it will successfully save execution plan in db", async() => {
    const executionPlan: ExecutionPlan = {
      id: "test-id",
      actions: [{
        name: "save-plan",
        type: "save"
      }],
    }
    await expect(executionPlanService.save(executionPlan))
      .resolves
      .not
      .toThrowError()

    AWSMock.restore("DynamoDB.DocumentClient", "put")
  })

  it("will throw a ExecutionPlanServiceError when dynamodb client fails to save", async() => {
    const error = {statusCode: 500, message: "InternalFailure"}
    const errorResponse = { $response: {error: error}}
    const executionPlan: ExecutionPlan = {
      id: "test-id",
      actions: [{
        name: "save-plan",
        type: "save"
      }],
    }

    AWSMock.mock("DynamoDB.DocumentClient", "put", (_: PutItemInput, callback: Function) =>
      callback(null, errorResponse),
    )

    await expect(executionPlanService.save(executionPlan))
      .rejects
      .toThrowError(ExecutionPlanServiceError.from({statusCode: 500, message: "InternalFailure"} as AWSError))

    AWSMock.restore("DynamoDB.DocumentClient", "put")
  })

  it("it will successfully retrieve execution plan from db", async() => {
    AWSMock.mock(
      "DynamoDB.DocumentClient",
      "get",
      Promise.resolve<GetItemOutput>({
        Item: {},
      }),
    )

    await expect(executionPlanService.getById("test-id")).resolves.not.toThrowError()

    AWSMock.restore("DynamoDB.DocumentClient", "get")
  })

  it("will throw a ExecutionPlanServicePlanNotFoundError when no execution plan found in the db by id", async() => {
    AWSMock.mock("DynamoDB.DocumentClient", "get", Promise.resolve<GetItemOutput>({}))

    await expect(executionPlanService.getById("test-id"))
      .rejects
      .toThrowError(new ExecutionPlanServicePlanNotFoundError())

    AWSMock.restore("DynamoDB.DocumentClient", "get")
  })

  function mockAwsDynamoDbClientWithOkResponse(): void {
    AWSMock.mock("DynamoDB.DocumentClient", "put", (_: PutItemInput, callback: Function) =>
      callback(null, response),
    )
  }
})
