<template>
  <div style="background: #050a19;">
    <NavBar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ContactSection />
    <Footer />
  </div>
</template>

<script setup>
import NavBar          from '../components/layout/NavBar.vue'
import HeroSection     from '../components/sections/HeroSection.vue'
import AboutSection    from '../components/sections/AboutSection.vue'
import SkillsSection   from '../components/sections/SkillsSection.vue'
import ProjectsSection from '../components/sections/ProjectSection.vue'
import ContactSection  from '../components/sections/ContactSection.vue'
import Footer          from '../components/layout/Footer.vue'
</script>