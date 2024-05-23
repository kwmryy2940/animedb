<template>
  <v-container>
    <v-row>
      <v-col xs="12">
        <v-select
          v-model="filterYear"
          label="放送年"
          variant="outlined"
          :items="years"
        >
        </v-select>
      </v-col>
      <v-col xs="12">
        <v-select
          v-model="filterSeason"
          label="放送シーズン"
          variant="outlined"
          :items="seasons"
          item-title="title"
          item-value="value"
          return-value
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field v-model="filterTitle" label="タイトル" variant="outlined">
        </v-text-field>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="handleClick">検索</v-btn>
  </v-container>
  <v-dialog v-model="loading">
    <v-container class="d-flex justify-center">
      <v-progress-circular
        color="primary"
        indeterminate
        :size="70"
      ></v-progress-circular>
    </v-container>
  </v-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { commonFunctions } from "../utils/utils";

const emit = defineEmits(["get-works"]);

const loading = ref(false);
const filterTitle = ref("");
const filterYear = ref(new Date().getFullYear());
const filterSeason = ref("all");
const years = commonFunctions.generateYearRange(2024, 1990);
const seasons = [
  { value: "all", title: "全て" },
  { value: "spring", title: "春" },
  { value: "summer", title: "夏" },
  { value: "autumn", title: "秋" },
  { value: "winter", title: "冬" },
];

async function loadAnimeWorks() {
  loading.value = true;
  const data = await commonFunctions.fetchDataFromAnnict(
    filterYear.value,
    filterSeason.value,
    filterTitle.value
  );
  loading.value = false;
  return data.works;
}

const handleClick = async (e) => {
  const works = await loadAnimeWorks();
  emit("get-works", works);
};

onMounted(async () => {
  const works = await loadAnimeWorks();
  emit("get-works", works);
});
</script>
