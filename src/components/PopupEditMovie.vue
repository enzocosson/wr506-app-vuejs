<!-- PopupEditMovie.vue -->
<template>
  <div class="popup-edit-movie">
    <div class="popup-content">
      <h2>Edit Movie</h2>
      <form @submit.prevent="submitEdit">
        <label for="title">Title:</label>
        <input v-model="editedMovie.title" type="text" id="title" required>

        <label for="duration">Duration:</label>
        <input v-model="editedMovie.duration" type="text" id="duration" required>

        <label for="poster">Poster URL:</label>
        <input v-model="editedMovie.poster" type="text" id="poster" required>

        <label for="age">Age:</label>
        <input v-model="editedMovie.age" type="text" id="age" required>

        <label for="category">Category:</label>
        <input v-model="editedMovie.category" type="text" id="category" required>

        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object, // Movie information to edit
  },
  data() {
    return {
      editedMovie: { ...this.movie }, // Use a copy to avoid direct modification of the prop
    };
  },
  methods: {
    submitEdit() {
      // Call your API PUT route to save the edits
      // Make sure to adjust this logic based on your API
      this.$store.dispatch('updateMovie', this.editedMovie);

      // Close the popup after saving
      this.$store.commit('togglePopupEdit', null);
    },
  },
};
</script>

<style scoped>

</style>
