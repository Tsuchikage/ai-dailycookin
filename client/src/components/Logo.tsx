import React from 'react'
import { Box, Text } from '@mantine/core'

export function Logo() {
	return (
		<Box
			sx={theme => ({
				paddingLeft: theme.spacing.xs,
				paddingRight: theme.spacing.xs,
				paddingBottom: theme.spacing.lg
			})}
		>
			<Text
				component="a"
				href="/"
				color="white"
				ta="center"
				fz="xl"
				fw={700}
			>
				DAILYCOOKIN
			</Text>
		</Box>
	)
}
