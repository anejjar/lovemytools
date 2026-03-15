export interface TextStats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  lines: number;
  sentences: number;
  paragraphs: number;
  readingTimeMinutes: number;
  speakingTimeMinutes: number;
  uniqueWords: number;
  avgWordLength: number;
}

export function analyzeText(text: string): TextStats {
  if (!text) {
    return { words: 0, characters: 0, charactersNoSpaces: 0, lines: 0, sentences: 0, paragraphs: 0, readingTimeMinutes: 0, speakingTimeMinutes: 0, uniqueWords: 0, avgWordLength: 0 };
  }

  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const lines = text.split("\n").length;
  const sentences = (text.match(/[.!?]+/g) ?? []).length || (text.trim() ? 1 : 0);
  const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length || (text.trim() ? 1 : 0);
  const readingTimeMinutes = words.length / 200; // avg 200 wpm
  const speakingTimeMinutes = words.length / 130; // avg 130 wpm
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z0-9]/g, ""))).size;
  const totalWordLen = words.reduce((sum, w) => sum + w.replace(/[^a-zA-Z]/g, "").length, 0);
  const avgWordLength = words.length > 0 ? Math.round((totalWordLen / words.length) * 10) / 10 : 0;

  return { words: words.length, characters, charactersNoSpaces, lines, sentences, paragraphs, readingTimeMinutes, speakingTimeMinutes, uniqueWords, avgWordLength };
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  return `${Math.ceil(minutes)} min`;
}

export function getTopWords(text: string, n = 10): Array<{ word: string; count: number }> {
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) ?? [];
  const freq: Record<string, number> = {};
  for (const w of words) freq[w] = (freq[w] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, n).map(([word, count]) => ({ word, count }));
}
