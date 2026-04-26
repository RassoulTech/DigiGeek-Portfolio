<template>
  <footer class="py-10 text-center"
    style="background: #070d1f; border-top: 1px solid rgba(59,130,246,0.1);">
    <p class="text-2xl font-black mb-2"
      style="font-family: 'Orbitron', sans-serif;"><span style="color:#60a5fa;">Digi</span><span style="color:#fff;">Geek</span></p>
    <p class="text-sm" style="color: rgba(255,255,255,0.3); font-family: 'Inter', sans-serif;">
      © {{ year }} <span style="color:#60a5fa;">Digi</span><span style="color:#fff;">Geek</span> — Conçu avec ❤️ et du code propre
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>