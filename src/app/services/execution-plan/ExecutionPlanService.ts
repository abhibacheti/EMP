import {DocumentClient} from "aws-sdk/clients/dynamodb"
import {ExecutionPlan} from "../../domain/ExecutionPlan"
import {
  ExecutionPlanServiceError,
  ExecutionPlanServicePlanNotFoundError
} from "./exceptions/ExecutionPlanServiceError"

export class ExecutionPlanService {
  private readonly tableName: string
  private readonly documentClient: DocumentClient

  public constructor(tableName: string, documentClient: DocumentClient) {
    this.tableName = tableName
    this.documentClient = documentClient
  }

  public async save(executionPlan: ExecutionPlan): Promise<void> {
    return await this.documentClient.put({
      TableName: this.tableName,
      Item: {
        Id: executionPlan.id,
        ...executionPlan,
      },
    }).promise()
      .then(data => {
        const error = data.$response.error
        if (error) {
          throw ExecutionPlanServiceError.from(error)
        }
      })
  }

  public async getById(id: string): Promise<ExecutionPlan> {
    return await this.documentClient.get({
      Key: {
        Id: id
      },
      TableName: this.tableName,
    }).promise()
      .then(data => {
       if(!data.Item) {
         throw new ExecutionPlanServicePlanNotFoundError()
       }

       return data.Item as ExecutionPlan
    })
  }
}
