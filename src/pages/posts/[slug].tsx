import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import Head from "next/head"
import { RichText } from "prismic-dom"

import { getPrismicClient } from "../../services/prismic"

import { Container } from '../../styles/post'

interface PostProps {
  post: {
    slug: string,
    title: string,
    content: string,
    updatedAt: string
  }
}

export default function Post( { post }: PostProps ){
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
          className="postContent"
          dangerouslySetInnerHTML ={{ __html: post.content }} />
        </article>
      </main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ( { req, params } ) => {
  const session = await getSession( { req } )
  const { slug } = params;

  if(!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      }
    }
  }
  console.log(session)
  
  const prismic = getPrismicClient(req) 

  const response = await prismic.getByUID('publication', String(slug), {})

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-CA', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props: {
      post
    }
  }
}