"use client";

import * as React from "react"; // Import React for JSX support
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Import ThemeProvider from next-themes for theme management
import { type ThemeProviderProps } from "next-themes/dist/types"; // Import type definition for ThemeProviderProps

// Define the ThemeProvider component
// This component is a wrapper around next-themes' ThemeProvider to add custom logic or props if needed
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Render the ThemeProvider from next-themes, passing all props and children
  // This allows for theme state management across the entire application
  // Children represent the React nodes wrapped by this provider
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
