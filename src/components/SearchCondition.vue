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
    <!-- <v-row>
      <v-col>
        <v-card v-for="work in works" key="work">
          <v-card-text>{{ work.title }}</v-card-text>
          <v-card-text>
            <template v-if="work.images.recommended_url.length > 0">
              <v-img :src="work.images.recommended_url"></v-img>
            </template>
            <template v-else-if="work.images.facebook.og_image_url.length > 0">
              <v-img :src="work.images.facebook.og_image_url"></v-img>
            </template>
            <template v-else>
              <v-img
                src="https://placehold.jp/d1d1d1/ffffff/250x131.png?text=No%20Image"
              ></v-img>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              :href="work.official_site_url"
              target="_blank"
              rel="noopener noreferrer"
              >公式サイト</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> -->
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
import { onMounted, ref, watch } from "vue";
import { commonFunctions } from "../utils/utils";

const emit = defineEmits(["get-works"]);

const loading = ref(false);
const works = ref([]);
const filterTitle = ref(null);
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
    filterSeason.value
  );
  loading.value = false;
  return data.works;
}

watch(filterYear, async (val) => {
  works.value = await loadAnimeWorks();
  emit("get-works", works.value);
});

watch(filterSeason, async (val) => {
  works.value = await loadAnimeWorks();
  emit("get-works", works.value);
});
onMounted(async () => {
  works.value = await loadAnimeWorks();
  emit("get-works", works.value);
});
</script>
