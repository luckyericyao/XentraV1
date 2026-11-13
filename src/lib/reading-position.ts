type ReadingSection = {
  id: string;
  top: number;
};

export function getReadingHash(sections: ReadingSection[], marker: number) {
  let hash = "#top";
  let closestTop = -Infinity;

  if (!Number.isFinite(marker)) return hash;

  for (const section of sections) {
    if (
      section.id &&
      Number.isFinite(section.top) &&
      section.top <= marker &&
      section.top >= closestTop
    ) {
      hash = `#${section.id}`;
      closestTop = section.top;
    }
  }

  return hash;
}
