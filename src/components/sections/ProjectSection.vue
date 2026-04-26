<template>
  <section id="projects" class="py-32 px-6" style="background: #070d1f;">
    <div class="max-w-6xl mx-auto">
      <p class="text-sm tracking-[0.4em] uppercase mb-3 text-center"
        style="color: #60a5fa; font-family: 'Inter', sans-serif;">Portfolio</p>
      <h2 class="text-4xl md:text-5xl font-black mb-16 text-center"
        style="font-family: 'Orbitron', sans-serif; color: #fff;">
        Mes Projets
      </h2>

      <div v-if="loading" class="text-center py-20"
        style="color: rgba(255,255,255,0.4); font-family: 'Inter', sans-serif;">
        Chargement...
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-anim="fade">
        <div v-for="project in projects" :key="project.id"
          class="glass-card rounded-2xl overflow-hidden group">

          <div class="h-48 overflow-hidden relative"
            style="background: linear-gradient(135deg, rgba(29,78,216,0.1), rgba(96,165,250,0.05));">
            <img v-if="project.image_url" :src="project.image_url" :alt="project.title"
              class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-6xl opacity-20">💻</span>
            </div>
            <div class="absolute inset-0"
              style="background: linear-gradient(to top, rgba(5,10,25,0.8), transparent);"></div>
          </div>

          <div class="p-6">
            <h3 v-html="project.title" class="text-lg font-bold mb-2"
              style="color: #fff; font-family: 'Orbitron', sans-serif;">
            </h3>
            <p class="text-sm mb-4 leading-relaxed"
              style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-2 mb-5">
              <span v-for="tag in project.tags" :key="tag"
                class="text-xs px-3 py-1 rounded-full"
                style="background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.25);
                       color: #60a5fa; font-family: 'Inter', sans-serif;">
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3">
              <a v-if="project.demo_url" :href="project.demo_url" target="_blank"
                class="text-sm px-4 py-2 rounded-full font-semibold neon-btn">Démo ↗</a>
              <a v-if="project.github_url" :href="project.github_url" target="_blank"
                class="text-sm px-4 py-2 rounded-full font-semibold ghost-btn">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
useScrollAnimation()

const projects = ref([])
const loading  = ref(true)

onMounted(async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order')

  if (error) console.error('Erreur projects:', error)
  else projects.value = data.map(p => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : 
          typeof p.tags === 'string' ? p.tags.replace(/[{}]/g, '').split(',').map(t => t.trim()) : []
  }))
  loading.value = false
})
</script>