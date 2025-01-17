<script>
import { mapMutations, mapState } from "vuex";

export default {
  props: ["movie", "fetchMovies", "deleteMovie"],

  computed: {
    ...mapState(["isPopupOpen", "isPopupEdit", "dataMovieEdit"]),
  },

  watch: {
    isPopupEdit(newValue, oldValue) {
      if (oldValue && !newValue) {
        this.fetchMovies();
      }
    },
  },

  data() {
    return {
      showDeleteConfirmation: false,
    };
  },

  methods: {
    ...mapMutations([
      "togglePopup",
      "clearDataMovieInfo",
      "addDataMovieInfo",
      "togglePopupEdit",
      "clearDataMovieEdit",
      "addDataMovieEdit",
    ]),

    createMovieData(movie) {
      return {
        id: movie.id,
        title: movie.title,
        category: movie.category,
        actors: movie.actors.map((actor) => {
          return {
            id: actor.id,
            firstName: actor.firstName,
            lastName: actor.lastName,
          };
        }),
        date: movie.releaseDate,
        duration: movie.duration,
        description: movie.description,
        trailer: movie.trailer,
        imageName: movie.imageName,
      };
    },
    handleClick() {
      const movieData = this.createMovieData(this.movie);
      this.clearDataMovieInfo();
      this.addDataMovieInfo(movieData);
      this.togglePopup();
    },
    handleEdit() {
      const movieData = this.createMovieData(this.movie);
      this.clearDataMovieEdit();
      this.addDataMovieEdit(movieData);
      this.togglePopupEdit();
      console.log(movieData);
    },
    redirectToMoviePage(event) {
      if (event.target.tagName.toLowerCase() !== "button") {
        this.$router.push({
          name: "MovieInformation",
          params: { id: this.movie.id },
        });
      }
    },
    redirectToMovieWatch(event) {
      if (event.target.tagName.toLowerCase() !== "button") {
        this.$router.push({ name: "Watch", params: { id: this.movie.id } });
      }
    },
    async confirmDeleteMovie() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token is missing");
          return;
        }

        await this.deleteMovie(this.movie.id);
        this.closeDeleteConfirmation();
      } catch (error) {
        console.error("Error deleting movie", error);
      }
    },

    openDeleteConfirmation() {
      this.showDeleteConfirmation = true;
    },
    closeDeleteConfirmation() {
      this.showDeleteConfirmation = false;
    },
  },
  mounted() {},
};
</script>

<template>
  <div v-if="showDeleteConfirmation" class="popup-container">
    <div class="popup">
      <p class="popup-message">Voulez-vous vraiment supprimer ce film ?</p>
      <div class="popup-buttons">
        <button class="popup-button" @click="confirmDeleteMovie">Oui</button>
        <button class="popup-button cancel" @click="closeDeleteConfirmation">
          Annuler
        </button>
      </div>
    </div>
  </div>
  <div class="card" @click="redirectToMoviePage">
    <img
      class="couverture__film"
      loading="lazy"
      :src="movie.imageName"
      alt=""
    />
    <div class="card__hover">
      <div class="container__poster">
        <img
          class="couverture__film__hover"
          loading="lazy"
          :src="movie.imageName"
          alt=""
        />
      </div>
      <div class="container__info">
        <div class="interaction">
          <div class="feedback">
            <button @click.stop="redirectToMovieWatch">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ltr-4z3qvp e1svuwfo1"
                data-name="Play"
                aria-hidden="true"
              >
                <path
                  d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
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
        <div class="information">
          <p class="recommandation">Recommandé à 97%</p>
          <p class="age">13+</p>
          <p class="duree">{{ movie.duration }} min</p>
          <span class="resolution"> HD </span>
        </div>
        <div class="title">
          {{ movie.title }}
        </div>
        <div class="genre">
          {{ movie.category.name }}
        </div>
        <div class="genre">
          {{
            movie.actors
              .map((actor) => {
                return actor.firstName;
              })
              .join(", ")
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.popup {
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  max-width: 400px;
  text-align: center;
}

.popup-message {
  margin-bottom: 20px;
  font-size: 16px;
}

.popup-buttons {
  display: flex;
  justify-content: center;
}

.popup-button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.popup-button.cancel {
  background-color: #555;
}
.card {
  cursor: pointer;
  position: relative;
  width: 15vw;
  height: 8.5vw;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  transition: transform 0.4s cubic-bezier(0.95, -0.01, 0.58, 1),
    z-index 0s cubic-bezier(0.95, -0.01, 0.58, 1) 0.5s;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;

  &:hover {
    z-index: 12;
  }

  // &:first-child {
  //   margin-left: 2.5vw;
  // }
  .couverture__film {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    z-index: 1;
    transition: opacity 0.3s ease-in-out 0.3s;
  }

  .card__hover {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -32%) scale(1);
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    overflow: hidden;
    transition: transform 0.2s cubic-bezier(0.95, -0.01, 0.58, 1) 0s,
      opacity 0.2s ease-in-out 0.1s;
    z-index: 11;
    box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;

    .container__poster {
      position: relative;
      width: 15vw;
      height: 8.5vw;
      overflow: hidden;

      iframe {
        width: 100%;
        height: 100%;
      }
      .couverture__film__hover {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
      }
    }
    .container__info {
      width: 100%;
      background-color: var(--black);
      color: var(--white);
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transform-origin: center;
      transition: opacity 0.3s cubic-bezier(1, -0.03, 0.25, 1),
        height 0.3s cubic-bezier(1, -0.03, 0.25, 1) 0.1s;
      padding: 0.9rem;
      gap: 10px;

      .interaction {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          width: 1.6vw;
          height: 1.6vw;
          background-color: transparent;
          border: 1.5px solid gray;
          color: var(--white);
          cursor: pointer;
          transition: color 0.3s;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.2s ease-in-out;

          svg {
            width: 0.8vw;
            height: 0.8vw;
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
      .information {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        row-gap: 5px;
        align-items: center;

        .recommandation {
          font-size: 0.7vw;
          margin-right: 0.5rem;
          color: #3ac03a;
        }
        .age {
          font-size: 0.5vw;
          margin-right: 0.5rem;
          padding: 0.1vw 0.2vw;
          border: 0.5px solid grey;
          color: grey;
        }
        .duree {
          font-size: 0.6vw;
          margin-right: 0.5rem;
          color: Grey;
        }
        .resolution {
          font-size: 0.5vw;
          margin-right: 0.5rem;
          padding: 0vw 0.2vw;
          border: 0.5px solid grey;
          color: grey;
        }
      }
      .tilte {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.6vw;
        color: var(--white);
        font-weight: 100;
      }
      .genre {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.2rem;
        font-size: 0.6vw;
        color: var(--white);
        font-weight: 100;
      }
    }
  }

  &:hover .card__hover {
    opacity: 1;
    top: 50%;
    transform: translate(-50%, -50%) scale(1.5);
    z-index: 11;
    pointer-events: initial;
    transition: transform 0.3s cubic-bezier(0.95, -0.01, 0.58, 1) 0.3s,
      opacity 0.3s cubic-bezier(0.95, -0.01, 0.58, 1) 0.3s;
    box-shadow: rgba(0, 0, 0, 0.46) 0px 3px 8px;
  }
}

@media (max-width: 1180px) {
  .card {
    width: 20.5vw;
    height: 11.875vw;
  }
}

@media (max-width: 850px) {
  .card {
    width: 29.5vw;
    height: 16.875vw;

    .card__hover {
      .container__poster {
        width: 24vw;
        height: 13.5vw;
      }
      .container__info {
        .interaction {
          button {
            width: 2.5vw;
            height: 2.5vw;
            svg {
              width: 1.25vw;
              height: 1.25vw;
            }
          }
        }
        .information {
          .recommandation {
            font-size: 1.25vw;
          }
          .age {
            font-size: 1vw;
            padding: 0.25vw 0.5vw;
          }
          .duree {
            font-size: 1.25vw;
          }
          .resolution {
            font-size: 1vw;
            padding: 0vw 0.5vw;
          }
        }
        .tilte {
          font-size: 1.25vw;
        }
        .genre {
          font-size: 1.25vw;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .card {
    width: 34.5vw;
    height: 19.875vw;

    .card__hover{
      .container__poster {
        width: 29vw;
        height: 16.5vw;
      }
      .container__info {
        .interaction {
          button {
            width: 3vw;
            height: 3vw;
            svg {
              width: 1.5vw;
              height: 1.5vw;
            }
          }
        }
        .information {
          .recommandation {
            font-size: 1.5vw;
          }
          .age {
            font-size: 1.25vw;
            padding: 0.25vw 0.5vw;
          }
          .duree {
            font-size: 1.5vw;
          }
          .resolution {
            font-size: 1.25vw;
            padding: 0vw 0.5vw;
          }
        }
        .tilte {
          font-size: 1.5vw;
        }
        .genre {
          font-size: 1.5vw;
        }
      }
    }
  }
}

@media (max-width: 497px){
  .card {
    width: 73vw;
    height: 41vw;

    .card__hover{
      .container__poster {
        width: 73vw;
    height: 41vw;
      }
      .container__info {
        .interaction {
          button {
            width: 8vw;
            height: 8vw;
            svg {
              width: 4vw;
              height: 4vw;
            }
          }
        }
        .information {
          .recommandation {
            font-size: 4vw;
          }
          .age {
            font-size: 3vw;
            padding: 0.5vw 1vw;
          }
          .duree {
            font-size: 4vw;
          }
          .resolution {
            font-size: 3vw;
            padding: 0vw 1vw;
          }
        }
        .tilte {
          font-size: 4vw;
        }
        .genre {
          font-size: 4vw;
        }
      }
    }
  }
}
</style>
