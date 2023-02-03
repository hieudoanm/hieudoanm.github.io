import React, { ReactNode, createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => console.log(darkMode),
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
} => {
  return useContext(ThemeContext);
};
