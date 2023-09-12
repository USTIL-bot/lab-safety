<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const id = ref('')
const name = ref('')

const router = useRouter()

async function learn() {
  const { save } = useUserStore()
  save(id.value, name.value)

  await router.push('/learn')
}
</script>

<template>
  <form @submit.prevent="learn">
    <input placeholder="学号" required v-model="id" />
    <input placeholder="姓名" required v-model="name" />
    <button>开始学习</button>
  </form>
</template>
