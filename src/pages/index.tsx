// STYLES
import styles from '../styles/pages/home.module.scss'

// TIPAGEM
import { GetStaticProps } from 'next'
interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  description: string;
  url: string;
}
interface HomeProps {
  episodes: Episode[] // Isso significa que Episode é um array, também poderia ser assim "Array<Episode>" sendo que dentro do menor e maior fica o tipo do dado que tem no array
}

// AXIOS
import api from '../services/api'

// DATE FNS
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

// UTILS
import convertDurationToTimeString from '../utils/convertDurationToTimeString'



export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Index</h1>
    </div>
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
      publishedAt: format(parseISO(episode.published_at), 'd MMM YY', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      ulr: episode.file.url,
    }
  })

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8 // A cada 8 horas o site irá revalidar
  }
}