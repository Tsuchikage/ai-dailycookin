import { ReactNode } from 'react'
import Navbar from './Navbar'
import { AppShell } from '@mantine/core'

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<AppShell padding="md" fixed={false} navbar={<Navbar />} styles={{main: {padding: 24}}}>
			{children}
		</AppShell>
	)
}
