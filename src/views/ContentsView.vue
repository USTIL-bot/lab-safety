<script setup lang="ts">
import { useLearnStore } from '@/stores/learn'
import { RouterLink } from 'vue-router'

const contentsTitles = [
  '实验教学中心教学秩序规范',
  '实验室电器设备的安全',
  '消防基础知识',
  '触电防护',
  '实验室火灾安全逃生方法'
]

const { allHasLearnt } = useLearnStore()
</script>

<template>
  <ul>
    <li v-for="[i, title] in contentsTitles.entries()" :key="i">
      <input type="checkbox" :checked="allHasLearnt(i + 1)" @click.prevent="" />
      <RouterLink :to="`/learn/${i + 1}/1`">{{ title }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped>
li {
  list-style: none;
}

input {
  margin-right: 0.75rem;
}
</style>
