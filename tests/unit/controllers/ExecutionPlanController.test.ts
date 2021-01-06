import {ExecutionPlanService} from "../../../src/app/services/execution-plan/ExecutionPlanService"
import {ExecutionPlan} from "../../../src/app/domain/ExecutionPlan"
import {ExecutionPlanController} from "../../../src/app/controllers/ExecutionPlanController"
import TestUtil from "../TestUtil"
import { Times } from "typemoq"
import {ExecutionPlanServiceError} from "../../../src/app/services/execution-plan/exceptions/ExecutionPlanServiceError"

describe("ExecutionPlanController", () => {
  const executionPlanServiceIMock = TestUtil.mock<ExecutionPlanService>()
  const executionPlanController = new ExecutionPlanController(executionPlanServiceIMock.object)

  beforeEach(() => {
    executionPlanServiceIMock.reset()
  })

  afterEach(() => {
    executionPlanServiceIMock.verifyAll()
  })

  it("it will successfully save execution plan", async () => {
    const executionPlan: ExecutionPlan = {
      id: "test-id",
      actions: [{
        name: "save-plan",
        type: "save"
      }],
    }

    executionPlanServiceIMock.setup(e => e.save(executionPlan))
      .returns(() => Promise.resolve())
      .verifiable(Times.once())

    await expect(executionPlanController.saveExecutionPlan(executionPlan)).resolves.not.toThrowError()
  })

  it("it will successfully get execution plan by id", async () => {
    const executionPlan: ExecutionPlan = {
      id: "test-id",
      actions: [{
        name: "save-plan",
        type: "save"
      }],
    }

    const id = "test-id"
    executionPlanServiceIMock.setup(e => e.getById(id))
      .returns(() => Promise.resolve(executionPlan))
      .verifiable(Times.once())

    await expect(executionPlanController.getExecutionPlanById(id))
      .resolves
      .toEqual({
        statusCode: 200,
        body: JSON.stringify(executionPlan),
        "headers": {"Content-Type": "application/json; charset=utf-8"},
      })
  })

  it("it will return 500 when internal server error occurred", async () => {
    const id = "test-id"
    const error = new ExecutionPlanServiceError("500", "internal server erro")
    executionPlanServiceIMock.setup(e => e.getById(id))
      .returns(() => Promise.reject(error))
      .verifiable(Times.once())

    await expect(executionPlanController.getExecutionPlanById(id))
      .resolves
      .toEqual({
        statusCode: 500,
        "headers": {"Content-Type": "application/json; charset=utf-8"},
        "body": "Something went wrong, please try again later.",
      })
  })
})
