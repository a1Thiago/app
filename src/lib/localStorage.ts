const localStorageUtil = {

  setItem: <T>(key: string, value: T, expirationInSeconds: number | null = null): void => {

    const item = {
      value,
      expiration: expirationInSeconds ? Date.now() + expirationInSeconds * 1000 : null,
    }

    localStorage.setItem(key, JSON.stringify(item))

  },

  getItem: <T>(key: string): T | null => {
    const itemString = localStorage.getItem(key)
    if (itemString) {
      try {
        const item = JSON.parse(itemString) as { value: T, expiration: number | null }
        if (!item.expiration || Date.now() < item.expiration) {
          return item.value
        }
        localStorage.removeItem(key)
      } catch (error) {
        console.error('Error parsing item:', error)
        return null
      }
    }
    return null
  },

  deleteItem: (key: string): void => {
    localStorage.removeItem(key)
  },
}

export default localStorageUtil
