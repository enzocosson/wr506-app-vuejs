<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    movie: Object,
  },
  computed: {
    ...mapState(["isPopupOpen"]),
    ...mapState(["isPopupEdit"]),
  },
  methods: {
  ...mapMutations(["togglePopup"]),
  ...mapMutations(["togglePopupEdit"]),
   redirectToMoviePage(event) {
      if (event.target.tagName.toLowerCase() !== "button") {
        this.$router.push({ name: "Watch", params: { id: this.movie.id } });
      }
    },
  handleClick() {
    this.togglePopup();
  },
  handleEdit() {
      this.togglePopupEdit();
    },
}
};
</script>


<template>
  <div class="card" @click="redirectToMoviePage">
    <img class="couverture__film" loading="lazy" :src="movie.poster" alt="" />
    <div class="card__hover">
      <div class="container__poster">
        <img
          class="couverture__film__hover"
          loading="lazy"
          :src="movie.poster"
          alt=""
        />
      </div>
      <div class="container__info">
        <div class="interaction">
          <div class="feedback">
            <button>
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
            <button @click.stop="handleEdit">
              <svg width="50" height="50" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M0 57V72H15L59.24 27.76L44.24 12.76L0 57ZM70.84 16.16C72.4 14.6 72.4 12.08 70.84 10.52L61.48 1.15999C59.92 -0.40001 57.4 -0.40001 55.84 1.15999L48.52 8.47999L63.52 23.48L70.84 16.16Z" fill="#F9F9F9"/>
              </svg>
            </button>
          </div>
          <button class="more__info" @click.stop="handleClick">
            <svg
              width="142"
              height="142"
              viewBox="0 0 142 142"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="path-1-inside-1_532_566" fill="white">
                <path
                  d="M71 0.289062L141.711 70.9997L71 141.71L0.289323 70.9997L71 0.289062Z"
                />
              </mask>
              <path
                d="M141.711 70.9997L155.853 85.1419L169.995 70.9997L155.853 56.8576L141.711 70.9997ZM56.8579 14.4312L127.569 85.1419L155.853 56.8576L85.1421 -13.8531L56.8579 14.4312ZM127.569 56.8576L56.8579 127.568L85.1421 155.853L155.853 85.1419L127.569 56.8576Z"
                fill="var(--white)"
                mask="url(#path-1-inside-1_532_566)"
              />
            </svg>
          </button>
        </div>
        <div class="information">
          <p class="recommandation">Recommandé à 97%</p>
          <p class="age">13+</p>
          <p class="duree">{{ movie.duration }} min</p>
          <span class="resolution"> HD </span>
        </div>
        <div class="genre">
          {{ movie.category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
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
</style>
