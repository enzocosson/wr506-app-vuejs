<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import HeaderComponant from "../components/HeaderComponant.vue";

const apiUrl = "https://127.0.0.1:8000/api";
const firstFourActors = ref([]);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const fetchActor = async () => {
  try {
    const response = await axios.get(`${apiUrl}/authors`);
    const actors = response.data["hydra:member"];

    // Obtenir les 4 premiers films
    firstFourActors.value = actors.slice(0, 10);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
    fetchActor();
});
</script>

<template>
  <div class="home">
    <h1>Acteurs</h1>
   <HeaderComponant />

    <div class="movies">
      <div class="card" v-for="actors in firstFourActors" :key="actors.title">
        <h3 class="title">{{ actors.firstName }} {{ actors.lastName }}</h3>
        <ul>
          <li v-for="movie in actors.movies" :key="movie">
            {{ movie.title }}
          </li>
        </ul>
        <p><span>Nationalité : </span>{{ actors.nationalite.nationalite }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: var(--white);
}
h1 {
  color: var(--black);
  padding: 2rem;
}
.liens {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .link {
    text-decoration: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 3rem;
    background-color: var(--black);
    color: var(--white);
    border-radius: 0.3rem;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: rgb(203, 203, 203);
      color: var(--white);
    }
  }
}
.movies {
  width: 100%;
  color: var(--black);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .card {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 350px;
    height: auto;
    background-color: rgb(226, 226, 226);
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
    padding: 2em;
    border-radius: 0.5rem;

    .title {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    p span {
      font-weight: bold;
    }
  }
}
</style>
