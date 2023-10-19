<script>
export default {
  props: {
    movie: Object, // Remplacez Object par le type de données attendu pour la prop movie
  },

  setup(props) {
    // Vous pouvez accéder à la prop movie directement via props
    console.log(props.movie);
  },
};
</script>

<template>
  <div class="card">
    <img class="couverture__film" :src="movie.poster" alt="" />
    <div class="card__hover">
      <div class="container__poster">
        <img class="couverture__film__hover" :src="movie.poster" alt="" />
      </div>
      <div class="container__info">
        <div class="interaction">
          <div class="feedback">
            <button>+</button>
            <button>+</button>
            <button>+</button>
          </div>
          <button>></button>
        </div>
        <div class="information">
          <p class="recommandation">
            Recommandé à 97%
          </p>
          <p class="age">
            13+
          </p>
          <p class="duree">
            {{ movie.duration  }} min
          </p>
          <span class="resolution">
            HD
          </span>
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

  &:first-child {
    margin-left: 2.5vw;
  }

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
            font-size: 1vw;
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
            &:hover {
              background-color: rgba(255, 255, 255, 0.126);
            }

            &:first-child {
              border: 1.5px solid var(--white);
              background-color: var(--white);
              color: var(--black);
            }
          }

        .feedback {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.2rem;
          
        }
      }
      .information{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .recommandation{
          font-size: 0.7vw;
          margin-right: 0.5rem;
          color: #3ac03a;
        }
        .age{
          font-size: 0.5vw;
          margin-right: 0.5rem;
          padding: 0.1vw 0.2vw;
          border: 0.5px solid grey;
          color: grey;
        }
        .duree{
          font-size: 0.6vw;
          margin-right: 0.5rem;
          color: Grey;
        }
        .resolution{
          font-size: 0.5vw;
          margin-right: 0.5rem;
          padding: 0vw 0.2vw;
          border: 0.5px solid grey;
          color: grey;
        }
      }
      .genre{
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
