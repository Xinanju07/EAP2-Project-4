<template>
  <div class="relative p-4">
    <div v-if="loading" class="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
      Loading document…
    </div>

    <div v-if="error" class="text-sm text-red-600 dark:text-red-400 mb-3">
      {{ error }}
    </div>

    <div
      ref="viewer"
      class="docx-viewer border border-zinc-300 dark:border-zinc-700 rounded-xl overflow-auto bg-white dark:bg-zinc-900 shadow-sm p-6"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { renderAsync } from "docx-preview";

const props = defineProps({
  src: { type: String, required: true },
});

const viewer = ref(null);
const loading = ref(false);
const error = ref(null);

async function loadDocx() {
  loading.value = true;
  error.value = null;

  if (viewer.value) viewer.value.innerHTML = "";

  try {
    const url = new URL(props.src, window.location.origin).href;
    const res = await fetch(url);

    if (!res.ok) throw new Error(`Failed to load ${props.src}`);

    const blob = await res.blob();

    await renderAsync(blob, viewer.value, null, {
      className: "docx",
      inWrapper: true,
      ignoreWidth: false,
      ignoreHeight: false,
    });
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(loadDocx);
watch(() => props.src, loadDocx);
</script>
