<script setup>
import { useRouter } from "vue-router";
import HeaderComponant from "./components/HeaderComponant.vue";
import CouvertureComponant from "./components/CouvertureComponant.vue";

const router = useRouter();
</script>

<template>
  <HeaderComponant />
  <router-view></router-view>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
