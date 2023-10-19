<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

let mail = ref("");
let password = ref("");
const router = useRouter();

onMounted(() => {
  isTokenValid();
});

const isTokenValid = () => {
  if (localStorage.getItem("token")) {
    router.push("/"); // Redirigez vers la page d'accueil si le token est valide
  }
};

const login = async () => {
  try {
    const response = await axios.post("https://127.0.0.1:8000/auth", {
      email: mail.value,
      password: password.value,
    });
    localStorage.setItem("token", response.data.token); // Stockez le token JWT dans localStorage
    router.push("/"); // Redirigez vers la page d'accueil après la connexion réussie
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="login">
    <img
      class="image__background"
      src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/ef710c60-45ca-4ff6-9133-abd76333d090/FR-fr-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      alt="background image"
    />
    <form @submit.prevent="login" class="form">
      <h2>S'identifier</h2>
      <div class="field">
        <input type="text" id="mail" v-model="mail" />
      </div>
      <div class="field">
        <input type="password" id="password" v-model="password" />
      </div>
      <button type="submit" class="send__button">S'identifier</button>
      <div class="container__memoire">
        <div class="seSouvenir">
          <input
            class="input_check"
            type="checkbox"
            name="seSouvenireseSouvenire"
          />
          <p>Se souvenir de moi</p>
        </div>
        <a href="#" class="help">Besoin d'aide ?</a>
      </div>

      <div class="inscription">
        Première visite sur Netflix ? <span>Inscrivez-vous</span>.
      </div>
      <p class="captcha">
        Cette page est protégée par Google reCAPTCHA pour nous assurer que vous
        n'êtes pas un robot. <br /><span>En savoir plus.</span>
      </p>
    </form>
  </div>
</template>

<style scoped lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    width: 100%;
    height: 50vh;
    background: linear-gradient(to bottom, #1414145e, transparent);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &::after {
    content: "";
    width: 100%;
    height: 50vh;
    background: linear-gradient(to top, #1414145e, transparent);
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 0;
  }

  .form {
    position: relative;
    text-align: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    background-color: #000000d7;
    gap: 1rem;
    z-index: 10;

    h2 {
      width: 100%;
      text-align: left;
      color: white;
      font-size: 2rem;
      margin-bottom: 1rem;
      font-weight: 400;
    }

    input {
      width: 300px;
      padding: 1rem;
      border-radius: 0.2rem;
      border: none;
      outline: none;
      background-color: #333333;
      color: var(--white);
      font-size: 1rem;
    }
    .send__button {
      cursor: pointer;
      width: 300px;
      padding: 1rem;
      border-radius: 0.2rem;
      border: none;
      outline: none;
      margin-top: 2rem;
      background-color: var(--red-netflix);
      color: var(--white);
      font-size: 1rem;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #e50914;
      }
    }
    .container__memoire {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .seSouvenir {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0px;

        p {
          cursor: pointer;
          color: #afafaf;
          font-size: 12px;
          user-select: none;
          padding-left: 6px;
          margin-top: 1px;
        }

        .input_check {
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          padding: 3px;
          border-radius: 2px;
          background-color: #32353c;
          cursor: pointer;

          &::before {
            content: "";
            position: absolute;
            top: 45%;
            left: 50%;
            width: 10px;
            height: 6px;
            border-bottom: 2px solid white;
            border-left: 2px solid white;

            transform: translate(-50%, -50%) scale(0) rotate(-45deg);
            transition: 120ms ease-in-out;
            box-shadow: inset 1em 1em var(--form-control-color);
            z-index: 2;
          }
          &:checked::before {
            transform: translate(-50%, -50%) scale(0.98) rotate(-45deg);

            -webkit-appearance: initial;
            appearance: initial;
          }
        }
      }

      .help {
        color: #afafaf;
        font-size: 12px;
        user-select: none;
        padding-left: 6px;
        margin-top: 1px;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
    .inscription {
      text-align: left;
      width: 100%;
      color: #afafaf;
      font-size: 1rem;
      user-select: none;
      margin-top: 1px;
      text-decoration: none;
      font-weight: 300;

      span {
        color: var(--white);
        cursor: pointer;
        text-decoration: none;
      }
    }

    .captcha{
      width: 300px;
      text-align: left;
      color: #afafaf;
      font-size: 0.8rem;
      user-select: none;
      margin-top: 1px;
      text-decoration: none;
      font-weight: 300;
      padding-bottom: 60px;

      span {
        color: var(--blue);
        cursor: pointer;
        text-decoration: none;
      }
    }
  }

  .image__background {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.5;
    z-index: -1;
  }
}
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
}
</style>
