import { maybePluralize, textTruncate } from "./text-transform";

describe("Text Transform Util", () => {
  test("Should pluralize word", () => {
    expect(maybePluralize(1, "bedroom")).toBe("1 bedroom");
    expect(maybePluralize(2, "bedroom")).toBe("2 bedrooms");
    expect(maybePluralize(5, "bedroom")).toBe("5 bedrooms");
    expect(maybePluralize(1, "index", "es")).toBe("1 index");
    expect(maybePluralize(2, "index", "es")).toBe("2 indexes");
    expect(maybePluralize(11, "index", "es")).toBe("11 indexes");
  });

  test("Should pluralize word", () => {
    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can go in! An interesting middle house for starters and young families."
      )
    ).toBe(
      "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can..."
    );

    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom."
      )
    ).toBe(
      "Here is another nice starter home. Modern kitchen, toilet and bathroom."
    );

    expect(
      textTruncate(
        "Here is another nice starter home. Modern kitchen, toilet and bathroom. The house is stylishly finished, completely contemporary. You can go in! An interesting middle house for starters and young families.",
        10
      )
    ).toBe("Here is another nice starter home. Modern kitchen, toilet and...");
  });
});
