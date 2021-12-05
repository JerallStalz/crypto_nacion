import Head from 'next/head'

const PokePage = ({ name }) => {
  return (
    <>
      <Head>
        <title>{name ? name : ''}</title>
      </Head>
      <div>pito {name ? name : ''}</div>
    </>
  )
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118'
  )
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
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
    const pokemon = await res.json()
    return {
      props: {
        name: pokemon.name
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        name: ''
      }
    }
  }
}

export default PokePage
