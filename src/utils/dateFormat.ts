export const formatDate = (
  inputDate: string | undefined
): string | undefined => {
  if (!inputDate) return;
  const date = new Date(inputDate);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
};

export function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
    [1, 'second'],
  ];

  for (const [intervalInSeconds, unit] of intervals) {
    const interval = Math.floor(seconds / intervalInSeconds);

    if (interval >= 1) {
      const plural = interval > 1 ? 's' : '';
      return `${interval} ${unit}${plural} ago`;
    }
  }

  return 'just now';
}

// Example usage:
const pastDate = new Date('2023-01-01T12:00:00Z');
console.log(timeAgo(pastDate)); // Output: "1 month ago"

