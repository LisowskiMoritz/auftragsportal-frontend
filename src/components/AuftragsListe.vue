<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Auftrag {
  id: number
  bezeichnung: string
  status: string
  kundenhinweis: string
}

const auftraege = ref<Auftrag[]>([])
const ausgewaehlterAuftrag = ref<Auftrag | null>(null)
const ladeFehler = ref('')
const laedt = ref(true)
const sortierteAuftraege = computed(() => {
  const reihenfolge: Record<string, number> = {
    Abholbereit: 1,
    Versandt: 2,
    'In Bearbeitung': 3,
    Neu: 4,
    Abgeholt: 5,
  }

  return [...auftraege.value].sort((a, b) => {
    return (reihenfolge[a.status] ?? 99) - (reihenfolge[b.status] ?? 99)
  })
})

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

function detailsAnzeigen(auftrag: Auftrag) {
  ausgewaehlterAuftrag.value = auftrag
}
</script>

<template>
  <section>
    <div class="ueberschrift">
      <div>
        <h2>Auftragsübersicht</h2>
        <p>Aktuelle Aufträge und ihr Bearbeitungsstand.</p>
      </div>

      <span v-if="!laedt && !ladeFehler" class="anzahl">
        {{ auftraege.length }} Aufträge
      </span>
    </div>

    <p v-if="laedt" class="meldung" role="status">
      Aufträge werden geladen …
    </p>

    <p v-else-if="ladeFehler" class="meldung fehler" role="alert">
      {{ ladeFehler }}
    </p>

    <p v-else-if="auftraege.length === 0" class="meldung">
      Es sind noch keine Aufträge vorhanden.
    </p>

    <div v-else class="tabelle-container">
      <table>
        <caption class="lesehilfe">
          Aufträge mit Nummer, Bezeichnung, Status und Detailauswahl
        </caption>

        <thead>
          <tr>
            <th scope="col">Auftragsnr.</th>
            <th scope="col">Bezeichnung</th>
            <th scope="col">Status</th>
            <th scope="col">Aktion</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="auftrag in sortierteAuftraege"
            :key="auftrag.id"
            :class="{ ausgewaehlt: ausgewaehlterAuftrag?.id === auftrag.id }"
          >
            <td class="nummer">#{{ auftrag.id }}</td>
            <td>{{ auftrag.bezeichnung }}</td>
            <td>
              <span
                class="status"
                :class="{ abholbereit: auftrag.status === 'Abholbereit' }"
              >
                {{ auftrag.status }}
              </span>
            </td>
            <td>
              <button
                class="details-button"
                :aria-label="`Details zu Auftrag ${auftrag.id}`"
                aria-controls="auftragsdetails"
                @click="detailsAnzeigen(auftrag)"
              >
                Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <section
      v-if="ausgewaehlterAuftrag"
      id="auftragsdetails"
      class="detailbereich"
      aria-labelledby="detailtitel"
      aria-live="polite"
    >
      <div class="detailkopf">
        <h2 id="detailtitel">
          Auftrag #{{ ausgewaehlterAuftrag.id }}
        </h2>

        <button
          class="schliessen-button"
          @click="ausgewaehlterAuftrag = null"
        >
          Details schließen
        </button>
      </div>

      <h3>{{ ausgewaehlterAuftrag.bezeichnung }}</h3>

      <dl>
        <dt>Bearbeitungsstand</dt>
        <dd>{{ ausgewaehlterAuftrag.status }}</dd>

        <dt>Kundenhinweis</dt>
        <dd>{{ ausgewaehlterAuftrag.kundenhinweis }}</dd>
      </dl>
    </section>
  </section>
</template>

<style scoped>
.ueberschrift,
.detailkopf {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.ueberschrift {
  margin-bottom: 24px;
}

h2 {
  margin: 0;
  font-size: 24px;
}

.ueberschrift p {
  margin: 8px 0 0;
  color: #617085;
}

.anzahl {
  background: #e3eaf3;
  padding: 8px 14px;
  border-radius: 20px;
  white-space: nowrap;
}

.tabelle-container {
  overflow-x: auto;
  background: white;
  border: 1px solid #dce3eb;
  border-radius: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 18px;
  text-align: left;
}

th {
  background: #eaf0f6;
  color: #46576c;
  font-size: 14px;
}

td {
  border-top: 1px solid #e4e9f0;
  line-height: 1.5;
}

tr.ausgewaehlt {
  background: #eef5ff;
}

.nummer {
  font-weight: bold;
  white-space: nowrap;
}

.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 16px;
  background: #fff0c2;
  color: #755000;
  font-size: 14px;
  white-space: nowrap;
}

.status.abholbereit {
  background: #dcf3e4;
  color: #24603b;
}

.details-button {
  border: 1px solid #17324f;
  border-radius: 6px;
  background: white;
  color: #17324f;
  padding: 8px 14px;
  cursor: pointer;
}

.details-button:hover {
  background: #17324f;
  color: white;
}

.detailbereich {
  margin-top: 24px;
  padding: 24px;
  background: white;
  border: 1px solid #dce3eb;
  border-left: 5px solid #17324f;
  border-radius: 10px;
}

.detailbereich h3 {
  margin: 24px 0;
  line-height: 1.5;
}

.schliessen-button {
  border: none;
  background: transparent;
  color: #345b88;
  text-decoration: underline;
  cursor: pointer;
  padding: 8px 0;
}

dl {
  margin: 0;
}

dt {
  margin-top: 18px;
  color: #617085;
  font-size: 14px;
}

dd {
  margin: 6px 0 0;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.meldung {
  padding: 24px;
  background: white;
  border: 1px solid #dce3eb;
  border-radius: 10px;
}

.fehler {
  color: #9b2424;
}

.lesehilfe {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
}

@media (max-width: 650px) {
  th,
  td {
    padding: 12px;
  }

  table {
    min-width: 600px;
  }

  .detailbereich {
    padding: 18px;
  }
}
</style>