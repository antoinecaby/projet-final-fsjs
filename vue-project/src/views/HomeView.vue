<script setup lang="ts">
// Vérifie si l'utilisateur est connecté
let isConnected = false
const theToken = localStorage.getItem('token')

if (theToken) {
  isConnected = true
} else {
  isConnected = false
}
</script>

<template>
  <div v-if="!isConnected" class="homeview-content">
    <h1>Bienvenue sur LoL Chooser</h1>
    <p>
      LoL chooser est un outil qui répertorie l'ensemble des champions de League of Legends.<br /><br />Pour
      ajouter des champions à votre équipe, connectez-vous !<br /><br />(Si vous venez de vous
      connecter, rechargez la page !)
    </p>
    <router-link to="/login" class="homeview-content-login">Se connecter</router-link>
  </div>
  <div v-if="isConnected" class="homeview-content">
    <h1>Bienvenue sur LoL Chooser</h1>
    <p>Ajoutez des champions à votre équipe dès maintenant !</p>
    <router-link to="/characters" class="homeview-content-login">Créer mon équipe</router-link>
  </div>
</template>

<style>
.homeview-content {
  text-align: center;
}

.homeview-content h1 {
  color: #14323f;
  font-family: Krub;
  font-size: 50px;
  text-align: center;
  margin: 150px 0 50px 0;
}

.homeview-content p {
  color: #14323f;
  font-family: Krub;
  font-size: 22px;
  text-align: center;
  margin-bottom: 50px;
}

.homeview-content-login {
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

.homeview-content-login:hover {
  color: #f9b100;
  transition: 0.4s;
  background-color: #14323f00;
}
</style>
