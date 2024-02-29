<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardMovieComponent from "./CardMovieComponant.vue";
import PopupInfo from "../components/PopupInfo.vue";
import PopupEdit from "../components/PopupEdit.vue";

const apiUrl = "https://127.0.0.1:8000/api";
const actors = ref([]);
const moviesData = ref([]);
const categories = ref([]);
const filteredMovies = ref([]);
const searchQuery = ref("");
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
const isAddCategoryPopupOpen = ref(false);

const openAddCategoryPopup = () => {
  isAddCategoryPopupOpen.value = true;
};

const closeAddCategoryPopup = () => {
  isAddCategoryPopupOpen.value = false;
};

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
    moviesData.value = movies;

    totalPages.value = Math.ceil(totalMovies.value / moviesPerPage);

    filterByTitle();
  } catch (error) {}
};

const filterByTitle = () => {
  console.log("Search Query:", searchQuery.value);
  filteredMovies.value = moviesData.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  console.log("Filtered Movies:", filteredMovies.value);
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
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

const fetchActors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/actors`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    actors.value = response.data;
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
    closeAddCategoryPopup();
  } catch (error) {
    console.error("Error adding movie", error);
  }
};

const deleteMovie = async (movieId) => {
  try {
    await axios.delete(`${apiUrl}/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMovies();
  } catch (error) {
    console.error("Error deleting movie", error);
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
  filterByTitle();
});
</script>

<template>
  <div v-if="isAddCategoryPopupOpen" class="popup">
    <div class="popup__content">
      <h2>Ajouter un film</h2>

      <form @submit.prevent="addMovie" class="netflix-form">
        <div class="form-group">
          <label>Catégorie:</label>
          <select v-model="newMovie.category" required>
            <option value="" disabled selected>
              Sélectionnez une catégorie
            </option>
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
              :value="`/api/actors/${actor.id}`"
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

        <div class="container__button">
          <button
            class="cancel__button"
            @click.prevent="closeAddCategoryPopup"
          >
            Annuler
          </button>
          <button class="submit__button" type="submit">
            Modifier
          </button>
        </div>
      </form>
    </div>
  </div>

  <div class="catalogue">
    <div class="theme">
      <div class="category__header">
        <div class="search-input">
          <input
            v-model="searchQuery"
            @input="filterByTitle"
            placeholder="Rechercher par titre"
          />
        </div>
      </div>
      <div class="movies">
        <CardMovieComponent
          v-for="movie in filteredMovies"
          :key="movie.title"
          :movie="movie"
          :fetchMovies="fetchMovies"
          :deleteMovie="deleteMovie"
        />
      </div>

      <div class="container__add__button">
        <button class="add__movies" @click.prevent="openAddCategoryPopup">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#fff" />
          </svg>
          Ajouter un film
        </button>
      </div>
    </div>

    <!-- pagination -->
    <div class="pagination">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        Précédent
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        Suivant
      </button>
    </div>
  </div>

  <!-- pop up info -->
  <!-- <PopupInfo /> -->
  <!-- pop up edit -->
  <PopupEdit :movieData="movieData" />
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  .popup__content {
    background: var(--black);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 3rem;
    width: 800px;
    height: 80vh;
    overflow: auto;
    text-align: center;

    .netflix-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      border-radius: 8px;

      .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        width: 100%;

        label {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 5px;
          color: #fff;
        }
        select {
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

      .container__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          width: 100%;
          margin-top: 2rem;
          .cancel__button {
            padding: 10px;
            height: 50px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            background-color: #9b9b9b;
            color: var(--white);
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            font-weight: bold;
            &:hover {
              background-color: rgb(100, 100, 100);
            }
          }
          .submit__button {
            padding: 10px;
            height: 50px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            background-color: #e50914;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            font-weight: bold;
            &:hover {
              background-color: #bd081c;
            }
          }
        }
    }

    h2 {
      font-size: 1.8em;
      color: #e50914; // Rouge Netflix
      margin-bottom: 20px;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;

      label {
        font-size: 1.2em;
        margin-bottom: 8px;
        color: #333;
      }

      input {
        width: 100%;
        padding: 10px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
      }

      button {
        background-color: #e50914;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1.2em;

        &:hover {
          background-color: #ff3b2f; // Rouge plus clair au survol
        }
      }
    }

    button {
      background-color: transparent;
      color: #333;
      border: none;
      font-size: 1em;
      cursor: pointer;
      margin-top: 10px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.catalogue {
  position: relative;
  width: 100%;
  height: auto;
  padding-top: 7vh;
  padding-bottom: 10vh;
  z-index: 15;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 50px;
    color: white;
    font-weight: bold;
    gap: 10px;
  }

  .pagination-button {
    background-color: #e50914;
    color: white;
    border: none;
    width: 150px;
    height: 50px;
    margin: 0 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    transition: all 0.2s cubic-bezier(0.42, 0, 0, 1.59);
  }

  .pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .pagination-button:hover:not(:disabled) {
    background-color: #ff3f4d;
    transform: scale(1.05);
  }

  .theme {
    width: 100%;
    height: auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4vh;
    z-index: 1;

    .category__header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      color: var(--white);
      margin-bottom: 10px;
      font-size: 1.5rem;

      .container__filtre__categories {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;

        .add__category {
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

      .custom-select {
        position: relative;
        display: inline-block;
        width: 200px;
      }

      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        background-color: #fff;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        outline: none;
      }

      select:focus {
        border-color: #0071eb;
      }

      .custom-select::after {
        content: "\25BC";
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        pointer-events: none;
      }

      select option {
        background-color: #fff;
        color: #333;
      }

      .search-input {
        width: 300px;
      }

      .search-input input {
        padding: 10px;
        border: 1px solid #333;
        border-radius: 5px;
        font-size: 16px;
        outline: none;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
      }

      .search-input input::placeholder {
        color: #ccc;
      }

      .search-input input:focus {
        border-color: #e50914;
        box-shadow: 0 0 5px rgba(229, 9, 20, 0.7);
      }
    }

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
      justify-content: space-between;
      align-items: flex-end;
      flex-wrap: wrap;
      gap: 10px;
    }

    .container__add__button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .add__movies {
        cursor: pointer;
        position: relative;
        display: flex;
        flex-direction: column;
        width: 15vw;
        height: 8.5vw;
        box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.4s cubic-bezier(0.95, -0.01, 0.58, 1),
          z-index 0s cubic-bezier(0.95, -0.01, 0.58, 1) 0.5s;
        z-index: 10;
        box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;
        font-size: 1rem;
        font-weight: bold;
        color: var(--white);
        background-color: #e509146f;
        border: 3px solid #e50914;
        transition: all 0.2s cubic-bezier(0.42, 0, 0, 1.59);
        gap: 10px;

        &:hover {
          background-color: #bd081c;
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>
