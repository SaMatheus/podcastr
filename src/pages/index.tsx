// TIPAGEM
import { GetStaticProps } from 'next'

interface Episode {
  id: string;
  title: string;
  members: string;
}
interface HomeProps {
  episodes: Episode[] // Isso significa que episodes é um array, também poderia ser assim "Array<Episode>" sendo que dentro do menor e maior fica o tipo do dado que tem no array
}

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Index</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8 // A cada 8 horas o site irá revalidar
  }
}