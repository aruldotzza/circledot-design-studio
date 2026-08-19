import React, { useState } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { X, ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isEnquiryModalOpen, closeEnquiryModal, preselectedCategory } = useNavigation();

  const [step, setStep] = useState(1);
  const [lookingToBuild, setLookingToBuild] = useState<string>(preselectedCategory || '');
  const [currentStage, setCurrentStage] = useState<string>('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  if (!isEnquiryModalOpen) return null;

  const buildOptions = [
    'Brand & Identity',
    'Website',
    'Digital Product / App',
    'Development & Tech',
    'Digital Growth & SEO',
    'Social Media Presence',
    'Automation & AI',
    'Product Launch',
    'Personal Brand',
    'Not sure yet',
  ];

  const stageOptions = [
    'Just an idea',
    'Starting',
    'Already operating',
    'Growing',
    'Redesigning',
    'Launching',
    'Scaling',
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY',
          subject: `New Project Enquiry from ${name} — ${lookingToBuild}`,
          from_name: name,
          email: email,
          phone: phone,
          company: company || 'Not provided',
          website: website || 'Not provided',
          looking_to_build: lookingToBuild || 'Not specified',
          current_stage: currentStage || 'Not specified',
          message: description || 'Not provided',
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback: open user's mail client with pre-filled email
        const subject = encodeURIComponent(`New Project Enquiry from ${name} — ${lookingToBuild}`);
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company || 'N/A'}\nWebsite: ${website || 'N/A'}\n\nLooking to Build: ${lookingToBuild}\nCurrent Stage: ${currentStage}\n\nProject Description:\n${description}`
        );
        window.open(`mailto:hello@circledotdesign.in?subject=${subject}&body=${body}`);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSendError('Failed to send. Please try again or email us directly at hello@circledotdesign.in');
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setIsSubmitted(false);
    setSendError(null);
    closeEnquiryModal();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-2xl my-auto text-gray-900 transition-colors duration-300">
        {/* Close Button */}
        <button
          onClick={resetForm}
          className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-[#E30613] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Step Indicator (3 Steps Total) */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
              <span className="text-xs font-mono tracking-widest text-[#E30613] uppercase font-bold">
                STEP 0{step} / 03
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= step ? 'w-8 bg-[#E30613]' : 'w-2 bg-gray-200'
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            {/* STEP 01 */}
            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  What are you looking to build?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Select the closest option. Don't worry if you're not completely sure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {buildOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setLookingToBuild(opt)}
                      className={`p-3.5 rounded-xl text-left text-sm font-medium border transition-all cursor-pointer ${
                        lookingToBuild === opt
                          ? 'border-[#E30613] bg-[#E30613]/10 text-[#E30613] font-semibold'
                          : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-[#E30613]/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 02 */}
            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Where are you right now?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  This helps us align our process with your current pace.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {stageOptions.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => setCurrentStage(stage)}
                      className={`p-3.5 rounded-xl text-left text-sm font-medium border transition-all cursor-pointer ${
                        currentStage === stage
                          ? 'border-[#E30613] bg-[#E30613]/10 text-[#E30613] font-semibold'
                          : 'border-gray-200 bg-gray-50 text-gray-800 hover:border-[#E30613]/50'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 03 (COMBINED DESCRIPTION + CONTACT INFO + PHONE NUMBER) */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Project details & Contact info
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Tell us a bit about your challenge and how we can reach you.
                </p>

                <div className="space-y-4 mb-8 max-h-[55vh] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-medium">Project Description / Challenge</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="What's the problem or opportunity you'd like to work on?"
                      className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#E30613] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1.5 font-medium">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E30613] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1.5 font-medium">Company / Brand</label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Company name"
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E30613] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1.5 font-medium">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E30613] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1.5 font-medium">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E30613] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1.5 font-medium">Current Website / LinkedIn (Optional)</label>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://"
                      className="w-full p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:outline-none focus:border-[#E30613] transition-colors"
                    />
                  </div>
                </div>

                {/* Error message */}
                {sendError && (
                  <div className="flex items-start gap-2 mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{sendError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-full bg-[#E30613] text-white font-bold text-sm tracking-wider uppercase hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E30613]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Start the conversation</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Modal Controls Bar */}
            {step < 3 && (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className={`text-xs font-medium tracking-wider uppercase ${
                    step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ← Back
                </button>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-full bg-[#E30613] text-white font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#E30613]/10 border border-[#E30613] text-[#E30613] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-3xl font-bold text-gray-900 mb-3">
              Thank You!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-base leading-relaxed font-light">
              We have received your enquiry. <span className="text-gray-900 font-medium">Our team will contact you shortly.</span>
            </p>
            <button
              onClick={resetForm}
              className="px-8 py-3 rounded-full bg-gray-900 text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#E30613] hover:text-white transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
