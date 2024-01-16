<script setup lang="ts"></script>

<template>
  <header class="bg-black px-4 py-6 drop-shadow-md">
    <div class="container my-0 mx-auto transition-all duration-200 text-white">
      <div class="flex justify-between items-center">
        <h1>
          <RouterLink class="text-xl font-bold" to="/">My Boolfolio</RouterLink>
        </h1>
        <ul class="sm:flex gap-6 font-semibold items-center uppercase hidden">
          <li>
            <RouterLink to="/portfolio">Portfolio</RouterLink>
          </li>
          <RouterLink to="/contacts">Contacts</RouterLink>
        </ul>
      </div>
    </div>
  </header>
</template>
