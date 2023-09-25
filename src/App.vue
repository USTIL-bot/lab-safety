<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useLearnStore } from './stores/learn'
import { useUserStore } from './stores/user'

const { id, name } = storeToRefs(useUserStore())
const { clear: userClear, userIsEmpty } = useUserStore()
const { clear: learnClear } = useLearnStore()

const isOpen = ref(false)

function toggle() {
  const duration = 400
  if (isOpen.value) {
    document.documentElement.classList.add('modal-is-closing')
    setTimeout(() => {
      document.documentElement.classList.remove('modal-is-open', 'modal-is-closing')
      isOpen.value = false
    }, duration)
  } else {
    document.documentElement.classList.add('modal-is-open', 'modal-is-opening')
    setTimeout(() => {
      document.documentElement.classList.remove('modal-is-opening')
    }, duration)
    isOpen.value = true
  }
}

const router = useRouter()

function clear() {
  userClear()
  learnClear()
  toggle()
  router.push('/')
}
</script>

<template>
  <nav class="container-fluid">
    <ul>
      <li>
        <h3 class="home-link"><RouterLink to="/">实验室安全培训</RouterLink></h3>
      </li>
    </ul>
    <ul v-if="!userIsEmpty()" class="user">
      <li>学号：{{ id }}</li>
      <li>姓名：{{ name }}</li>
      <li>
        <a href="#" role="button" class="outline" @click="toggle">注销</a>
      </li>
    </ul>
  </nav>
  <dialog :open="isOpen">
    <article>
      <h3>警告</h3>
      <p>您的账户将被注销，且学习记录将会被清空。</p>
      <footer>
        <a href="#" role="button" class="secondary" @click="toggle">取消</a>
        <a class="warning" href="#" role="button" @click="clear">确认</a>
      </footer>
    </article>
  </dialog>
  <main class="container">
    <RouterView />
  </main>
  <img src="/images/sut-logo.png" />
</template>

<style scoped>
.home-link {
  margin-bottom: 0;
}

.home-link > a {
  color: inherit;
}

main {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
}

.warning {
  --primary: #dc2626;
  --primary-hover: #b91c1c;
}

img {
  width: 20%;
  opacity: 35%;
  position: fixed;
  right: 50px;
  bottom: 50px;
}
</style>

<style>
#app {
  background-image: url(/images/bg.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

/* Indigo Light scheme (Default) */
/* Can be forced with data-theme="light" */
[data-theme='light'],
:root:not([data-theme='dark']) {
  --primary: #3949ab;
  --primary-hover: #303f9f;
  --primary-focus: rgba(57, 73, 171, 0.125);
  --primary-inverse: #fff;
}

/* Indigo Dark scheme (Auto) */
/* Automatically enabled if user has Dark mode enabled */
@media only screen and (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --primary: #3949ab;
    --primary-hover: #3f51b5;
    --primary-focus: rgba(57, 73, 171, 0.25);
    --primary-inverse: #fff;
  }
}

/* Indigo Dark scheme (Forced) */
/* Enabled if forced with data-theme="dark" */
[data-theme='dark'] {
  --primary: #3949ab;
  --primary-hover: #3f51b5;
  --primary-focus: rgba(57, 73, 171, 0.25);
  --primary-inverse: #fff;
}

/* Indigo (Common styles) */
:root {
  --form-element-active-border-color: var(--primary);
  --form-element-focus-color: var(--primary-focus);
  --switch-color: var(--primary-inverse);
  --switch-checked-background-color: var(--primary);
}
</style>
