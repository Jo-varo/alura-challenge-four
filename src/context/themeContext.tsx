import { createContext, useContext, useEffect, useState } from 'react';

interface ITheme {
  theme: 'dark' | 'light'
  isLight: boolean
  switchTheme: () => void
}

const ThemeContext = createContext<ITheme | null>(null);

export const useTheme = (): ITheme => {
  const context = useContext(ThemeContext);
  if (context == null) {
    throw new Error('context is null');
  }
  return context;
};

export const ThemeProvider = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  type Theme = ITheme['theme'];
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLight, setIsLight] = useState<boolean>(false);

  const switchTheme = (): void => {
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    changeRootBackground(newTheme);
    setTheme(newTheme);
  };

  const changeRootBackground = (newTheme: ITheme['theme']): void => {
    const root = document.getElementById('root');
    if (root !== null) {
      root.style.backgroundColor = newTheme === 'light' ? 'white' : 'black';
    }
  };

  useEffect(() => {
    setIsLight(theme === 'light');
  }, [theme]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme !== null) {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        changeRootBackground(storedTheme);
        setTheme(storedTheme);
      }
      return;
    }
    changeRootBackground('dark');
    setTheme('dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isLight, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
