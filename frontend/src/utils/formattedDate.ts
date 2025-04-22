const formatUpdatedAt = (updatedAt: string): string => {
  const today = new Date();
  const updated = new Date(updatedAt);

  const timeDiff = today.getTime() - updated.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (updated.getFullYear() !== today.getFullYear()) {
    return updated.getFullYear().toString();
  }

  if (
    updated.getDate() === today.getDate() &&
    updated.getMonth() === today.getMonth() &&
    updated.getFullYear() === today.getFullYear()
  ) {
    return 'Today';
  }

  if (daysDiff <= 7) {
    return `Past 7 days`;
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthIndex = updated.getMonth();
  return monthNames[monthIndex];
};

export default formatUpdatedAt;
