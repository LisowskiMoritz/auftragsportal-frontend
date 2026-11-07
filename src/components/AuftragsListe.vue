<script setup lang="ts">
const auftraege = [
  {
    id: 1,
    bezeichnung: 'Schloss gangbar machen und Schlüssel anfertigen',
    status: 'In Bearbeitung',
    kundenhinweis: 'Das Schloss wird gereinigt und geprüft.',
  },
  {
    id: 2,
    bezeichnung: 'Zylinderbestellung Hausverwaltung',
    status: 'Abholbereit',
    kundenhinweis: 'Ihre Bestellung kann im Laden abgeholt werden.',
  },
  {
    id: 3,
    bezeichnung: 'Zeichnung für Briefkastenanlage anfertigen',
    status: 'in Arbeit',
    kundenhinweis: 'Anzahl der Kästen, Klingeltafel und Material klären',
  },
]
</script>
<template>
  <section>
    <h2>Aufträge</h2>

    <ul>
      <li v-for="auftrag in auftraege" :key="auftrag.id">
        <h3>{{ auftrag.bezeichnung }}</h3>
        <p>Status: {{ auftrag.status }}</p>
        <p>{{ auftrag.kundenhinweis }}</p>
      </li>
    </ul>
  </section>
</template>