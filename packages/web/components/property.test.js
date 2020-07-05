import { cleanup, fireEvent, render } from "@testing-library/react";

import { properties } from "@acco-listing/server/data/properties-listings.json";
import { Property } from "./property.tsx";

afterEach(cleanup);

describe("Property", () => {
  it("Should render the component", () => {
    const container = render(<Property {...properties[1]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test("Should call status change handler", async () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Property {...properties[0]} onChangeStatus={onClick} />
    );

    const summary = getByText("2 beds house for sale");
    expect(summary).toBeTruthy();

    const button = getByText("Active");
    expect(onClick).not.toHaveBeenCalled();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(false);
  });

  test("Should rotate images on click", () => {
    const { getByAltText } = render(<Property {...properties[0]} />);

    const image = getByAltText(/2 bedrooms house for sale/);
    expect(image.src).toContain("104_2160.jpg");
    fireEvent.click(image.parentElement);
    expect(image.src).toContain("174_2160.jpg");
    fireEvent.click(image.parentElement);
    expect(image.src).toContain("191_2160.jpg");
    fireEvent.click(image.parentElement);
    expect(image.src).toContain("104_2160.jpg");
  });
});
