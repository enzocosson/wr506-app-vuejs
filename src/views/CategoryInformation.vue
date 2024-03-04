<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/travaux/wr506-symfony/public/index.php/api";
const categorie = ref(null);
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
    const response = await axios.get(`${apiUrl}/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    categorie.value = response.data;
    console.log("id", categorie);
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
    <div v-if="categorie" class="container__movie">
      <div class="movie__information">
        <h1>{{ categorie.name }}</h1>
        <h2>Nombre de films :</h2>

        <p>
          <template v-for="movie in categorie.movies" :key="movie.id">
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
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: center;

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
        font-size: 1.5vw;
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
