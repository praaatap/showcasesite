import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "../../hooks/useLenis";
import { GrainOverlay } from "./GrainOverlay";
import { AIStatusBar } from "./AIStatusBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { HomePage } from "../../pages/HomePage";
import { AboutPage } from "../../pages/AboutPage";
import { ProjectsPage } from "../../pages/ProjectsPage";
import { BlogPage } from "../../pages/BlogPage";
import { ContactPage } from "../../pages/ContactPage";

export const Layout = memo(() => {
  useLenis();
  return (
    <>
      <GrainOverlay />
      <AIStatusBar />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/"         element={<PageTransition><HomePage /></PageTransition>} />
          <Route path="/about"    element={<PageTransition><AboutPage /></PageTransition>} />
          <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
          <Route path="/blog"     element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/contact"  element={<PageTransition><ContactPage /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
});