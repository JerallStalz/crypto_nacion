const Works = ({ work }) => <div>{work.name}</div>

export async function getStaticProps() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon/1')
  const work = await res.json()
  return {
    props: {
      work
    }
  }
}

export default Works
