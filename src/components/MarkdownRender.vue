<script setup lang="ts">
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { ref, watch } from 'vue'

const props = defineProps<{ raw: string }>()
const rendered = ref('')

watch(props, async () => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(props.raw)
  rendered.value = String(file)
})
</script>

<template>
  <div v-html="rendered"></div>
</template>
