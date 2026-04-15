<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div class="app-shell">
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --primary-color: #42b983;
  --secondary-color: #35495e;
  --bg-color: #f8fafc;
  --text-color: #2c3e50;
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: var(--font-family),serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  box-sizing: border-box;
}

@media (max-width: 640px) {
  .main-content {
    padding: 0 1rem 2rem;
  }
}
</style>
