<script setup>
import { ref } from "vue";

const isSearchInputVisible = ref(false);

const toggleSearchInput = () => {
  isSearchInputVisible.value = !isSearchInputVisible.value;
};
</script>

<template>
  <header>
    <nav>
      <img class="logo" src="/images/netflix-logo.png" alt="" />
      <router-link class="link" to="/">Accueil</router-link>
      <router-link class="link" to="/movie">Films</router-link>
      <router-link class="link" to="/actor">Acteurs</router-link>
      <router-link class="link" to="/category">Categories</router-link>
    </nav>
    <nav>
      <div class="search__container" v-if="isSearchInputVisible">
        <label for="searchInput">
          <img class="icon__search" src="/icons/search.svg" alt="" />
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder="Titres, personnes, genres"
          class="search__input"
        />
      </div>
      <img
        class="icon__search"
        src="/icons/search.svg"
        alt=""
        @click="toggleSearchInput"
      />
      <router-link class="link" to="/jeunesse">Jeunesse</router-link>
      <div class="news">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#f9f9f9"
          xmlns="http://www.w3.org/2000/svg"
          class="ltr-4z3qvp e1svuwfo1"
          data-name="Bell"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.0002 4.07092C16.3924 4.55624 19 7.4736 19 11V15.2538C20.0489 15.3307 21.0851 15.4245 22.1072 15.5347L21.8928 17.5232C18.7222 17.1813 15.4092 17 12 17C8.59081 17 5.27788 17.1813 2.10723 17.5232L1.89282 15.5347C2.91498 15.4245 3.95119 15.3307 5.00003 15.2538V11C5.00003 7.47345 7.60784 4.55599 11.0002 4.07086V2H13.0002V4.07092ZM17 15.1287V11C17 8.23858 14.7614 6 12 6C9.2386 6 7.00003 8.23858 7.00003 11V15.1287C8.64066 15.0437 10.3091 15 12 15C13.691 15 15.3594 15.0437 17 15.1287ZM8.62593 19.3712C8.66235 20.5173 10.1512 22 11.9996 22C13.848 22 15.3368 20.5173 15.3732 19.3712C15.3803 19.1489 15.1758 19 14.9533 19H9.0458C8.82333 19 8.61886 19.1489 8.62593 19.3712Z"
            fill="#f9f9f9"
          ></path>
        </svg>
      </div>
      <div class="profil">
        <div class="container__photo__profil">
          <img
            class="photo__profil"
            src="https://occ-0-2774-2773.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdS9-PqQ4EHBf2BjYYaTOjT7fBMWHKrJdmlvsPjoSNwitOMFIH-sUKb-lTd7RVFqtLvI8dA76JnhPsf6lC_-2LTyj1SDdgzQo9WT.png?r=236"
            alt=""
          />
        </div>
        <div class="arrow__menu"></div>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0.5rem 1.5rem;
  z-index: 100;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 18px;

    .icon__search {
      cursor: pointer;
      height: 22px;
      margin-top: 4px;
    }
    .search__container {
      background-color: #141414c8;
      border: none;
      color: #fff;
      font-size: 1rem;
      padding: 0.5rem;
      width: 270px;
      height: 37px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid var(--white);

      .search__input {
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 1rem;
        outline: none;
        width: 200px;
        margin-left: 10px;
      }
    }

    .logo {
      width: 120px;
      margin-right: 1rem;
    }
    .link {
      align-items: center;
      color: #e5e5e5;
      display: flex;
      height: 100%;
      position: relative;
      transition: color 0.4s;
      font-size: 0.9rem;
      text-decoration: none;

      &:hover {
        color: #b3b3b3;
      }
    }
  }

  .profil{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    overflow: hidden;

    img{
      width: 100%;
      height: 100%; 
      object-fit: cover;
    }
  }
}
</style>
