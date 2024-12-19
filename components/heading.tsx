import { P } from './p'
import type { TextProps } from 'react-native'

interface TypographyProps extends TextProps {
  level: 1 | 2 | 3 | 4
}

export function Heading({ 
  children, 
  level, 
  className = "", 
  ...props 
}: TypographyProps) {
  const styles = {
    1: "font-bold text-3xl",
    2: "font-semibold text-2xl",
    3: "font-semibold text-xl",
    4: "",
  }[level]

  return (
    <P
      className={`${styles} ${className}`}
      accessibilityRole="header"
      {...props}
    >
      {children}
    </P>
  )
}