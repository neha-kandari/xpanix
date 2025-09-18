// Name validation utility
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  // Check if name is empty
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Name is required' };
  }

  // Trim whitespace
  const trimmedName = name.trim();

  // Check length (max 20 characters)
  if (trimmedName.length > 20) {
    return { isValid: false, error: 'Name cannot exceed 20 characters' };
  }

  // Check minimum length (at least 2 characters)
  if (trimmedName.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes, dots)
  const validNameRegex = /^[a-zA-Z\s\-'\.]+$/;
  if (!validNameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name should only contain letters, spaces, hyphens, apostrophes, and dots' };
  }

  // Check for consecutive spaces
  if (trimmedName.includes('  ')) {
    return { isValid: false, error: 'Name cannot contain consecutive spaces' };
  }

  // Check for leading/trailing spaces
  if (name !== trimmedName) {
    return { isValid: false, error: 'Name cannot start or end with spaces' };
  }

  // Check for valid name patterns (at least one letter)
  const letterRegex = /[a-zA-Z]/;
  if (!letterRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name must contain at least one letter' };
  }

  // Check for common invalid patterns
  if (trimmedName.match(/^[^a-zA-Z]*$/)) {
    return { isValid: false, error: 'Name must contain at least one letter' };
  }

  return { isValid: true };
};

// Real-time name validation for input fields
export const validateNameOnInput = (name: string): { isValid: boolean; error?: string } => {
  // For real-time validation, be more lenient
  if (!name || name.trim() === '') {
    return { isValid: true }; // Don't show error while typing
  }

  const trimmedName = name.trim();
  
  // Check length (max 20 characters)
  if (trimmedName.length > 20) {
    return { isValid: false, error: 'Name cannot exceed 20 characters' };
  }

  // Check for invalid characters
  const validNameRegex = /^[a-zA-Z\s\-'\.]*$/;
  if (!validNameRegex.test(trimmedName)) {
    return { isValid: false, error: 'Name should only contain letters, spaces, hyphens, apostrophes, and dots' };
  }

  // Check for consecutive spaces
  if (trimmedName.includes('  ')) {
    return { isValid: false, error: 'Name cannot contain consecutive spaces' };
  }

  return { isValid: true };
};

// Clean name input (remove invalid characters)
export const cleanNameInput = (name: string): string => {
  // Remove invalid characters, keep only letters, spaces, hyphens, apostrophes, and dots
  return name.replace(/[^a-zA-Z\s\-'\.]/g, '');
}; 