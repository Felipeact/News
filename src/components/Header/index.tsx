import DarkModeToggle from "react-dark-mode-toggle";

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

  function theme() {
    if ( themeName === 'light') {
      return false 
    } else {
      return true 
    }
  }

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

        <DarkModeToggle onChange={toogleTheme} checked={theme()} className='DarkModeToggle' />
      </div>
    </header>
    </Container>
  )
}