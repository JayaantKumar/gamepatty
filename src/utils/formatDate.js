/**
 * Formats a date string (YYYY-MM-DD) or a Firebase Timestamp object 
 * into a more readable format (e.g., "June 1, 2024").
 */
export const formatDate = (dateInput) => {
  let date;
  
  if (typeof dateInput === 'string') {
    // Assumes YYYY-MM-DD string
    const parts = dateInput.split('-');
    if (parts.length === 3) {
      date = new Date(parts[0], parts[1] - 1, parts[2]);
    } else {
      date = new Date(dateInput);
    }
  } else if (dateInput && typeof dateInput.toDate === 'function') {
    // Handle Firebase Timestamp
    date = dateInput.toDate();
  } else {
    return "Invalid Date";
  }

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};