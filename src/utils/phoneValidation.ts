// Indian phone number validation utility
export const validateIndianPhone = (phone: string): { isValid: boolean; error?: string } => {
  // Remove all non-digit characters
  const cleanedPhone = phone.replace(/\D/g, '');
  
  // Check if phone is empty
  if (!cleanedPhone || cleanedPhone.trim() === '') {
    return { isValid: false, error: 'Phone number is required' };
  }

  // Check if it's exactly 10 digits
  if (cleanedPhone.length !== 10) {
    return { isValid: false, error: 'Phone number must be exactly 10 digits' };
  }

  // Check if it starts with valid Indian mobile prefixes
  const validPrefixes = [
    '6', '7', '8', '9' // Valid starting digits for Indian mobile numbers
  ];
  
  const firstDigit = cleanedPhone.charAt(0);
  if (!validPrefixes.includes(firstDigit)) {
    return { isValid: false, error: 'Please enter a valid Indian mobile number' };
  }

  // Additional validation for specific patterns
  // Check for common invalid patterns
  if (cleanedPhone.match(/^0{10}$/)) {
    return { isValid: false, error: 'Please enter a valid phone number' };
  }

  return { isValid: true };
};

// Real-time phone validation for input fields
export const validateIndianPhoneOnInput = (phone: string): { isValid: boolean; error?: string } => {
  // For real-time validation, be more lenient
  if (!phone || phone.trim() === '') {
    return { isValid: true }; // Don't show error while typing
  }

  // Remove all non-digit characters
  const cleanedPhone = phone.replace(/\D/g, '');
  
  // Check if it contains only digits
  if (phone !== cleanedPhone) {
    return { isValid: false, error: 'Phone number should contain only digits' };
  }

  // Check length (should not exceed 10 digits)
  if (cleanedPhone.length > 10) {
    return { isValid: false, error: 'Phone number cannot exceed 10 digits' };
  }

  // If it's exactly 10 digits, validate the format
  if (cleanedPhone.length === 10) {
    const validPrefixes = ['6', '7', '8', '9'];
    const firstDigit = cleanedPhone.charAt(0);
    
    if (!validPrefixes.includes(firstDigit)) {
      return { isValid: false, error: 'Please enter a valid Indian mobile number' };
    }
  }

  return { isValid: true };
};

// Clean phone number to only digits
export const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
}; 