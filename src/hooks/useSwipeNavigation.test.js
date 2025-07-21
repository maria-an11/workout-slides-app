import React from "react";
import { render, fireEvent } from "@testing-library/react";
import useSwipeNavigation from "./useSwipeNavigation";

describe("useSwipeNavigation", () => {
  let onSwipeLeft, onSwipeRight;

  function TestComponent({ onSwipeLeft, onSwipeRight }) {
    const { handleTouchStart, handleTouchMove, handleTouchEnd } =
      useSwipeNavigation({
        onSwipeLeft,
        onSwipeRight,
      });

    return (
      <div
        data-testid="swipe-area"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        Swipe Area
      </div>
    );
  }

  beforeEach(() => {
    onSwipeLeft = jest.fn();
    onSwipeRight = jest.fn();
  });

  test("calls onSwipeLeft when swiped left", () => {
    const { getByTestId } = render(
      <TestComponent onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} />
    );

    const area = getByTestId("swipe-area");

    fireEvent.touchStart(area, { touches: [{ clientX: 300 }] });
    fireEvent.touchMove(area, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(area);

    expect(onSwipeLeft).toHaveBeenCalledTimes(1);
    expect(onSwipeRight).not.toHaveBeenCalled();
  });

  test("calls onSwipeRight when swiped right", () => {
    const { getByTestId } = render(
      <TestComponent onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} />
    );

    const area = getByTestId("swipe-area");

    fireEvent.touchStart(area, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(area, { touches: [{ clientX: 200 }] });
    fireEvent.touchEnd(area);

    expect(onSwipeRight).toHaveBeenCalledTimes(1);
    expect(onSwipeLeft).not.toHaveBeenCalled();
  });

  test("does not call callback for short swipe", () => {
    const { getByTestId } = render(
      <TestComponent onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} />
    );

    const area = getByTestId("swipe-area");

    fireEvent.touchStart(area, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(area, { touches: [{ clientX: 80 }] });
    fireEvent.touchEnd(area);

    expect(onSwipeLeft).not.toHaveBeenCalled();
    expect(onSwipeRight).not.toHaveBeenCalled();
  });
});
