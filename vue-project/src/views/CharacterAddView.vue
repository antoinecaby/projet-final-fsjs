<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const description = ref('')
const aatype = ref('')

async function addCharacter() {
  const addCharacter = {
    name: name.value,
    description: description.value,
    aatype: aatype.value
  }

  try {
    const response = await fetch('/api/character/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addCharacter)
    })

    if (response.ok) {
      console.log('Champion ajouté')
    } else {
      console.error("Échec de l'ajout du champion")
    }
  } catch (error) {
    console.error('Une erreur est survenue', error)
  }
}
</script>

<template>
  <div class="add-character-space">
    <h1>Ajouter un champion</h1>
    <div class="add-character-form">
      <label for="email" class="label">Nom du champion</label>
      <br />
      <input v-model="name" type="text" placeholder="Garen" class="input" id="email" required />
      <br />

      <label for="description" class="label">Description</label>
      <br />
      <input
        v-model="description"
        type="text"
        placeholder="Force de Demacia"
        class="input"
        id="description"
        required
      />
      <br />
      <label for="aatype" class="label">Type d'auto-d'attaque</label>
      <br />
      <select v-model="aatype" class="input" id="aatype" required>
        <option value="melee">Mêlée</option>
        <option value="range">Distance</option>
      </select>
      <br />
      <div align="center">
        <button @click="addCharacter" class="submit" name="submit">Ajouter le champion</button>
      </div>
    </div>
  </div>
</template>

<style>
.add-character-space {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #f9b100;
  height: 500px;
  width: 600px;
  border-radius: 15px;
  color: black;
  padding: 30px;
  filter: drop-shadow(25%);
}

.add-character-space h1 {
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
