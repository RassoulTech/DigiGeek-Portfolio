<template>
  <section id="skills" class="py-32 px-6" style="background: #050a19;">
    <div class="max-w-4xl mx-auto">
      <p class="text-sm tracking-[0.4em] uppercase mb-3 text-center"
        style="color: #60a5fa; font-family: 'Inter', sans-serif;">Expertise</p>
      <h2 class="text-4xl md:text-5xl font-black mb-16 text-center"
        style="font-family: 'Orbitron', sans-serif; color: #fff;">
        Compétences
      </h2>

      <div class="grid md:grid-cols-2 gap-x-16 gap-y-8" data-anim="fade">
        <div v-for="(skill, i) in skills" :key="skill.name">
          <div class="flex justify-between items-center mb-2">
            <span class="flex items-center gap-2 font-semibold"
              style="color: #fff; font-family: 'Inter', sans-serif;">
              <span v-html="skill.icon" class="w-6 h-6 inline-block"></span>
              {{ skill.name }}
            </span>
            <span class="text-sm font-black gradient-text"
              style="font-family: 'Orbitron', sans-serif;">
              {{ animated ? skill.level : 0 }}%
            </span>
          </div>
          <div class="w-full h-2 rounded-full overflow-hidden"
            style="background: rgba(255,255,255,0.07);">
            <div class="h-full rounded-full relative overflow-hidden"
              :style="{
                width: animated ? skill.level + '%' : '0%',
                background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #ffffff)',
                transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`
              }">
              <div class="absolute inset-0 bar-shimmer"></div>
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

const skills   = ref([])
const animated = ref(false)

onMounted(async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('order')

  if (error) console.error('Erreur skills:', error)
  else skills.value = data
  setTimeout(() => { animated.value = true }, 400)
})
</script>

<style scoped>
.bar-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}
</style>