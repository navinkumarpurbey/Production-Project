import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Contact Us</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out to our team with any questions about our healthcare prediction platform.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-soft p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Mail size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-neutral-900 mb-1">Email</h3>
                    <a href="mailto:info@healthpredict.com" className="text-primary-600 hover:text-primary-700">
                      info@healthpredict.com
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">For general inquiries</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <Phone size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-neutral-900 mb-1">Phone</h3>
                    <a href="tel:+9779812345678" className="text-primary-600 hover:text-primary-700">
                      +977 98-1234-5678
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">Mon-Fri, 9am to 5pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <MapPin size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-neutral-900 mb-1">Location</h3>
                    <p className="text-neutral-700">
                      New Baneshwor, Kathmandu<br />
                      Nepal
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">Near City Center</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <div className="rounded-md overflow-hidden" style={{ width: '100%', height: '300px' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    title="Location Map"
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=New%20Baneshwor,%20Kathmandu+(Geographic%20Mapping%20-%20Nepal,%20Kathmandu)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-lg shadow-soft p-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Send Us a Message</h2>

              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-accent-50 text-accent-800 rounded-md">
                  <p className="font-medium">Thank you for your message!</p>
                  <p className="text-sm mt-1">We've received your inquiry and will get back to you soon.</p>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-error-50 text-error-800 rounded-md">
                  <p className="font-medium">Something went wrong!</p>
                  <p className="text-sm mt-1">Please try again or contact us directly via email.</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Subscription Question">Subscription Question</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Data Request">Data Request</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full px-4 py-3 border border-neutral-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full md:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
