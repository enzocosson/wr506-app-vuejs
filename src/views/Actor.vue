<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
// import PopupInfo from "../components/PopupInfo.vue";

// ----------------------------------------------------------

const apiUrl = "https://127.0.0.1:8000/api";
const actorsData = ref([]);

// Récupérer le jeton d'authentification depuis le localstorage
const token = localStorage.getItem("token");

const fetchActors = async () => {
  try {
    const response2 = await axios.get(`${apiUrl}/authors`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const actor = response2.data["hydra:member"];
    actorsData.value = actor;
    console.log(actorsData.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
  fetchActors();
});
</script>

<template>
  <div class="actor">
    <div class="card__actor" v-for="actor in actorsData" :key="actor.id">
      <img :src="actor.photo" :alt="'photo de ' + actor.firstName" />
      <div class="info">
        <div class="banniere">
        <h2>{{ actor.firstName }} {{ actor.lastName }}</h2>
      </div>
      <button class="edit__button" @click.stop="handleEdit">
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
      <button class="edit__button" @click.stop="openDeleteConfirmation">
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

    .info{
      position: absolute;
      top: 70%;
      left: 0;
      height: 40px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      opacity: 0.3;
      transition: 0.5s ease-in-out;
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
