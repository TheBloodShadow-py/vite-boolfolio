<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { slug } = defineProps({
  slug: String,
});

const isLoading = ref<boolean>(true);

function showImg() {
  if (isLoading.value) {
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
}

interface ProjectType {
  name: String;
}

interface ProjectTechnologies {
  name: String;
}

interface ProjectData {
  imageurl: string;
  title: string;
  description: string;
  stars: number;
  mainlanguage: string;
  type: ProjectType;
  technology: ProjectTechnologies[];
}

const router = useRouter();
let fetchedData = ref<ProjectData | null>(null);

axios
  .get(`http://localhost:8000/api/project/${slug}`)
  .then((resp): void => {
    fetchedData.value = resp.data.results;
  })
  .catch((): void => {
    router.push("/portfolio");
  });
</script>

<template>
  <section class="px-4 py-6 mt-6">
    <div class="container my-0 mx-auto transition-all duration-200 text-white">
      <div class="flex flex-col gap-2">
        <div class="flex justify-center items-center mb-4">
          <img draggable="false" class="w-[400px] rounded-md" :src="fetchedData?.imageurl" />
        </div>
        <h1 class="text-xl">Title: {{ fetchedData?.title }}</h1>
        <span class="text-xl">Description: {{ fetchedData?.description }}</span>
        <span class="text-xl">Stars: {{ fetchedData?.stars }}</span>
        <span class="text-xl">Main lang: {{ fetchedData?.mainlanguage }}</span>
        <span class="text-xl">Type: {{ fetchedData?.type.name }}</span>
        <ul class="text-xl flex gap-2">
          Technologies:
          <li v-for="technology in fetchedData?.technology">{{ technology.name }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>
