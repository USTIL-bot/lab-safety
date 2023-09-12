<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/user'

const { id, name } = storeToRefs(useUserStore())
</script>

<template>
  <nav class="container-fluid">
    <ul>
      <li>
        <h3><RouterLink to="/">实验室安全培训</RouterLink></h3>
      </li>
    </ul>
    <ul class="user">
      <li>{{ id }}</li>
      <li>{{ name }}</li>
    </ul>
  </nav>
  <main class="container">
    <RouterView />
  </main>
</template>

<style scoped>
h3 {
  margin-bottom: 0;
}

h3 > a {
  color: inherit;
}

main {
  width: 100vw;
  height: calc(100vh - 76.5px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.user {
  font-size: 16px;
  display: flex;
  gap: 0.5rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.user > li {
  padding-left: 0;
  padding-right: 0;
}
</style>
