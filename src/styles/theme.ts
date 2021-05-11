
export const themes = {
  light : {
    'white': '#121214',

    'gray-100': '#0a0a0a',
    'gray-300': '#141414',
    'gray-700': '#1f1f1f',
    'gray-800': '#292929',
    'gray-850': '#333333',
    'gray-900': '#ffffff',

    'cyan-500': '#eba417',
    'yellow-500': '#61dafb',
  }, 
  
  dark : {
    'white': '#ffffff',

    'gray-100': '#e1e1e6',
    'gray-300': '#a8a8b3',
    'gray-700': '#323238',
    'gray-800': '#29292e',
    'gray-850': '#1f2729',
    'gray-900': '#121214',

    'cyan-500': '#61dafb',
    'yellow-500': '#eba417',
  }
}

export type ThemeName = keyof typeof themes;
export type ThemeType = typeof themes.light | typeof themes.dark