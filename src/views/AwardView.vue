<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { toLocalDateString } from '@/utils'
import { saveAs } from 'file-saver'
import { toBlob } from 'html-to-image'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { name } = storeToRefs(useUserStore())
const date = ref(toLocalDateString(new Date()))

async function generate() {
  const blob = await toBlob(document.querySelector('.award') as HTMLElement)
  saveAs(blob!, '实验室安全培训证书.png')
}
</script>

<template>
  <div class="award">
    <h1 class="title">荣誉证书</h1>
    <main>
      <div>
        恭喜 <span class="name">{{ name }}</span> 同学：
      </div>
      <div class="text">完成实验室安全培训课程。<br />特发此证，以资鼓励。</div>
    </main>
    <div class="date">{{ date }}</div>
  </div>
  <button type="button" @click="generate">下载证书</button>
</template>

<style scoped>
.award {
  background-image: url('/images/award.jpeg');
  width: 800px;
  height: 562px;
  padding: 90px 94px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.title {
  color: #dc2626;
  align-self: center;
  margin-bottom: 0;
  font-size: 48px;
}

main {
  font-size: 24px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.text {
  align-self: center;
}

.name {
  font-weight: 700;
}

.date {
  align-self: end;
}
</style>
