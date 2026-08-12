const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function startOfDay(timestamp: number): number {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function formatRelativeDate(
  timestamp: number,
  now = Date.now(),
  locale?: string,
): string {
  const elapsed = Math.max(0, now - timestamp);
  const entryDay = startOfDay(timestamp);
  const today = startOfDay(now);
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = startOfDay(yesterdayDate.getTime());

  if (entryDay === today) {
    if (elapsed < MINUTE) return "Just now";
    if (elapsed < HOUR) {
      const minutes = Math.max(1, Math.floor(elapsed / MINUTE));
      return new Intl.RelativeTimeFormat(locale, { numeric: "always" }).format(
        -minutes,
        "minute",
      );
    }
    if (elapsed < 6 * HOUR) {
      const hours = Math.max(1, Math.floor(elapsed / HOUR));
      return new Intl.RelativeTimeFormat(locale, { numeric: "always" }).format(
        -hours,
        "hour",
      );
    }
    return "Today";
  }

  if (entryDay === yesterday) return "Yesterday";

  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  if (date.getFullYear() !== new Date(now).getFullYear()) {
    options.year = "numeric";
  }
  return new Intl.DateTimeFormat(locale, options).format(date);
}
