<script setup>
</script>

<template>
 <div class="liens">
      <router-view />
      <router-link class="link" to="/">Home</router-link>
      <router-link class="link" to="/movie">Movie</router-link>
      <router-link class="link" to="/actor">Actor</router-link>
      <router-link class="link" to="/category">Category</router-link>
    </div>
</template>

<style scoped lang="scss">
.liens {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .link {
    text-decoration: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 3rem;
    background-color: var(--black);
    color: var(--white);
    border-radius: 0.3rem;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: rgb(203, 203, 203);
      color: var(--white);
    }
  }
}
</style>