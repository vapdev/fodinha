<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Stats from './components/Stats.vue'
import Mesa from './components/Mesa.vue';
import Match from './components/Match.vue';
</script>

<template>
  <div class="flex">
    <Mesa />
    <Stats class="w-[25%]" />
  </div>
</template>

<style scoped></style>
