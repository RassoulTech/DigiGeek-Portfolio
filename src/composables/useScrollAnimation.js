import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target
          const anim = el.dataset.anim || 'fade'

          if (anim === 'fade')  el.classList.add('section-fade-in')
          if (anim === 'left')  el.classList.add('section-slide-left')
          if (anim === 'right') el.classList.add('section-slide-right')

          el.classList.remove('section-hidden')
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('[data-anim]').forEach(el => {
      el.classList.add('section-hidden')
      observer.observe(el)
    })
  })

  onUnmounted(() => observer?.disconnect())
}