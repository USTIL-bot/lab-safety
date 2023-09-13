<script setup lang="ts">
import CountDownTimer from '@/components/CountDownTimer.vue'
import MarkdownRender from '@/components/MarkdownRender.vue'
import { useLearnStore } from '@/stores/learn'
import { importMarkdown } from '@/utils'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const id = ref(0)
const page = ref(0)

const content = ref('')
const count = ref(10)
const canFlip = computed(() => count.value === 0)

const { pages, hasLearnt, check } = useLearnStore()

watch(
  () => route.params,
  async () => {
    id.value = Number(route.params.id)
    page.value = Number(route.params.page)
    content.value = await importMarkdown(id.value, page.value)
    count.value = hasLearnt(id.value, page.value) ? 0 : 10
  },
  { immediate: true }
)

function finishLearning() {
  check(id.value, page.value)
  count.value = 0
}

const router = useRouter()

function toNextPage() {
  count.value = 10
  if (page.value === pages(id.value)) {
    router.push('/learn')
  } else {
    router.push(`/learn/${id.value}/${page.value + 1}`)
  }
}

function toPreviousPage() {
  router.push(`/learn/${id.value}/${page.value - 1}`)
}
</script>

<template>
  <CountDownTimer :seconds="count" @done="finishLearning" />
  <MarkdownRender :raw="content" />
  <button type="button" :disabled="page === 1" @click="toPreviousPage">上一页</button>
  <button type="button" :disabled="!canFlip" @click="toNextPage">下一页</button>
</template>
