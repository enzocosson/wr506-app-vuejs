<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/api";
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
    movie.value = response.data; // Assurez-vous que la structure des données correspond à votre API
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
  <div class="container__player">
    <div class="top__nav">
      <router-link to="/">
        <svg
          width="45"
          height="45"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64 28H15.32L37.68 5.64L32 0L0 32L32 64L37.64 58.36L15.32 36H64V28Z"
            fill="#F9F9F9"
          />
        </svg>
      </router-link>
    </div>
    <iframe
      v-if="movie"
      width="100%"
      height="100%"
      :src="`${movie.trailer}?autoplay=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    ></iframe>
  </div>
</template>

<style scoped lang="scss">
.container__player {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
  background-color: var(--black);

  .top__nav {
    position: absolute;
    padding: 2rem 3rem;
    width: 100%;
    height: 20%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, var(--black), transparent);
    z-index: 10000;
  }
}
</style>
