<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const apiUrl = "https://127.0.0.1:8000/api";
const actorsData = ref([]);
const showDeleteConfirmation = ref(false);
const selectedActor = ref(false);
let actorToDelete = null;
const nationalitesTable = ref([]);

const token = localStorage.getItem("token");

const fetchActors = async () => {
  try {
    const response = await axios.get(`${apiUrl}/actors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const actor = response.data["hydra:member"];
    actorsData.value = actor;
  } catch (error) {
    console.error("Erreur lors de la récupération des acteurs :", error);
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

const moviesTable = ref([]);
const selectedMovies = ref([]);

const handleEdit = async (actor) => {
  console.log("Actor:", actor);

  // Le reste du code reste inchangé
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

const filteredMovies = computed(() => {
  return moviesTable.value.filter(
    (movie) =>
      !selectedMovies.value.some(
        (selectedMovie) => selectedMovie.id === movie.id
      )
  );
});

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


onMounted(() => {
  fetchMovies();
  fetchActors();
  fetchNationalites();
});
</script>

<template>
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
      <div class="popup">
        <!-- Inside the popup div -->
        <form @submit.prevent="handleEditSubmit">
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
          <div v-if="selectedMovies.length > 0">
            <label>Films sélectionnés :</label>
            <div class="container__film">
              <ul>
                <li v-for="(movie, index) in selectedMovies" :key="index">
                  {{ movie.title }}
                  <button @click="removeMovie(index)">Supprimer</button>
                </li>
              </ul>
            </div>
          </div>

          <label for="selectFilm">Sélectionner un film :</label>
          <select v-model="selectedFilm" id="selectFilm" class="category">
            <option v-for="film in filteredMovies" :key="film.id" :value="film">
              {{ film.title }}
            </option>
          </select>

          <button @click="addMovie">Ajouter Film</button>

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

          <button type="submit">Modifier</button>
        </form>
        <button class="popup-button cancel" @click="handleEditCancel">
          Annuler
        </button>
      </div>
    </div>

    <div class="card__actor" v-for="actor in actorsData" :key="actor.id">
      <img :src="actor.photo" :alt="'photo de ' + actor.firstName" />
      <div class="info">
        <div class="banniere">
          <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
        </div>
        <button class="edit__button" @click.stop="handleEdit(actor)">
          <svg
            width="50"
            height="50"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 57V72H15L59.24 27.76L44.24 12.76L0 57ZM70.84 16.16C72.4 14.6 72.4 12.08 70.84 10.52L61.48 1.15999C59.92 -0.40001 57.4 -0.40001 55.84 1.15999L48.52 8.47999L63.52 23.48L70.84 16.16Z"
              fill="#F9F9F9"
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
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.4433 0C44.4621 0 36.2956 8.1665 36.2956 18.1478H18.1478C8.1665 18.1478 0 26.3143 0 36.2956H127.034C127.034 26.3143 118.868 18.1478 108.887 18.1478H90.7389C90.7389 8.1665 82.5724 0 72.5911 0H54.4433ZM18.1478 54.4433V141.734C18.1478 143.73 19.5996 145.182 21.5959 145.182H105.62C107.616 145.182 109.068 143.73 109.068 141.734V54.4433H90.9204V117.961C90.9204 123.042 86.9279 127.034 81.8465 127.034C76.7651 127.034 72.7726 123.042 72.7726 117.961V54.4433H54.6248V117.961C54.6248 123.042 50.6323 127.034 45.5509 127.034C40.4696 127.034 36.477 123.042 36.477 117.961V54.4433H18.3293H18.1478Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <p class="nationalite">{{ actor.nationalite.nationalite }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  z-index: 1;
  padding: 6rem 2rem;

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
    z-index: 1000;
  }

  .popup {
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    position: relative;

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
      border-radius: 4px;
      box-sizing: border-box;
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

    button.cancel {
      background-color: #555;
    }

    button:hover {
      background-color: #ff3d2e;
    }

    div {
      margin-top: 10px;
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

  .card__actor {
    position: relative;
    width: 350px;
    height: 220px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    cursor: pointer;
    padding: 2rem;
    margin: 0.5rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    overflow: hidden;
    border: 2px solid var(--white);

    .info {
      position: absolute;
      top: 60%;
      left: 0;
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      opacity: 0.3;
      transition: 0.5s ease-in-out;
    }
    .nationalite{
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 0.2rem 1.5rem;
      background-color: rgb(28, 28, 28);
      color: var(--white);
      font-size: 1rem;
      border-radius: 0px 5px 0px 0px;
    }

    .banniere {
      height: 100%;
      width: 150px;
      background-color: var(--white);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;
      border-radius: 0px 50px 50px 0px;
      transition: 0.5s ease-in-out;

      h2 {
        font-size: 1rem;
        color: var(--black);
        text-align: center;
        z-index: 10;
      }
    }

    button {
      width: 40px;
      height: 40px;
      background-color: transparent;
      border: 1.5px solid var(--white);
      color: var(--white);
      cursor: pointer;
      transition: color 0.3s;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;

      svg {
        width: 15px;
        height: 15px;
      }

      &:hover {
        background-color: rgba(255, 255, 255, 0.126);
        border: 1.5px solid var(--white);
      }

      &:first-child {
        border: 1.5px solid var(--white);
        background-color: var(--white);
        color: var(--black);
      }
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
      border: 5px solid var(--white);
    }
    &:hover img {
      opacity: 1;
    }
    &:hover .info {
      opacity: 1;
    }
    &:hover .banniere {
      width: 180px;
    }
  }
}
</style>
