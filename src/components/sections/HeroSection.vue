<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden"
    style="background: #050a19;">

    <!-- Blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <!-- Grid -->
    <div class="absolute inset-0 pointer-events-none" style="
      background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
      background-size: 60px 60px;">
    </div>

    <!-- Content -->
    <div class="relative z-10 text-center px-6">
      <p class="text-sm tracking-[0.5em] uppercase mb-6"
        style="color: #60a5fa; font-family: 'Inter', sans-serif;">
        Développeur Web Freelance & Designer
      </p>
      <h1 class="text-6xl md:text-7xl font-black mb-6 leading-none"
        style="font-family: 'Orbitron', sans-serif;">
        <p  style="color: #fff;">Mouhemed DIONE</p>
      </h1>
      <p class="text-lg md:text-xl max-w-2xl mx-auto mb-12"
        style="color: rgba(255,255,255,0.5); font-family: 'Inter', sans-serif;">
        En tant que développeur web freelance, je conçois des expériences web modernes, rapides et mémorables.
      </p>
      <div class="flex gap-4 justify-center flex-wrap">
        <a href="#projects" class="px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm neon-btn">
          Voir mes projets
        </a>
        <a href="#contact" class="px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm ghost-btn">
          Me contacter
        </a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2">
      <div class="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2"
        style="border-color: rgba(59,130,246,0.4);">
        <div class="w-1 h-2 rounded-full" style="background:#3b82f6; animation: scrollDot 2s infinite;"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
}
.blob-1 {
  width: 600px; height: 600px;
  background: linear-gradient(135deg, #1d4ed8, #3b82f6);
  top: -150px; left: -150px;
  animation: float 10s ease-in-out infinite;
}
.blob-2 {
  width: 500px; height: 500px;
  background: linear-gradient(135deg, #1e40af, #60a5fa);
  bottom: -100px; right: -100px;
  animation: float 12s ease-in-out infinite reverse;
}
@keyframes scrollDot {
  0%   { transform: translateY(0);   opacity: 1; }
  100% { transform: translateY(12px); opacity: 0; }
}
</style>