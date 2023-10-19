<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CatalogeComponant from "../components/CatalogueComponant.vue";

// ----------------------------------------------------------

const apiUrl2 = "https://127.0.0.1:8000/api";
const firstFourMovies2 = ref([]);

// Récupérer le jeton d'authentification depuis le localstorage
const token = localStorage.getItem('token');

const fetchMovies2 = async () => {
  try {
    const response2 = await axios.get(`${apiUrl2}/movies`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const movies2 = response2.data["hydra:member"];

    // Obtenir les 4 premiers films
    firstFourMovies2.value = movies2.slice(0, 1);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
  fetchMovies2();
});

const isSoundOn = ref(true);

const toggleSound = () => {
  isSoundOn.value = !isSoundOn.value;
};
</script>

<template>
  <div class="home">
    <img
      class="img_couverture"
      src="https://media.idownloadblog.com/wp-content/uploads/2014/12/interstellar-new-film-poster-art-nolan-9-wallpaper.jpg"
      alt=""
    />
    <!-- video -->
    <video autoplay muted loop class="ba_couverture">
      <source src="/videos/spiderman-trailer.mp4" type="video/mp4" />
    </video>

    <div class="info" v-for="movies2 in firstFourMovies2" :key="movies2.title">
      <h3 class="title">Spider-man : Homecoming</h3>
      <p class="description">
        <span>Description: </span>Peter Parker reprend la routine au lycée
        jusqu'à l'arrivée du Vautour qui lui donne l'occasion de faire ses
        preuves grâce à ses super-pouvoirs d'homme-araignée.
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
    <div class="mute__button">
      <button class="button" @click="toggleSound">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ltr-4z3qvp e1svuwfo1"
          :class="{ 'sound-off': isSoundOn, 'sound-on': !isSoundOn }"
          data-name="VolumeHigh"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M24 12C24 8.28693 22.525 4.72597 19.8995 2.10046L18.4853 3.51468C20.7357 5.76511 22 8.81736 22 12C22 15.1826 20.7357 18.2348 18.4853 20.4852L19.8995 21.8995C22.525 19.2739 24 15.713 24 12ZM11 3.99995C11 3.59549 10.7564 3.23085 10.3827 3.07607C10.009 2.92129 9.57889 3.00685 9.29289 3.29285L4.58579 7.99995H1C0.447715 7.99995 0 8.44767 0 8.99995V15C0 15.5522 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0786 10.3827 20.9238C10.7564 20.7691 11 20.4044 11 20V3.99995ZM5.70711 9.70706L9 6.41417V17.5857L5.70711 14.2928L5.41421 14H5H2V9.99995H5H5.41421L5.70711 9.70706ZM16.0001 12C16.0001 10.4087 15.368 8.88254 14.2428 7.75732L12.8285 9.17154C13.5787 9.92168 14.0001 10.9391 14.0001 12C14.0001 13.0608 13.5787 14.0782 12.8285 14.8284L14.2428 16.2426C15.368 15.1174 16.0001 13.5913 16.0001 12ZM17.0709 4.92889C18.9462 6.80426 19.9998 9.3478 19.9998 12C19.9998 14.6521 18.9462 17.1957 17.0709 19.071L15.6567 17.6568C17.157 16.1565 17.9998 14.1217 17.9998 12C17.9998 9.87823 17.157 7.8434 15.6567 6.34311L17.0709 4.92889Z"
            fill="currentColor"
          ></path>
        </svg>
        <!-- icon mute -->
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="ltr-4z3qvp e1svuwfo1"
          :class="{ 'sound-on': isSoundOn, 'sound-off': !isSoundOn }"
          data-name="VolumeOff"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11 4.00003C11 3.59557 10.7564 3.23093 10.3827 3.07615C10.009 2.92137 9.57889 3.00692 9.29289 3.29292L4.58579 8.00003H1C0.447715 8.00003 0 8.44774 0 9.00003V15C0 15.5523 0.447715 16 1 16H4.58579L9.29289 20.7071C9.57889 20.9931 10.009 21.0787 10.3827 20.9239C10.7564 20.7691 11 20.4045 11 20V4.00003ZM5.70711 9.70714L9 6.41424V17.5858L5.70711 14.2929L5.41421 14H5H2V10H5H5.41421L5.70711 9.70714ZM15.2929 9.70714L17.5858 12L15.2929 14.2929L16.7071 15.7071L19 13.4142L21.2929 15.7071L22.7071 14.2929L20.4142 12L22.7071 9.70714L21.2929 8.29292L19 10.5858L16.7071 8.29292L15.2929 9.70714Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <div class="rectangle">10+</div>
    </div>
  </div>
  <!-- catalogue -->

  <CatalogeComponant />
</template>

<style scoped lang="scss">
.home {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 1vh;
  overflow: hidden;
  z-index: 1;

  .mute__button {
    position: absolute;
    top: 55%;
    right: 0;
    transform: translateY(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    z-index: 1;

    .button {
      cursor: pointer;
      width: 2.5vw;
      height: 2.5vw;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.7);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;

      .sound-on {
        display: none;
      }
      .sound-off {
        display: block;
      }
    }

    .rectangle {
      align-items: center;
      background-color: rgba(51, 51, 51, 0.6);
      border: 3px #dcdcdc;
      border-left-style: solid;
      box-sizing: border-box;
      display: flex;
      font-size: 1.1vw;
      height: 2.4vw;
      padding: 0.5vw 5vw 0.5vw 0.8vw;
      color: var(--white);
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, var(--black), transparent);
    z-index: 0;
  }
  .img_couverture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: none;
  }
  .ba_couverture {
    width: 100%;
    height: 140%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .info {
    width: 95%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    gap: 20px;
    h3 {
      position: relative;
      right: 0.5vw;
      color: var(--white);
      font-size: 4vw;
      font-weight: bold;
    }
    .description {
      width: 50%;
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
        background-color: var(--white);
        word-break: break-word;
        white-space: nowrap;
        font-weight: 500;
        font-size: 1.3rem;
        color: var(--black);
        text-decoration: none;
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
  .presentation {
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
}
</style>
