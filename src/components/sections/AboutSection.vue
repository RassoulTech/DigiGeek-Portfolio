<!-- Section À propos : argumentaire de vente, met en avant l'expertise et rassure le client potentiel avant le devis -->
<template>
  <section id="about" class="py-32 px-6 overflow-hidden" style="background: #070d1f;">
    <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

      <div data-anim="left">
        <p class="text-sm tracking-[0.4em] uppercase mb-3"
          style="color: #60a5fa; font-family: 'Inter', sans-serif;">À propos</p>
        <h2 class="text-4xl md:text-5xl font-black mb-6"
          style="font-family: 'Orbitron', sans-serif; color: #fff;">
          Qui suis-je ?
        </h2>
        <p class="mb-4 leading-relaxed"
          style="color: rgba(255,255,255,0.6); font-family: 'Inter', sans-serif;">
          Je suis un développeur web freelance passionné par la création d'interfaces modernes et performantes.
          Sous la marque <span style="color:#60a5fa; font-weight:700;">Digi</span><span style="color:#fff; font-weight:700;">Geek</span>, je propose
          mes services en développement frontend et fullstack.
        </p>
        <p class="leading-relaxed"
          style="color: rgba(255,255,255,0.6); font-family: 'Inter', sans-serif;">
          J'aime transformer des idées en produits digitaux concrets, avec une attention particulière
          au design et à l'expérience utilisateur.
        </p>

        <!-- Chiffres clés : preuves sociales utilisées comme leviers commerciaux pour crédibiliser l'offre -->
        <div class="flex gap-4 md:gap-8 mt-10">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-3xl font-black gradient-text" style="font-family: 'Orbitron', sans-serif;">
              {{ stat.value }}
            </p>
            <p class="text-xs mt-1" style="color: rgba(255,255,255,0.4); font-family: 'Inter', sans-serif;">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-anim="right">
        <div v-for="tech in stack" :key="tech.name"
          class="glass-card p-4 rounded-xl flex items-center gap-3">
          <span v-html="tech.icon" class="w-6 h-6 inline-block"></span>
          <span class="font-medium" style="color: rgba(255,255,255,0.8); font-family: 'Inter', sans-serif;">
            {{ tech.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '../../composables/useScrollAnimation'
useScrollAnimation()

const stats = [
  { value: '3+',  label: "Ans d'expérience" },
  { value: '20+', label: 'Projets réalisés' },
  { value: '10+', label: 'Clients satisfaits' },
]
const stack = [
  { name: 'Vue.js',       icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-full h-full"><path d="M12 12.76l5.05-2.71L12 7.34l-5.05 2.71L12 12.76zm0 4.95l-5.05-2.71L2.83 12l4.12-2.99L12 6.3l5.05 2.71L21.17 12l-4.12 2.99L12 17.71z" fill="#4FC08D"/><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#35495E"/></svg>' },
  { name: 'PHP',          icon: '🐘' },
  { name: 'Supabase',     icon: '🔥' },
  { name: 'Tailwind CSS', icon: '<div style="display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; background: white; border-radius: 4px; padding: 2px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 33" class="w-full h-full"><g clip-path="url(#prefix__clip0_1_2)"><path fill="#06b6d4" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.46 33.808 16.5 40.5 16.5c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.04 33.692 0 27 0zM13.5 16.5c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C17.244 29.96 20.308 33 27 33c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45-4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.54 20.192 16.5 13.5 16.5z" clip-rule="evenodd"/></g><defs><clipPath id="prefix__clip0_1_2"><path fill="#fff" d="M0 0h54v33H0z"/></clipPath></defs></svg></div>' },
]
</script>