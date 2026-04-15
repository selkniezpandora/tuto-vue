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
    add(){
      this.counter++;
    },

    less(){
      this.counter--;
    },
    position(e: { clientX: number; clientY: number; }){
      this.x = e.clientX;
      this.y = e.clientY;
    }

  },

};

</script>

<template>

  <p>Compteur : {{counter}} </p>
  <button @click="add">+</button>
  <button @click="less">-</button>

  <p>Position : {{ x }}, {{ y }}</p>
  <div class="box" @mousemove="position"></div>
</template>

<style scoped>

.box{
  width: 300px;
  height: 300px;
  background: salmon;
}


</style>
