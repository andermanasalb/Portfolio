"use client"

import { motion } from "framer-motion";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 80,
      mass: 1,
    },
  },
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full overflow-x-hidden">
      <Hero />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="w-full"
      >
        <motion.div variants={itemVariants}><About /></motion.div>
        <div className="section-separator mx-auto max-w-7xl w-full px-4" />
        <motion.div variants={itemVariants}><Experience /></motion.div>
        <div className="section-separator mx-auto max-w-7xl w-full px-4" />
        <motion.div variants={itemVariants}><Skills /></motion.div>
        <div className="section-separator mx-auto max-w-7xl w-full px-4" />
        <motion.div variants={itemVariants}><Projects /></motion.div>
      </motion.div>
      <Footer />
      <Navigation />
    </main>
  );
}
