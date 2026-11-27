<template>
  <header class="kopfbereich">
    <div class="seitenbreite">
      <p class="untertitel">Schlüsseldienst Lisowski</p>
      <h1>Auftragsportal</h1>
    </div>
  </header>

  <main class="seitenbreite">
    <RouterView />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f3f5f8;
  color: #243247;
}

button {
  font: inherit;
}

button:focus-visible,
a:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}

.seitenbreite {
  width: min(1100px, 92%);
  margin: 0 auto;
}

.kopfbereich {
  background: #17324f;
  color: white;
  padding: 28px 0;
}

.untertitel {
  margin: 0 0 6px;
  color: #c4d5e6;
}

h1 {
  margin: 0;
  font-size: 30px;
}

main.seitenbreite {
  padding: 36px 0;
}
</style>