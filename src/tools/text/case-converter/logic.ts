export type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "pascal" | "snake" | "kebab" | "constant" | "dot";

export function convertCase(input: string, type: CaseType): string {
  if (!input) return "";
  const words = input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-\.]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ");

  switch (type) {
    case "upper": return input.toUpperCase();
    case "lower": return input.toLowerCase();
    case "title": return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    case "sentence": {
      const lower = input.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    case "camel": return words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    case "pascal": return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join("");
    case "snake": return words.map((w) => w.toLowerCase()).join("_");
    case "kebab": return words.map((w) => w.toLowerCase()).join("-");
    case "constant": return words.map((w) => w.toUpperCase()).join("_");
    case "dot": return words.map((w) => w.toLowerCase()).join(".");
    default: return input;
  }
}

export const CASE_TYPES: { type: CaseType; label: string; example: string }[] = [
  { type: "upper", label: "UPPER CASE", example: "HELLO WORLD" },
  { type: "lower", label: "lower case", example: "hello world" },
  { type: "title", label: "Title Case", example: "Hello World" },
  { type: "sentence", label: "Sentence case", example: "Hello world" },
  { type: "camel", label: "camelCase", example: "helloWorld" },
  { type: "pascal", label: "PascalCase", example: "HelloWorld" },
  { type: "snake", label: "snake_case", example: "hello_world" },
  { type: "kebab", label: "kebab-case", example: "hello-world" },
  { type: "constant", label: "CONSTANT_CASE", example: "HELLO_WORLD" },
  { type: "dot", label: "dot.case", example: "hello.world" },
];
