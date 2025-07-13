import Alert from 'react-bootstrap/Alert'

import React from 'react'

interface MessageBoxProps {
  variant?: string
  children: React.ReactNode
}

export default function MessageBox({
  variant = 'info',
  children,
}: MessageBoxProps) {
  return <Alert variant={variant || 'info'}> {children}</Alert>
}
