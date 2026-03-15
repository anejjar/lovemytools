import { describe, it, expect } from "vitest";
import { analyzeText, formatReadingTime, getTopWords } from "./logic";

describe("analyzeText", () => {
  it("returns zeros for empty string", () => {
    const s = analyzeText("");
    expect(s.words).toBe(0);
    expect(s.characters).toBe(0);
  });

  it("counts words correctly", () => {
    expect(analyzeText("hello world foo").words).toBe(3);
  });

  it("counts characters including spaces", () => {
    expect(analyzeText("hi there").characters).toBe(8);
  });

  it("counts characters without spaces", () => {
    expect(analyzeText("hi there").charactersNoSpaces).toBe(7);
  });

  it("counts lines", () => {
    expect(analyzeText("line1\nline2\nline3").lines).toBe(3);
  });

  it("counts sentences by punctuation", () => {
    expect(analyzeText("Hello. World! How are you?").sentences).toBe(3);
  });

  it("counts paragraphs", () => {
    expect(analyzeText("Para one.\n\nPara two.").paragraphs).toBe(2);
  });

  it("calculates reading time", () => {
    const words = Array(200).fill("word").join(" ");
    expect(analyzeText(words).readingTimeMinutes).toBe(1);
  });

  it("counts unique words", () => {
    expect(analyzeText("the cat sat on the mat").uniqueWords).toBeLessThan(6);
  });
});

describe("formatReadingTime", () => {
  it("returns < 1 min for short text", () => {
    expect(formatReadingTime(0.3)).toBe("< 1 min");
  });

  it("rounds up to nearest minute", () => {
    expect(formatReadingTime(1.5)).toBe("2 min");
  });
});

describe("getTopWords", () => {
  it("returns most frequent words", () => {
    const result = getTopWords("the cat sat the cat", 2);
    expect(result[0].word).toBe("the");
    expect(result[0].count).toBe(2);
  });

  it("filters short words (< 3 chars)", () => {
    const result = getTopWords("the cat");
    expect(result.every((w) => w.word.length >= 3)).toBe(true);
  });
});
