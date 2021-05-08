import { FaGithub } from 'react-icons/fa'
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/client";

import { Button } from './styles';

export function SignInButton() {
  const [ session ] = useSession()

      return session ? (

      
        <Button type="button"  onClick={() => signOut()}>
          <FaGithub color="#04d361" />
          {session.user.name}
          <FiX color="#737380" className="closeIcon"/>
        </Button>

      
    ) : (
      

        <Button type="button" onClick={() => signIn('github')}>
          <FaGithub color="#eba417" />
          Sign in with Github
        </Button>
      

    )
  }
    