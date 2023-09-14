import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLearnStore = defineStore('learn', () => {
  const learnt = ref(load())

  function pages(id: number) {
    return learnt.value[id - 1].length
  }

  function hasLearnt(id: number): boolean
  function hasLearnt(id: number, page: number): boolean
  function hasLearnt(id: number, page?: number) {
    return page !== undefined
      ? learnt.value[id - 1][page - 1]
      : learnt.value[id - 1].every((status) => status)
  }

  function allHasLearnt() {
    return learnt.value.flat().every((status) => status)
  }

  function check(id: number, page: number) {
    learnt.value[id - 1][page - 1] = true
    save()
  }

  function clear() {
    localStorage.removeItem('learn')
    learnt.value = load()
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

  return { pages, hasLearnt, allHasLearnt, check, clear }
})
