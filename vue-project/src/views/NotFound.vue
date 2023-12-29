<script setup lang="ts"></script>

<template>
  <div class="notfound-content">
    <h2>Erreur</h2>
    <h1>404</h1>
    <p>La page que vous avez demander n'existe pas !</p>
    <a href="/" class="notfound-link">Retour à l'acccueil</a>
  </div>
</template>

<style>
.notfound-content {
  text-align: center;
  margin-top: 125px;
}

.notfound-content h1 {
  font-family: Krub;
  font-size: 150px;
  color: #14323f;
  margin: 0;
}

.notfound-content h2 {
  font-family: Krub;
  font-size: 30px;
  color: #14323f;
  margin-bottom: -30px;
}

.notfound-content p {
  font-family: Krub;
  font-size: 20px;
  color: #14323f;
  margin-bottom: 50px;
}

.notfound-link {
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

.notfound-link:hover {
  color: #f9b100;
  transition: 0.4s;
  background-color: #14323f00;
}
</style>
