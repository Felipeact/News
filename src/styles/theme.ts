
export const themes = {
  light : {
    'white': '#ffffff',

    // 'gray-100': '#e1e1e6',
    // 'gray-300': '#a8a8b3',
    // 'gray-700': '#323238',
    // 'gray-800': '#29292e',
    // 'gray-850': '#1f2729',
    // 'gray-900': '#121214',

    'cyan-500': '#61dafb',
    'yellow-500': '#eba417',
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