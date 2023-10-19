<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const apiUrl = "https://127.0.0.1:8000/api";
const firstFourMovies = ref([]);

// Récupérer le jeton d'authentification depuis le localstorage
const token = localStorage.getItem('token');

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const movies = response.data["hydra:member"];

    // Obtenir les 4 premiers films
    firstFourMovies.value = movies.slice(0, 10);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
  fetchMovies();
});
</script>

<template>
  <div class="home">
    <h1>Films</h1>
    <HeaderComponant />

    <div class="movies">
      <div class="card" v-for="movie in firstFourMovies" :key="movie.title">
        <h3 class="title">{{ movie.title }}</h3>
        <p><span>Catégorie: </span> {{ movie.category.name }}</p>
        <p><span>Date de sortie: </span> {{ formatDate(movie.releaseDate) }}</p>
        <p><span>Durée: </span> {{ movie.duration }} minutes</p>
        <p><span>Description: </span>{{ movie.description }}</p>
        <p><span>Acteurs: </span></p>
        <ul>
          <li v-for="actor in movie.actors" :key="actor">
            {{ actor.firstName }} {{ actor.lastName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: var(--white);
}
h1 {
  color: var(--black);
  padding: 2rem;
}

.movies {
  width: 100%;
  color: var(--black);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 350px;
    height: auto;
    background-color: rgb(226, 226, 226);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
    padding: 2em;
    border-radius: 0.5rem;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    p span {
      font-weight: bold;
    }
  }
}
</style>
