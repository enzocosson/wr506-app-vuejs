<script setup>
import PopupInfo from "../components/PopupInfo.vue";
import PopupEdit from "../components/PopupEdit.vue";
import CatalogeMoviesComponant from "../components/CatalogueMoviesComponant.vue";
</script>

<template>
  <div class="movies">
    <PopupInfo />
    <PopupEdit />
    <CatalogeMoviesComponant />
  </div>
</template>

<style scoped lang="scss">
.movies {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-bottom: 1vh;
  overflow: hidden;
  z-index: 1;
  padding: 0 2rem;

  .mute__button {
    position: absolute;
    top: 55%;
    right: 0;
    transform: translateY(-50%);

    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    z-index: 1;

    .button {
      cursor: pointer;
      width: 2.5vw;
      height: 2.5vw;
      border-radius: 50%;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.7);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;

      .sound-on {
        display: none;
      }
      .sound-off {
        display: block;
      }
    }

    .rectangle {
      align-items: center;
      background-color: rgba(51, 51, 51, 0.6);
      border: 3px #dcdcdc;
      border-left-style: solid;
      box-sizing: border-box;
      display: flex;
      font-size: 1.1vw;
      height: 2.4vw;
      padding: 0.5vw 5vw 0.5vw 0.8vw;
      color: var(--white);
    }
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, var(--black), transparent);
    z-index: 0;
  }
  .img_couverture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: none;
  }
  .ba_couverture {
    width: 100%;
    height: 140%;
    object-fit: cover;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  .info {
    width: 95%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    z-index: 1;
    gap: 20px;
    h3 {
      position: relative;
      right: 0.5vw;
      color: var(--white);
      font-size: 4vw;
      font-weight: bold;
    }
    .description {
      width: 50%;
      color: #fff;
      font-size: 1.2vw;
      font-weight: 400;
      line-height: normal;
      margin-top: 0.1vw;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
    }
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin-top: 1vw;

      .icon {
        width: 23px;
        height: 23px;
        margin-right: 10px;
      }

      .lecture {
        width: 170px;
        cursor: pointer;
        align-items: center;
        appearance: none;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem 2rem;
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
      }
      .plus_info {
        width: 200px;
        cursor: pointer;
        align-items: center;
        appearance: none;
        border: 0px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        opacity: 1;
        padding: 0.8rem 2rem;
        position: relative;
        user-select: none;
        will-change: background-color, color;
        word-break: break-word;
        white-space: nowrap;
        font-weight: 500;
        font-size: 1.3rem;
        color: var(--white);
        background-color: rgba(109, 109, 110, 0.7);
      }
    }
  }
  .presentation {
    width: 100%;
    height: auto;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;
    z-index: 1;

    .container__title__presentation {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 2.5%;
      .title__presentation {
        text-decoration: none;
        color: var(--white);
        font-size: 1.4vw;
        font-weight: bold;
        transform: translateX(0vw);

        &:hover + .explorer {
          opacity: 1;
          transform: translateX(0vw);
        }
      }
      .explorer {
        text-decoration: none;
        color: #54b9c5;
        font-size: 0.9vw;
        font-weight: normal;
        margin-left: 0.8rem;
        transform: translateX(-0.5vw);
        opacity: 0;
        transition: 0.8s ease-in-out;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 0.7vw;
          height: 0.7vw;
          margin-top: 0.1vw;
          fill: #54b9c5;
        }
      }
    }
    .movies {
      position: relative;
      width: 100%;
      height: auto;
      color: var(--black);
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;

      .move-left {
        transform: translateX(-100%);
      }

      .move-right {
        transform: translateX(0);
      }

      .slider__movies {
        position: relative;
        gap: 0.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transition: 0.5s ease-in-out;
        height: 8.5vw;
      }

      &:before {
        display: none;
        content: "";
        width: 7%;
        height: 100%;
        position: absolute;
        top: 0;
        left: -1rem;
        background: linear-gradient(to right, #141414b5, transparent);
        z-index: 11;
      }

      &:after {
        content: "";
        width: 7%;
        height: 100%;
        position: absolute;
        top: 0;
        right: -1rem;
        background: linear-gradient(to left, #141414b5, transparent);
      }

      .move-left,
      .move-right {
        cursor: pointer;
        position: absolute;
        background-color: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 11;
        border: none;
        width: 1.5vw;
      }
      .move-left {
        left: 1rem;
        top: 50%;
        transform: translateY(-50%) rotate(180deg);
      }
      .move-right {
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .show-before {
      &:before {
        display: block;
      }
    }
  }
}
</style>
