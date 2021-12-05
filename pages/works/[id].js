const PokePage = ({ name }) => {
  return <div>pito {name ? name : ''}</div>
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1117'
  )
  const pokemons = await res.json()
  console.log(pokemons)
  const paths = pokemons.results.map(path => ({
    params: {
      id: path.url.split('/')[6]
    }
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  console.log(params)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const pokemon = await res.json()
  return {
    props: {
      name: pokemon.name
    }
  }
}

export default PokePage
