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


// ----------------------------------------------------------

const moviesLeft = ref(0);
let showLeftButton = false;

const moveRight = () => {
  moviesLeft.value -= 92.5;
  showLeftButton = true;
  document.querySelector(".movies").classList.add("show-before");
};

const moveLeft = () => {
  if (moviesLeft.value < 0) {
    moviesLeft.value += 92.5;
    if (moviesLeft.value === 0) {
      showLeftButton = false;
      document.querySelector(".movies").classList.remove("show-before");
    }
  } else {
    showLeftButton = true;
    document.querySelector(".movies").classList.add("show-before");
  }
};



</script>

<template>
  <div class="theme">
    <div class="container__title__presentation">
      <a class="title__presentation" href="#">Appréciés sur Netflix</a>
      <a class="explorer" href="#"
        >Tout explorer <img src="/icons/arrow-explorer.svg" alt=""
      /></a>
    </div>
    <div class="movies">
      <button class="move-left" v-if="showLeftButton" @click="moveLeft">
        <svg
          width="142"
          height="142"
          viewBox="0 0 142 142"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_532_566" fill="white">
            <path
              d="M71 0.289062L141.711 70.9997L71 141.71L0.289323 70.9997L71 0.289062Z"
            />
          </mask>
          <path
            d="M141.711 70.9997L155.853 85.1419L169.995 70.9997L155.853 56.8576L141.711 70.9997ZM56.8579 14.4312L127.569 85.1419L155.853 56.8576L85.1421 -13.8531L56.8579 14.4312ZM127.569 56.8576L56.8579 127.568L85.1421 155.853L155.853 85.1419L127.569 56.8576Z"
            fill="#f9f9f9"
            mask="url(#path-1-inside-1_532_566)"
          />
        </svg>
      </button>
      <button class="move-right" @click="moveRight">
        <svg
          width="142"
          height="142"
          viewBox="0 0 142 142"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask id="path-1-inside-1_532_566" fill="white">
            <path
              d="M71 0.289062L141.711 70.9997L71 141.71L0.289323 70.9997L71 0.289062Z"
            />
          </mask>
          <path
            d="M141.711 70.9997L155.853 85.1419L169.995 70.9997L155.853 56.8576L141.711 70.9997ZM56.8579 14.4312L127.569 85.1419L155.853 56.8576L85.1421 -13.8531L56.8579 14.4312ZM127.569 56.8576L56.8579 127.568L85.1421 155.853L155.853 85.1419L127.569 56.8576Z"
            fill="#f9f9f9"
            mask="url(#path-1-inside-1_532_566)"
          />
        </svg>
      </button>
      <div
        class="slider__movies"
        :style="{ transform: `translateX(${moviesLeft}vw)` }"
      >
        <CardMovieComponent
          v-for="movie in firstFourMovies"
          :key="movie.title"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

  & > div:nth-child(2) > .slider__movies > div:nth-child(1) {
    margin-left: 2.5vw !important; 
  
  }

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
    justify-content: flex-start;
    align-items: flex-end;

    .move-left {
      transform: translateX(-100%);
    }

    .move-right {
      transform: translateX(0);
    }

    .slider__movies {
      position: relative;
      gap: 0.5rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: 0.5s ease-in-out;
      height: 8.5vw;
    }

    &:before {
      display: none;
      content: "";
      width: 7%;
      height: 100%;
      position: absolute;
      top: 0;
      left: -1rem;
      background: linear-gradient(to right, #141414b5, transparent);
      z-index: 11;
    }

    &:after {
      content: "";
      width: 7%;
      height: 100%;
      position: absolute;
      top: 0;
      right: -1rem;
      background: linear-gradient(to left, #141414b5, transparent);
    }

    .move-left,
    .move-right {
      cursor: pointer;
      position: absolute;
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 11;
      border: none;
      width: 1.5vw;
    }
    .move-left {
      left: 1rem;
      top: 50%;
      transform: translateY(-50%) rotate(180deg);
    }
    .move-right {
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .show-before {
    &:before {
      display: block;
    }
  }
}
</style>
