'use client';

import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface Theme {
  name: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
}

const themes: Theme[] = [
  {
    name: 'Yellow',
    primary: '#eab308',
    primaryLight: '#fde047',
    primaryDark: '#a16207',
    secondary: '#f97316',
    secondaryLight: '#fb923c',
    secondaryDark: '#c2410c',
  },

  {
    name: 'Cyan',
    primary: '#06b6d4',
    primaryLight: '#22d3ee',
    primaryDark: '#0891b2',
    secondary: '#3b82f6',
    secondaryLight: '#60a5fa',
    secondaryDark: '#1d4ed8',
  },
  {
    name: 'Pink',
    primary: '#ec4899',
    primaryLight: '#f472b6',
    primaryDark: '#be185d',
    secondary: '#d946ef',
    secondaryLight: '#e879f9',
    secondaryDark: '#a21caf',
  },

  {
    name: 'Red',
    primary: '#f20875ca',
    primaryLight: '#fa6178ff',
    primaryDark: '#a80735ff',
    secondary: '#f8fafc', // Soft slate white
    secondaryLight: '#ffffff',
    secondaryDark: '#e2e8f0',
  },
];

interface BackgroundContextType {
  currentTheme: Theme;
  cycleTheme: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
  undefined,
);

export function BackgroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeIndex, setThemeIndex] = useState(0);

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${Number.parseInt(result[1], 16)}, ${Number.parseInt(
          result[2],
          16,
        )}, ${Number.parseInt(result[3], 16)}`
      : '0, 0, 0';
  };

  useEffect(() => {
    const theme = themes[themeIndex];
    const root = document.documentElement;

    // Set Hex variables
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--primary-light', theme.primaryLight);
    root.style.setProperty('--primary-dark', theme.primaryDark);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--secondary-light', theme.secondaryLight);
    root.style.setProperty('--secondary-dark', theme.secondaryDark);

    // Set RGB variables for transparency
    root.style.setProperty('--primary-rgb', hexToRgb(theme.primary));
    root.style.setProperty('--primary-light-rgb', hexToRgb(theme.primaryLight));
    root.style.setProperty('--secondary-rgb', hexToRgb(theme.secondary));
  }, [themeIndex]);

  return (
    <BackgroundContext.Provider
      value={{ currentTheme: themes[themeIndex], cycleTheme }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
