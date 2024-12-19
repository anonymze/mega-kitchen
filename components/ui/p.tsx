import { Text } from 'react-native'
import type { TextProps } from 'react-native'

export function P({ children, className = "", ...props }: TextProps) {
  return (
    <Text 
      className={`font-space-mono ${className}`} 
      {...props}
    >
      {children}
    </Text>
  )
}