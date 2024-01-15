<script setup lang="ts">
import axios from "axios";
import Card from "./Card.vue";
import { ref, onBeforeMount, watch } from "vue";

let currentPage = ref<number>(1);
let lastPage = ref<number>(0);

let apiData = ref<object | null>(null);

function fetchData(currentPageP: number): void {
  axios
    .get(`http://localhost:8000/api/projects?page=${currentPageP}`)
    .then((res: any) => {
      apiData.value = res.data.results.data;
      lastPage.value = res.data.results.last_page;
    })
    .catch((error: any) => {
      console.error(error);
    });
}

function changePage(currentPageP: number, direction: string) {
  if (direction === "next") {
    if (currentPageP === lastPage.value) {
      currentPage.value = 1;
    } else {
      currentPage.value = currentPageP + 1;
    }
  } else if (direction === "before") {
    if (currentPageP === 1) {
      currentPage.value = lastPage.value;
    } else {
      currentPage.value = currentPageP - 1;
    }
  }
}

onBeforeMount(() => {
  fetchData(currentPage.value);
  watch(
    () => currentPage.value,
    (newPage) => {
      fetchData(newPage);
    }
  );
});
</script>

<template>
  <main class="px-4 py-6 mt-3">
    <div class="container my-0 mx-auto transition-all duration-200 text-white">
      <div class="grid grid-cols-3 gap-10">
        <Card :project="project" v-for="project in apiData" />
      </div>
    </div>
    <div class="flex justify-around mt-12 items-center">
      <button
        @click.prevent="changePage(currentPage, 'before')"
        class="py-3 px-5 text-xl bg-black cursor-pointer transition-all hover:scale-105 duration-200 flex flex-col gap-6 drop-shadow-lg rounded-md"
      >
        &LeftTeeArrow;
      </button>
      <a>Current page: {{ currentPage }}</a>
      <button
        @click.prevent="changePage(currentPage, 'next')"
        class="py-3 px-5 text-xl bg-black cursor-pointer transition-all hover:scale-105 duration-200 flex flex-col gap-6 drop-shadow-lg rounded-md"
      >
        &RightTeeArrow;
      </button>
    </div>
  </main>
</template>
