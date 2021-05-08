import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import { Container } from './styles'
import { ThemeName } from '../../styles/theme'


interface Props {
  themeName: ThemeName;
  setThemeName: (newName: ThemeName) => void;
}

export function Header({ themeName, setThemeName }: Props ){
  
  function toogleTheme(){
    setThemeName(themeName === "dark" ? 'light' : 'dark')    
  }

  return(
    <Container className="headerContainer">

    <header >
      <div className="headerContent">
        <p onClick={toogleTheme}>News</p>
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