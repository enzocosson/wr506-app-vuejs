<script>
export default {
  props: {
    movie: Object,
  },
};
</script>

<template>
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
      <div class="information">
        <p class="recommandation">Recommandé à 97%</p>
      </div>
      <div class="age__date">
        <span class="age">TOUS PUBLICS</span>
        <span class="date">2021</span>
      </div>
      <p class="description">
        Un homme ordinaire à l'ambition sans bornes devient l'une des
        personnalités publiques les plus controversées de France, dans ce biopic
        fictionnel sur Bernard Tapie.
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card__hover {
  cursor: pointer;
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
    width: 265px;
    height: 150px;
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
    width: 265px;
    height: 205px;
    background-color: #2f2f2f;
    color: var(--white);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    opacity: 1;
    transform-origin: center;
    transition: opacity 0.3s cubic-bezier(1, -0.03, 0.25, 1),
      height 0.3s cubic-bezier(1, -0.03, 0.25, 1) 0.1s;
    padding: 0.9rem;
    gap: 3px;
    .information {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      row-gap: 2px;
      align-items: center;

      .recommandation {
        font-size: 1rem;
        margin-right: 0.5rem;
        color: #3ac03a;
      }
      .age {
        font-size: 0.8rem;
        margin-right: 0.5rem;
        padding: 0.1vw 0.2vw;
        border: 0.5px solid grey;
        color: grey;
      }
      .duree {
        font-size: 0.8rem;
        margin-right: 0.5rem;
        color: Grey;
      }
      .resolution {
        font-size: 0.8rem;
        margin-right: 0.5rem;
        padding: 0vw 0.2vw;
        border: 0.5px solid grey;
        color: grey;
      }
    }
    .age__date {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10px;
      color: #bcbcbc;
      .age {
        border: 1px solid hsla(0, 0%, 100%, 0.4);
        font-family: Netflix Sans, Helvetica Neue, Segoe UI, Roboto, Ubuntu,
          sans-serif;
        overflow: hidden;
        padding: 0 0.4em;
        text-overflow: ellipsis;
        text-transform: uppercase;
        unicode-bidi: normal /*!rtl:plaintext*/;
        white-space: nowrap;
      }
    }
    .description {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.2rem;
      font-size: 0.9rem;
      color: #d2d2d2;
      font-weight: 100;
      margin-top: 1rem;
    }
  }
}
</style>
