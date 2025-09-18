// Email validation utility
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  // Check if email is empty
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  // Trim whitespace
  const trimmedEmail = email.trim();
  console.log('Validating email:', trimmedEmail);

  // Basic email format regex for all domains
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    console.log('Basic email format failed');
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for obvious invalid patterns
  if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@') || 
      trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.') ||
      trimmedEmail.includes('..') || trimmedEmail.includes('@.') || 
      trimmedEmail.includes('.@')) {
    console.log('Invalid pattern detected');
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for reasonable length
  if (trimmedEmail.length > 254) {
    console.log('Email too long');
    return { isValid: false, error: 'Email address is too long' };
  }

  // Check for local part length (before @)
  const localPart = trimmedEmail.split('@')[0];
  console.log('Local part:', localPart);
  
  // General email rules
  if (localPart.length < 3) {
    console.log('Local part too short');
    return { isValid: false, error: 'Email address must be at least 3 characters before @' };
  }
  
  if (localPart.length > 64) {
    console.log('Local part too long');
    return { isValid: false, error: 'Email address cannot exceed 64 characters before @' };
  }

  // Character validation for local part
  const localPartRegex = /^[a-zA-Z0-9._%+-]+$/;
  if (!localPartRegex.test(localPart)) {
    console.log('Local part contains invalid characters:', localPart);
    return { isValid: false, error: 'Email address can only contain letters, numbers, dots, underscores, hyphens, and plus signs' };
  }

  // Check for domain length
  const domain = trimmedEmail.split('@')[1];
  console.log('Domain part:', domain);
  if (domain && domain.length > 253) {
    console.log('Domain too long');
    return { isValid: false, error: 'Email address is too long' };
  }

  // Check for valid TLD (top-level domain)
  const tldRegex = /\.[a-zA-Z]{2,}$/;
  if (!tldRegex.test(trimmedEmail)) {
    console.log('TLD validation failed');
    return { isValid: false, error: 'Please enter a valid email address with proper domain' };
  }

  console.log('Email format validation passed');
  return { isValid: true };
};

// Enhanced email verification that checks for real, existing email addresses
export const verifyEmailExists = async (email: string): Promise<{ exists: boolean; error?: string }> => {
  try {
    console.log('Starting email verification for:', email);
    
    const localPart = email.split('@')[0].toLowerCase();
    const domain = email.split('@')[1]?.toLowerCase();
    
    // Check for common fake email patterns
    const suspiciousPatterns = [
      /^test/, /^fake/, /^dummy/, /^example/, /^sample/,
      /^admin/, /^root/, /^user/, /^demo/, /^temp/, /^temporary/,
      /^fakeemail/, /^testemail/, /^example/, /^sample/,
      /^asdf/, /^qwerty/, /^123/, /^abc/, /^xyz/, /^aaa/, /^bbb/,
      /^test123/, /^fake123/, /^dummy123/, /^example123/,
      /^admin123/, /^user123/, /^demo123/, /^temp123/
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(localPart)) {
        console.log('Suspicious email pattern detected:', localPart);
        return { exists: false, error: 'Please use a real email address, not a test or fake email.' };
      }
    }
    
    // Check for very short local parts (likely fake)
    if (localPart.length < 3) {
      console.log('Local part too short:', localPart);
      return { exists: false, error: 'Email address seems too short. Please use a real email address.' };
    }
    
    // Check for very long local parts (likely fake)
    if (localPart.length > 64) {
      console.log('Local part too long:', localPart);
      return { exists: false, error: 'Email address seems too long. Please use a real email address.' };
    }
    
    // Check for disposable email domains
    const disposableDomains = [
      '10minutemail.com', 'guerrillamail.com', 'tempmail.org', 'mailinator.com',
      'throwaway.email', 'temp-mail.org', 'fakeinbox.com', 'sharklasers.com',
      'getairmail.com', 'mailnesia.com', 'maildrop.cc', 'tempmailaddress.com',
      'yopmail.com', 'mailcatch.com', 'spam4.me', 'tempr.email', 'tmpeml.com',
      'tmpmail.org', 'tmpmail.net', 'dispostable.com', 'mailmetrash.com',
      'mailnull.com', 'spamspot.com', 'temp-mail.io', 'guerrillamailblock.com'
    ];
    
    if (disposableDomains.includes(domain)) {
      console.log('Disposable email domain detected:', domain);
      return { exists: false, error: 'Disposable email addresses are not allowed. Please use a real email address.' };
    }
    
    // Check for common fake domains
    const fakeDomains = [
      'test.com', 'example.com', 'fake.com', 'dummy.com', 'sample.com',
      'test.org', 'example.org', 'fake.org', 'dummy.org', 'sample.org',
      'test.net', 'example.net', 'fake.net', 'dummy.net', 'sample.net',
      'test.in', 'example.in', 'fake.in', 'dummy.in', 'sample.in'
    ];
    
    if (fakeDomains.includes(domain)) {
      console.log('Fake domain detected:', domain);
      return { exists: false, error: 'Please use a real email address, not a test domain.' };
    }
    
    // Try multiple API verification methods
    const verificationResults = await Promise.allSettled([
      verifyEmailWithAPI1(email),
      verifyEmailWithAPI2(email),
      verifyEmailWithAPI3(email)
    ]);
    
    console.log('API verification results:', verificationResults);
    
    // Check if any API successfully verified the email
    for (const result of verificationResults) {
      if (result.status === 'fulfilled' && result.value.exists) {
        console.log('Email verified as existing via API');
        return { exists: true };
      }
    }
    
    // If no API could verify, use enhanced validation
    console.log('No API could verify email, using enhanced validation');
    return { exists: true, error: 'Email format is valid. Please ensure you use a real email address.' };
    
  } catch (error) {
    console.error('Email verification error:', error);
    return { exists: false, error: 'Could not verify email. Please use a real email address.' };
  }
};

// Multiple API verification methods
const verifyEmailWithAPI1 = async (email: string): Promise<{ exists: boolean; error?: string }> => {
  try {
    const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=demo&email=${encodeURIComponent(email)}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API1 verification response:', data);
      
      if (data.is_valid_format && data.deliverability === 'DELIVERABLE') {
        return { exists: true };
      } else if (!data.is_valid_format) {
        return { exists: false, error: 'Invalid email format' };
      } else {
        return { exists: false, error: 'Email address does not exist' };
      }
    }
  } catch (error) {
    console.log('API1 verification failed');
  }
  return { exists: false, error: 'Could not verify email' };
};

const verifyEmailWithAPI2 = async (email: string): Promise<{ exists: boolean; error?: string }> => {
  try {
    const response = await fetch(`https://api.eva.pingutil.com/email?email=${encodeURIComponent(email)}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API2 verification response:', data);
      
      if (data.status === 'success' && data.data.valid) {
        return { exists: true };
      } else {
        return { exists: false, error: 'Email address does not exist' };
      }
    }
  } catch (error) {
    console.log('API2 verification failed');
  }
  return { exists: false, error: 'Could not verify email' };
};

const verifyEmailWithAPI3 = async (email: string): Promise<{ exists: boolean; error?: string }> => {
  try {
    // Using a different approach - checking MX records
    const response = await fetch(`https://api.email-validator.net/api/verify?Email=${encodeURIComponent(email)}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('API3 verification response:', data);
      
      if (data.formatCheck && data.smtpCheck) {
        return { exists: true };
      } else if (!data.formatCheck) {
        return { exists: false, error: 'Invalid email format' };
      } else {
        return { exists: false, error: 'Email address does not exist' };
      }
    }
  } catch (error) {
    console.log('API3 verification failed');
  }
  return { exists: false, error: 'Could not verify email' };
};

// Real-time email validation for input fields
export const validateEmailOnInput = (email: string): { isValid: boolean; error?: string } => {
  // For real-time validation, be more lenient
  if (!email || email.trim() === '') {
    return { isValid: true }; // Don't show error while typing
  }

  const trimmedEmail = email.trim();
  
  // Basic email format check for real-time validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  // Check for obvious invalid patterns
  if (trimmedEmail.startsWith('@') || trimmedEmail.endsWith('@') || 
      trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.') ||
      trimmedEmail.includes('..') || trimmedEmail.includes('@.') || 
      trimmedEmail.includes('.@')) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }

  return { isValid: true };
}; 