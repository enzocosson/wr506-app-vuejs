<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardMovieComponent from "./CardMovieComponant.vue";

const apiUrl = "https://127.0.0.1:8000/api";
const actors = ref([]);
const firstFourMovies = ref([]);
const categories = ref([]);
const newMovie = ref({
  category: "",
  actors: [],
  title: "",
  releaseDate: "2024-01-24T07:45:13.979Z",
  duration: 0,
  description: "",
  poster: "",
  posterPortrait: "",
  classement: "",
  trailer: "",
});

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}

const moviesPerPage = 30;
const currentPage = ref(1);
const totalMovies = ref(0);
const totalPages = ref(Math.ceil(totalMovies.value / moviesPerPage));

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movies`, {
      params: {
        page: currentPage.value,
        itemsPerPage: moviesPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const movies = response.data["hydra:member"];
    totalMovies.value = response.data["hydra:totalItems"];
    firstFourMovies.value = movies;

    // Calcul de totalPages après la récupération du nombre total de films
    totalPages.value = Math.ceil(totalMovies.value / moviesPerPage);
  } catch (error) {
    // Gestion des erreurs
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchMovies();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchMovies();
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    categories.value = response.data;
    console.log(categories);
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

const fetchActors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/authors`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    actors.value = response.data;
    console.log(actors);
  } catch (error) {
    console.error("Error fetching actors", error);
  }
};

const addMovie = async () => {
  try {
    await axios.post(`${apiUrl}/movies`, newMovie.value, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    fetchMovies();
    resetForm();
  } catch (error) {
    console.error("Error adding movie", error);
  }
};

const resetForm = () => {
  newMovie.value = {
    category: "",
    actors: [],
    title: "",
    releaseDate: "2024-01-24T07:45:13.979Z",
    duration: 0,
    description: "",
    poster: "",
    posterPortrait: "",
    classement: "",
    trailer: "",
  };
};

onMounted(() => {
  fetchMovies();
  fetchCategories();
  fetchActors();
});
</script>

<template>
  <div class="catalogue">
    <div class="theme">
      <div class="container__title__presentation">
        <a class="explorer" href="#"
          >Tout explorer <img src="/icons/arrow-explorer.svg" alt=""
        /></a>
      </div>
      <div class="movies">
        <CardMovieComponent
          v-for="movie in firstFourMovies"
          :key="movie.title"
          :movie="movie"
        />
      </div>
    </div>

    <!-- pagination -->

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Précédent</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Suivant
      </button>
    </div>

    <!-- Ajoutez ceci dans votre template -->
    <form @submit.prevent="addMovie" class="netflix-form">
      <div class="form-group">
        <label>Catégorie:</label>
        <select v-model="newMovie.category" required>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="`/api/categories/${category.id}`"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Acteurs:</label>
        <select v-model="newMovie.actors[0]" required>
          <option
            v-for="actor in actors"
            :key="actor.id"
            :value="`/api/authors/${actor.id}`"
          >
            {{ actor.firstName }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Titre:</label>
        <input v-model="newMovie.title" type="text" required />
      </div>

      <div class="form-group">
        <label>Date de sortie:</label>
        <input v-model="newMovie.releaseDate" type="datetime-local" />
      </div>

      <div class="form-group">
        <label>Durée:</label>
        <input v-model="newMovie.duration" type="number" required />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="newMovie.description" required></textarea>
      </div>

      <div class="form-group">
        <label>Poster:</label>
        <input v-model="newMovie.poster" type="text" required />
      </div>

      <div class="form-group">
        <label>Poster Portrait:</label>
        <input v-model="newMovie.posterPortrait" type="text" required />
      </div>

      <div class="form-group">
        <label>Classement:</label>
        <input v-model="newMovie.classement" type="text" required />
      </div>

      <div class="form-group">
        <label>Bande-annonce:</label>
        <input v-model="newMovie.trailer" type="text" required />
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.catalogue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-top: 75vh;
  padding-bottom: 10vh;
  z-index: 15;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;

  .theme {
    width: 100%;
    height: auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    z-index: 1;

    .container__title__presentation {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 2.5%;

      .explorer {
        text-decoration: none;
        color: #54b9c5;
        font-size: 0.9vw;
        font-weight: normal;
        margin-left: 0.8rem;
        transform: translateX(-0.5vw);
        opacity: 0;
        transition: 0.8s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 0.7vw;
          height: 0.7vw;
          margin-top: 0.1vw;
          fill: #54b9c5;
        }
      }
    }

    .movies {
      position: relative;
      width: 100%;
      height: auto;
      color: var(--black);
      display: flex;
      justify-content: center;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .netflix-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      label {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #fff;
      }

      input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background-color: #fff;
        color: #333;
        outline: none;

        &:focus {
          border-color: #0071eb;
          box-shadow: 0 0 5px rgba(0, 113, 235, 0.5);
        }
      }
    }

    button {
      padding: 10px;
      background-color: #e50914;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #bd081c;
      }
    }
  }
}
</style>
