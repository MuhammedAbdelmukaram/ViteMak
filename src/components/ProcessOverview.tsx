import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Zap } from 'lucide-react';

const steps = [
  {
    icon: Shield,
    title: "Vetting Process",
    description: "Advanced account verification using quantum-secure protocols and AI-driven risk assessment",
    details: [
      "Volume Requirements",
      "Country Compliance",
      "Payment Speed"
    ]
  },
  {
    icon: Users,
    title: "Personal Onboarding",
    description: "Direct integration with our quantum network through secure virtual sessions",
    details: [
      "Process Overview",
      "Access Granting",
      "Contract Signing"
    ]
  },
  {
    icon: Zap,
    title: "Account Integration",
    description: "Seamless connection to our distributed payment processing network",
    details: [
      "Dedicated Support",
      "Legally Binding Agreements",
      "Revenue Sharing Model"
    ]
  }
];

export function ProcessOverview() {
  return (
    <section className="py-24 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-display mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400">
              The Process
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group h-full"
            >
              {/* Enhanced quantum field effect with multiple layers */}
              <motion.div
                className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                  opacity: [0, 0.15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 via-fuchsia-500/20 to-rose-400/30 rounded-2xl blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 via-cyan-400/20 to-teal-300/30 rounded-2xl blur-xl" />
              </motion.div>

              {/* Animated border glow */}
              <motion.div
                className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
                    'linear-gradient(45deg, rgba(56, 189, 248, 0.3), rgba(139, 92, 246, 0.3))',
                    'linear-gradient(45deg, rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))'
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="relative flex flex-col h-full p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
                {/* Icon with enhanced glow effect */}
                <motion.div
                  className="relative w-12 h-12 mx-auto mb-6 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    animate={{
                      background: [
                        'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))',
                        'radial-gradient(circle, rgba(56, 189, 248, 0.5), rgba(139, 92, 246, 0.5))',
                        'radial-gradient(circle, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5))'
                      ],
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div className="relative bg-black/50 rounded-full p-3 backdrop-blur-sm border border-white/10">
                    <step.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </motion.div>

                <motion.h3
                  className="text-xl font-display mb-4 text-center bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 text-transparent bg-clip-text flex-shrink-0"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% auto",
                  }}
                >
                  {step.title}
                </motion.h3>

                <p className="text-gray-400 text-sm mb-6 text-center font-serif h-[48px] flex items-center justify-center">
                  {step.description}
                </p>

                <div className="space-y-3 mt-auto">
                  {step.details.map((detail, i) => (
                    <motion.div
                      key={detail}
                      className="relative group/item"
                      whileHover={{ x: 10 }}
                    >
                      {/* Enhanced detail item glow */}
                      <motion.div
                        className="absolute -inset-2 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                        animate={{
                          background: [
                            'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
                            'linear-gradient(45deg, rgba(56, 189, 248, 0.1), rgba(139, 92, 246, 0.1))',
                            'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))'
                          ]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      <div className="relative flex items-center gap-3 p-2 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 h-[40px]">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                        <span className="text-sm text-gray-300">{detail}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}