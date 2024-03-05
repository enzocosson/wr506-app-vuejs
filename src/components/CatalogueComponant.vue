<script setup>
import ThemeComponant from "../components/ThemeComponant.vue";
import ThemeClassementComponant from "../components/ThemeClassementComponant.vue";

</script>


<template>
  <div class="container__catalogue">
    <div class="catalogue">
    <ThemeComponant />
  </div>
  </div>
</template>

<style scoped lang="scss">
.container__catalogue{
  position: absolute;
  top: 65%;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 15;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;


  .catalogue {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  // padding-top: 75vh;
  padding-bottom: 10vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 4vh;
  padding-top: 10vh;

  & > :first-child {
    z-index: 17;
  }

  & > :nth-child(2) {
    z-index: 16;
  }
}
}

// @media (max-width: 768px) {
//   .container__catalogue {
//     top: 60%;
//     .catalogue {
//       padding-top: 0vh;
//       padding-bottom: 0vh;
//     }
//   }
// }
</style>
