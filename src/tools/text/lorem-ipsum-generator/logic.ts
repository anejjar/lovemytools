const LOREM_WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor","incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud","exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure","in","reprehenderit","voluptate","velit","esse","cillum","fugiat","nulla","pariatur","excepteur","sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim","id","est","laborum","curabitur","pretium","tincidunt","lacus","nunc","purus","augue","luctus","tincidunt","leo","massa","at","eget","nisl","massa","ultrices","rutrum","turpis","facilisis","pulvinar","proin","lobortis","malesuada",
];

function randomWord(): string {
  return LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function generateWords(count: number): string {
  return Array.from({ length: count }, randomWord).join(" ");
}

export function generateSentences(count: number): string {
  return Array.from({ length: count }, () => {
    const wordCount = Math.floor(Math.random() * 10) + 8;
    const words = Array.from({ length: wordCount }, randomWord);
    // Add commas for realism
    if (wordCount > 10) {
      const commaIdx = Math.floor(wordCount * 0.4);
      words[commaIdx] = words[commaIdx] + ",";
    }
    return capitalize(words.join(" ")) + ".";
  }).join(" ");
}

export function generateParagraphs(count: number): string {
  return Array.from({ length: count }, () => {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    return generateSentences(sentenceCount);
  }).join("\n\n");
}

export function generateLoremIpsum(
  type: "words" | "sentences" | "paragraphs",
  count: number,
  startWithLorem = true
): string {
  const generated =
    type === "words"
      ? generateWords(count)
      : type === "sentences"
      ? generateSentences(count)
      : generateParagraphs(count);

  if (!startWithLorem) return generated;

  const classic =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  if (type === "sentences") {
    const rest = generateSentences(Math.max(0, count - 1));
    return count === 1 ? classic : `${classic} ${rest}`;
  }

  if (type === "paragraphs") {
    const rest = count > 1 ? "\n\n" + generateParagraphs(count - 1) : "";
    return classic + rest;
  }

  return generated;
}
