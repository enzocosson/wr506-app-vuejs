<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    movie: Object,
  },
  computed: {
    ...mapState(["isPopupEdit"]),
  },
  methods: {
    ...mapMutations(["togglePopupEdit"]),
    handleClick() {
      this.togglePopupEdit();
      console.log(this.isPopupEdit);
    },
  },
};

const apiUrl = "https://127.0.0.1:8000/api";
const firstFourMovies = ref([]);

const token = localStorage.getItem("token");

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
    console.error("Erreur lors de la récupération des films :", error);
  }
};

onMounted(() => {
  fetchMovies();
});
</script>

<template>
  <div class="screen__info" :class="{ popup__open: isPopupEdit }">
    <button class="close__button" @click="handleClick">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="ltr-4z3qvp e1svuwfo1"
        data-name="X"
        aria-labelledby="preview-modal-81087883"
        data-uia="previewModal-closebtn"
        role="button"
        aria-label="close"
        tabindex="0"
      >
        <title id="preview-modal-81087883">close</title>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.5858 12L2.29291 3.70706L3.70712 2.29285L12 10.5857L20.2929 2.29285L21.7071 3.70706L13.4142 12L21.7071 20.2928L20.2929 21.7071L12 13.4142L3.70712 21.7071L2.29291 20.2928L10.5858 12Z"
          fill="var(--white)"
        ></path>
      </svg>
    </button>
    <div class="container__info">
      <div class="container__image">
        <img src="/images/img-couverture.webp" alt="" />
      </div>
      <div class="movie__details">
        <div class="principal">
          <div class="information">
            <p class="titre">Spider-man</p>
            <p class="recommandation">Recommandé à 97%</p>
            <p class="date">2023</p>
            <p class="duree">60 min</p>
            <span class="resolution"> HD </span>
          </div>
          <p class="age">13+</p>
          <p class="description">
            Un homme ordinaire à l'ambition sans bornes devient l'une des
            personnalités publiques les plus controversées de France, dans ce
            biopic fictionnel sur Bernard Tapie.
          </p>
        </div>
        <div class="secondaire">
          <p>
            <span>Distribution : </span>Laurent Lafitte, Joséphine Japy, Patrick
            d'Assumçao
          </p>
          <p><span>Genre : </span>Aventure, Action</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.screen__info {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000a4;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  opacity: 0;
  pointer-events: none;

  .close__button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    background-color: var(--black);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    border: none;
  }

  .container__info {
    width: 800px;
    height: 95vh;
    background-color: var(--black);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: auto;

    .container__image{
      width: 100%;
      height: 40%;
      position: relative;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .movie__details {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 2rem;

      .principal {
        width: 530px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        .information {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          row-gap: 5px;
          align-items: center;

          .recommandation {
            font-size: 16px;
            margin-right: 0.5rem;
            color: #46d369;
            font-weight: 500;
          }
          .date {
            font-size: 16px;
            margin-right: 0.5rem;
            padding: 0rem 0.2rem;
            color: grey;
          }
          .duree {
            font-size: 16px;
            margin-right: 0.5rem;
            color: Grey;
          }
          .resolution {
            font-size: 0.8rem;
            margin-right: 0.5rem;
            padding: 0 0.3rem;
            border: 0.5px solid grey;
            color: grey;
          }
        }
        .age {
          width: auto;
          font-size: 0.8rem;
          margin-right: 0.5rem;
          padding: 0rem 0.2rem;
          border: 0.5px solid var(--white);
          color: var(--white);
        }
        .description {
          margin-top: 2rem;
          font-size: 15px;
          color: var(--white);
          line-height: 1.6rem;
        }
      }
      .secondaire {
        width: 250px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;

        p {
          font-size: 14px;
          color: var(--white);
          font-weight: 300;

          span {
            color: gray;
          }
        }
      }
    }
  }
}
.popup__open {
  opacity: 1;
  pointer-events: all;
  transform: translateX(0%);
}
</style>
