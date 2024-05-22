<template>
  <v-row>
    <v-col>
      <v-card v-for="work in works" :key="work">
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
  </v-row>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  worksData: Object,
});

const works = computed(() => {
  return props.worksData;
});
</script>
