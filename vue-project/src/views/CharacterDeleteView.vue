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

const name = ref('')

async function deleteCharacter() {
  const updateCharacter = {
    name: name.value
  }

  try {
    const response = await fetch('/api/character/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateCharacter)
    })

    if (response.ok) {
      console.log('Champion supprimé')
    } else {
      console.error('Échec de la suppression du champion')
    }
  } catch (error) {
    console.error('Une erreur est survenue', error)
  }
}
</script>

<template>
  <div class="delete-character-space">
    <h1>Supprimer un champion</h1>
    <div class="add-character-form">
      <label for="aatype" class="label">Sélectionnez le champion à supprimer</label>
      <br />
      <select v-model="name" class="input" id="name" required>
        <option v-for="character in characters" :key="character.id" :value="character.name">
          {{ character.name }}
        </option>
      </select>
      <br />
      <div align="center">
        <button @click="deleteCharacter" class="submit" name="submit">Supprimer le champion</button>
      </div>
    </div>
  </div>
</template>

<style>
.delete-character-space {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #f9b100;
  height: 300px;
  width: 600px;
  border-radius: 15px;
  color: black;
  padding: 30px;
  filter: drop-shadow(25%);
}

.delete-character-space h1 {
  color: #14323f;
  font-family: Krub;
  font-size: 35px;
  text-align: center;
}

.label {
  color: #14323f;
  font-family: Krub;
  font-size: 18px;
  padding-left: 5px;
}

.input {
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  background-color: white;
  margin-bottom: 15px;
  width: 93%;
}

.submit {
  background-color: #f9b100;
  padding: 10px 25px;
  border: solid 1px #f9b100;
  border-radius: 10px;
  transition: all 0.4s ease 0s;
  font-size: 16px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}

.submit:hover {
  background-color: #e9edf0;
  border: solid 1px #f9b100;
  color: #f9b100;
}
</style>
