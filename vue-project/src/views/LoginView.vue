<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const loginMessageTrue = ref('')
const loginMessageFalse = ref('')

async function login() {
  const user = {
    email: email.value,
    mdp: password.value
  }

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      console.log('Connexion réussie')
      const responseBody = await response.json()
      console.log(responseBody, responseBody.token)
      localStorage.setItem('token', responseBody.token)
      localStorage.setItem('isAdmin', responseBody.isAdmin)
      localStorage.setItem('id_user', responseBody.id_user)
      loginMessageFalse.value = ''
      loginMessageTrue.value =
        "Connexion réussie ! Vous allez être redirigé sur la page d'accueil !"
      setTimeout(() => {
        router.push('/')
      }, 3500)
    } else {
      console.error('Échec de la connexion')
      loginMessageFalse.value = 'Connexion échouée ! Veuillez réessayer'
    }
  } catch (error) {
    console.error('Une erreur est survenue', error)
  }
}

// permet de clear le local storage
//
//localStorage.removeItem("token")
//
</script>

<template>
  <div class="login-space-login">
    <h1>Se connecter</h1>
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
        <button @click="login" class="submit" name="submit">Se connecter</button>
      </div>
    </div>
    <div class="div-link-register">
      <p class="login-message-true">{{ loginMessageTrue }}</p>
      <p class="login-message-false">{{ loginMessageFalse }}</p>
      <router-link to="/register" class="link-register">Créer un compte !</router-link>
    </div>
  </div>
</template>

<style>
.login-space-login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #f9b100;
  height: 425px;
  width: 600px;
  border-radius: 15px;
  color: black;
  padding: 30px;
  filter: drop-shadow(25%);
}

.login-space-login h1 {
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

.div-link-register {
  text-align: center;
  margin-top: 15px;
}

.link-register {
  color: #14323f;
  font-family: Krub;
  font-size: 18px;
  text-decoration: none;
  margin-top: 15px;
  transition: 0.3s;
}

.link-register:hover {
  color: #f9b100;
  transition: 0.3s;
}

.login-message-true {
  color: green;
  font-family: Krub;
  font-size: 18px;
}

.login-message-false {
  color: red;
  font-family: Krub;
  font-size: 18px;
}
</style>
