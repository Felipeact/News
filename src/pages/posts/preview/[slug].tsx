import { GetStaticProps } from "next"
import { useSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import Link from "next/link"
import { RichText } from "prismic-dom"
import { useEffect } from "react"

import { getPrismicClient } from "../../../services/prismic"

import { Container } from '../../../styles/post'

interface PostPreviewProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function PostPreview( { post }: PostPreviewProps ){
  const [ session ] = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session?.activeSubscription){
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

  return (
    <Container>  
      <Head>
        <title>{post.title} | Ignews </title>
      </Head>

      <main className="container">
        <article className="post">
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div 
          className={`postContent previewContent`}
          dangerouslySetInnerHTML ={{ __html: post.content }} />

          <div className="continueReading">
            Wanna continue Reading?
            <Link href="/">
              <a>Subscribe now</a>
            </Link>
          </div>
        </article>
      </main>
    </Container>
  )
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ( { params } ) => {
  const { slug } = params;
  
  const prismic = getPrismicClient() 

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-CA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    },
    revalidate: 60 * 30, //30 minutis
  }
}