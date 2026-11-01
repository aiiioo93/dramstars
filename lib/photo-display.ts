export function formatPhotoDateTime(date?: string, time?: string) {
  const cleanDate = date?.trim();
  const cleanTime = time?.trim().replace(":", "h");

  if (cleanDate && cleanTime) return `${cleanDate} à ${cleanTime}`;
  return cleanDate ?? cleanTime ?? "";
}

export function formatSangTitle(number: number) {
  return `Sang titre ${number}`;
}
