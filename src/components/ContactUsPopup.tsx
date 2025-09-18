import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateEmail, validateEmailOnInput, verifyEmailExists } from '../utils/emailValidation';
import { validateIndianPhone, validateIndianPhoneOnInput } from '../utils/phoneValidation';
import { validateName, validateNameOnInput, cleanNameInput } from '../utils/nameValidation';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
}

interface ContactUsPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactUsPopup: React.FC<ContactUsPopupProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    service: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    service: false,
    message: false,
  });

  const services = [
    'Web Development',
    'Mobile App Development',
    'UI/UX Design',
    'Digital Marketing',
    'SEO Optimization',
    'E-commerce Solutions',
    'Custom Software',
    'Other'
  ];

  const validateForm = async () => {
    console.log('Validating form with data:', formData);
    const newErrors: Partial<ContactFormData> = {};

    // Name validation
    const nameValidation = validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error || '';
      console.log('Name validation failed:', nameValidation.error);
    }

    // Email validation
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error || '';
      console.log('Email validation failed:', emailValidation.error);
    } else {
      // If basic validation passes, verify email existence
      console.log('Basic email validation passed, verifying existence...');
      const emailExists = await verifyEmailExists(formData.email);
      if (!emailExists.exists) {
        newErrors.email = emailExists.error || 'Email address does not exist';
        console.log('Email existence verification failed:', emailExists.error);
      }
    }

    // Phone validation (required)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      console.log('Phone validation failed: Phone number is required');
    } else {
      const phoneValidation = validateIndianPhone(formData.phone);
      if (!phoneValidation.isValid) {
        newErrors.phone = phoneValidation.error || '';
        console.log('Phone validation failed:', phoneValidation.error);
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
      console.log('Service validation failed: Please select a service');
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      console.log('Message validation failed: Message is required');
    }

    console.log('Validation errors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('Form is valid:', isValid);
    return isValid;
  };

  // Check if all required fields are filled and have no errors
  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'phone', 'service', 'message'];
    const allRequiredFieldsFilled = requiredFields.every(field => 
      formData[field as keyof ContactFormData].trim() !== ''
    );
    const noErrors = Object.values(errors).every(error => error === '' || error === undefined);
    return allRequiredFieldsFilled && noErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Handle name - clean and validate
    if (name === 'name') {
      // Clean the input to remove invalid characters
      const cleanedName = cleanNameInput(value);
      
      // Limit to 20 characters
      const limitedName = cleanedName.slice(0, 20);
      
      setFormData(prev => ({ ...prev, name: limitedName }));
      
      // Real-time name validation
      const nameValidation = validateNameOnInput(limitedName);
      if (!nameValidation.isValid) {
        setErrors(prev => ({ ...prev, name: nameValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, name: '' }));
      }
      return;
    }

    // Handle phone number - only allow digits
    if (name === 'phone') {
      // Only allow digits
      const digitsOnly = value.replace(/\D/g, '');
      
      // Limit to 10 digits
      const limitedDigits = digitsOnly.slice(0, 10);
      
      setFormData(prev => ({ ...prev, phone: limitedDigits }));
      
      // Real-time phone validation
      const phoneValidation = validateIndianPhoneOnInput(limitedDigits);
      if (!phoneValidation.isValid) {
        setErrors(prev => ({ ...prev, phone: phoneValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
      return;
    }

    // Handle other fields
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time email validation
    if (name === 'email') {
      const emailValidation = validateEmailOnInput(value);
      if (!emailValidation.isValid) {
        setErrors(prev => ({ ...prev, email: emailValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    // Validate on blur
    if (name === 'name') {
      const nameValidation = validateName(value);
      if (!nameValidation.isValid) {
        setErrors(prev => ({ ...prev, name: nameValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, name: '' }));
      }
    } else if (name === 'email') {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        setErrors(prev => ({ ...prev, email: emailValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    } else if (name === 'phone') {
      const phoneValidation = validateIndianPhone(value);
      if (!phoneValidation.isValid) {
        setErrors(prev => ({ ...prev, phone: phoneValidation.error || '' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, validating...');
    
    // Mark all required fields as touched to show validation errors
    setTouched({
      name: true,
      email: true,
      phone: true,
      company: true,
      service: true,
      message: true,
    });
    
    const isValid = await validateForm();
    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    console.log('Form validation passed, proceeding with WhatsApp redirect');
    setIsSubmitting(true);
    
    try {
      // Create WhatsApp message immediately (no delay)
      console.log('Creating WhatsApp message...');
      const whatsappMessage = `
Hello! I am reaching out through your website contact form.

*My Details:*
• Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}
• Company: ${formData.company || 'Not provided'}
• Service Interested In: ${formData.service}

*Message:*
${formData.message}

Best regards,
${formData.name}
      `.trim();

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/+918930005190?text=${encodeURIComponent(whatsappMessage)}`;
      console.log('WhatsApp URL:', whatsappUrl);
      
      // Create a temporary link and click it (more reliable method)
      console.log('Creating temporary link for WhatsApp redirect...');
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      console.log('Clicking WhatsApp link...');
      link.click();
      document.body.removeChild(link);
      console.log('WhatsApp redirect completed');

      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          service: ''
        });
        setErrors({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
        setTouched({
          name: false,
          email: false,
          phone: false,
          company: false,
          service: false,
          message: false,
        });
        setSubmitSuccess(false);
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md z-50"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative p-6 border-b border-gray-700/50">
                <button
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-100 mb-2">Book Meet</h2>
                  <p className="text-gray-300">Let's discuss your project and bring your ideas to life!</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100 mb-2">Thank You!</h3>
                    <p className="text-gray-300">We've received your message and will get back to you soon.</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                        Full Name *
                      </label>
                                              <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 placeholder-gray-400 ${
                            errors.name && touched.name ? 'border-red-400/50' : 'border-gray-600/50'
                          }`}
                          placeholder="Enter your full name"
                          maxLength={20}
                        />
                      {errors.name && touched.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 placeholder-gray-400 ${
                          errors.email ? 'border-red-400/50' : 'border-gray-600/50'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-200 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 placeholder-gray-400 ${
                          errors.phone && touched.phone ? 'border-red-400/50' : 'border-gray-600/50'
                        }`}
                        placeholder="Enter 10 digits only (e.g., 9876543210)"
                        maxLength={10}
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-200 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 placeholder-gray-400"
                        placeholder="Enter your company name"
                      />
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-200 mb-1">
                        Service Interested In *
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 ${
                          errors.service ? 'border-red-400/50' : 'border-gray-600/50'
                        }`}
                      >
                        <option value="" className="bg-gray-800 text-gray-100">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service} className="bg-gray-800 text-gray-100">
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p className="text-red-400 text-sm mt-1">{errors.service}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
                        Project Details *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        rows={4}
                        className={`w-full px-3 py-2 bg-gray-800/50 backdrop-blur-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-100 placeholder-gray-400 ${
                          errors.message ? 'border-red-400/50' : 'border-gray-600/50'
                        }`}
                        placeholder="Tell us about your project requirements..."
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid()}
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 py-3 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center backdrop-blur-sm border border-gray-600/50"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactUsPopup; 