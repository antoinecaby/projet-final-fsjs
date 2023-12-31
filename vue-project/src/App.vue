<script setup lang="ts">
// Vérifie si l'utilisateur est administrateur
let admin = false
const isAdmin = localStorage.getItem('isAdmin')

if (isAdmin === '0') {
  admin = false
} else if (isAdmin === '1') {
  admin = true
}

// Vérifie si l'utilisateur est connecté
let isConnected = false
const theToken = localStorage.getItem('token')

if (theToken) {
  isConnected = true
} else {
  isConnected = false
}

async function logout() {
  try {
    // Supprime le token du localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')
    window.location.reload()
    console.log('Déconnexion réussie')
  } catch (error) {
    console.error('Une erreur est survenue lors de la déconnexion', error)
  }
}
</script>

<template>
  <header>
    <div class="header-right">
      <h1><router-link to="/" class="header-right-link">LoL Chooser</router-link></h1>
    </div>

    <div class="header-left">
      <ul class="nav-list">
        <li><router-link to="/" class="nav-list-link">Accueil</router-link></li>
        <li><router-link to="/characters" class="nav-list-link">Champions</router-link></li>
        <li v-if="admin"><router-link to="/admin" class="nav-list-link">Admin</router-link></li>
        <li v-if="!isConnected">
          <router-link to="/login" class="nav-list-button">Se connecter</router-link>
        </li>
        <li v-if="isConnected">
          <button @click="logout" class="nav-list-button">Se déconnecter</button>
        </li>

        <li></li>
      </ul>
    </div>
  </header>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 10px 20px 10px 20px;
  background-color: #14323f;
}

.nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: right;
  align-items: center;
}

.nav-list li {
  margin: 0 20px;
}

.nav-list-link {
  font-family: Krub;
  font-weight: 400;
  font-size: 25px;
  color: #e9edf0;
  text-decoration: none;
}

.nav-list-link:hover {
  color: #f9b100;
  transition: 0.4s;
}

.nav-list-button {
  font-family: Krub;
  font-weight: 400;
  font-size: 25px;
  color: #e9edf0;
  text-decoration: none;
  background-color: #f9b100;
  border: solid 1px #f9b100;
  border-radius: 10px;
  padding: 5px 15px 5px 15px;
}

.nav-list-button:hover {
  color: #f9b100;
  transition: 0.4s;
  background-color: #14323f00;
}

.header-right a {
  text-decoration: none;
}

.header-right-link {
  font-family: Krub;
  font-weight: 400;
  font-size: 25px;
  color: #e9edf0;
  font-size: 30px;
}
</style>
