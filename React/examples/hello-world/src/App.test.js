import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />);
  expect(screen.queryByText(/Tasks/)).toBeNull();
  //screen.debug();
  expect(await screen.findByText(/Tasks/)).toBeInTheDocument();
  expect(await screen.findByText(/task1/)).toBeInTheDocument();
});
