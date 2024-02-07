import { getGlobalisedValue, clearGlobalNamespace } from "../lib";

describe("lib", () => {
  afterEach(() => {
    clearGlobalNamespace("test");
  });
  it("should store the value in the expected namespace and key, and retrieve it", () => {
    const item = {};
    const retrieve = getGlobalisedValue("test", "testKey", item);
    expect(retrieve).toBe(item);
  });

  it("should reset when cleared", () => {
    const item = {};
    const retrieve = getGlobalisedValue("test", "testKey", item);
    expect(retrieve).toBe(item);
    clearGlobalNamespace("test");
    const item2 = {};
    const retrieve2 = getGlobalisedValue("test", "testKey", item2);
    expect(retrieve2).toBe(item2);
  });

  it("should return the first globalised value", () => {
    const first = {};
    const second = {};
    const retrieve1 = getGlobalisedValue("test", "testKey", first);
    const retrieve2 = getGlobalisedValue("test", "testKey", second);
    expect(retrieve1).toBe(first);
    expect(retrieve2).toBe(first);
  });

  it("should work with functions", () => {
    const first = jest.fn();
    const second = jest.fn();
    const retrieve1 = getGlobalisedValue("test", "test", first);
    const retrieve2 = getGlobalisedValue("test", "test", second);
    expect(retrieve1).toBe(first);
    expect(retrieve2).toBe(first);
  });

  it("should work with literal values", () => {
    const first = "1";
    const second = "2";
    const retrieve1 = getGlobalisedValue("test", "test", first);
    const retrieve2 = getGlobalisedValue("test", "test", second);
    expect(retrieve1).toBe(first);
    expect(retrieve2).toBe(first);
  });

  it("should keep changes made to the value", () => {
    const value = {};
    const retrieve1 = getGlobalisedValue("test", "test", value);
    retrieve1["item"] = true;
    const retrieve2 = getGlobalisedValue("test", "test", {});
    expect(retrieve2["item"]).toBe(true);
  });

  it("should not collide if different namespaces", () => {
    const first = {};
    const second = {};
    const retrieve1 = getGlobalisedValue("space1", "test", first);
    const retrieve2 = getGlobalisedValue("space2", "test", second);
    expect(retrieve1).toBe(first);
    expect(retrieve2).toBe(second);
    clearGlobalNamespace("space1");
    clearGlobalNamespace("space2");
  });
  it("should not collide if different keys", () => {
    const first = {};
    const second = {};
    const retrieve1 = getGlobalisedValue("test", "test", first);
    const retrieve2 = getGlobalisedValue("test", "test2", second);
    expect(retrieve1).toBe(first);
    expect(retrieve2).toBe(second);
  });

  it("should not allow non-string namespaces", () => {
    expect(() => getGlobalisedValue({} as any, "test", {})).toThrow(
      "Invalid namespace key"
    );
  });
  it("should not allow non-string keys", () => {
    expect(() => getGlobalisedValue("test", {} as any, {})).toThrow(
      "Invalid item key"
    );
  });
});
