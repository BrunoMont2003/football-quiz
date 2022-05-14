import axios from 'axios'
const FUTAPIKey = import.meta.env.VITE_FUTDB_API_KEY
const options = {
  headers: {
    'X-AUTH-TOKEN': FUTAPIKey
  }
}

export const getPlayers = async (page = 9) => {
  const URI = `https://futdb.app/api/players?page=${page}`
  try {
    const {
      data: { items }
    } = await axios.get(URI, options)
    const filteredItems = items.filter((item) => item.rarity === 1)
    await Promise.all(
      filteredItems.map(async (item) => {
        const image = await getPlayerImage(item.id)
        item.image = image
      })
    )
    return filteredItems
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export const getPlayerImage = async (id = 1340) => {
  const URI = `https://futdb.app/api/players/${id}/image`
  const req = await fetch(URI, options)
  const blob = await req.blob()
  const image = URL.createObjectURL(blob)

  return image
}
