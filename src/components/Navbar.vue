<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar">
    <div class="nav-content">
      <RouterLink to="/" class="nav-logo">
        <span class="logo-icon">⚡</span>
        <span class="logo-text">TutoVue</span>
      </RouterLink>

      <div class="nav-links">
        <RouterLink to="/" class="nav-item" active-class="active">Accueil</RouterLink>
        <RouterLink to="/todo" class="nav-item" active-class="active">Todo List</RouterLink>
        <RouterLink to="/counter" class="nav-item" active-class="active">Compteur</RouterLink>
        <RouterLink to="/register" class="nav-item nav-btn" active-class="active-btn">S'inscrire</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.75rem 0;
  margin-bottom: 2rem;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.5rem;
  color: #2c3e50;
}

.logo-icon {
  font-size: 1.75rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: #636e72;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.nav-item:hover {
  color: #42b983;
}

.nav-btn {
  background-color: #42b983;
  color: white !important;
  padding: 8px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.2);
}

.nav-btn:hover {
  background-color: #3aa876;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .nav-links {
    gap: 1rem;
  }
  .nav-item:not(.nav-btn) {
    display: none;
  }
}
</style>
