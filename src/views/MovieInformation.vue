<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/travaux/wr506-symfony/public/index.php/api";
const movie = ref(null);
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
    const response = await axios.get(`${apiUrl}/movies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    movie.value = response.data;
    console.log("id", movie);
  } catch (error) {
    console.error("Error", error);
    if (error.response.data.code === 401) {
      localStorage.removeItem("token");
    }
    this.$router.push("/login");
  }
};
const navigateToCategory = (id, router) => {
  router.push({ name: "CategoryInformation", params: { id } });
};

const navigateToActor = (id, router) => {
  router.push({ name: "ActorInformation", params: { id } });
};
</script>

<template>
  <div class="container__movie">
    <div v-if="movie" class="container__movie">
      <div class="movie__image">
        <img :src="movie.imageName" alt="Movie Poster" />
      </div>
      <div class="movie__information">
        <h1>{{ movie.title }}</h1>
        <p
          class="category__name"
          @click="() => navigateToCategory(movie.category.id, $router)"
        >
          {{ movie.category.name }}
        </p>
        <div class="container__distribution">
          <span class="distribution-label">Distribution :</span>
          <div class="actor-list">
            <div
              v-for="actor in movie.actors"
              :key="actor.id"
              class="actor-item"
              @click="() => navigateToActor(actor.id, $router)"
            >
              {{ `${actor.firstName} ${actor.lastName}` }}
            </div>
          </div>
        </div>

        <p>{{ movie.description }}</p>
        <div class="movie__details">
          <div class="movie__details__item">
            <h3>Release Date</h3>
            <p>{{ movie.releaseDate }}</p>
          </div>
          <div class="movie__details__item">
            <h3>Duration</h3>
            <p>{{ movie.duration }} mins</p>
          </div>
        </div>
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

  .top__nav {
    margin-bottom: 20px;

    svg {
      width: 45px;
      height: 45px;
      fill: #f9f9f9;
      cursor: pointer;

      &:hover {
        fill: #ff0000; // Couleur au survol
      }
    }
  }

  .movie__image {
    img {
      width: 100%;
      height: auto;
      border-radius: 10px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    }
  }

  .movie__information {
    display: flex;
    text-align: center;
    margin-top: 20px;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem;

    .category__name {
      font-size: 1.3rem;
      color: var(--white);
      font-weight: 400;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      color: var(--white);
    }

    p {
      font-size: 1.3rem;
      margin-bottom: 20px;
      color: var(--white);
      font-weight: 300;

      span {
        font-size: 1.1rem;
        font-weight: bold;
      }
    }

    .container__distribution {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      margin: 1.5rem 0;
    }

    .distribution-label {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--white);
    }

    .actor-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      color: var(--white);
    }

    .actor-item {
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-decoration: underline;

      &:hover {
        text-decoration: underline;
      }
    }

    .movie__details {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;

      .movie__details__item {
        padding: 10px;
        background-color: #333;
        border-radius: 5px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        h3 {
          font-size: 1.5rem;
          margin-bottom: 5px;
          color: #f9f9f9;
        }

        p {
          font-size: 1.2rem;
          color: #bdbdbd;
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
