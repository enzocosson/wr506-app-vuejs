<script>
import { mapMutations, mapState } from "vuex";
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  props: {
    movie: Object,
  },
  computed: {
    ...mapState(["isPopupOpen"]),
  },
  methods: {
    ...mapMutations(["togglePopup"]),
    handleClick() {
      this.togglePopup();
      console.log(this.isPopupOpen);
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
  <div>
    <div class="screen__info" :class="{ 'popup__open': isPopupOpen }">
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
              src="https://occ-0-3052-56.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABaTH5Fbb203jYBUbirr4kJZFnzFX4lSg4QlcMUdgTDrbsXWRjaxTDGteRernx_YNmDkgDR2LvNBEibenDLBJKWWI8v8zgiSfr5kg.webp?r=8c5"
              alt=""
            />

            <div class="couverture__info">
              <div class="title">TAPIE</div>

              <div class="interaction">
                <button class="lecture">
                  <img class="icon" src="/icons/play.svg" alt="" />
                  Lecture
                </button>
                <button>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ltr-4z3qvp e1svuwfo1"
                    data-name="Checkmark"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M21.2928 4.29285L22.7071 5.70706L8.70706 19.7071C8.51952 19.8946 8.26517 20 7.99995 20C7.73474 20 7.48038 19.8946 7.29285 19.7071L0.292847 12.7071L1.70706 11.2928L7.99995 17.5857L21.2928 4.29285Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="ltr-4z3qvp e1svuwfo1"
                    data-name="ThumbsUp"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z"
                      fill="currentColor"
                    ></path>
                  </svg>
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
            </div>
          </div>
          <div class="movie__details">
            <div class="principal">
              <div class="information">
                <p class="recommandation">Recommandé à 97%</p>
                <p class="date">2023</p>
                <p class="duree">60 min</p>
                <span class="resolution"> HD </span>
              </div>
              <p class="age">13+</p>
              <p class="description">
                Un homme ordinaire à l'ambition sans bornes devient l'une des
                personnalités publiques les plus controversées de France, dans
                ce biopic fictionnel sur Bernard Tapie.
              </p>
            </div>
            <div class="secondaire">
              <p>
                <span>Distribution : </span>Laurent Lafitte, Joséphine Japy,
                Patrick d'Assumçao
              </p>
              <p><span>Genre : </span>Aventure, Action</p>
            </div>
          </div>
          <div class="similaire">
            <h2>Titres similaires</h2>
            <div class="container__card">
              <SimilaireCard
                v-for="movie in firstFourMovies"
                :key="movie.title"
                :movie="movie"
              />
            </div>
          </div>
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
  align-items: flex-end;
  z-index: 999;
  opacity: 0;
  pointer-events: none;

  .container__info {
    width: 930px;
    height: 97vh;
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
        height: 550px;
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
            font-size: 9vw;
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
}
.popup__open{
  opacity: 1;
  pointer-events: all;
}
</style>
