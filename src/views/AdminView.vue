<template>
  <div class="min-h-screen px-6 py-16" style="background: #050a19;">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="flex items-center justify-between mb-12">
        <h1 class="text-3xl font-black gradient-text"
          style="font-family: 'Orbitron', sans-serif;">
          Admin — DigiGeek
        </h1>
        <div class="flex gap-3">
          <a href="/" class="ghost-btn px-5 py-2 rounded-full text-sm font-semibold">
            ← Retour au site
          </a>
          <button @click="logout" class="px-5 py-2 rounded-full text-sm font-semibold transition-all"
            style="border: 1px solid rgba(248,113,113,0.4); color: #f87171;">
            Déconnexion
          </button>
        </div>
      </div>
            

      <!-- Tabs -->
      <div class="flex gap-4 mb-10">
        <button v-for="tab in tabs" :key="tab.key"
          @click="activeTab = tab.key"
          class="px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase transition-all"
          :class="activeTab === tab.key ? 'neon-btn' : 'ghost-btn'"
          style="font-family: 'Orbitron', sans-serif;">
          {{ tab.label }}
        </button>
      </div>

      <!-- ===== PROJETS ===== -->
      <div v-if="activeTab === 'projects'">
        <div class="glass-card rounded-2xl p-6 mb-8">
          <h2 class="text-lg font-black mb-6" style="color: #fff; font-family: 'Orbitron', sans-serif;">
            {{ editingProject ? 'Modifier le projet' : 'Ajouter un projet' }}
          </h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="label">Titre</label>
              <input v-model="projectForm.title" class="input-field w-full px-4 py-3 rounded-xl" placeholder="Titre du projet" />
            </div>
            <div>
              <label class="label">Image URL</label>
              <input v-model="projectForm.image_url" class="input-field w-full px-4 py-3 rounded-xl" placeholder="https://..." />
            </div>
            <div>
              <label class="label">Démo URL</label>
              <input v-model="projectForm.demo_url" class="input-field w-full px-4 py-3 rounded-xl" placeholder="https://..." />
            </div>
            <div>
              <label class="label">GitHub URL</label>
              <input v-model="projectForm.github_url" class="input-field w-full px-4 py-3 rounded-xl" placeholder="https://github.com/..." />
            </div>
            <div>
              <label class="label">Tags (séparés par des virgules)</label>
              <input v-model="projectForm.tagsRaw" class="input-field w-full px-4 py-3 rounded-xl" placeholder="Vue.js, Vite, Firebase" />
            </div>
            <div>
              <label class="label">Ordre d'affichage</label>
              <input v-model.number="projectForm.order" type="number" class="input-field w-full px-4 py-3 rounded-xl" placeholder="1" />
            </div>
            <div class="md:col-span-2">
              <label class="label">Description</label>
              <textarea v-model="projectForm.description" rows="3" class="input-field w-full px-4 py-3 rounded-xl resize-none" placeholder="Description du projet..."></textarea>
            </div>
          </div>
          <div class="flex gap-3 mt-6">
            <button @click="saveProject" class="neon-btn px-6 py-3 rounded-xl font-bold text-sm"
              style="font-family: 'Orbitron', sans-serif;">
              {{ editingProject ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button v-if="editingProject" @click="cancelProjectEdit" class="ghost-btn px-6 py-3 rounded-xl font-bold text-sm">
              Annuler
            </button>
          </div>
        </div>

        <!-- Liste projets -->
        <div class="flex flex-col gap-4">
          <div v-for="project in projects" :key="project.id"
            class="glass-card rounded-xl p-5 flex items-center justify-between">
            <div>
              <p class="font-bold" style="color: #fff; font-family: 'Orbitron', sans-serif;">{{ project.title }}</p>
              <p class="text-sm mt-1" style="color: rgba(255,255,255,0.4); font-family: 'Inter', sans-serif;">{{ project.description }}</p>
            </div>
            <div class="flex gap-3">
              <button @click="editProject(project)" class="ghost-btn px-4 py-2 rounded-lg text-sm font-semibold">✏️ Modifier</button>
              <button @click="deleteProject(project.id)" class="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style="border: 1px solid rgba(248,113,113,0.4); color: #f87171;">🗑️ Supprimer</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== COMPÉTENCES ===== -->
      <div v-if="activeTab === 'skills'">
        <div class="glass-card rounded-2xl p-6 mb-8">
          <h2 class="text-lg font-black mb-6" style="color: #fff; font-family: 'Orbitron', sans-serif;">
            {{ editingSkill ? 'Modifier la compétence' : 'Ajouter une compétence' }}
          </h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div>
              <label class="label">Nom</label>
              <input v-model="skillForm.name" class="input-field w-full px-4 py-3 rounded-xl" placeholder="Vue.js" />
            </div>
            <div>
              <label class="label">Icône (emoji)</label>
              <input v-model="skillForm.icon" class="input-field w-full px-4 py-3 rounded-xl" placeholder="💚" />
            </div>
            <div>
              <label class="label">Niveau (0-100)</label>
              <input v-model.number="skillForm.level" type="number" min="0" max="100"
                class="input-field w-full px-4 py-3 rounded-xl" placeholder="85" />
            </div>
            <div>
              <label class="label">Ordre</label>
              <input v-model.number="skillForm.order" type="number"
                class="input-field w-full px-4 py-3 rounded-xl" placeholder="1" />
            </div>
          </div>

          <!-- Preview barre -->
          <div class="mt-4" v-if="skillForm.name">
            <p class="text-xs mb-2" style="color: rgba(255,255,255,0.4); font-family: 'Inter', sans-serif;">Aperçu :</p>
            <div class="flex justify-between mb-1">
              <span style="color: #fff; font-family: 'Inter', sans-serif;">{{ skillForm.icon }} {{ skillForm.name }}</span>
              <span class="gradient-text font-bold" style="font-family: 'Orbitron', sans-serif;">{{ skillForm.level }}%</span>
            </div>
            <div class="w-full h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.07);">
              <div class="h-full rounded-full transition-all duration-500"
                :style="{ width: skillForm.level + '%', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #fff)' }">
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button @click="saveSkill" class="neon-btn px-6 py-3 rounded-xl font-bold text-sm"
              style="font-family: 'Orbitron', sans-serif;">
              {{ editingSkill ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button v-if="editingSkill" @click="cancelSkillEdit" class="ghost-btn px-6 py-3 rounded-xl font-bold text-sm">
              Annuler
            </button>
          </div>
        </div>

        <!-- Liste compétences -->
        <div class="grid md:grid-cols-2 gap-4">
          <div v-for="skill in skills" :key="skill.id"
            class="glass-card rounded-xl p-5">
            <div class="flex items-center justify-between mb-3">
              <span class="font-bold" style="color: #fff; font-family: 'Inter', sans-serif;">
                {{ skill.icon }} {{ skill.name }}
              </span>
              <div class="flex gap-2">
                <button @click="editSkill(skill)" class="ghost-btn px-3 py-1 rounded-lg text-xs font-semibold">✏️</button>
                <button @click="deleteSkill(skill.id)"
                  class="px-3 py-1 rounded-lg text-xs font-semibold transition-all"
                  style="border: 1px solid rgba(248,113,113,0.4); color: #f87171;">🗑️</button>
              </div>
            </div>
            <div class="flex justify-between mb-1">
              <span class="text-xs" style="color: rgba(255,255,255,0.4);">Niveau</span>
              <span class="text-xs gradient-text font-bold">{{ skill.level }}%</span>
            </div>
            <div class="w-full h-2 rounded-full overflow-hidden" style="background: rgba(255,255,255,0.07);">
              <div class="h-full rounded-full"
                :style="{ width: skill.level + '%', background: 'linear-gradient(90deg, #1d4ed8, #3b82f6, #fff)' }">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

import { useRouter } from 'vue-router'
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}

const activeTab = ref('projects')
const tabs = [
  { key: 'projects', label: 'Projets' },
  { key: 'skills',   label: 'Compétences' },
]

// ===== PROJETS =====
const projects       = ref([])
const editingProject = ref(null)
const projectForm    = ref({
  title: '', description: '', image_url: '',
  demo_url: '', github_url: '', tagsRaw: '', order: 1
})

const loadProjects = async () => {
  const { data } = await supabase.from('projects').select('*').order('order')
  projects.value = data || []
}

const saveProject = async () => {
  const data = {
    title:       projectForm.value.title,
    description: projectForm.value.description,
    image_url:   projectForm.value.image_url,
    demo_url:    projectForm.value.demo_url,
    github_url:  projectForm.value.github_url,
    tags:        projectForm.value.tagsRaw.split(',').map(t => t.trim()).filter(Boolean),
    order:       projectForm.value.order,
  }
  if (editingProject.value) {
    await supabase.from('projects').update(data).eq('id', editingProject.value)
  } else {
    await supabase.from('projects').insert(data)
  }
  cancelProjectEdit()
  await loadProjects()
}

const editProject = (project) => {
  editingProject.value = project.id
  projectForm.value = {
    title:       project.title,
    description: project.description,
    image_url:   project.image_url  || '',
    demo_url:    project.demo_url   || '',
    github_url:  project.github_url || '',
    tagsRaw:     Array.isArray(project.tags) ? project.tags.join(', ') : '',
    order:       project.order,
  }
}

const cancelProjectEdit = () => {
  editingProject.value = null
  projectForm.value = { title: '', description: '', image_url: '', demo_url: '', github_url: '', tagsRaw: '', order: 1 }
}

const deleteProject = async (id) => {
  if (confirm('Supprimer ce projet ?')) {
    await supabase.from('projects').delete().eq('id', id)
    await loadProjects()
  }
}

// ===== COMPÉTENCES =====
const skills       = ref([])
const editingSkill = ref(null)
const skillForm    = ref({ name: '', icon: '', level: 80, order: 1 })

const loadSkills = async () => {
  const { data } = await supabase.from('skills').select('*').order('order')
  skills.value = data || []
}

const saveSkill = async () => {
  const data = {
    name:  skillForm.value.name,
    icon:  skillForm.value.icon,
    level: skillForm.value.level,
    order: skillForm.value.order,
  }
  if (editingSkill.value) {
    await supabase.from('skills').update(data).eq('id', editingSkill.value)
  } else {
    await supabase.from('skills').insert(data)
  }
  cancelSkillEdit()
  await loadSkills()
}

const editSkill = (skill) => {
  editingSkill.value = skill.id
  skillForm.value = { name: skill.name, icon: skill.icon, level: skill.level, order: skill.order }
}

const cancelSkillEdit = () => {
  editingSkill.value = null
  skillForm.value = { name: '', icon: '', level: 80, order: 1 }
}

const deleteSkill = async (id) => {
  if (confirm('Supprimer cette compétence ?')) {
    await supabase.from('skills').delete().eq('id', id)
    await loadSkills()
  }
}

onMounted(() => {
  loadProjects()
  loadSkills()
})
</script>

<style scoped>
.label {
  display: block;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: rgba(255,255,255,0.5);
  font-family: 'Inter', sans-serif;
}
</style>