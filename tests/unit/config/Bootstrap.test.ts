import {Bootstrap} from "../../../src/app/config/Bootstrap"
import {ExecutionPlanController} from "../../../src/app/controllers/ExecutionPlanController"
import {ExecutionPlanService} from "../../../src/app/services/execution-plan/ExecutionPlanService"

describe("Bootstrap", () => {
  it("it will successfully instantiate dependencies", async () => {
    const bootstrap = new Bootstrap()
    expect(bootstrap.executionPlanController).toBeInstanceOf(ExecutionPlanController)
    expect(bootstrap.executionPlanService).toBeInstanceOf(ExecutionPlanService)
  })
})
