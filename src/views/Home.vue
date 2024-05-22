<template>
  <SearchCondition @get-works="onGetWorks" />
  <Contents :worksData="works" />
</template>

<script setup>
import { ref } from "vue";
import SearchCondition from "../components/SearchCondition.vue";
import Contents from "./Contents.vue";

const works = ref(null);

function onGetWorks(data) {
  works.value = data;
}
</script>
