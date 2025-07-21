import { renderHook, act } from "@testing-library/react";
import useFullScreen from "./useFullScreen";

describe("useFullScreen hook", () => {
  beforeEach(() => {
    // Reset mocks and fullscreenElement
    document.fullscreenElement = null;
    document.documentElement.requestFullscreen = jest.fn(() =>
      Promise.resolve()
    );
    document.exitFullscreen = jest.fn(() => Promise.resolve());
  });

  test("initially isFullscreen is false", () => {
    const { result } = renderHook(() => useFullScreen());
    expect(result.current.isFullscreen).toBe(false);
  });

  test("toggleFullscreen enters fullscreen if not fullscreen", async () => {
    const { result } = renderHook(() => useFullScreen());

    await act(async () => {
      result.current.toggleFullscreen();
    });

    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  test("toggleFullscreen exits fullscreen if currently fullscreen", async () => {
    document.fullscreenElement = document.documentElement;

    const { result } = renderHook(() => useFullScreen());

    await act(async () => {
      result.current.toggleFullscreen();
    });

    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  test("updates isFullscreen state when fullscreenchange event fires", () => {
    const { result } = renderHook(() => useFullScreen());

    expect(result.current.isFullscreen).toBe(false);

    // Simulate entering fullscreen
    act(() => {
      document.fullscreenElement = document.documentElement;
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(result.current.isFullscreen).toBe(true);

    // Simulate exiting fullscreen
    act(() => {
      document.fullscreenElement = null;
      document.dispatchEvent(new Event("fullscreenchange"));
    });

    expect(result.current.isFullscreen).toBe(false);
  });

  test("handles requestFullscreen rejection", async () => {
    const errorMessage = "Request fullscreen failed";
    document.documentElement.requestFullscreen = jest.fn(() =>
      Promise.reject(new Error(errorMessage))
    );

    // Spy on console.error
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useFullScreen());

    await act(async () => {
      result.current.toggleFullscreen();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Failed to enter fullscreen: ${errorMessage}`
    );

    consoleErrorSpy.mockRestore();
  });
});
