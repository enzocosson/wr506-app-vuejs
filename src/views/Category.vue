<script setup>
import axios from "axios";
import { ref, onMounted, watch, computed } from "vue";
import CardMovieComponent from "../components/CardMovieComponant.vue";
import PopupInfo from "../components/PopupInfo.vue";
import PopupEdit from "../components/PopupEdit.vue";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/travaux/wr506-symfony/public/index.php/api";
const moviesPerPage = 30;

const selectedCategory = ref("");
const moviesData = ref([]);
const filteredMovies = ref([]);
const currentPage = ref(1);
const totalMovies = ref(0);
const categories = ref([]);
const totalPages = ref(Math.ceil(totalMovies.value / moviesPerPage));
const searchQuery = ref("");

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}

const filterByTitle = () => {
  filteredMovies.value = moviesData.value.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const filterByCategory = () => {
  if (selectedCategory.value !== "") {
    filteredMovies.value = moviesData.value.filter(
      (movie) => movie.category.id === selectedCategory.value
    );
  } else {
    filteredMovies.value = moviesData.value;
  }
};

const filterByCategoryRef = ref(filterByCategory);

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

    filterByCategoryRef.value();
  } catch (error) {
    console.error("Error fetching movies", error);
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

    filterByCategoryRef.value();
  } catch (error) {
    console.error("Error fetching categories", error);
  }
};

onMounted(() => {
  fetchMovies();
  fetchCategories();
});

watch(selectedCategory, filterByCategoryRef);

// ----------------------------------- popup creation category -----------------------------------

const selectedFilm = ref(null);
const isAddCategoryPopupOpen = ref(false);
const selectedMovies = ref([]);

const newCategoryData = ref({
  name: "",
  movies: [],
});
const openAddCategoryPopup = () => {
  newCategoryData.value = {
    name: "",
    movies: [],
  };
  isAddCategoryPopupOpen.value = true;
};

const filteredMoviesList = computed(() => {
  return moviesData.value.filter(
    (movie) =>
      !selectedMovies.value.some(
        (selectedMovie) => selectedMovie.id === movie.id
      )
  );
});

const removeMovieFromSelection = (movie) => {
  const index = newCategoryData.movies.indexOf(movie);
  if (index !== -1) {
    newCategoryData.movies.splice(index, 1);
  }
};

const addMovieToSelection = () => {
  if (selectedFilm.value) {
    newCategoryData.value.movies.push(selectedFilm.value);
    selectedFilm.value = null;
  }
};

const submitCategoryForm = async () => {
  try {
    const requestData = {
      name: newCategoryData.value.name,
      movies: newCategoryData.value.movies.map(
        (movie) => `/api/movies/${movie.id}`
      ),
    };

    await axios.post(`${apiUrl}/categories`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    fetchCategories();
    fetchMovies();
    isAddCategoryPopupOpen.value = false;
  } catch (error) {
    console.error("Error adding category", error);
  }
};

// -------------------- supprimer categorie ----------------------------

const selectedCategoryId = ref(null);

const isDeleteCategoryPopupOpen = ref(false);

const openDeleteCategoryPopup = (categoryId) => {
  selectedCategoryId.value = categoryId;
  isDeleteCategoryPopupOpen.value = true;
};

const confirmDeleteCategory = async () => {
  try {
    const categoryId = selectedCategoryId.value;

    const responseAllMovies = await axios.get(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const allMovies = responseAllMovies.data["hydra:member"];

    const moviesInCategory = allMovies.filter(
      (movie) => movie.category.id === categoryId
    );

    if (moviesInCategory.length > 0) {
      alert(
        "La catégorie est toujours associée à des films. Supprimez d'abord les films pour pouvoir supprimer la catégorie."
      );
    } else {
      await axios.delete(`${apiUrl}/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCategories();
      isDeleteCategoryPopupOpen.value = false;
    }
  } catch (error) {
    console.error("Error deleting category", error);
  }
};

const cancelDeleteCategory = () => {
  isDeleteCategoryPopupOpen.value = false;
};
</script>

<template>
  <div v-if="isDeleteCategoryPopupOpen" class="popup">
    <div class="popup__content">
      <h2>Supprimer une catégorie</h2>
      <p>Sélectionnez la catégorie à supprimer :</p>
      <select v-model="selectedCategoryId">
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div class="container__button">
        <button class="submit" @click="confirmDeleteCategory">Confirmer</button>
        <button class="close" @click="cancelDeleteCategory">Annuler</button>
      </div>
    </div>
  </div>

  <div v-if="isAddCategoryPopupOpen" class="popup">
    <div class="popup__content">
      <h2>Ajouter une catégorie</h2>
      <form @submit.prevent="submitCategoryForm">
        <label for="categoryName">Nom de la catégorie:</label>
        <input
          v-model="newCategoryData.name"
          type="text"
          id="categoryName"
          required
        />

        <div class="movies-selection">
          <label for="selectedMovies">Films sélectionnés :</label>
          <div class="selected-movies">
            <ul>
              <li v-for="movie in newCategoryData.movies" :key="movie.id">
                {{ movie.title }}
                <button @click="removeMovieFromSelection(movie)">
                  Supprimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="movies-selection">
          <label for="selectFilm">Sélectionner un film :</label>
          <select v-model="selectedFilm" id="selectFilm">
            <option
              v-for="film in filteredMoviesList"
              :key="film.id"
              :value="film"
            >
              {{ film.title }}
            </option>
          </select>
          <button class="ajouter__film" @click.prevent="addMovieToSelection">
            Ajouter Film
          </button>
        </div>

        <div class="container__button">
          <button class="close" @click.prevent="isAddCategoryPopupOpen = false">
            Fermer
          </button>
          <button class="submit" type="submit">Ajouter</button>
        </div>
      </form>
    </div>
  </div>

  <div class="category">
    <div class="category__header">
      <div class="container__filtre__categories">
        <h2>Filtrer par catégorie</h2>
        <div class="custom-select">
          <select v-model="selectedCategory" @change="filterByCategory">
            <option value="">Toutes les catégories</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

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
      <button class="delete__movies" @click.prevent="openDeleteCategoryPopup">
        <svg
          width="24"
          height="24"
          viewBox="0 0 128 146"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M54.4433 0C44.4621 0 36.2956 8.1665 36.2956 18.1478H18.1478C8.1665 18.1478 0 26.3143 0 36.2956H127.034C127.034 26.3143 118.868 18.1478 108.887 18.1478H90.7389C90.7389 8.1665 82.5724 0 72.5911 0H54.4433ZM18.1478 54.4433V141.734C18.1478 143.73 19.5996 145.182 21.5959 145.182H105.62C107.616 145.182 109.068 143.73 109.068 141.734V54.4433H90.9204V117.961C90.9204 123.042 86.9279 127.034 81.8465 127.034C76.7651 127.034 72.7726 123.042 72.7726 117.961V54.4433H54.6248V117.961C54.6248 123.042 50.6323 127.034 45.5509 127.034C40.4696 127.034 36.477 123.042 36.477 117.961V54.4433H18.3293H18.1478Z"
            fill="white"
          />
        </svg>

        Supprimer une catégorie
      </button>
      <button class="add__movies" @click.prevent="openAddCategoryPopup">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" fill="#fff" />
        </svg>
        Ajouter une catégorie
      </button>
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
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 20px;
    max-width: 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    form {
      display: flex;
      flex-direction: column;
    }

    .ajouter__film {
      width: 100%;
      margin-bottom: 3vh;
    }

    h2 {
      font-size: 1.5em;
      color: #e50914; // Rouge Netflix
      margin-bottom: 20px;
    }

    p {
      font-size: 1.2em;
      color: #333;
      margin-bottom: 16px;
    }

    select {
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1em;
      outline: none;
    }

    button {
      background-color: #e50914;
      color: white;
      padding: 10px 20px;
      border: none;
      width: 140px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1.2em;
      margin-right: 10px;

      &:hover {
        background-color: #ff3b2f;
      }

      &:last-child {
        margin-right: 0;
      }
    }
    .container__button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .submit {
      background-color: #ff3b2f !important;
    }
    .close {
      background-color: #5c5c5c !important;
    }
  }
}

.category {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100vh;
  padding: 3rem;
  padding-top: 13vh;
  z-index: 15;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;

  .category__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    color: var(--white);
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
      margin-left: 20px;
      width: 220px;
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

  .movies {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    gap: 10px;
  }
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
    transition: background-color 0.3s ease, transform 0.3s ease;
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

  .container__add__button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .delete__movies {
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
      background-color: #7979796f;
      border: 3px solid #7979796f;
      transition: all 0.2s cubic-bezier(0.42, 0, 0, 1.59);
      gap: 10px;

      &:hover {
        background-color: #bd081c;
        transform: scale(1.05);
      }
    }
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
</style>
