<!-- Section Contact : étape finale du tunnel de vente, déclenche la prise de contact et la signature du devis -->
<template>
  <section id="contact" class="py-32 px-6" style="background: #050a19;">
    <div class="max-w-2xl mx-auto">
      <p class="text-sm tracking-[0.4em] uppercase mb-3 text-center"
        style="color: #60a5fa; font-family: 'Inter', sans-serif;">Contact</p>
      <h2 class="text-4xl md:text-5xl font-black mb-4 text-center"
        style="font-family: 'Orbitron', sans-serif; color: #fff;">
        Travaillons ensemble
      </h2>
      <p class="text-center mb-12"
        style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">
        Un projet en tête ? Écris-moi directement.
      </p>

      <div class="glass-card rounded-2xl p-8" data-anim="fade">
        <div class="flex flex-col gap-5">

          <div>
            <label class="block text-sm mb-2"
              style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">Nom</label>
            <input v-model="form.name" type="text" placeholder="Ton nom"
              class="input-field w-full px-4 py-3 rounded-xl" />
          </div>

          <div>
            <label class="block text-sm mb-2"
              style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">Email</label>
            <input v-model="form.email" type="email" placeholder="ton@email.com"
              class="input-field w-full px-4 py-3 rounded-xl" />
          </div>

          <div>
            <label class="block text-sm mb-2"
              style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">Message</label>
            <textarea v-model="form.message" rows="5" placeholder="Ton message..."
              class="input-field w-full px-4 py-3 rounded-xl resize-none"></textarea>
          </div>

          <button @click="sendMessage" :disabled="sending"
            class="w-full py-4 rounded-xl font-bold tracking-widest uppercase text-sm neon-btn"
            style="font-family: 'Orbitron', sans-serif;">
            {{ sending ? 'Envoi en cours...' : 'Envoyer le message ✉️' }}
          </button>

          <p v-if="success" class="text-center text-sm gradient-text font-bold">
            ✅ Message envoyé avec succès !
          </p>
          <p v-if="error" class="text-center text-sm" style="color: #f87171;">
            ❌ Une erreur est survenue. Réessaie.
          </p>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'
import { useScrollAnimation } from '../../composables/useScrollAnimation'
useScrollAnimation()

const form    = ref({ name: '', email: '', message: '' })
const sending = ref(false)
const success = ref(false)
const error   = ref(false)

const fields = [
  { key: 'name',    label: 'Nom',     type: 'text',     placeholder: 'Ton nom' },
  { key: 'email',   label: 'Email',   type: 'email',    placeholder: 'ton@email.com' },
  { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Ton message...' },
]

// Envoi du message : transforme la demande entrante en lead commercial qualifié
const sendMessage = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    error.value = true
    return
  }

  sending.value = true
  success.value = false
  error.value   = false

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name:  form.value.name,
        from_email: form.value.email,
        message:    form.value.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    success.value = true
    form.value = { name: '', email: '', message: '' }
  } catch (e) {
    console.error('EmailJS error:', e)
    error.value = true
  } finally {
    sending.value = false
  }
}
</script>