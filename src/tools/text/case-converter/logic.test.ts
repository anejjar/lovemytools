import { describe, it, expect } from "vitest";
import { convertCase } from "./logic";

describe("convertCase", () => {
  const input = "hello world";

  it("converts to UPPER CASE", () => expect(convertCase(input, "upper")).toBe("HELLO WORLD"));
  it("converts to lower case", () => expect(convertCase(input, "lower")).toBe("hello world"));
  it("converts to Title Case", () => expect(convertCase(input, "title")).toBe("Hello World"));
  it("converts to Sentence case", () => expect(convertCase("hello world", "sentence")).toBe("Hello world"));
  it("converts to camelCase", () => expect(convertCase(input, "camel")).toBe("helloWorld"));
  it("converts to PascalCase", () => expect(convertCase(input, "pascal")).toBe("HelloWorld"));
  it("converts to snake_case", () => expect(convertCase(input, "snake")).toBe("hello_world"));
  it("converts to kebab-case", () => expect(convertCase(input, "kebab")).toBe("hello-world"));
  it("converts to CONSTANT_CASE", () => expect(convertCase(input, "constant")).toBe("HELLO_WORLD"));
  it("converts to dot.case", () => expect(convertCase(input, "dot")).toBe("hello.world"));

  it("handles camelCase input", () => {
    expect(convertCase("helloWorld", "snake")).toBe("hello_world");
  });

  it("handles snake_case input", () => {
    expect(convertCase("hello_world", "camel")).toBe("helloWorld");
  });

  it("handles kebab-case input", () => {
    expect(convertCase("hello-world", "pascal")).toBe("HelloWorld");
  });

  it("returns empty string for empty input", () => {
    expect(convertCase("", "upper")).toBe("");
  });
});
