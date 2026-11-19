type ReadingSection = {
  id: string;
  top: number;
};

export function getReadingMarker(
  viewportHeight: number,
  scrollTop: number,
  scrollHeight: number,
) {
  const scrollLimit = scrollHeight - viewportHeight;

  // At the bottom, the final section may be visible but unable to reach the normal marker.
  if (scrollLimit > 0 && scrollTop > 0 && scrollLimit - scrollTop <= 1) {
    return viewportHeight;
  }

  return Math.min(viewportHeight * 0.34, 260);
}

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
