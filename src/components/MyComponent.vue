<script setup lang="ts">
import { ref } from 'vue';

const name = ref('Samy');
const age = ref(20);


function incrementAge() {
    age.value++;
}

</script>

<template>
<h2>Coucou !</h2>
  {{ name }} a {{ incrementAge() }} ans.
</template>

<style scoped>

</style>
