<script setup>
import ThemeComponant from "../components/ThemeComponant.vue";
import ThemeClassementComponant from "../components/ThemeClassementComponant.vue";
</script>

<template>
  <div class="catalogue">
    <ThemeComponant />
    <ThemeComponant />
    <ThemeClassementComponant />
    <ThemeComponant />
  </div>
</template>

<style scoped lang="scss">
.catalogue {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-top: 75vh;
  padding-bottom: 10vh;
  z-index: 15;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;

  & > :first-child {
    z-index: 17;
  }

  & > :nth-child(2) {
    z-index: 16;
  }
}
</style>
