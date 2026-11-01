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

export function createInitialPhotoRegistry(points) {
  return Object.fromEntries(
    [...points]
      .sort(
        (left, right) =>
          left.sortableDateTime.localeCompare(right.sortableDateTime) ||
          left.id.localeCompare(right.id),
      )
      .map((point, index) => [point.id, index + 1]),
  );
}

export function applyPhotoRegistry(points, assignments) {
  const used = new Set();
  return points.map((point) => {
    const number = assignments[point.id];
    if (!Number.isInteger(number) || number < 1) {
      throw new Error(
        `Attribution explicite requise dans le registre pour ${point.id}`,
      );
    }
    if (used.has(number)) throw new Error(`Numéro Sang titre dupliqué: ${number}`);
    used.add(number);
    return { ...point, sangTitleNumber: number };
  });
}
