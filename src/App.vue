<template>
  <v-app>
    <v-main>
      <Home />
    </v-main>
    <v-footer
      height="100px"
      style="background-color: rgba(255, 255, 255, 0)"
      app
    >
      <v-fab
        :active="showFab"
        class="me-4"
        absolute
        offset
        location="end"
        color="primary"
        icon="fa:fa-solid fa-arrow-up"
        @click="scrollToTop"
      >
      </v-fab>
    </v-footer>
  </v-app>
</template>

<script setup>
import Home from "./views/Home.vue";
import { ref, onMounted, onBeforeMount } from "vue";

const showFab = ref(false);
const scrollThreshold = 300; // スクロール量の閾値 (例: 300px)

const handleScroll = () => {
  showFab.value = window.scrollY > scrollThreshold;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeMount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
