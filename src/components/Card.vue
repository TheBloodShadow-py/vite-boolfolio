<script setup lang="ts">
defineProps({
  project: Object,
});
</script>

<template>
  <div class="bg-gray-700 cursor-pointer transition-all hover:scale-105 duration-200 flex flex-col gap-6 drop-shadow-lg rounded-md">
    <img loading="lazy" draggable="false" class="rounded-t-md transition-all duration-200 hover:grayscale-[15%] grayscale-[50%]" :src="project?.imageurl" />
    <div class="flex flex-col gap-3 p-4">
      <h1>Project title &rightarrowtail; {{ project?.title.length > 25 ? project?.title.slice(0, 20) + "..." : project?.title }}</h1>
      <span>Main lang &rightarrowtail; {{ project?.mainlanguage }}</span>
      <span>Type &rightarrowtail; {{ project?.type.name }}</span>
    </div>
  </div>
</template>
