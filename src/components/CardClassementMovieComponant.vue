<script>
export default {
  props: {
    movie: Object, // Remplacez Object par le type de données attendu pour la prop movie
  },
};
</script>

<template>
  <div class="card">
    <div class="container__number">
      <p class="number">{{ movie.classement }}</p>
    </div>
    <div class="container__poster">
      <img class="couverture__film" :src="movie.posterPortrait" alt="" />
    </div>
    <div class="card__hover">
      <div class="container__poster">
        <img class="couverture__film__hover" :src="movie.poster" alt="" />
      </div>
      <div class="container__info">
        <h3 class="title">{{ movie.title }}</h3>
        <p class="description">
          <span>Description:</span> {{ movie.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  cursor: pointer;
  position: relative;
  width: 14vw;
  height: 11.5vw;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.084);
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  transition: transform 0.4s cubic-bezier(0.95, -0.01, 0.58, 1),
    z-index 0s cubic-bezier(0.95, -0.01, 0.58, 1) 0.5s;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;

  .container__number{
    position: relative;
    width: 52%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    .number{
      position: absolute;
      top: 52%;
      left: 80%;
      transform: translate(-50%, -50%);
      color: #000;
      font-size: 15vw;
      font-weight: bold;
      z-index: 1;
      -webkit-text-stroke: 0.25vw #595959;
    }
  }
  .container__poster {
    position: relative;
    width: 10vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .couverture__film {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 1px;
      z-index: 1;
      transition: opacity 0.3s ease-in-out 0.3s;
    }
  }

  &:hover {
    z-index: 12;
  }

  &:first-child {
    margin-left: 2.5vw;
  }

  // &:hover .couverture__film{
  // opacity: 0;
  // }
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
      height: 5vw;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transform-origin: center;
      transition: opacity 0.3s cubic-bezier(1, -0.03, 0.25, 1),
        height 0.3s cubic-bezier(1, -0.03, 0.25, 1) 0.1s;

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1vw;
        font-weight: bold;
      }
      .description {
        font-size: 0.8vw;
      }
      .description span {
        font-weight: bold;
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
