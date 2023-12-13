<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardMovieComponent from "./CardMovieComponant.vue";

const apiUrl = "https://127.0.0.1:8000/api";
const firstFourMovies = ref([]);

const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}

const fetchMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const movies = response.data["hydra:member"];

    // Obtenir les 4 premiers films
    firstFourMovies.value = movies.slice(0, 30);
  } catch (error) {
    console.error("Error", error);
    console.log(error.response.data.code);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
    }
    this.$router.push("/login");
    return;
  }
};

onMounted(() => {
  fetchMovies();
});
</script>



<template>
  <div class="catalogue">
    <div class="theme">
    <div class="container__title__presentation">
      <!-- <a class="title__presentation" href="#">Appréciés sur Netflix</a> -->
      <a class="explorer" href="#"
        >Tout explorer <img src="/icons/arrow-explorer.svg" alt=""
      /></a>
    </div>
      <div
        class="movies"
        :style="{ transform: `translateX(${moviesLeft}vw)` }"
      >
        <CardMovieComponent
          v-for="movie in firstFourMovies"
          :key="movie.title"
          :movie="movie"
          @redirectToMoviePage="redirectToMoviePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalogue{
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
    .title__presentation {
      text-decoration: none;
      color: var(--white);
      font-size: 1.4vw;
      font-weight: bold;
      transform: translateX(0vw);

      &:hover + .explorer {
        opacity: 1;
        transform: translateX(0vw);
      }
    }
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
}
</style>

