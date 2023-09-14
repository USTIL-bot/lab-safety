<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { toLocalDateString } from '@/utils'
import { toPng } from 'html-to-image'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

const { id, name } = storeToRefs(useUserStore())
const date = ref(toLocalDateString(new Date()))

const dataUrl = ref('')
const generated = computed(() => dataUrl.value !== '')

onMounted(async () => {
  dataUrl.value = await toPng(document.querySelector('.award') as HTMLElement)
})

function generate() {
  const link = document.createElement('a')
  link.download = '实验室安全培训证书.png'
  link.href = dataUrl.value
  link.click()
}
</script>

<template>
  <div class="award" v-if="!generated">
    <h1 class="title">荣誉证书</h1>
    <main>
      <div>
        恭喜 <span class="name">{{ `${name}（${id}）` }}</span
        >同学：
      </div>
      <div class="text">完成实验室安全培训课程。<br />特发此证，以资鼓励。</div>
    </main>
    <div class="date">{{ date }}</div>
  </div>
  <img :src="dataUrl" />
  <button type="button" @click="generate">下载证书</button>
  <Transition name="fade">
    <div class="loading" v-if="!generated">
      <div aria-busy="true">生成中……</div>
    </div>
  </Transition>
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

button {
  margin-top: 2rem;
}

.loading {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
