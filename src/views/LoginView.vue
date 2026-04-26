<template>
  <div class="min-h-screen flex items-center justify-center px-6" style="background: #050a19;">
    <div class="glass-card rounded-2xl p-8 w-full max-w-md">
      <h1 class="text-2xl font-black mb-2 gradient-text text-center"
        style="font-family: 'Orbitron', sans-serif;">DigiGeek</h1>
      <p class="text-center mb-8 text-sm" style="color: rgba(255,255,255,0.4); font-family: 'Inter', sans-serif;">
        Accès administration
      </p>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm mb-2" style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">Email</label>
          <input v-model="email" type="email" placeholder="admin@email.com"
            class="input-field w-full px-4 py-3 rounded-xl" />
        </div>
        <div>
          <label class="block text-sm mb-2" style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">Mot de passe</label>
          <input v-model="password" type="password" placeholder="••••••••"
            class="input-field w-full px-4 py-3 rounded-xl"
            @keyup.enter="login" />
        </div>

        <button @click="login" :disabled="loading"
          class="w-full py-3 rounded-xl font-bold tracking-widest uppercase text-sm neon-btn mt-2"
          style="font-family: 'Orbitron', sans-serif;">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>

        <p v-if="error" class="text-center text-sm" style="color: #f87171;">
          ❌ {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const email    = ref('')
const password = ref('')
const loading  = ref(false)
const error    = ref('')
const router   = useRouter()

const login = async () => {
  loading.value = true
  error.value   = ''

  const { error: err } = await supabase.auth.signInWithPassword({
    email:    email.value,
    password: password.value,
  })

  if (err) {
    error.value = 'Email ou mot de passe incorrect'
  } else {
    router.push('/admin')
  }
  loading.value = false
}
</script>