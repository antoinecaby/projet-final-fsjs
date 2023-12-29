<script setup lang="ts"></script>

<template>
  <h1 class="admin-title">Bienvenue sur l'espace administrateur, que souhaitez vous faire ?</h1>

  <!-- Gestion des utilisateurs (Create Update Delete users)-->

  <h2 class="admin-title-h2">Gestion des utilisateurs</h2>
  <div class="admin-content">
    <div class="admin-content1">
      <h2>Créer un compte</h2>
      <br />
      <a href="/register" class="admin-content-link">Cliquez ici !</a>
    </div>
    <div class="admin-content2">
      <h2>Modifier un compte</h2>
      <br />
      <a href="/admin/update" class="admin-content-link">Cliquez ici !</a>
    </div>
    <div class="admin-content3">
      <h2>Supprimer un compte</h2>
      <br />
      <a href="/admin/supp" class="admin-content-link">Cliquez ici !</a>
    </div>
  </div>
  <hr class="admin-separator" />

  <!-- Gestion des utilisateurs (Create Update Delete Champions)-->

  <h2 class="admin-title-h2">Gestion des champions</h2>
  <div class="admin-content">
    <div class="admin-content1">
      <h2>Ajouter un champion</h2>
      <br />
      <a href="/add-character" class="admin-content-link">Cliquez ici !</a>
    </div>
    <div class="admin-content2">
      <h2>Modifier un champion</h2>
      <br />
      <a href="/update-character" class="admin-content-link">Cliquez ici !</a>
    </div>
    <div class="admin-content3">
      <h2>Supprimer un champion</h2>
      <br />
      <a href="/delete-character" class="admin-content-link">Cliquez ici !</a>
    </div>
  </div>
</template>

<style>
.admin-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
}

.admin-title {
  font-family: Krub;
  color: #14323f;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
}

.admin-title-h2 {
  font-family: Krub;
  color: #14323f;
  text-align: center;
  font-size: 30px;
}

.admin-content h2 {
  font-family: Krub;
  color: #14323f;
}

.admin-separator {
  border: 0.5px solid #f8b100;
  width: 50%;
  margin-top: 50px;
}

.admin-content-link {
  font-family: Krub;
  font-weight: 400;
  font-size: 22px;
  color: #e9edf0;
  text-decoration: none;
  background-color: #f9b100;
  border: solid 1px #f9b100;
  border-radius: 10px;
  padding: 3px 10px 3px 10px;
}

.admin-content-link:hover {
  color: #f9b100;
  transition: 0.4s;
  background-color: #14323f00;
}
</style>
