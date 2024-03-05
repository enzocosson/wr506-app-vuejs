<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const isSearchInputVisible = ref(false);

const toggleSearchInput = () => {
  isSearchInputVisible.value = !isSearchInputVisible.value;
};

const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;

  const scrollThreshold = 10;

  // Sélectionnez le header
  const header = document.querySelector("header");

  if (scrollPosition > scrollThreshold) {
    header.style.backgroundColor = "var(--black)";
  } else {
    header.style.backgroundColor = "transparent";
  }
});
const apiUrl = "https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/api";
const user = ref(null);
const token = localStorage.getItem("token");
onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations de l'utilisateur",
      error
    );
  }
});

const toggleMobileMenu = () => {
  const burgerMenu = document.querySelector(".burger__menu");
  const nav = document.querySelector(".navbar__mobile");
  
  burgerMenu.classList.toggle("burger__menu__active");
  nav.classList.toggle("nav__active");
};
</script>

<template>
  <header>
    <nav>
      <router-link class="logo" to="/">
        <img class="logo" src="/images/netflix-logo.png" alt="" />
      </router-link>
      <router-link class="link" to="/">Accueil</router-link>
      <router-link class="link" to="/movie">Films</router-link>
      <router-link class="link" to="/actor">Acteurs</router-link>
      <router-link class="link" to="/category">Categories</router-link>
    </nav>
    <nav>
      <router-link class="link" to="#">Jeunesse</router-link>
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
            v-if="user"
            class="photo__profil"
            :src="`https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/image/${user.photo}`"
            alt=""
          />
        </div>
        <span class="arrow__menu"></span>

        <div class="menu__deroulant">
          <div class="arrow__menu"></div>
          <div class="container__info__profil">
            <div class="profil">
              <div class="container__photo__profil">
                <img
                  v-if="user"
                  class="photo__profil"
                  :src="`https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/image/${user.photo}`"
                  alt=""
                />
              </div>
              <p v-if="user" class="name__profil">{{ user.firstName }}</p>
            </div>
            <a href="#" class="specs">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-mirrorinrtl="true"
                class="ltr-4z3qvp e1svuwfo1"
                data-name="Pencil"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z"
                  fill="#b0b0b0"
                ></path>
              </svg>
              <router-link class="name__profil" to="/user"
                >Gérer le profils</router-link
              >
            </a>
          </div>
          <button class="logout" @click="logout">Se déconnecter</button>
        </div>
      </div>
    </nav>
  </header>

  <div class="header__mobile">
    <router-link class="logo" to="/">
      <img class="logo" src="/images/netflix-logo.png" alt="" />
    </router-link>
    <div class="burger__menu" @click="toggleMobileMenu">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <nav class="navbar__mobile">
      <router-link class="link" to="/">Accueil</router-link>
      <router-link class="link" to="/movie">Films</router-link>
      <router-link class="link" to="/actor">Acteurs</router-link>
      <router-link class="link" to="/category">Categories</router-link>
      <hr />
      <router-link class="link" to="#">Jeunesse</router-link>
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
        <div class="container__info__profil">
          <div class="profil">
            <div class="container__photo__profil">
              <img
                v-if="user"
                class="photo__profil"
                :src="`https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/image/${user.photo}`"
                alt=""
              />
            </div>
            <p v-if="user" class="name__profil">{{ user.firstName }}</p>
          </div>
          <a href="#" class="specs">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-mirrorinrtl="true"
              class="ltr-4z3qvp e1svuwfo1"
              data-name="Pencil"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.1213 1.7071C17.9497 0.535532 16.0503 0.53553 14.8787 1.7071L13.2929 3.29289L12.5858 4L1.58579 15C1.21071 15.3751 1 15.8838 1 16.4142V21C1 22.1046 1.89543 23 3 23H7.58579C8.11622 23 8.62493 22.7893 9 22.4142L20 11.4142L20.7071 10.7071L22.2929 9.12132C23.4645 7.94975 23.4645 6.05025 22.2929 4.87868L19.1213 1.7071ZM15.5858 7L14 5.41421L3 16.4142L3 19C3.26264 19 3.52272 19.0517 3.76537 19.1522C4.00802 19.2527 4.2285 19.4001 4.41421 19.5858C4.59993 19.7715 4.74725 19.992 4.84776 20.2346C4.94827 20.4773 5 20.7374 5 21L7.58579 21L18.5858 10L17 8.41421L6.70711 18.7071L5.29289 17.2929L15.5858 7ZM16.2929 3.12132C16.6834 2.73079 17.3166 2.73079 17.7071 3.12132L20.8787 6.29289C21.2692 6.68341 21.2692 7.31658 20.8787 7.7071L20 8.58578L15.4142 4L16.2929 3.12132Z"
                fill="#b0b0b0"
              ></path>
            </svg>
            <router-link class="name__profil" to="/user"
              >Gérer le profils</router-link
            >
          </a>
        </div>
        <button class="logout" @click="logout">Se déconnecter</button>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0.5rem 3rem;
  z-index: 100;
  transition: background-color 0.4s ease-in-out;
  z-index: 999999999;

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

  .profil {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      .arrow__menu {
        transform: rotate(180deg);
      }
    }

    &:hover .menu__deroulant {
      opacity: 1;
      pointer-events: all;
    }

    .container__photo__profil {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .arrow__menu {
      border-color: #fff transparent transparent;
      border-style: solid;
      border-width: 5px 5px 0;
      height: 0;
      margin-left: 10px;
      transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
      width: 0;
      transition: 0.2s ease-in-out;
    }

    .menu__deroulant {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 150%;
      right: 0%;
      transform: translateX(0%);
      width: 220px;
      height: auto;
      background-color: #000000d7;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 15px;
      padding: 0rem;

      &::before {
        content: "";
        position: absolute;
        top: -15px;
        right: 0px;
        background-color: rgba(255, 0, 0, 0);
        height: 15px;
        margin-left: 10px;
        transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
        transform: rotate(180deg);
        width: 100%;
      }

      .arrow__menu {
        position: absolute;
        top: -7px;
        right: 28px;
        border-color: #fff transparent transparent;
        border-style: solid;
        border-width: 6px 6px 0;
        height: 0;
        margin-left: 10px;
        transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
        transform: rotate(180deg);
        width: 0;
      }

      .container__info__profil {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 15px;
        padding: 1rem;
        padding-bottom: 0;

        .profil {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          .container__photo__profil {
            width: 31px;
            height: 31px;
            border-radius: 3px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .name__profil {
            font-size: 0.9rem;
            font-weight: 300;
            color: #f9f9f9;
          }

          &:hover {
            .name__profil {
              text-decoration: underline;
            }
          }
        }

        .specs {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          text-decoration: none;

          .icon {
            width: 31px;
            height: 31px;
          }

          .name__profil {
            font-size: 0.9rem;
            font-weight: 300;
            color: #f9f9f9;
            text-decoration: none;
          }

          &:hover {
            .name__profil {
              text-decoration: underline;
            }
          }
        }
      }

      .logout {
        cursor: pointer;
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        border-top: 1px solid hsla(0, 0%, 100%, 0.25);
        background-color: transparent;
        padding: 1.3rem;
        font-size: 0.9rem;
        font-weight: 300;
        color: #f9f9f9;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
.header__mobile {
  display: none;
}

// responsive mobile

@media (max-width: 768px) {
  header {
    display: none;
  }
  .header__mobile {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0.5rem 1rem;
  z-index: 100;
  transition: background-color 0.4s ease-in-out;
  z-index: 999999999;

  .burger__menu {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30px;
    height: 20px;
    gap: 5px;
    margin-right: 5px;
    cursor: pointer;
    z-index: 999999999;

    .line {
      transition: 0.3s ease-in-out;
      width: 100%;
      height: 2px;
      background-color: var(--white);
    }
  }
  .burger__menu__active {
    .line {
      &:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      &:nth-child(2) {
        display: none;
      }
      &:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
      }
    }
  }

  .logo {
    width: 120px;
    margin-right: 1rem;
  }

  .navbar__mobile {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100vh;
    background-color: var(--black);
    transform: translateX(100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 37px;
    padding: 1rem;
    padding-top: 5rem;
    transition: 0.3s ease-in-out;

    .icon__search {
      cursor: pointer;
      height: 22px;
      margin-top: 4px;
    }
  }
  .nav__active{
    transform: translateX(0%);
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
  .profil {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .container__info__profil {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
    }

    &:hover {
      .arrow__menu {
        transform: rotate(180deg);
      }
    }

    &:hover .menu__deroulant {
      opacity: 1;
      pointer-events: all;
    }
  }
  .logo {
    width: 120px;
    margin-right: 1rem;
  }

  nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 40%;
    height: 100vh;
    background-color: var(--black);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 37px;
    padding: 1rem;
    padding-top: 5rem;

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
    .profil {
      cursor: pointer;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .container__info__profil {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 1rem 0;
      }

      &:hover {
        .arrow__menu {
          transform: rotate(180deg);
        }
      }

      &:hover .menu__deroulant {
        opacity: 1;
        pointer-events: all;
      }

      .container__photo__profil {
        width: 60px;
        height: 60px;
        border-radius: 3px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .name__profil {
        font-size: 1.2rem;
        font-weight: 500;
        margin-top: 1rem;
        color: #f9f9f9;
      }

      .arrow__menu {
        border-color: #fff transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0;
        height: 0;
        margin-left: 10px;
        transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
        width: 0;
        transition: 0.2s ease-in-out;
      }

      .menu__deroulant {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 150%;
        right: 0%;
        transform: translateX(0%);
        width: 220px;
        height: auto;
        background-color: #000000d7;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 15px;
        padding: 0rem;

        &::before {
          content: "";
          position: absolute;
          top: -15px;
          right: 0px;
          background-color: rgba(255, 0, 0, 0);
          height: 15px;
          margin-left: 10px;
          transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
          transform: rotate(180deg);
          width: 100%;
        }
      }
    }
    hr {
      width: 80%;
      border: 0.1px solid #7c7c7c16;
    }
    .specs {
      margin-top: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      .icon {
        width: 31px;
        height: 31px;
      }
      .name__profil {
        margin-top: 0;
        font-size: 0.9rem;
        font-weight: 300;
        color: #f9f9f9;
        text-decoration: none;
      }
      &:hover {
        .name__profil {
          text-decoration: underline;
        }
      }
    }
    .link {
      align-items: center;
      color: #e5e5e5;
      display: flex;
      height: auto;
      position: relative;
      transition: color 0.4s;
      font-size: 1.1rem;
      background: #1a1a1a;
      width: 140px;
      height: 47px;
      border-radius: 2px;
      text-decoration: none;
      justify-content: center;

      &:hover {
        color: #b3b3b3;
      }
    }
  }

  .logout {
    cursor: pointer;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: var(--red);
    margin-top: 1rem;
    padding: 1.3rem;
    font-size: 0.9rem;
    font-weight: 300;
    color: #f9f9f9;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

}
</style>
