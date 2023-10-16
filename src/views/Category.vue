<script setup>
import HeaderComponant from "../components/HeaderComponant.vue";
  
</script>

<template>
  <div class="home">
    <h1>Category</h1>
    <HeaderComponant />
  </div>
</template>
<style scoped lang="scss">
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background-color: var(--black);
}
h1{
    color: var(--white);
}
.liens{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .link{
    text-decoration: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 3rem;
    background-color: white;
    color: black;
    border-radius: 0.3rem;
    font-weight: bold;
    transition: 0.2s ease-in-out;
    &:hover{
      background-color: rgb(203, 203, 203);
      color: black;
    }
  }
}
</style>
