import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(load().id)
  const name = ref(load().name)

  function userIsEmpty() {
    return id.value === '' && name.value === ''
  }

  function save(userId: string, userName: string) {
    id.value = userId
    name.value = userName
    localStorage.setItem('user', JSON.stringify({ id: id.value, name: name.value }))
  }

  function load(): { id: string; name: string } {
    const userStorage = localStorage.getItem('user')
    return userStorage !== null ? JSON.parse(userStorage) : { id: '', name: '' }
  }

  return { id, name, userIsEmpty, save }
})
