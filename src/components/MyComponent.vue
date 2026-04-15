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
    helloWorld(){
      console.log("Hello World");
    },
  },

};

</script>

<template>
  <button @click="helloWorld">Hello World !</button>
  <div @:click.once="helloWorld" class="box"></div>
</template>

<style scoped>

.box{
  width: 300px;
  height: 300px;
  background: salmon;
}


</style>
