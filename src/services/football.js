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
        const playerImage = await getImageFrom('player', item.id)
        item.playerImage = playerImage
        const leagueImage = await getImageFrom('league', item.league)
        item.leagueImage = leagueImage
        const clubImage = await getImageFrom('club', item.club)
        item.clubImage = clubImage
      })
    )
    return filteredItems
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export const getImageFrom = async (param = 'player', id) => {
  const URI = `https://futdb.app/api/${param}s/${id}/image`
  const req = await fetch(URI, options)
  const blob = await req.blob()
  const image = URL.createObjectURL(blob)

  return image
}
