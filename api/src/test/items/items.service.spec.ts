import { assert } from "chai";
import { find } from "../../items/items.service";

describe("Calculator Tests", () => {
  it("should return 2 when seek 2", async () => {
    const result = await find(2);
    assert.equal(result.id, 2);
  });
});
