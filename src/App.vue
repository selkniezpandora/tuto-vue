<script setup lang="ts">
import MyComponent from "./components/MyComponent.vue";
import TodoList from "./components/TodoList.vue";
import RegistrationForm from "./components/RegistrationForm.vue";
</script>

<template>
  <div class="app-wrapper">
    <header>
      <h1>Mon Application Vue</h1>
    </header>
    <main>
      <div class="components-grid">
        <MyComponent />
        <TodoList />
        <RegistrationForm />
      </div>
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.app-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  text-align: center;
  margin-bottom: 3rem;
}

header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 700;
}

.components-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .components-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    align-items: start;
    justify-content: center;
  }
}
</style>
