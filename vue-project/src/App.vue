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
      <a href="/"><h1>LoL Chooser</h1></a>
    </div>

    <div class="header-left">
      <ul class="nav-list">
        <li><a href="/" class="nav-list-link">Accueil</a></li>
        <li><a href="/characters" class="nav-list-link">Champions</a></li>
        <li v-if="admin"><a href="/admin" class="nav-list-link">Admin</a></li>
        <li v-if="!isConnected"><a href="/login" class="nav-list-button">Se connecter</a></li>
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

.header-right h1 {
  font-family: Krub;
  font-weight: 400;
  font-size: 25px;
  color: #e9edf0;
}
</style>
