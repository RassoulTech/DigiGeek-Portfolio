<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
    style="background: rgba(5,10,25,0.85); backdrop-filter: blur(20px);
           border-bottom: 1px solid rgba(59,130,246,0.15);">

    <span class="text-xl font-black tracking-widest gradient-text"
      style="font-family: 'Orbitron', sans-serif;">
      <span style="color: #60a5fa;">Digi</span><span style="color: #fff;">Geek</span>
    </span>

    <ul class="flex gap-8 text-sm tracking-widest uppercase items-center">
      <li v-for="link in links" :key="link.href">
        <a :href="link.href" class="nav-link" style="font-family: 'Inter', sans-serif;">
          {{ link.label }}
        </a>
      </li>
      <!-- Bouton Admin -->
      <li v-if="isAdmin">
        <RouterLink to="/admin"
          class="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase neon-btn"
          style="font-family: 'Orbitron', sans-serif;">
          Admin
        </RouterLink>
      </li>
      <li v-else>
        <RouterLink to="/login"
          class="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase ghost-btn"
          style="font-family: 'Orbitron', sans-serif;">
          Connexion
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../../lib/supabase'

const links = [
  { label: 'Accueil',      href: '#hero' },
  { label: 'À propos',    href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets',     href: '#projects' },
  { label: 'Contact',     href: '#contact' },
]

const isAdmin = ref(false)

onMounted(async () => {
  const { data: { session } } = await supabase.auth.getSession()
  isAdmin.value = !!session

  supabase.auth.onAuthStateChange((_event, session) => {
    isAdmin.value = !!session
  })
})
</script>

<style scoped>
.nav-link {
  color: rgba(255,255,255,0.5);
  position: relative;
  transition: color 0.3s ease;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 0; height: 2px;
  background: linear-gradient(90deg, #1d4ed8, #60a5fa);
  transition: width 0.3s ease;
  border-radius: 2px;
}
.nav-link:hover { color: #60a5fa; }
.nav-link:hover::after { width: 100%; }
</style>