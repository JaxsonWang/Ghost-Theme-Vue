import api from '@/utils/ghost'

export const getSettings = async() => {
  return await api.settings
    .browse()
    .catch(err => {
      console.error(err)
    })
}
