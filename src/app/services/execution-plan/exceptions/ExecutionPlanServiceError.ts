import { AWSError } from "aws-sdk"

export class ExecutionPlanServiceError extends Error {
  public readonly code: string

  public constructor(code: string, message: string) {
    super(message)
    this.code = code
  }

  public static from(error: AWSError): ExecutionPlanServiceError {
    return new this(error.code, error.message)
  }
}

export class ExecutionPlanServicePlanNotFoundError extends Error {}
