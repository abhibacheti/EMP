import {ExecutionPlanService} from "../services/execution-plan/ExecutionPlanService"
import {ExecutionPlan} from "../domain/ExecutionPlan"
import {APIGatewayProxyResult} from "aws-lambda"
import {ApiGatewayProxyResultFactory} from "../helpers/ApiGatewayProxyResultFactory"

export class ExecutionPlanController {
  private readonly executionPlanService: ExecutionPlanService

  public constructor(executionPlanService: ExecutionPlanService) {
    this.executionPlanService = executionPlanService
  }

  public saveExecutionPlan(executionPlan: ExecutionPlan): Promise<void> {
    return this.executionPlanService.save(executionPlan)
  }

  public getExecutionPlanById(id: string): Promise<APIGatewayProxyResult> {
    return this.executionPlanService.getById(id)
      .then(executionPlan => ApiGatewayProxyResultFactory.ok(JSON.stringify(executionPlan)))
      .catch(_ =>  ApiGatewayProxyResultFactory.internalServerError())
  }
}
