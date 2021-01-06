import {ExecutionPlanService} from "../services/execution-plan/ExecutionPlanService"
import {ExecutionPlanController} from "../controllers/ExecutionPlanController"
import {DocumentClient} from "aws-sdk/clients/dynamodb"

export class Bootstrap {
  public readonly executionPlanController: ExecutionPlanController
  public readonly executionPlanService: ExecutionPlanService

  public constructor() {
    this.executionPlanService = new ExecutionPlanService("EmpTable", new DocumentClient())
    this.executionPlanController = new ExecutionPlanController(this.executionPlanService)
  }
}
