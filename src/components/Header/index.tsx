import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import { Container } from './styles'

export function Header(){
  return(
    <Container className="headerContainer">

    <header >
      <div className="headerContent">
        <p>News</p>
        <nav>
          <ActiveLink href="/" activeClassName="active">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName="active">
            <a >Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
    </Container>
  )
}