<script setup lang="ts">
import axios from "axios";
import Card from "./Card.vue";
import { ref, onBeforeMount, watch } from "vue";

let currentPage = ref<number>(1);
let lastPage = ref<number>(0);

let isPageLoading = ref<boolean>(true);
let isChangingPage = ref<boolean>(false);

let apiData = ref<object | null>(null);

function fetchData(currentPageP: number): void {
  axios
    .get(`http://localhost:8000/api/projects?page=${currentPageP}`)
    .then((res: any) => {
      apiData.value = res.data.results.data;
      lastPage.value = res.data.results.last_page;
      setTimeout(() => {
        isPageLoading.value = false;
      }, 500);
    })
    .catch((error: any) => {
      console.error(error);
    });
}

function changePage(currentPageP: number, direction: string) {
  isChangingPage.value = true;
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
  setTimeout(() => {
    isChangingPage.value = false;
  }, 400);
}

onBeforeMount(() => {
  fetchData(currentPage.value);
  watch(
    () => currentPage.value,
    (newPage) => {
      setTimeout(() => {
        fetchData(newPage);
      }, 300);
    }
  );
});
</script>

<template>
  <div v-if="isPageLoading" class="absolute select-none top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
    <span class="uppercase drop-shadow-md font-bold text-2xl"> Loading... </span>
  </div>
  <Transition>
    <main v-show="!isPageLoading" class="px-12 py-6 mt-3">
      <div class="container my-0 mx-auto transition-all duration-200 text-white">
        <Transition>
          <div v-show="!isChangingPage" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            <Card :project="project" v-for="project in apiData" />
          </div>
        </Transition>
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
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
