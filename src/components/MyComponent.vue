<script lang="ts">

export default {
  name: "MyComponent",
  data() {
    return {
      name: "Jean",
    };
  },
  methods: {
    calc(a: number, b: number): number {
      return a + b;
    },
    func() {
      return this.name.toUpperCase();
    }
  },

};

</script>

<template>
<h2>Coucou !</h2>
  {{ name }} a {{ calc(20, 5) }} ans.
  {{ func() }}

</template>

<style scoped>

</style>
