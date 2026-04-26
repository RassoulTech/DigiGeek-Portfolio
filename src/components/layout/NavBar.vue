<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
    style="background: rgba(5,10,25,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(59,130,246,0.15);"
  >
    <div class="flex items-center justify-between gap-4">
      <RouterLink
        to="/"
        class="text-lg md:text-xl font-black tracking-[0.25em] md:tracking-widest gradient-text"
        style="font-family: 'Orbitron', sans-serif;"
        @click="closeMenu"
      >
        <span style="color: #60a5fa;">Digi</span><span style="color: #fff;">Geek</span>
      </RouterLink>

      <button
        type="button"
        class="md:hidden w-11 h-11 rounded-full flex items-center justify-center border"
        style="border-color: rgba(96,165,250,0.22); background: rgba(8,15,35,0.65);"
        :aria-expanded="isMenuOpen ? 'true' : 'false'"
        aria-label="Ouvrir le menu"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="menu-icon" :class="{ open: isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <ul class="hidden md:flex gap-8 text-sm tracking-widest uppercase items-center">
        <li v-for="link in links" :key="link.hash">
          <RouterLink :to="link" class="nav-link" style="font-family: 'Inter', sans-serif;">
            {{ link.label }}
          </RouterLink>
        </li>
        <li v-if="isAdmin">
          <RouterLink
            to="/admin"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase neon-btn"
            style="font-family: 'Orbitron', sans-serif;"
          >
            Admin
          </RouterLink>
        </li>
        <li v-else>
          <RouterLink
            to="/login"
            class="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase ghost-btn"
            style="font-family: 'Orbitron', sans-serif;"
          >
            Connexion
          </RouterLink>
        </li>
      </ul>
    </div>

    <transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden mt-4 rounded-2xl p-4 border"
        style="background: rgba(8,15,35,0.92); border-color: rgba(96,165,250,0.14);"
      >
        <ul class="flex flex-col gap-3 text-xs tracking-[0.25em] uppercase">
          <li v-for="link in links" :key="`mobile-${link.hash}`">
            <RouterLink
              :to="link"
              class="nav-link-mobile block px-3 py-3 rounded-xl"
              style="font-family: 'Inter', sans-serif;"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </li>
          <li v-if="isAdmin">
            <RouterLink
              to="/admin"
              class="block px-4 py-3 rounded-xl text-center text-xs font-bold tracking-widest uppercase neon-btn"
              style="font-family: 'Orbitron', sans-serif;"
              @click="closeMenu"
            >
              Admin
            </RouterLink>
          </li>
          <li v-else>
            <RouterLink
              to="/login"
              class="block px-4 py-3 rounded-xl text-center text-xs font-bold tracking-widest uppercase ghost-btn"
              style="font-family: 'Orbitron', sans-serif;"
              @click="closeMenu"
            >
              Connexion
            </RouterLink>
          </li>
        </ul>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../../lib/supabase'

const links = [
  { label: 'Accueil', path: '/', hash: '#hero' },
  { label: 'A propos', path: '/', hash: '#about' },
  { label: 'Competences', path: '/', hash: '#skills' },
  { label: 'Projets', path: '/', hash: '#projects' },
  { label: 'Contact', path: '/', hash: '#contact' },
]

const isAdmin = ref(false)
const isMenuOpen = ref(false)

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
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
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #1d4ed8, #60a5fa);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-link:hover {
  color: #60a5fa;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link-mobile {
  color: rgba(255,255,255,0.75);
  background: rgba(59,130,246,0.04);
  transition: color 0.3s ease, background 0.3s ease;
}

.nav-link-mobile:hover {
  color: #60a5fa;
  background: rgba(59,130,246,0.1);
}

.menu-icon {
  width: 18px;
  height: 14px;
  position: relative;
}

.menu-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 999px;
  background: #fff;
  transition: transform 0.3s ease, opacity 0.3s ease, top 0.3s ease;
}

.menu-icon span:nth-child(1) {
  top: 0;
}

.menu-icon span:nth-child(2) {
  top: 6px;
}

.menu-icon span:nth-child(3) {
  top: 12px;
}

.menu-icon.open span:nth-child(1) {
  top: 6px;
  transform: rotate(45deg);
}

.menu-icon.open span:nth-child(2) {
  opacity: 0;
}

.menu-icon.open span:nth-child(3) {
  top: 6px;
  transform: rotate(-45deg);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
