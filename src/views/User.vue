<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/api";
const user = ref(null);
const token = localStorage.getItem("token");
const route = useRoute();

if (!token) {
  window.location.href = "/login";
}

onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur",
      error
    );
  }
});
</script>

<template>
  <div class="main">
    <h1>Utilisateur connecté</h1>
    <div class="container">
      <div v-if="user" class="container__img">
        <img
          v-if="user.photo"
          :src="`https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/image/${user.photo}`"
          alt="Photo de profil"
          class="profile__image"
        />
      </div>

      <div v-if="user" class="info-container">
        <p class="info-text">{{ user.firstName }}</p>
        <p class="info-text">{{ user.lastName }}</p>
        <p class="info-text">{{ user.email }}</p>
      </div>

      <div v-if="!user">
        <p>Chargement des informations...</p>
      </div>
    </div>

    <router-link
      v-if="user && user.id"
      :to="{ name: 'UpdateUser', params: { id: user.id } }"
    >
      <button class="update__user">Modifier</button>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.main {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: var(--black);
  gap: 1rem;
}
h1 {
  color: rgb(238, 238, 238);
  font-size: 1.2rem;
  font-weight: 100;
  margin-bottom: 1rem;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 200px;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: rgb(27, 27, 27);
}
.container__img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
}

.profile__image {
  widows: 100%;
  height: 100%;
  object-fit: cover;
}

.info-container {
  display: flex;
  flex-direction: column;
}

.info-text {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: white;
}
.update__user {
  appearance: none;
  border: none;
  width: 180px;
  height: 40px;
  border: 10px;
  border-radius: 3px;
  background-color: var(--red);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: var(--white);
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #ee0000;
  }
}
a {
  text-decoration: none;
}
</style>
