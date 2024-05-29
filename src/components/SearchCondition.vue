<template>
  <v-container>
    <v-row dense>
      <v-col xs="12" no-gutters>
        <v-select
          v-model="filterYear"
          label="放送年"
          variant="outlined"
          :items="years"
        >
        </v-select>
      </v-col>
      <v-col xs="12" no-gutters>
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
    <v-row no-gutters>
      <v-col no-gutters>
        <v-text-field v-model="filterTitle" label="タイトル" variant="outlined">
        </v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-btn color="primary" @click="handleClick">検索</v-btn>
    </v-row>
    <v-row  no-gutters class="d-flex justify-center">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        :total-visible="7"
        @click="handlePageClick"
      ></v-pagination>
    </v-row>
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
const filterSeason = ref(null);
const totalPages = ref(null);
const currentPage = ref(1);
const years = commonFunctions.generateYearRange(
  new Date().getFullYear() + 1,
  1990
);
const seasons = [
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
    filterTitle.value,
    currentPage.value
  );
  loading.value = false;

  // 総ページ数を保存
  totalPages.value = Math.ceil(data.total_count / 50);
  emit("get-works", data.works);
  return data;
}

function getNowSeason() {
  const nowMonth = new Date().getMonth() + 1;
  let nowSeason = null;
  // 1~3月:冬シーズン
  if (nowMonth >= 1 && nowMonth <= 3) {
    nowSeason = seasons[3];
  }
  // 4~6月:春シーズン
  else if (nowMonth >= 4 && nowMonth <= 6) {
    nowSeason = seasons[0];
  }
  // 7~9月:夏シーズン
  else if (nowMonth >= 7 && nowMonth <= 9) {
    nowSeason = seasons[1];
  }
  // 10~12月:秋シーズン
  else {
    nowSeason = seasons[2];
  }

  return nowSeason.value;
}

const handleClick = async (e) => {
  currentPage.value = 1;
  await loadAnimeWorks();
};

const handlePageClick = async (e) => {
  await loadAnimeWorks();
};

onMounted(async () => {
  filterSeason.value = getNowSeason();
  await loadAnimeWorks();
});
</script>
