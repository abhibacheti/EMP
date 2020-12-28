import { AWSError } from "aws-sdk"
import { PromiseResult, Request } from "aws-sdk/lib/request"
import { IMock, Mock, MockBehavior, Times } from "typemoq"

export default class TestUtil {
  /**
   * Get a mock for the given class.
   *
   * @param strict boolean Whether the mock should have the behavior strict or not.
   */
  public static mock<T>(strict = true): IMock<T> {
    return Mock.ofType<T>(undefined, strict ? MockBehavior.Strict : MockBehavior.Loose, false)
  }

  /**
   * Get a mock which comes already holding a setup for a Promise.resolve() call.
   * Example:
   *    // ...
   *    const mockOfClassA = TestUtil.mockForPromise<ClassA>()
   *    otherInstanceWhoseMethodIsAPromiseOfClassA.setup(o => o.asyncMethodA())
   *      .returns(() => Promise.resolve(mockOfClassA.object))
   *      .verifiable(TypeMoq.Times.once())
   *
   * This is required due to a "limitation of the underlying technology" when using TypeMoq.
   * More info here: https://github.com/florinn/typemoq/issues/66
   *
   * @param strict boolean Whether the mock should have the behavior strict or not.
   */
  public static mockForPromise<T>(strict = true): IMock<T> {
    const promise = TestUtil.mock<T>(strict)
    promise
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .setup((x: any) => x.then)
      .returns(() => undefined)
      .verifiable(Times.atLeastOnce())

    return promise
  }

  public static getAwsRequestResponseMock<T>(times = 1): IMock<Request<T, AWSError>> {
    const publishResponse = this.mock<Request<T, AWSError>>()
    publishResponse
      .setup((p) => p.promise())
      .returns(() => Promise.resolve(this.getPromiseResultMock<T>().object))
      .verifiable(Times.exactly(times))

    return publishResponse
  }

  public static getPromiseResultMock<T>(): IMock<PromiseResult<T, AWSError>> {
    const promiseResult = this.mock<PromiseResult<T, AWSError>>()
    promiseResult
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .setup((x: any) => x.then)
      .returns(() => undefined)
      .verifiable(Times.atLeastOnce())

    return promiseResult
  }
}
