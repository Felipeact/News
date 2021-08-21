import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client'
import Head from 'next/head'
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom'
import Link from 'next/link';


import { Container } from '../../styles/styles'

type Post = {
  slug: string,
  title: string,
  excerpt: string,
  updatedAt: string
}

interface PostsProps {
  posts: Post[]
}

export default function Posts( {posts } : PostsProps) {
  return (
    <Container>
      <Head>
        <title> Posts | News </title>
      </Head>

      <main className="container">
        <div className="posts">
          { posts.map( post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>

          ))}
        </div>
      </main>


    </Container>
  );
}

export const getStaticProps: GetStaticProps = async() => {
  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'publication' )
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  })

  const posts = response.results.map( post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find( content => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-CA', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }
  })

  return {
    props: {
      posts
    }
  }
}

