import { useState } from 'react';
import { validateEmail, validateEmailOnInput, verifyEmailExists } from '../utils/emailValidation';
import { validateIndianPhone, validateIndianPhoneOnInput } from '../utils/phoneValidation';
import { validateName, validateNameOnInput, cleanNameInput } from '../utils/nameValidation';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Handle name - clean and validate
    if (name === 'name') {
      // Clean the input to remove invalid characters
      const cleanedName = cleanNameInput(value);
      
      // Limit to 20 characters
      const limitedName = cleanedName.slice(0, 20);
      
      setForm({ ...form, name: limitedName });
      
      // Real-time name validation
      const nameValidation = validateNameOnInput(limitedName);
      if (!nameValidation.isValid) {
        setErrors({ ...errors, name: nameValidation.error || '' });
      } else {
        setErrors({ ...errors, name: '' });
      }
      return;
    }

    // Handle phone number - only allow digits
    if (name === 'phone') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedDigits = digitsOnly.slice(0, 10);
      
      setForm({ ...form, phone: limitedDigits });
      
      // Real-time phone validation
      const phoneValidation = validateIndianPhoneOnInput(limitedDigits);
      if (!phoneValidation.isValid) {
        setErrors({ ...errors, phone: phoneValidation.error || '' });
      } else {
        setErrors({ ...errors, phone: '' });
      }
      return;
    }

    // Handle other fields
    setForm({ ...form, [name]: value });

    // Real-time email validation
    if (name === 'email') {
      const emailValidation = validateEmailOnInput(value);
      if (!emailValidation.isValid) {
        setErrors({ ...errors, email: emailValidation.error || '' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validate on blur
    if (name === 'name') {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid) {
        setErrors({ ...errors, name: nameValidation.error || '' });
      } else {
        setErrors({ ...errors, name: '' });
      }
    } else if (name === 'email') {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        setErrors({ ...errors, email: emailValidation.error || '' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    } else if (name === 'phone') {
      const phoneValidation = validateIndianPhone(value);
      if (!phoneValidation.isValid) {
        setErrors({ ...errors, phone: phoneValidation.error || '' });
      } else {
        setErrors({ ...errors, phone: '' });
      }
    }
  };

  const validateForm = async () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: '',
    };

    // Name validation
    const nameValidation = validateName(form.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || '';
    }

    // Email validation
    const emailValidation = validateEmail(form.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || '';
    } else {
      // If basic validation passes, verify email existence
      const emailExists = await verifyEmailExists(form.email);
      if (!emailExists.exists) {
        newErrors.email = emailExists.error || 'Email address does not exist';
      }
    }

    // Phone validation (required)
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const phoneValidation = validateIndianPhone(form.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.error || '';
      }
    }

    // Message validation
    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Check if all required fields are filled and have no errors
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'phone', 'message'];
    const allRequiredFieldsFilled = requiredFields.every(field => 
      form[field as keyof typeof form].trim() !== ''
    );
    const noErrors = Object.values(errors).every(error => error === '');
    return allRequiredFieldsFilled && noErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all required fields as touched to show validation errors
    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true,
    });
    
    const isValid = await validateForm();
    if (!isValid) {
      return;
    }

    // Create a well-formatted email body
    const emailBody = `
Hello,

I am reaching out through your website contact form. Here are my details:

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone || 'Not provided'}

Message:
${form.message}

Best regards,
${form.name}
    `.trim();

    const mailto = `mailto:info.xpanix@gmail.com?subject=Contact Form Submission - ${encodeURIComponent(form.name)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailto;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg p-8 rounded-3xl border border-gray-700/50 shadow-2xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full bg-gray-800/50 border rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
              errors.name && touched.name ? 'border-red-400/50 focus:ring-red-400' : 'border-gray-600/50 focus:ring-gray-500'
            }`}
            required
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your full name"
            maxLength={20}
          />
          {errors.name && touched.name && (
            <p className="text-red-400 text-sm">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full bg-gray-800/50 border rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
              errors.email && touched.email ? 'border-red-400/50 focus:ring-red-400' : 'border-gray-600/50 focus:ring-gray-500'
            }`}
            required
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
            Phone *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className={`w-full bg-gray-800/50 border rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
              errors.phone && touched.phone ? 'border-red-400/50 focus:ring-red-400' : 'border-gray-600/50 focus:ring-gray-500'
            }`}
            required
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter 10 digits only (e.g., 9876543210)"
            maxLength={10}
          />
          {errors.phone && (
            <p className="text-red-400 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            className={`w-full bg-gray-800/50 border rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none ${
              errors.message && touched.message ? 'border-red-400/50 focus:ring-red-400' : 'border-gray-600/50 focus:ring-gray-500'
            }`}
            required
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tell us about your project requirements..."
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
} 