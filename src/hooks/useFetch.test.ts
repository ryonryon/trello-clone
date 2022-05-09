import { renderHook, waitFor, act } from "@testing-library/react";
import { useFetch } from "./useFetch";

describe("useFetch()", () => {
  test("Passed valid url - should return expected result body", async () => {
    // arrange
    let result: { current: ReturnType<typeof useFetch> };
    const mockedUrl = "https://www.google.com";
    const returnBody = {
      status: 200,
      body: {
        title: "Yay mocked google title",
      },
    };
    const expectedReturnBody = returnBody.body;

    // Mock fetch api with successful response body
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(returnBody.body),
        ...returnBody,
      }),
    ) as jest.Mock;

    // act
    await act(async () => {
      result = renderHook(() => useFetch(mockedUrl)).result;
    });

    // assert
    await waitFor(() => expect(result.current.error).toEqual(null));
    await waitFor(() => expect(result.current.data).toEqual(expectedReturnBody));
    await waitFor(() => expect(result.current.isLoading).toEqual(false));
  });

  test("Passed valid url BUT returned error - should return expected error body", async () => {
    // arrange
    let result: { current: ReturnType<typeof useFetch> };
    const mockedUrl = "https://www.google.com";
    const expectedErrorBody = {
      status: 500,
      statusText: "internal error",
    };

    // Mock fetch api with error response body
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(JSON.stringify(expectedErrorBody)),
        ...expectedErrorBody,
      }),
    ) as jest.Mock;

    // act
    await act(async () => {
      result = renderHook(() => useFetch(mockedUrl)).result;
    });

    // assert
    await waitFor(() => expect(result.current.error).toEqual(expectedErrorBody));
    await waitFor(() => expect(result.current.data).toEqual(null));
    await waitFor(() => expect(result.current.isLoading).toEqual(false));
  });

  test("Passed NO url - shouldn't do anything, so returns default values", async () => {
    // arrange
    let result: { current: ReturnType<typeof useFetch> };
    const mockedUrl = "";

    // act
    await act(async () => {
      result = renderHook(() => useFetch(mockedUrl)).result;
    });

    // assert
    await waitFor(() => expect(result.current.error).toEqual(null));
    await waitFor(() => expect(result.current.data).toEqual(null));
    await waitFor(() => expect(result.current.isLoading).toEqual(false));
  });
});
