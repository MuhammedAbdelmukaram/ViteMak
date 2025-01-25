import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "How does the Scale Stream Agency model work?",
    answer: "Scale Stream Agency connects individuals with payment processing accounts to high-performing brands that require processing solutions. As an account owner, you act as a trusted intermediary for transactions, receiving all payments directly to your bank account. You keep 10% of the daily revenue while sending the remaining 90% back to us. This allows you to benefit from the revenue streams of brands generating $10,000 to $20,000 daily, without any upfront investment or inventory management responsibilities."
  },
  {
    question: "How much money can I make as an account owner?",
    answer: "As an account owner, you earn 10% of the daily revenue processed through your account. With brands averaging $10,000 to $20,000 in daily sales, your earnings can range from $1,000 to $2,000 per day. This translates to $30,000 to $60,000 monthly, depending on volume. Your income grows as the brands you support scale their operations, providing a lucrative opportunity for reliable partners."
  },
  {
    question: "What security measures are in place?",
    answer: "We employ enterprise-grade security protocols and advanced encryption to protect all transactions. Our platform is built on secure infrastructure with continuous monitoring and automated risk assessment systems."
  },
  {
    question: "What payment processors do you work with?",
    answer: "We integrate seamlessly with major processors including Stripe, PayPal, Square, and Authorize.net. Our platform is designed to work with most mainstream payment processing systems."
  },
  {
    question: "Is this compliant with regulations?",
    answer: "Yes, our model operates within all regulatory frameworks and maintains full compliance with payment industry standards. We work closely with payment processors to ensure all transactions meet security and compliance requirements."
  },
  {
    question: "What's the minimum processing history needed?",
    answer: "We typically look for accounts with at least 6 months of processing history and good standing. However, we evaluate each partnership opportunity individually based on various qualifying factors."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section className="py-12 sm:py-24 px-3 sm:px-8 border-b border-white/10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display mb-4 sm:mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto font-serif">
            Learn more about our revolutionary payment processing model
          </p>
        </motion.div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 rounded-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <div className="relative">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-4 sm:p-6 text-left bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center gap-3">
                      <h3 className="font-display text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openIndex === index ? (
                          <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        ) : (
                          <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        )}
                      </div>
                    </div>
                    {openIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 text-gray-300 font-serif text-sm sm:text-base leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}