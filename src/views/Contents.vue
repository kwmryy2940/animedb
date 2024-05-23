<template>
  <v-row>
    <v-col v-for="work in works" :key="work" cols="12" md="6" lg="4" xl="3">
      <v-card>
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
        <v-row>
          <v-col cols="9">
            <v-card-actions>
              <v-btn
                color="primary"
                @click="onCardClick(work, work.syobocal_tid)"
                >詳細</v-btn
              >
              <v-btn
                color="primary"
                :href="work.official_site_url"
                target="_blank"
                rel="noopener noreferrer"
                >公式サイト</v-btn
              >
              <v-btn
                icon="fa:fa-brands fa-x-twitter"
                color="primary"
                :href="'https://twitter.com/' + work.twitter_username"
                target="_blank"
                rel="noopener noreferrer"
              >
              </v-btn>
              <v-btn
                icon="fa:fa-brands fa-wikipedia-w"
                color="primary"
                :href="work.wikipedia_url"
                target="_blank"
                rel="noopener noreferrer"
              >
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-card-item prepend-icon="fa:fa-solid fa-eye">{{
          work.watchers_count
        }}</v-card-item>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialog">
    <v-sheet>
      <v-card>
        <v-list v-for="staff in staffMembers" :key="staff">
          <v-list-item>{{ staff }}</v-list-item>
        </v-list>
        <v-list v-for="cast in castMembers" :key="cast">
          <v-list-item>{{ cast }}</v-list-item>
        </v-list>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { ref, computed, defineComponent } from "vue";
import { commonFunctions } from "../utils/utils";

const props = defineProps({
  worksData: Object,
});

const works = computed(() => {
  return props.worksData;
});

const dialog = ref(false);
const animeData = ref(null);
const staffMembers = ref([]);
const castMembers = ref([]);

async function pickupCastMembers(comment) {
  // キャスト情報の抜き出し（キャスト情報の後にテキストがある場合とない場合の２パターンがある）
  let dataCast = [];
  if (comment.match(/\*キャスト[\s\S]*\*/)) {
    dataCast = comment.match(/\*キャスト[\s\S]*\*/);
  } else {
    dataCast = comment.match(/\*キャスト[\s\S]*/);
  }
  // 不要な部分を取り除く
  const castText = dataCast[0]
    .replace(/\*キャスト\r\n/, "")
    .replace(/\r\n\*/, "");
  // 改行を区切りとして配列に変換する
  const castArray = castText.split(/\r\n/);
  // 配列の空要素を削除
  const castDisplayData = castArray.filter(function (s) {
    return s !== "";
  });
  return castDisplayData;
}

async function pickupStaffMembers(comment) {
  // スタッフ情報の抜き出し（スタッフ情報の後にテキストがある場合とない場合の２パターンがある）
  let dataCast = [];
  if (comment.match(/\*スタッフ[\s\S]*\*/)) {
    dataCast = comment.match(/\*スタッフ[\s\S]*\*/);
  } else {
    dataCast = comment.match(/\*スタッフ[\s\S]*/);
  }
  // 不要な部分を取り除く
  const staffText = dataCast[0]
    .replace(/\*スタッフ\r\n/, "")
    .replace(/\r\n\*/, "");
  // 改行を区切りとして配列に変換する
  const staffArray = staffText.split(/\r\n/);
  // 配列の空要素を削除
  const staffDisplayData = staffArray.filter(function (s) {
    return s !== "";
  });
  return staffDisplayData;
}

async function onCardClick(work, tid) {
  console.log("work:", work);
  console.log("TID:", tid);

  if (tid === undefined || tid.length === 0) return;

  animeData.value = await commonFunctions.fetchDataFromSyoboiByTID(tid);

  const comment =
    animeData.value.TitleLookupResponse.TitleItems.TitleItem.Comment._text;

  castMembers.value = await pickupCastMembers(comment);
  staffMembers.value = await pickupStaffMembers(comment);

  dialog.value = true;
}
</script>
