import { dump, load } from "js-yaml";

export interface ConvertResult {
  output: string;
  error: string | null;
}

export function jsonToYaml(input: string): ConvertResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = JSON.parse(input);
    const yaml = dump(parsed, { indent: 2, lineWidth: -1 });
    return { output: yaml, error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}

export function yamlToJson(input: string, indent = 2): ConvertResult {
  if (!input.trim()) return { output: "", error: null };
  try {
    const parsed = load(input);
    return { output: JSON.stringify(parsed, null, indent), error: null };
  } catch (e) {
    return { output: "", error: (e as Error).message };
  }
}
