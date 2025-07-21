import { renderHook } from "@testing-library/react";
import useKeyboardNavigation from "./useKeyboardNavigation";

describe("useKeyboardNavigation", () => {
  let next, previous, restart;

  beforeEach(() => {
    next = jest.fn();
    previous = jest.fn();
    restart = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("calls next() on ArrowRight key press", () => {
    renderHook(() => useKeyboardNavigation({ next, previous, restart }));

    const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
    window.dispatchEvent(event);

    expect(next).toHaveBeenCalledTimes(1);
    expect(previous).not.toHaveBeenCalled();
    expect(restart).not.toHaveBeenCalled();
  });

  test("calls previous() on ArrowLeft key press", () => {
    renderHook(() => useKeyboardNavigation({ next, previous, restart }));

    const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
    window.dispatchEvent(event);

    expect(previous).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
    expect(restart).not.toHaveBeenCalled();
  });

  test("calls restart() on 'r' key press", () => {
    renderHook(() => useKeyboardNavigation({ next, previous, restart }));

    const event = new KeyboardEvent("keydown", { key: "r" });
    window.dispatchEvent(event);

    expect(restart).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
    expect(previous).not.toHaveBeenCalled();
  });

  test("calls restart() on 'R' key press", () => {
    renderHook(() => useKeyboardNavigation({ next, previous, restart }));

    const event = new KeyboardEvent("keydown", { key: "R" });
    window.dispatchEvent(event);

    expect(restart).toHaveBeenCalledTimes(1);
    expect(next).not.toHaveBeenCalled();
    expect(previous).not.toHaveBeenCalled();
  });

  test("does not call any function on unrelated keys", () => {
    renderHook(() => useKeyboardNavigation({ next, previous, restart }));

    const event = new KeyboardEvent("keydown", { key: "a" });
    window.dispatchEvent(event);

    expect(next).not.toHaveBeenCalled();
    expect(previous).not.toHaveBeenCalled();
    expect(restart).not.toHaveBeenCalled();
  });
});
