<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, onMounted } from "vue";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/travaux/wr506-symfony/public/index.php/api";
const firstFourMovies = ref([]);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movies`);
    const movies = response.data["hydra:member"];

    // Obtenir les 4 premiers films
    firstFourMovies.value = movies.slice(0, 1);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
  fetchMovies();
});

const router = useRouter();
</script>

<template>
  <div>
    <div class="couverture" v-for="movie in firstFourMovies" :key="movie.title">
      <div class="info">
        <h3 class="title">{{ movie.title }}</h3>
        <p class="description">
          <span>Description: </span>{{ movie.description }}
        </p>
        <div class="buttons">
          <button class="lecture">
            <img class="icon" src="/icons/play.svg" alt="" />
            Lecture
          </button>
          <button class="plus_info">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
            >
              <path
                d="M36 20H44V28H36V20ZM36 36H44V60H36V36ZM40 0C17.92 0 0 17.92 0 40C0 62.08 17.92 80 40 80C62.08 80 80 62.08 80 40C80 17.92 62.08 0 40 0ZM40 72C22.36 72 8 57.64 8 40C8 22.36 22.36 8 40 8C57.64 8 72 22.36 72 40C72 57.64 57.64 72 40 72Z"
                fill="#fff"
              />
            </svg>

            Plus d'info
          </button>
        </div>
      </div>
      <img
        class="img_couverture"
        src="https://media.idownloadblog.com/wp-content/uploads/2014/12/interstellar-new-film-poster-art-nolan-9-wallpaper.jpg"
        alt=""
      />
      <!-- <p><span>Catégorie: </span> {{ movie.category.name }}</p> -->
      <!-- <p><span>Date de sortie: </span> {{ formatDate(movie.releaseDate) }}</p> -->
      <!-- <p><span>Durée: </span> {{ movie.duration }} minutes</p> -->
      <!-- <p><span>Acteurs: </span></p>
    <ul>
      <li v-for="actor in movie.actors" :key="actor">
        {{ actor.firstName }} {{ actor.lastName }}
      </li>
    </ul> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.couverture {
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--black);
  z-index: -1;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .info {
    width: 92%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 8vw;
    h3 {
      position: relative;
      right: 0.5vw;
      color: var(--white);
      font-size: 10vw;
      font-weight: bold;
    }
    .description {
      color: #fff;
      font-size: 1.2vw;
      font-weight: 400;
      line-height: normal;
      margin-top: 0.1vw;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 1vw;

      .icon {
        width: 23px;
        height: 23px;
        margin-right: 10px;
      }

      .lecture {
        width: 170px;
        cursor: pointer;
        align-items: center;
        appearance: none;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem 2rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        font-weight: 500;
        font-size: 1.3rem;
        color: var(--black);
      }
      .plus_info {
        width: 200px;
        cursor: pointer;
        align-items: center;
        appearance: none;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem 2rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        font-weight: 500;
        font-size: 1.3rem;
        color: var(--white);
        background-color: rgba(109, 109, 110, 0.7);
      }
    }
  }

  .img_couverture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    background: linear-gradient(to top, var(--black) 17%, transparent 100%);
  }
}
</style>
