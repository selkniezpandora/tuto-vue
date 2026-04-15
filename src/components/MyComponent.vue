<script lang="ts">

export default {
  name: "MyComponent",
  data() {
    return {
      counter: 0,
      x: 0,
      y: 0,
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      if (this.counter > 0) {
        this.counter--;
      }
    },
    updateCoords(event: MouseEvent) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    }
  },

};

</script>

<template>
  <div class="container">
    <div class="card">
      <h2>Interactivité de base</h2>
      <p class="counter">Compteur: <span>{{ counter }}</span></p>

      <div class="counter-controls">
        <button @click="decrement" class="btn-circle" :disabled="counter <= 0">-</button>
        <button @click="increment" class="btn-circle">+</button>
      </div>

      <div class="box-container">
        <p>Position de la souris (x: {{ x }}, y: {{ y }})</p>
        <div @mousemove="updateCoords" @click.once="increment" class="box">
          Survolez-moi
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  color: #2c3e50;
}

h2 {
  margin-top: 0;
  color: #42b983;
}

.counter {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.counter span {
  font-weight: bold;
  color: #2c3e50;
}

.counter-controls {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 20px;
}

.btn-circle {
  background-color: #42b983;
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(66, 185, 131, 0.3);
}

.btn-circle:hover {
  background-color: #3aa876;
}

.btn-circle:active {
  transform: scale(0.95);
}

.btn-circle:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
  box-shadow: none;
}

.box-container {
  margin-top: 2rem;
}

.box-container p {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.box {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #ffa07a, #ff7f50);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  cursor: crosshair;
  transition: opacity 0.3s;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
}

.box:hover {
  opacity: 0.9;
}
</style>
