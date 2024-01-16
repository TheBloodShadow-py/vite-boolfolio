<script setup lang="ts">
import { onMounted } from "vue";

const { slug } = defineProps({
  slug: String,
});

onMounted(() => {});
</script>

<template>
  {{ slug }}
  <span>show</span>
</template>
