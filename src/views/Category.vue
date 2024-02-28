<script setup>
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import CardMovieComponent from "../components/CardMovieComponant.vue";
import PopupInfo from "../components/PopupInfo.vue";
import PopupEdit from "../components/PopupEdit.vue";

const apiUrl = "https://127.0.0.1:8000/api";
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
</script>

<template>
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
  <PopupInfo />
  <!-- pop up edit -->
  <PopupEdit :movieData="movieData" />
</template>

<style scoped lang="scss">
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
    margin-bottom: 10px;
    font-size: 1.5rem;

    .container__filtre__categories {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 20px;
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
      border: 1px solid #ccc;
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
}
</style>
