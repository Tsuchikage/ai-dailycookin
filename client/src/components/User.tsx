import React from 'react'
import {
	UnstyledButton,
	Group,
	Avatar,
	Text,
	Box,
	createStyles
} from '@mantine/core'

const useStyles = createStyles(theme => ({
	root: {
		paddingTop: theme.spacing.sm
	},
	button: {
		display: 'block',
		width: '100%',
		padding: theme.spacing.xs,
		borderRadius: theme.radius.sm,

		'&:hover': {
			backgroundColor: 'var(--ya-hover)'
		}
	},
	name: { color: theme.white },
	email: { color: 'var(--ya-secondary-text)' }
}))

const User = () => {
	const { classes } = useStyles()

	return (
		<Box className={classes.root}>
			<UnstyledButton className={classes.button}>
				<Group>
					<Avatar color="dark" radius="xl">
						MK
					</Avatar>
					<Box sx={{ flex: 1 }}>
						<Text size="sm" weight={500} className={classes.name}>
							Иван Иванов
						</Text>
						<Text
							color="dimmed"
							size="xs"
							className={classes.email}
						>
							millenniumfalcon@gmail.com
						</Text>
					</Box>
				</Group>
			</UnstyledButton>
		</Box>
	)
}

export default User
