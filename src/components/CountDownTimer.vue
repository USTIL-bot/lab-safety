<!--
https://eugenkiss.github.io/7guis/tasks/#timer
-->

<script setup lang="ts">
import ClockIcon from '@/components/icons/ClockIcon.vue'
import { computed, onUnmounted, ref, watch } from 'vue'

const props = defineProps<{ seconds: number }>()
const emits = defineEmits<{ done: [] }>()

const duration = ref(0)
const elapsed = ref(0)
const countdown = computed(() => Math.round(props.seconds - elapsed.value / 1000))

let lastTime: number
let handle: number

const update = () => {
  elapsed.value = performance.now() - lastTime
  if (elapsed.value >= duration.value) {
    cancelAnimationFrame(handle)
    emits('done')
  } else {
    handle = requestAnimationFrame(update)
  }
}

const reset = () => {
  elapsed.value = 0
  lastTime = performance.now()
}

watch(
  props,
  () => {
    duration.value = props.seconds * 1000
    reset()
    if (duration.value !== 0) {
      update()
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  cancelAnimationFrame(handle)
})
</script>

<template>
  <div class="timer" v-if="countdown !== 0">
    <ClockIcon />
    <div>{{ countdown }} s</div>
  </div>
</template>

<style scoped>
.timer {
  position: fixed;
  top: 76.5px;
  right: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
