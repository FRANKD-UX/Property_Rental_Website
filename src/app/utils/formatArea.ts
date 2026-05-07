const metricAreaPattern = /\b(m²|m2|sqm|sq\.?\s*m|square\s*meters?)\b/i;
const imperialAreaPattern = /\b(sq\.?\s*ft|sqft|square\s*feet)\b/gi;

export const formatArea = (area: string) => {
  const trimmedArea = area.trim();
  if (!trimmedArea) return trimmedArea;

  if (metricAreaPattern.test(trimmedArea)) {
    return trimmedArea
      .replace(/\bm2\b/gi, 'm²')
      .replace(/\bsqm\b/gi, 'm²')
      .replace(/\bsq\.?\s*m\b/gi, 'm²')
      .replace(/\bsquare\s*meters?\b/gi, 'm²');
  }

  const normalizedArea = trimmedArea.replace(imperialAreaPattern, '').trim();
  return `${normalizedArea || trimmedArea} m²`;
};
