<script setup lang="ts">
import AuftragsListe from '../components/AuftragsListe.vue'
</script>

<template>
  <RouterLink to="/" class="zurueck-link">
    Zur Startseite
  </RouterLink>

  <AuftragsListe />
</template>

<style scoped>
.zurueck-link {
  display: inline-block;
  margin-bottom: 24px;
  color: #345b88;
}
</style>