const PokePage = ({ pokemon }) => {
  return <div>{pokemon ? pokemon.name : ''}</div>
}

export async function getStaticPaths() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=0&offset=10')
  const pokemons = await res.json()

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
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
  const pokemon = await res.json()
  return {
    props: {
      pokemon
    }
  }
}

export default PokePage
