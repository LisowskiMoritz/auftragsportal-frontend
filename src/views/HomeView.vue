<template>
  <section class="startseite">
    <p>Schlüsseldienst Lisowski</p>
    <h2>Willkommen im Auftragsportal</h2>

    <RouterLink to="/auftraege" class="portal-link">
      Zur Auftragsübersicht →
    </RouterLink>
  </section>
</template>

<style scoped>
.startseite {
  padding: 70px 0;
  text-align: center;
}

.startseite p {
  color: #617085;
}

.startseite h2 {
  margin: 16px 0 32px;
  font-size: 32px;
}

.portal-link {
  display: inline-block;
  padding: 14px 22px;
  border-radius: 6px;
  background: #17324f;
  color: white;
  text-decoration: none;
}

.portal-link:hover {
  background: #254d75;
}
</style>