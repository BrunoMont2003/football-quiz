import axios from 'axios'
const FUTAPIKey = import.meta.env.VITE_FUTDB_API_KEY
const options = {
  headers: {
    'X-AUTH-TOKEN': FUTAPIKey
  }
}

export const getPlayers = async (page = 35) => {
  const URI = `https://futdb.app/api/players?page=${page}`
  try {
    const {
      data: { items }
    } = await axios.get(URI, options)
    const filteredItems = items.filter((item) => item.rarity === 1)
    for (const item of filteredItems) {
      const playerImage = await getImageFrom('player', item.id)
      item.playerImage = playerImage
      const leagueImage = await getImageFrom('league', item.league)
      item.leagueImage = leagueImage
      const clubImage = await getImageFrom('club', item.club)
      item.clubImage = clubImage
    }
    console.log(URI)
    console.log(filteredItems)
    console.log('espera 1')
    return filteredItems
  } catch (error) {
    console.log(error.message)
  }
}

export const getImageFrom = async (param = 'player', id) => {
  const URI = `https://futdb.app/api/${param}s/${id}/image`
  const req = await fetch(URI, options)
  const blob = await req.blob()
  const image = URL.createObjectURL(blob)

  return image
}
export const getManyPlayers = async (n = 40) => {
  let players = []
  for (let i = 0; i < n; i++) {
    const page = await getPlayers(i + 9)
    console.log(page)
    console.log('esperado 2')
    players = page.length > 0 ? players.concat(page) : players
    console.log('players so far')
    console.log(players)
  }
  return players
}
