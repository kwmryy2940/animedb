<template>
  <v-container class="d-flex justify-center">
    <v-btn
      prepend-icon="fa:fa-solid fa-circle-info"
      variant="text"
      style="text-transform: none"
      @click="handleClick"
      >AnimeDBについて</v-btn
    >
  </v-container>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-actions class="justify-end"
        ><v-btn icon="fa:fa-solid fa-xmark" @click="dialog = !dialog"></v-btn
      ></v-card-actions>

      <v-card-title
        ><u><b>アニメリストの表示基準</b></u></v-card-title
      >
      <v-card-text>
        watch数 ＝ annictで「見てる/見たい/見た」に登録している人の数。<br />
        人気順をwatch数で判断し、降順で表示します。
        <v-list>
          デフォルトでは現在の年、シーズンが選択されています。
          <v-list-item v-for="season in seasons" :key="season" :title="season">
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-title
        ><u><b>詳細について</b></u></v-card-title
      >
      <v-card-text>
        詳細ではキャスト・スタッフの情報も閲覧することができます
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(false);
const seasons = [
  "・1~3月:冬シーズン",
  "・4~6月:春シーズン",
  "・7~9月:夏シーズン",
  "・10~12月:秋シーズン",
];

const handleClick = (e) => {
  dialog.value = true;
};
</script>
