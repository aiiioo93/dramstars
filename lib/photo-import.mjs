export function roundCoordinate(value) {
  return Number(Number(value).toFixed(4));
}

export function getSequenceNumber(filename) {
  const match = filename.match(/-(\d+)\.[^.]+$/i);
  return match ? Number(match[1]) : 1;
}

export function sortSourceFiles(files) {
  return [...files].sort(
    (left, right) => getSequenceNumber(left) - getSequenceNumber(right),
  );
}

export function parseExifDateTime(value) {
  const match = String(value ?? "").match(
    /^(\d{4}):(\d{2}):(\d{2}) (\d{2}):(\d{2}):(\d{2})$/,
  );

  if (!match) {
    return null;
  }

  const [, year, month, day, hour, minute, second] = match;

  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minute}`,
    raw: `${year}:${month}:${day} ${hour}:${minute}:${second}`,
    sortable: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
  };
}

export function coordinateKey(lat, lng) {
  return `${roundCoordinate(lat).toFixed(4)},${roundCoordinate(lng).toFixed(4)}`;
}
