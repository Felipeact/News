import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import { Container } from './home';

interface HomeProps {
  product: {
    priceId: string,
    amount: number
  }
}

export default function Home({product}: HomeProps) {


  return (
    <Container>
      <Head>
        <title>News</title>
      </Head>

    <main className="contentContainer">
      <section className="hero">
        <span>Hey, Welcome</span>
        <h1> News about the <span>World</span></h1>
        <p>
          Get access to all the publication <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId} />
      </section>

      <img src="/images/avatar.svg" alt=""/>
    </main>
   </Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IloX5EHBUZgckFtpVPgySDB')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'}).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24,
  }
}