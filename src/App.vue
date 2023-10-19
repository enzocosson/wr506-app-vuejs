<script setup>
import { useRouter } from "vue-router";
import HeaderComponant from "./components/HeaderComponant.vue";
import HeaderLoginComponant from "./components/HeaderLoginComponant.vue";

const router = useRouter();
</script>

<template>
  <HeaderComponant v-if="router.currentRoute.value.path !== '/login'" />
  <HeaderLoginComponant v-else />
  <router-view></router-view>
</template>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
