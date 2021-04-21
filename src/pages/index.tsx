// TIPAGEM
import { GetStaticProps } from 'next'
interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
}
interface HomeProps {
  episodes: Episode[] // Isso significa que Episode é um array, também poderia ser assim "Array<Episode>" sendo que dentro do menor e maior fica o tipo do dado que tem no array
}

// AXIOS
import api from '../services/api'

// DATE FNS
import { format, parseISO } from 'date-fns'

export default function Home(props: HomeProps) {
  return (
    <>
      <h1>Index</h1>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: episode.published_at
    }
  })

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8 // A cada 8 horas o site irá revalidar
  }
}