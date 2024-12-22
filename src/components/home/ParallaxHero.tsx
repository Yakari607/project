import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../ui/AnimatedButton';

const ParallaxHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-medium text-white mb-6 leading-tight"
            >
              Rédigez des emails parfaits en quelques secondes
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 mb-12 leading-relaxed"
            >
              EmailEase utilise l'intelligence artificielle pour vous aider à rédiger
              des emails professionnels et percutants, adaptés à chaque situation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link to="/generator">
                <AnimatedButton icon={<ArrowRight className="w-5 h-5" />}>
                  Essayer gratuitement
                </AnimatedButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, 250]) }}
        className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-[-1]"
      />
    </div>
  );
};

export default ParallaxHero;