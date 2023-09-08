import React from 'react'
import { Navbar as Nav, createStyles } from '@mantine/core'
import MainLinks from './Mainlinks'
import User from './User'
import { Logo } from './Logo'

const useStyles = createStyles(theme => ({
	navbar: { backgroundColor: 'var(--ya-primary-text)' }
}))

const Navbar = () => {
	const { classes } = useStyles()

	return (
		<Nav
			className={classes.navbar}
			p="xs"
			width={{ base: 300 }}
			withBorder={false}
		>
			<Nav.Section mt="xs">
				<Logo />
			</Nav.Section>
			<Nav.Section grow mt="md">
				<MainLinks />
			</Nav.Section>
			<Nav.Section>
				<User />
			</Nav.Section>
		</Nav>
	)
}

export default Navbar
