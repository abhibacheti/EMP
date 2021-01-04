import { SQSEvent, Handler } from "aws-lambda"
export const handler: Handler = async (event: SQSEvent): Promise<void> => {
  console.log("lambda executed")
  console.log(event)
}
