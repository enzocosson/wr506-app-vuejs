<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const apiUrl = "https://127.0.0.1:8000/api";
const actorsData = ref([]);
const showDeleteConfirmation = ref(false);
const selectedActor = ref(null);
let actorToDelete = null;
const nationalitesTable = ref([]);
const moviesTable = ref([]);
const selectedFilm = ref(null);
const selectedMovies = ref([]);

const token = localStorage.getItem("token");

const currentPage = ref(1);
const itemsPerPage = 30;
const totalActors = ref([]);
const totalPages = computed(() => Math.ceil(totalActors.value / itemsPerPage));
const searchQuery = ref("");
const filteredActors = ref([]);

//----------------------------- popup ajout acteur -----------------------------------
const isAddCategoryPopupOpen = ref(false);

const openAddCategoryPopup = () => {
  isAddCategoryPopupOpen.value = true;
};

//----------------------------- popup ajout acteur -----------------------------------

const fetchActors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/actors`, {
      params: {
        page: currentPage.value,
        itemsPerPage: itemsPerPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const actors = response.data["hydra:member"];
    totalActors.value = response.data["hydra:totalItems"];
    actorsData.value = actors.map((actor) => {
      return {
        ...actor,
        selectedMovies: actor.movies.map((movie) => ({
          id: movie.id,
          title: movie.title,
        })),
      };
    });

    filterByTitle();
  } catch (error) {
    console.error("Erreur lors de la récupération des acteurs :", error);
  }
};

const filterByTitle = () => {
  filteredActors.value = actorsData.value.filter((actor) =>
    actor.firstName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};


const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchActors();
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchActors();
  }
};

const fetchMovies = async () => {
  try {
    const response = await axios.get("https://127.0.0.1:8000/api/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    moviesTable.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};
const filteredMovies = computed(() => {
  return moviesTable.value.filter(
    (movie) =>
      !selectedMovies.value.some(
        (selectedMovie) => selectedMovie.id === movie.id
      )
  );
});

const fetchNationalites = async () => {
  try {
    const response = await axios.get(
      "https://127.0.0.1:8000/api/nationalites",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    nationalitesTable.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Error fetching nationalites:", error);
  }
};

const openDeleteConfirmation = (actor) => {
  actorToDelete = actor;
  showDeleteConfirmation.value = true;
};

const closeDeleteConfirmation = () => {
  showDeleteConfirmation.value = false;
  actorToDelete = null;
};

const confirmDeleteActor = async () => {
  try {
    if (actorToDelete) {
      const response = await axios.delete(
        `${apiUrl}/actors/${actorToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        fetchActors();
      }
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'acteur :", error);
  } finally {
    closeDeleteConfirmation();
  }
};

const handleEdit = async (actor) => {
  (selectedMovies.value = actor.movies.map((movie) => ({
    id: movie.id,
    title: movie.title,
  }))),
    (selectedActor.value = {
      id: actor.id,
      firstName: actor.firstName,
      lastName: actor.lastName,
      movies: selectedMovies.value,
      nationalite: actor.nationalite,

      photo: actor.photo,
    });

  selectedActor.value.show = true;
};

const handleEditCancel = () => {
  selectedActor.value = false;
};

const handleEditSubmit = async () => {
  try {
    if (selectedActor.value) {
      const response = await axios.put(
        `${apiUrl}/actors/${selectedActor.value.id}`,

        {
          firstName: selectedActor.value.firstName,
          lastName: selectedActor.value.lastName,
          movies: selectedMovies.value.map(
            (movie) => `/api/movies/${movie.id}`
          ),
          nationalite: `/api/nationalites/${selectedActor.value.nationalite.id}`,
          photo: selectedActor.value.photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        fetchActors();
        selectedActor.value = null;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la modification de l'acteur :", error);
  }
};

const addMovie = () => {
  const selectedFilmValue = selectedFilm.value;

  if (selectedFilmValue) {
    if (
      !selectedMovies.value.some((movie) => movie.id === selectedFilmValue.id)
    ) {
      selectedMovies.value.push(selectedFilmValue);
    }
  }
};

const removeMovie = (index) => {
  selectedMovies.value.splice(index, 1);
};

const newActor = ref({
  firstName: "",
  lastName: "",
  nationalite: "",
  photo: "",
  movies: [],
});

const submitActorForm = async () => {
  try {
    const response = await axios.post(
      `${apiUrl}/actors`,
      {
        firstName: newActor.value.firstName,
        lastName: newActor.value.lastName,
        nationalite: `/api/nationalites/${newActor.value.nationalite}`,
        photo: newActor.value.photo,
        movies: newActor.value.movies.map(
          (movieId) => `/api/movies/${movieId.id}`
        ),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      newActor.value = {
        firstName: "",
        lastName: "",
        nationalite: "",
        photo: "",
        movies: [],
      };
      isAddCategoryPopupOpen.value = false;
      fetchActors();
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'acteur :", error);
  }
};
const addMovieToSelection = () => {
  const selectedFilmValue = selectedFilm.value;

  if (selectedFilmValue) {
    if (
      !newActor.value.movies.some((movie) => movie.id === selectedFilmValue.id)
    ) {
      newActor.value.movies.push(selectedFilmValue);
    }
  }
};

onMounted(() => {
  fetchMovies();
  fetchActors();
  fetchNationalites();
  filterByTitle();
});
</script>

<template>
  <div v-if="isAddCategoryPopupOpen" class="popup__add__actor">
    <div class="popup__content">
      <h2>Ajouter un acteur</h2>

      <form @submit.prevent="submitActorForm">
        <label for="firstName">Prénom:</label>
        <input
          v-model="newActor.firstName"
          type="text"
          id="firstName"
          required
        />

        <label for="lastName">Nom:</label>
        <input v-model="newActor.lastName" type="text" id="lastName" required />

        <div class="movies-selection">
          <label for="selectedMovies">Films sélectionnés :</label>
          <div class="selected-movies">
            <ul>
              <li v-for="movie in newActor.movies" :key="movie.id">
                {{ movie.title }}
                <button @click.prevent="removeMovieFromSelection(movie)">
                  Supprimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="movies-selection">
          <label for="selectFilm">Sélectionner un film :</label>
          <select v-model="selectedFilm" id="selectFilm">
            <option v-for="film in moviesTable" :key="film.id" :value="film">
              {{ film.title }}
            </option>
          </select>
          <button @click.prevent="addMovieToSelection">Ajouter Film</button>
        </div>

        <label for="nationalite">Nationalité :</label>
        <select v-model="newActor.nationalite" class="category" required>
          <option
            v-for="nationalite in nationalitesTable"
            :key="nationalite.id"
            :value="nationalite.id"
          >
            {{ nationalite.nationalite }}
          </option>
        </select>

        <label for="photo">Photo:</label>
        <input v-model="newActor.photo" type="text" id="photo" required />

        <button type="submit">Ajouter</button>
      </form>

      <button @click="isAddCategoryPopupOpen = false">Fermer</button>
    </div>
  </div>

  <div class="actor">
    <div v-if="showDeleteConfirmation" class="popup-container">
      <div class="popup">
        <p class="popup-message">Voulez-vous vraiment supprimer ce film ?</p>
        <div class="popup-buttons">
          <button class="popup-button" @click="confirmDeleteActor">Oui</button>
          <button class="popup-button cancel" @click="closeDeleteConfirmation">
            Annuler
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedActor" class="popup-container">
      <div class="container__scroll">
        <div class="popup">
          <h2>Modifier un acteur</h2>
          <form>
            <label for="editFirstName">Prénom:</label>
            <input
              v-model="selectedActor.firstName"
              type="text"
              id="editFirstName"
            />

            <label for="editLastName">Nom:</label>
            <input
              v-model="selectedActor.lastName"
              type="text"
              id="editLastName"
            />

            <!-- film section -->
            <div class="container__actors__selection">
              <div
                class="container__actor__selected"
                v-if="selectedMovies.length > 0"
              >
                <label>Films sélectionnés :</label>
                <div class="container__film">
                  <ul>
                    <li v-for="movie in selectedMovies" :key="movie.id">
                      {{ movie.title }}
                      <button
                        @click="removeMovie(selectedMovies.indexOf(movie))"
                      >
                        Supprimer
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="container__selection__actor">
                <label for="selectFilm">Sélectionner un film :</label>
                <select v-model="selectedFilm" id="selectFilm" class="category">
                  <option
                    v-for="film in filteredMovies"
                    :key="film.id"
                    :value="film"
                  >
                    {{ film.title }}
                  </option>
                </select>

                <button @click.prevent="addMovie">Ajouter Film</button>
              </div>
            </div>

            <!-- film section -->

            <label for="editNationalite">Nationalité :</label>
            <select v-model="selectedActor.nationalite" class="category">
              <option
                v-for="nationalite in nationalitesTable"
                :key="nationalite.id"
                :value="nationalite"
              >
                {{ nationalite.nationalite }}
              </option>
            </select>

            <label for="editPhoto">Photo:</label>
            <input v-model="selectedActor.photo" type="text" id="editPhoto" />

            <div class="container__button">
              <button class="cancel__button" @click.prevent="handleEditCancel">
                Annuler
              </button>
              <button class="submit__button" @click.prevent="handleEditSubmit">
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="category__header">
      <div class="search-input">
        <input
          v-model="searchQuery"
          @input="filterByTitle"
          placeholder="Rechercher par nom"
        />
      </div>
    </div>

    <div class="container__card">
      <div class="card__actor" v-for="actor in filteredActors" :key="actor.id">
        <img :src="actor.photo" :alt="'photo de ' + actor.firstName" />
        <div class="info">
          <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
          <p class="nationalite">{{ actor.nationalite.nationalite }}</p>
          <div class="container__button__info">
            <button class="edit__button" @click.stop="handleEdit(actor)">
              <svg
                width="50"
                height="50"
                viewBox="0 0 72 72"
                fill="var(--black)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 57V72H15L59.24 27.76L44.24 12.76L0 57ZM70.84 16.16C72.4 14.6 72.4 12.08 70.84 10.52L61.48 1.15999C59.92 -0.40001 57.4 -0.40001 55.84 1.15999L48.52 8.47999L63.52 23.48L70.84 16.16Z"
                  fill="var(--black)"
                />
              </svg>
            </button>
            <button
              class="edit__button"
              @click.stop="openDeleteConfirmation(actor)"
            >
              <svg
                width="128"
                height="146"
                viewBox="0 0 128 146"
                fill="var(--black)"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.4433 0C44.4621 0 36.2956 8.1665 36.2956 18.1478H18.1478C8.1665 18.1478 0 26.3143 0 36.2956H127.034C127.034 26.3143 118.868 18.1478 108.887 18.1478H90.7389C90.7389 8.1665 82.5724 0 72.5911 0H54.4433ZM18.1478 54.4433V141.734C18.1478 143.73 19.5996 145.182 21.5959 145.182H105.62C107.616 145.182 109.068 143.73 109.068 141.734V54.4433H90.9204V117.961C90.9204 123.042 86.9279 127.034 81.8465 127.034C76.7651 127.034 72.7726 123.042 72.7726 117.961V54.4433H54.6248V117.961C54.6248 123.042 50.6323 127.034 45.5509 127.034C40.4696 127.034 36.477 123.042 36.477 117.961V54.4433H18.3293H18.1478Z"
                  fill="var(--black)"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
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
      Ajouter un acteur
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
      :disabled="currentPage >= totalPages"
      class="pagination-button"
    >
      Suivant
    </button>
  </div>
</template>

<style scoped lang="scss">
.popup__add__actor {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000000;

  .popup__content {
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    padding: 20px;
    width: 561px;
    text-align: center;

    h2 {
      font-size: 1.5em;
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

    .movies-selection {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      width: 100%;

      label {
        font-size: 1.2em;
        margin-bottom: 8px;
        color: #333;
      }

      select {
        width: 100%;
        padding: 10px;
        margin-bottom: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1em;
      }
    }
    .category {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1em;
    }
  }
}
.actor {
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1vh;
  overflow: hidden;
  z-index: 2;
  padding: 2rem 3rem;
  padding-top: 6rem;
  gap: 4vh;

  .popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000000;

    .popup {
      width: 400px;
      background: var(--black);
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      padding: 2rem;
      text-align: center;
      position: relative;
      color: var(--white);
      z-index: 1000000;

      label {
        display: block;
        font-size: 1rem;
        margin-top: 10px;
      }

      input {
        width: 100%;
        padding: 10px;
        margin: 5px 0;
        border: 1px solid #ccc;
        background-color: transparent;
        border-radius: 4px;
        box-sizing: border-box;
        color: var(--white);
      }
      .container__film {
        height: 300px;
        width: 100%;
        overflow: scroll;
      }
      ul {
        width: 100%;
        list-style: none;
        padding: 0;
        margin: 0;
        color: var(--black);
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          color: var(--white);
          button {
            padding: 10px;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            background-color: #e50914;
            color: var(--black);
            cursor: pointer;
            transition: background-color 0.3s;
            &:hover {
              background-color: #bd081c;
            }
            &:nth-child(1) {
              background-color: #4b4b4b;
              color: var(--white);
            }
          }
        }
      }

      button {
        background-color: #e50914;
        color: white;
        border: none;
        padding: 10px 20px;
        margin-top: 20px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 1rem;
        transition: background-color 0.3s;
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

      div {
        margin-top: 10px;
      }

      .popup-buttons {
        display: flex;
        justify-content: center;
      }

      .popup-button {
        background-color: #e50914;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 0 10px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 14px;
      }

      .popup-button.cancel {
        background-color: #555;
      }
    }

    .container__scroll {
      width: 719px;
      height: 90vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: auto;
      border-radius: 0.5rem;

      .popup {
        width: 100%;
        background: var(--black);
        border-radius: 8px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        padding: 2rem;
        text-align: center;
        position: relative;
        color: var(--white);
        z-index: 1000000;

        label {
          display: block;
          font-size: 1rem;
          margin-top: 10px;
        }

        input {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ccc;
          background-color: transparent;
          border-radius: 4px;
          box-sizing: border-box;
          color: var(--white);
        }
        .container__film {
          height: 300px;
          width: 100%;
          overflow: scroll;
        }
        ul {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
          color: var(--black);
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            color: var(--white);
            button {
              padding: 10px;
              border: none;
              border-radius: 4px;
              font-size: 16px;
              background-color: #e50914;
              color: var(--black);
              cursor: pointer;
              transition: background-color 0.3s;
              &:hover {
                background-color: #bd081c;
              }
            }
          }
        }

        button {
          background-color: #e50914;
          color: white;
          border: none;
          padding: 10px 20px;
          margin-top: 20px;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1rem;
          transition: background-color 0.3s;
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

        div {
          margin-top: 10px;
        }
      }
    }
  }
  .container__actors__selection {
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    justify-content: space-between;

    .container__actor__selected {
      width: 43%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }

  .container__selection__actor {
    width: 43%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 1rem;

    label {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 5px;
      color: #fff;
    }
    button {
      padding: 10px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      background-color: #33c56b;
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s;
      width: 100%;
      &:hover {
        background-color: rgb(64, 154, 100);
      }
    }
  }

  .category {
    width: 100%;
    padding: 10px;
    border: 1px solid var(--white);
    border-radius: 4px;
    font-size: 16px;
    background-color: transparent;
    color: var(--white);
    outline: none;
    &::placeholder {
      color: var(--white);
    }
    &:focus {
      border-color: #c55454;
    }
  }
  textarea {
    width: 100%;
    padding: 10px;
    border: 2px solid #b7b7b7;
    border-radius: 4px;
    font-size: 16px;
    background-color: transparent;
    color: var(--white);
    outline: none;
    &:focus {
      border-color: #c55454;
    }
  }
  .popup-message {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .popup-buttons {
    display: flex;
    justify-content: center;
  }

  .popup-button {
    background-color: #e50914;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
  }

  .popup-button.cancel {
    background-color: #555;
  }
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
  .container__card {
    position: relative;
    width: 100%;
    height: auto;
    color: var(--black);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 15px;
    .card__actor {
      position: relative;
      width: 15.2vw;
      height: 24vw;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      transition: 0.3s;
      cursor: pointer;
      padding: 2rem;
      margin: 0.5rem 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-start;
      border: 2px solid var(--white);
      transition: transform 0.3s cubic-bezier(0.42, 0, 0, 1.61),
        z-index 0s cubic-bezier(0.95, -0.01, 0.58, 1) 0.5s;
      box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;
      overflow: hidden;

      .info {
        position: absolute;
        bottom: 0%;
        left: 0;
        height: 35%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1rem 1rem;
        gap: 5px;
        opacity: 1;
        transition: 0.5s ease-in-out;
        background-color: var(--white);
        overflow: hidden;

        h2 {
          color: #bd081c;
          font-size: 1.2vw;
          text-align: center;
        }

        .container__button__info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          button {
            width: 2.3vw;
            height: 2.3vw;
            background-color: transparent;
            border: 1.5px solid var(--black);
            color: var(--black);
            cursor: pointer;
            transition: color 0.3s;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.2s ease-in-out;

            svg {
              width: 40%;
              height: 40%;
            }

            &:hover {
              background-color: rgba(255, 255, 255, 0.126);
              border: 1.5px solid var(--black);
            }
          }
        }
      }
      .nationalite {
        color: var(--black);
        font-size: 0.8vw;
        border-radius: 0px 5px 0px 0px;
      }

      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0.3;
        transition: 0.2s ease-in-out;
      }

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        border: 2px solid var(--white);
      }
      &:hover img {
        opacity: 1;
      }
      &:hover .info {
        opacity: 1;
      }
    }
  }
}

.container__add__button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;

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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 50px;
  color: white;
  font-weight: bold;
  gap: 10px;

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
}
</style>
