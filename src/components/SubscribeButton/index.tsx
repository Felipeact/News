
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/dist/client/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import { Button } from './styles'

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId}: SubscribeButtonProps){
  const [ session ] = useSession()
  const router = useRouter()

  async function handleSubsribe(){
    //Checking if user is loged in
    if(!session){
      signIn('github')
      return;
    }

    if (session.activeSubscription){
      router.push('/posts')
      return;
    }
    //Create checkout session 
    try {
      const response = await api.post('/subscribe')
      
      const { sessionId } = response.data

      const stripe = await getStripeJs()

     await  stripe.redirectToCheckout({ sessionId })
    } catch(err) {
      alert(err.message)
    }
  }

  return (
    <Button type="button" onClick={handleSubsribe}>
      Subscribe Now
    </Button>
  )
}