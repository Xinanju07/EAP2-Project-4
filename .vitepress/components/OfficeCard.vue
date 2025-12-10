<template>
  <iframe
    :src="embedUrl"
    width="100%"
    height="800px"
  ></iframe>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const repoRawBase = "https://github.com/Xinanju07/EAP2-Project-4/blob/main/public/";
const embedBase = "https://view.officeapps.live.com/op/embed.aspx?src=";

const embedUrl = computed(() => {
  const fileUrl = encodeURIComponent(repoRawBase + props.src + "?raw=true");
  return embedBase + fileUrl;
});
</script>
