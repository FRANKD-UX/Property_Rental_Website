export const formatArea = (area: string) => (area.toLowerCase().includes('m²') ? area : `${area} m²`);
