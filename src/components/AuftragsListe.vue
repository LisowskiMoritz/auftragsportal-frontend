<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Auftrag {
  id: number
  bezeichnung: string
  status: string
  kundenhinweis: string
}

const auftraege = ref<Auftrag[]>([])
const ladeFehler = ref('')
const laedt = ref(true)

onMounted(async () => {
  try {
    const antwort = await fetch(
        'https://auftragsportal-backend.onrender.com/auftraege',
    )

    if (!antwort.ok) {
      throw new Error('Abruf fehlgeschlagen')
    }

    auftraege.value = await antwort.json()
  } catch {
    ladeFehler.value = 'Die Aufträge konnten nicht geladen werden.'
  } finally {
    laedt.value = false
  }
})
</script>

<template>
  <section>
    <h2>Aufträge</h2>

    <p v-if="laedt">Aufträge werden geladen …</p>
    <p v-else-if="ladeFehler">{{ ladeFehler }}</p>

    <ul v-else>
      <li v-for="auftrag in auftraege" :key="auftrag.id">
        <h3>{{ auftrag.bezeichnung }}</h3>
        <p>Status: {{ auftrag.status }}</p>
        <p>{{ auftrag.kundenhinweis }}</p>
      </li>
    </ul>
  </section>
</template>