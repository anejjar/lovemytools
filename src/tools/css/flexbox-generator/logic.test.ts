import { describe, it, expect } from "vitest";
import { generateContainerCss, generateItemCss, defaultContainerOptions } from "./logic";

describe("generateContainerCss", () => {
  it("includes display flex", () => {
    const css = generateContainerCss(defaultContainerOptions());
    expect(css).toContain("display: flex;");
  });

  it("includes all properties", () => {
    const css = generateContainerCss(defaultContainerOptions());
    expect(css).toContain("flex-direction:");
    expect(css).toContain("flex-wrap:");
    expect(css).toContain("justify-content:");
    expect(css).toContain("align-items:");
  });

  it("includes gap when > 0", () => {
    const opts = { ...defaultContainerOptions(), gap: 16 };
    expect(generateContainerCss(opts)).toContain("gap: 16px;");
  });

  it("omits gap when 0", () => {
    const opts = { ...defaultContainerOptions(), gap: 0 };
    expect(generateContainerCss(opts)).not.toContain("gap");
  });

  it("column direction", () => {
    const opts = { ...defaultContainerOptions(), flexDirection: "column" as const };
    expect(generateContainerCss(opts)).toContain("flex-direction: column;");
  });
});

describe("generateItemCss", () => {
  it("includes grow shrink basis", () => {
    const css = generateItemCss({ flexGrow: 1, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0 });
    expect(css).toContain("flex-grow: 1;");
    expect(css).toContain("flex-shrink: 1;");
    expect(css).toContain("flex-basis: auto;");
  });

  it("omits align-self when auto", () => {
    const css = generateItemCss({ flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0 });
    expect(css).not.toContain("align-self");
  });

  it("includes align-self when not auto", () => {
    const css = generateItemCss({ flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "center", order: 0 });
    expect(css).toContain("align-self: center;");
  });

  it("includes order when non-zero", () => {
    const css = generateItemCss({ flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 2 });
    expect(css).toContain("order: 2;");
  });
});
