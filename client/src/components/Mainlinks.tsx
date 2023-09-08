import React from 'react'
import { UnstyledButton, Group, Text, createStyles } from '@mantine/core'
import { FiOctagon } from 'react-icons/fi'
import { useRouter } from 'next/router'

interface MainLinkProps {
	label: string
  href: string
}

const useStyles = createStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
	i: {
		color: 'var(--ya-ghost)'
	}
}))

const MainLink = ({ label, href }: MainLinkProps) => {
	const { classes } = useStyles()
  const router = useRouter()

	return (
		<UnstyledButton
    component='a'
			sx={theme => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color: router.pathname === href ? theme.white : 'var(--ya-ghost)',
				backgroundColor: router.pathname === href ? 'var(--ya-hover)' : 'initial',

				'&:hover': {
					backgroundColor: 'var(--ya-hover)',
					color: theme.white
				}
			})}
      href={href}
		>
			<Group>
				<FiOctagon className={classes.i} />

				<Text size="sm">{label}</Text>
			</Group>
		</UnstyledButton>
	)
}

const data = [
	{ label: 'Сводка', href: '#' },
	{ label: 'Товары', href: '/' },
	{ label: 'Заказы', href: '#' },
	{ label: 'Логистика', href: '#' },
	{ label: 'Продвижение', href: '#' },
	{ label: 'Бухгалтерия', href: '#' },
	{ label: 'Аналитика', href: '#' }
]

const MainLinks = () => {
  const { classes } = useStyles()

	const links = data.map(link => <MainLink {...link} key={link.label} />)
	return <div className={classes.root}>{links}</div>
}

export default MainLinks
