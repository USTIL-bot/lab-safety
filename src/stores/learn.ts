import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLearnStore = defineStore('learn', () => {
  const learnt = ref(load())

  // const length = computed(() => learnt.value.length)

  function pages(id: number) {
    return learnt.value[id - 1].length
  }

  function hasLearnt(id: number, page: number) {
    return learnt.value[id - 1][page - 1]
  }

  function allHasLearnt(id: number) {
    return learnt.value[id - 1].every((status) => status)
  }

  function check(id: number, page: number) {
    learnt.value[id - 1][page - 1] = true
    save()
  }

  function save() {
    localStorage.setItem('learn', JSON.stringify(learnt.value))
  }

  function load(): ReturnType<typeof init> {
    const learnStorage = localStorage.getItem('learn')
    return learnStorage !== null ? JSON.parse(learnStorage) : init()
  }

  function init() {
    return [
      [false, false, false, false, false, false, false],
      [false],
      [false, false, false, false],
      [false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false]
    ]
  }

  return { pages, hasLearnt, allHasLearnt, check }
})
