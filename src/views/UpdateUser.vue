<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const apiUrl = "https://mmi21e03.mmi-troyes.fr/wr506-symfony/public/index.php/api";
const token = localStorage.getItem("token");
const route = useRoute();
const userId = ref(route.params.id);
const form = ref({
  email: "",
  roles: "",
  password: "",
  firstName: "",
  lastName: "",
  photo: "",
});

const updateUser = async () => {
  try {
    const updateData = {
      email: form.value.email,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      photo: form.value.photo,
    };

    await axios.patch(
      `${apiUrl}/users/${userId.value}`,
      updateData,
      {
        headers: {
          'Content-Type': 'application/merge-patch+json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.href = "/";
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
  }
};




onMounted(async () => {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId.value}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = response.data;
    form.value = {
      email: userData.email,
      roles: userData.roles.join(", "), 
      password: "", 
      firstName: userData.firstName,
      lastName: userData.lastName,
      photo: userData.photo,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des informations de l'utilisateur", error);
  }
});
</script>

<template>
  <div class="main">
    <div class="update-user">
      <h1>Modifier l'utilisateur</h1>
      <form @submit.prevent="updateUser">
        <!-- Ajoutez les champs du formulaire avec les directives v-model -->
        <label for="email">Email:</label>
        <input v-model="form.email" type="text" id="email" required />

        <label for="firstName">Prénom:</label>
        <input v-model="form.firstName" type="text" id="firstName" required />

        <label for="lastName">Nom:</label>
        <input v-model="form.lastName" type="text" id="lastName" required />

        <label for="photo">Photo:</label>
        <input v-model="form.photo" type="text" id="photo" />

        <button type="submit" class="update__user">Enregistrer les modifications</button>
      </form>
    </div>
  </div>
</template>


<style scoped lang="scss">
.main {
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: var(--black);
  gap: 1rem;
}

h1 {
  color: rgb(238, 238, 238);
  font-size: 1.2rem;
  font-weight: 100;
  margin-bottom: 1rem;
}

.update-user {
  width: 380px;
  padding: 1rem;
  border-radius: 5px;
  background-color: rgb(27, 27, 27);
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    label {
      color: white;
      font-size: 1rem;
      margin-bottom: 0.5rem;
    }

    input {
      width: 100%;
      height: 30px;
      padding: 0.5rem;
      border: 1px solid rgb(169, 169, 169);
      border-radius: 3px;
    }

    button {
      appearance: none;
      border: none;
      width: 100%;
      height: 40px;
      border-radius: 3px;
      background-color: var(--red);
      color: var(--white);
      cursor: pointer;
      font-weight: 500;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #ee0000;
      }
    }
  }
}
</style>
