import {EventBusService} from "../../../../src/app/services/event-bus/EventBusService";

describe("EventBusService", () => {
    const eventBusService = new EventBusService()

    beforeEach(() => {
    })

    afterEach(() => {
    })

    it("will work", () => {
        expect(eventBusService.sendEvents()).toEqual(true)
    })
})
