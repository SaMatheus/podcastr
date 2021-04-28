// STYLES
import styles from '../../styles/pages/episode.module.scss'

// NEXT
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

// DATE FNS
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

//AXIOS
import api from '../../services/api'

// UTILS
import convertDurationToTimeString from '../../utils/convertDurationToTimeString'

// CONTEXT
import { usePlayer } from '../../contexts/PlayerContext'


// TIPAGEM
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

interface EpisodeProps {
  episode: Episode
}


export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer()

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} |  Podcastr</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={150}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>
      <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    ulr: data.file.url,
  }

  return {
    props: {
      episode
    },
    revalidate: 60 * 60 * 24 // // A cada 24 horas o site irá revalidar
  }
}