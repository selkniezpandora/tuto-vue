<script lang="ts">

export default {
  name: "MyComponent",
  data() {
    return {
      name: "Jean",
      age: 20,
      googleUrl: "https://www.google.com",
      imageUrl: "https://picsum.photos/200/300",
    };
  },
  methods: {
    calc(a: number, b: number): number {
      return a + b;
    },
    nameUppercase() {
      return this.name.toUpperCase();
    }
  },

};

</script>

<template>

  <h2>Coucou !</h2>
  {{ name }} a {{ calc(20, 5) }} ans.
  {{ nameUppercase() }}
  <a :href="googleUrl">Google</a>
  <img :src="imageUrl" alt="Image" />

</template>

<style scoped>

</style>
