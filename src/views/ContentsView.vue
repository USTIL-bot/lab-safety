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
  <ol>
    <li v-for="[i, title] in contentsTitles.entries()" :key="i">
      <RouterLink :to="`/learn/${i + 1}/1`">{{ title }}</RouterLink>
      <div v-if="allHasLearnt(i + 1)">已学习</div>
    </li>
  </ol>
</template>
