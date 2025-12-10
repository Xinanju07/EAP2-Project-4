<template>
  <div class="relative p-4">
    <div v-if="loading" class="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
      Loading presentation…
    </div>

    <div v-if="error" class="text-sm text-red-600 dark:text-red-400 mb-3">
      {{ error }}
    </div>

    <div
      ref="viewer"
      class="pptx-viewer border border-zinc-300 dark:border-zinc-700 rounded-xl overflow-auto bg-white dark:bg-zinc-900 shadow-sm p-6"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { init } from "pptx-preview";

const props = defineProps({
  src: { type: String, required: true },
});

const viewer = ref(null);
const loading = ref(false);
const error = ref(null);
let pptxViewer = null;

async function loadPptx() {
  loading.value = true;
  error.value = null;

  if (viewer.value) viewer.value.innerHTML = "";

  try {
    const url = new URL(props.src, window.location.origin).href;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to load ${props.src}`);

    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();

    if (!pptxViewer && viewer.value) {
      pptxViewer = init(viewer.value, {
        width: 800,
        height: 600,
      });
    }

    pptxViewer.preview(arrayBuffer);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadPptx);
watch(() => props.src, loadPptx);
</script>
