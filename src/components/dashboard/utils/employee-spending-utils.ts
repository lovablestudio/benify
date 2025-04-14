
/**
 * Extract initials from a name for avatar fallback
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

/**
 * Format a date string to localized format
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};
