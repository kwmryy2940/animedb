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
              <v-btn color="primary" @click="onClickDetail(work)">詳細</v-btn>
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
        <v-card-actions class="justify-end"
          ><v-btn icon="fa:fa-solid fa-xmark" @click="dialog = !dialog"></v-btn
        ></v-card-actions>
        <v-list>
          <v-card-title
            ><u><b>キャスト</b> </u></v-card-title
          >
          <v-list-item
            v-for="cast in castMembers"
            :key="cast"
            :title="`${cast.character.name}:${cast.name}`"
          >
          </v-list-item>
        </v-list>
        <v-list>
          <v-card-title
            ><u><b>スタッフ</b> </u></v-card-title
          >
          <v-list-item
            v-for="person in staffPersons"
            :key="person"
            :title="`${
              person.role_text === 'その他'
                ? person.role_other
                : person.role_text
            }:${person.name}`"
          >
          </v-list-item>
        </v-list>
        <v-list>
          <v-card-title
            ><u><b>制作団体</b> </u></v-card-title
          >
          <v-list-item
            v-for="organization in staffOrganizations"
            :key="organization"
            :title="`${ organization.role_text === 'その他'
                    ? organization.role_other
                    : organization.role_text}:${organization.name}`"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount, watch } from "vue";
import { commonFunctions } from "../utils/utils";

const props = defineProps({
  worksData: Object,
});

const works = computed(() => {
  return props.worksData;
});

const dialog = ref(false);
const staffPersons = ref([]);
const staffOrganizations = ref([]);
const castMembers = ref([]);

async function onClickDetail(work) {
  console.log("work:", work);

  const castsArray = await commonFunctions.fetchCastDataFromAnnict(work.id);
  castMembers.value = castsArray.casts;

  const staffsArray = await commonFunctions.fetchStaffDataFromAnnict(work.id);

  // スタッフ
  staffPersons.value = await staffsArray.staffs.filter((staff) => {
    return staff.person !== undefined;
  });

  // 制作団体
  staffOrganizations.value = staffsArray.staffs.filter((staff) => {
    return staff.organization !== undefined;
  });

  console.log("cast:", castMembers.value);
  console.log("staff persons:", staffPersons.value);
  console.log("staff organizations:", staffOrganizations.value);

  dialog.value = true;
}
</script>
