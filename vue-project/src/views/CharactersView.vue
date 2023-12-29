<script setup lang="ts">
import { ref } from 'vue'

interface Character {
  id: number
  name: string
  aatype: string
  description: string
}

const characters = ref<Character[]>([])

async function loadCharacters() {
  const response = await fetch('/api/characters')
  const responseCharacters: Character[] = await response.json()
  characters.value = responseCharacters
}

loadCharacters()
</script>
<template>
  <div class="characters-content">
    <h1>Champions</h1>
    <h2>Ajoutez des champions à votre équipe en cliquant sur "Ajouter à l'équipe"</h2>

    <div class="character-cards">
      <div v-for="character in characters" :key="character.id" class="character-card">
        <h2>{{ character.name }}</h2>
        <p>{{ character.description }} de type {{ character.aatype }}</p>
        <button class="character-card-button">Ajouter à l'équipe</button>
      </div>
    </div>

    <h1>Votre équipe</h1>
  </div>
</template>

<style scoped>
.characters-content {
  max-height: 100vh;
  overflow-y: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.characters-content h1 {
  color: #14323f;
  font-family: Krub;
  font-size: 40px;
  text-align: center;
  margin: 25px 0 50px 0;
}

.character-cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
}

.character-card {
  background-color: white;
  border: 2px solid #f9b100;
  padding: 10px;
  border-radius: 15px;
}

.character-card h2 {
  color: #14323f;
  font-family: Krub;
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  margin: 0;
}

.character-card p {
  text-align: center;
  font-family: Krub;
  font-size: 15px;
  font-weight: 300;
  margin: 10px 0 10px 0;
}

.character-card-button {
  font-family: Krub;
  font-weight: 300;
  font-size: 15px;
  color: #e9edf0;
  text-decoration: none;
  background-color: #f9b100;
  border: solid 1px #f9b100;
  border-radius: 10px;
  width: 100%;
}

.character-card-button:hover {
  color: #f9b100;
  transition: 0.4s;
  background-color: #14323f00;
}
</style>
