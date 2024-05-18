export const metadata = {
  title: 'Gatominio',
  description: 'Um app para gerenciar gatos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
