<script setup lang="ts">
import GradesManager from '../components/GradesManager.vue';
</script>

<template>
  <div class="grades-view">
    <header class="view-header">
      <h1>Gestion des Notes</h1>
      <p>Suivez les performances de vos élèves avec cet outil de notation simple et efficace.</p>
    </header>

    <GradesManager />
  </div>
</template>

<style scoped>
.grades-view {
  animation: fadeIn 0.5s ease-out;
}

.view-header {
  margin-bottom: 3rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

p {
  color: #636e72;
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  h1 {
    font-size: 2rem;
  }
}
</style>
