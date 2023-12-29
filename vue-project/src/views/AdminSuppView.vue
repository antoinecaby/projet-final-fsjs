<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

async function supp() {
  const user = {
    email: email.value,
    mdp: password.value
  }

  try {
    const response = await fetch('/api/auth/supp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      console.log('Compte supprimé')
    } else {
      console.error('Échec de la suppression du compte')
    }
  } catch (error) {
    console.error('Une erreur est survenue', error)
  }
}
</script>

<template>
  <div class="delete-space">
    <h1>Supprimer un compte LoL Quote</h1>
    <div class="login-form">
      <label for="email" class="label">Mail</label>
      <br />
      <input
        v-model="email"
        type="email"
        placeholder="exemple@test.fr"
        class="input"
        id="email"
        required
      />
      <br />

      <label for="password" class="label">Mot de passe</label>
      <br />
      <input
        v-model="password"
        type="password"
        placeholder="************"
        class="input"
        id="password"
        required
      />
      <br />
      <div align="center">
        <button @click="supp" class="submit" name="submit">Supprimer le compte</button>
      </div>
    </div>
  </div>
</template>

<style>
.delete-space {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #f9b100;
  height: 400px;
  width: 600px;
  border-radius: 15px;
  color: black;
  padding: 30px;
  filter: drop-shadow(25%);
}

.delete-space h1 {
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
