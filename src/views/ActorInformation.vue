<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://127.0.0.1:8000/api";
const actor = ref(null);
const token = localStorage.getItem("token");
const route = useRoute();

if (!token) {
  window.location.href = "/login";
}

onMounted(() => {
  const id = route.params.id;
  fetchMovie(id);
});

const fetchMovie = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/actors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    actor.value = response.data;
    console.log("id", actor);
  } catch (error) {
    console.error("Error", error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
    }
    this.$router.push("/login");
  }
};
</script>

<template>
  <div class="container__movie">
    <div v-if="actor" class="container__movie">
  <div class="container__img">
    <img :src="actor.photo" alt="" />
  </div>
  <div class="movie__information">
        <h1>{{ actor.firstName }} {{ actor.lastName }}</h1>
        <p class="nationalite">{{ actor.nationalite.nationalite }}
        </p>
        <h2>Nombre de films :</h2>

        <p>
          <template v-for="movie in actor.movies" :key="movie.id">
            <router-link
              :to="{ name: 'MovieInformation', params: { id: movie.id } }"
            >
              <p>{{ movie.title }}</p>
            </router-link>
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container__movie {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 10vh;
  justify-content: center;

  .container__img{
    width: 35vw;
    height: 25vw;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: auto;
      border-radius: 10px;
    }
  }
  .container__movie {
    height: 100vh;
    display: flex;
    align-items: center;
    padding: 20px;
    justify-content: center;

    .movie__information {
      text-align: center;
      color: #fff;
      width: 100%;
      padding: 2rem;
      border-radius: 10px;

      .nationalite{
        font-size: 2vw;
        font-weight: bold;
        margin-bottom: 3rem;
      }

      h1 {
        font-size: 4vw;
        margin-bottom: 3rem;
      }

      h2 {
        font-size: 1.5vw;
        font-weight: 400;
        margin-bottom: 3rem;
      }
      p {
        font-size: 1vw;
        margin-bottom: 10px;

        a {
          display: block;
          margin-top: 5px;
          color: #bdbdbd;
          text-decoration: underline;

          &:hover {
            color: #ff0000;
          }
        }
      }
    }
  }
}
</style>
