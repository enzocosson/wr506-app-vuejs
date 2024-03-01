<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";

const token = localStorage.getItem("token");
const categories = ref([]);
const actors = ref([]);

const fetchCategories = async () => {
  try {
    const response = await axios.get("https://127.0.0.1:8000/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    categories.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const fetchActors = async () => {
  try {
    const response = await axios.get("https://127.0.0.1:8000/api/actors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    actors.value = response.data["hydra:member"];
  } catch (error) {
    console.error("Error fetching actors:", error);
  }
};

onMounted(() => {
  fetchCategories();
  fetchActors();
});
</script>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["isPopupEdit", "dataMovieEdit"]),
    movieData() {
      return this.dataMovieEdit.length > 0 ? this.dataMovieEdit[0] : null;
    },
  },
  data() {
    return {
      formData: {
        title: "",
        description: "",
        poster: "",
        classement: "",
        trailer: "",
        date: "",
        duration: "",
        category: null,
        actors: [],
      },
      newActor: "",
      selectedActor: null,
      actors: [],
    };
  },

  watch: {
    isPopupEdit(newVal) {
      if (newVal) {
        this.formData.date = this.movieData
          ? this.formatForInput(this.movieData.date)
          : "";

        this.formData.category = this.movieData
          ? this.movieData.category
          : null;
      }
    },
    movieData: {
      handler(newMovieData) {
        this.formData = { ...newMovieData };
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations(["togglePopupEdit"]),
    handleClick() {
      this.togglePopupEdit();
    },
    formatForInput(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().slice(0, 10);
      return formattedDate;
    },

    submitForm() {
      const movieId = this.formData.id;
      const actorUrls = this.formData.actors.map(
        (actor) => `/api/actors/${actor.id}`
      );

      const url = `https://127.0.0.1:8000/api/movies/${movieId}`;
      const data = {
        category: this.formData.category["@id"],
        actors: actorUrls,
        title: this.formData.title,
        releaseDate: this.formData.date,
        duration: this.formData.duration,
        description: this.formData.description,
        poster: this.formData.poster,
        posterPortrait: this.formData.posterPortrait,
        classement: this.formData.classement,
        trailer: this.formData.trailer,
      };
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      fetch(url, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          this.togglePopupEdit();
        })
        
        .catch((error) => {
          console.error("Erreur lors de la requête PUT:", error);
        });
    },
    addActor() {
      if (this.selectedActor) {
        if (
          !this.formData.actors.some(
            (actor) => actor.id === this.selectedActor.id
          )
        ) {
          this.formData.actors.push(this.selectedActor);
        }
      }
    },
    removeActor(index) {
      this.formData.actors.splice(index, 1);
    },
  },
};
</script>

<template>
  <div>
    <div class="screen__info" :class="{ popup__open: isPopupEdit }">
      <div class="container__info">
        <div class="scroll__container">
          <div class="couverture">
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
            <img
              class="img__couverture"
              v-if="movieData"
              :src="movieData.poster"
              alt=""
            />

            <div class="couverture__info">
              <div class="title" v-if="movieData">{{ movieData.title }}</div>
            </div>
          </div>

          <form @submit.prevent="submitForm">
            <input
              v-model="formData.title"
              type="text"
              class="title"
              placeholder="Title"
            />

            <textarea
              v-model="formData.description"
              type="text"
              class="description"
              placeholder="Description"
            ></textarea>

            <input
              v-model="formData.poster"
              type="text"
              class="poster"
              placeholder="Poster"
            />
            <input
              v-model="formData.posterPortrait"
              type="text"
              class="poster"
              placeholder="Poster"
            />

            <input
              v-model="formData.classement"
              type="text"
              class="classement"
              placeholder="Classement"
            />

            <input
              v-model="formData.trailer"
              type="text"
              class="trailer"
              placeholder="Trailer"
            />

            <input
              v-model="formData.date"
              type="date"
              class="date"
              placeholder="Date"
            />

            <input
              v-model="formData.duration"
              type="text"
              class="duree"
              placeholder="Duration (min)"
            />

            <div class="container__category">
              <label for="selectCategory">Catégorie :</label>
              <select v-model="formData.category" class="category">
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="container__actors__selection">
              <div
                class="container__actor__selected"
                v-if="formData.actors.length > 0"
              >
                <label>Acteurs sélectionnés :</label>
                <ul>
                  <li v-for="(actor, index) in formData.actors" :key="index">
                    {{ actor.firstName }} {{ actor.lastName }}
                    <button @click.prevent="removeActor(index)">Supprimer</button>
                  </li>
                </ul>
              </div>

              <div class="container__selection__actor">
                <label for="selectActeur">Sélectionner un acteur :</label>
                <select
                  v-model="selectedActor"
                  id="selectActeur"
                  class="category"
                >
                  <option
                    v-for="actor in actors"
                    :key="actor.id"
                    :value="actor"
                  >
                    {{ actor.firstName }}
                  </option>
                </select>
                <button @click.prevent="addActor">Ajouter Acteur</button>
              </div>
            </div>
            <div class="container__button">
              <button class="cancel__button" type="button" @click="handleClick">
                Annuler
              </button>
              <button class="submit__button" type="submit">Submit</button>
            </div>
          </form>
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
  background-color: #0000006a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: 0;
  pointer-events: none;

  .container__info {
    width: 820px;
    height: 86vh;
    background-color: var(--black);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: auto;

    .scroll__container {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .couverture {
        position: relative;
        width: 100%;
        height: 307px;
        padding: 3rem;

        display: flex;
        justify-content: space-between;
        align-items: flex-end;

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

        .img__couverture {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          top: 0;
          left: 0;
        }
        &::after {
          content: "";
          width: 100%;
          height: 200px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: linear-gradient(to top, var(--black), transparent);
          z-index: 1;
        }
        .couverture__info {
          z-index: 3;

          .title {
            font-size: 3rem;
            font-weight: bold;
            color: var(--white);
          }
          .interaction {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 10px;

            button {
              width: 3vw;
              height: 3vw;
              background-color: transparent;
              border: 0.2vw solid gray;
              color: var(--white);
              cursor: pointer;
              transition: color 0.3s;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: 0.2s ease-in-out;

              svg {
                width: 1.3vw;
                height: 1.3vw;
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

            .lecture {
              width: 150px;
              cursor: pointer;
              align-items: center;
              appearance: none;
              border: 0px;
              border-radius: 4px;
              cursor: pointer;
              display: flex;
              justify-content: center;
              opacity: 1;
              padding: 1.25rem 1.2rem;
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

              .icon {
                width: 23px;
                height: 23px;
                margin-right: 10px;
              }
            }

            .more__info {
              svg {
                width: 0.6vw;
                height: 0.6vw;
                margin-bottom: 0.15vw;
                transform: rotate(90deg);
              }
            }
            .feedback {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 0.2rem;
            }
          }
        }
        .mute__button {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          z-index: 2;

          .button {
            cursor: pointer;
            width: 3vw;
            height: 3vw;
            border-radius: 50%;
            background-color: transparent;
            border: 1px solid var(--transparent-gray);
            color: var(--transparent-gray);
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.3s ease-in-out;

            svg {
              width: 1.5vw;
              height: 1.5vw;
              fill: var(--transparent-gray);
            }

            &:hover {
              background-color: #ffffff1b;
              border: 1px solid var(--white);
              color: var(--white);
            }

            .sound-on {
              display: none;
            }
            .sound-off {
              display: block;
            }
          }
        }
      }

      .movie__details {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 1rem 3rem;

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

      .similaire {
        h2 {
          font-size: 1.5rem;
          color: var(--white);
          margin: 2rem 3rem;
        }
        .container__card {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 3rem;
          row-gap: 1.8vw;
        }
      }
    }
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 90%;
    margin: 0 auto;
    border-radius: 8px;
    margin-top: 5vh;
    margin-bottom: 10vh;
    input {
      width: 100%;
      padding: 10px;
      border: 2px solid #b7b7b7;
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
      color: var(--white);
      outline: none;
      &:focus {
        border-color: #c55454;
      }
    }
    label {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 5px;
      color: #fff;
    }

    .container__actors__selection {
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      justify-content: space-between;

      .container__actor__selected {
        width: 43%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
        justify-content: flex-start;
      }
    }

    .container__selection__actor {
      width: 43%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      margin-top: 1rem;

      label {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 5px;
        color: #fff;
      }
      button {
        padding: 10px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        background-color: #33c56b;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        &:hover {
          background-color: rgb(64, 154, 100);
        }
      }
    }
    .container__category {
      display: flex;
      flex-direction: column;

      align-items: flex-start;
      gap: 10px;
      width: 100%;
      margin-top: 1rem;

      label {
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 5px;
        color: #fff;
      }
    }
    .category {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--white);
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
      color: var(--white);
      outline: none;
      &::placeholder {
        color: #333;
      }
      &:focus {
        border-color: #c55454;
      }
    }
    textarea {
      width: 100%;
      padding: 10px;
      border: 2px solid #b7b7b7;
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
      color: var(--white);
      outline: none;
      &:focus {
        border-color: #c55454;
      }
    }

    ul {
      width: 100%;
      list-style: none;
      padding: 0;
      margin: 0;
      color: white;
      background-color: rgb(31, 31, 31);
      padding: 10px;
      border-radius: 5px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        button {
          padding: 10px;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          background-color: #e50914;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s;
          &:hover {
            background-color: #bd081c;
          }
        }
      }
    }

    .container__button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      width: 100%;
      margin-top: 2rem;
      .cancel__button {
        padding: 10px;
        height: 50px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        background-color: #9b9b9b;
        color: var(--white);
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        font-weight: bold;
        &:hover {
          background-color: rgb(100, 100, 100);
        }
      }
      .submit__button {
        padding: 10px;
        height: 50px;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        background-color: #e50914;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        font-weight: bold;
        &:hover {
          background-color: #bd081c;
        }
      }
    }
  }
}
.popup__open {
  opacity: 1;
  pointer-events: all;
}
</style>
