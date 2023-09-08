import React, { useRef, useState } from 'react'
import {
	Button,
	LoadingOverlay,
	Paper,
	Skeleton,
	createStyles
} from '@mantine/core'
import html2canvas from 'html2canvas' // Import html2canvas library

interface Props {
	before: string | null
	after: string | null
	isLoading?: boolean
	backgroundColor: string
}

const useStyles = createStyles(theme => ({
	root: {
		position: 'relative',
		overflow: 'hidden',
		width: '100%',
		height: '100%',

		borderRadius: theme.radius.sm
	},
	slider: {
		position: 'relative',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		cursor: 'ew-resize',
		borderRadius: theme.radius.sm
	},
	img: {
		width: '100%',
		height: '100%',
		position: 'absolute'
	},
	divider: {
		position: 'absolute',
		width: '2px',
		height: '100%',
		background: theme.white,
		cursor: 'ew-resize',
		zIndex: 1,
		userSelect: 'none'
	},
	button: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		zIndex: 100,
		color: 'var(--ya-secondary-text)',

		'&:hover': {
			backgroundColor: 'inherit',
			color: 'var(--ya-primary-text)',
		}
	}
}))

const BeforeAfterSlider = ({
	before,
	after,
	isLoading = false,
	backgroundColor
}: Props) => {
	const { classes } = useStyles()
	const [position, setPosition] = useState<number>(50)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const handleMouseMove = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		const sliderRect = e.currentTarget.getBoundingClientRect()
		const newPosition =
			((e.clientX - sliderRect.left) / sliderRect.width) * 100
		setPosition(Math.max(0, Math.min(100, newPosition)))
	}

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPosition(parseInt(e.target.value))
	}

	const captureScreenshot = () => {
		if (!after || !imgRef.current) return

		html2canvas(imgRef.current).then(canvas => {
			const screenshotDataUrl = canvas.toDataURL('image/png')
			const a = document.createElement('a')
			a.href = screenshotDataUrl
			a.download = 'after-screenshot.png'
			a.click()
		})
	}

	return (
		<>
			<Paper withBorder radius="md" className={classes.root}>
				<LoadingOverlay visible={isLoading} overlayBlur={2} />
				{before ? (
					<>
						<div
							className={classes.slider}
							onMouseMove={handleMouseMove}
						>
							<img
								src={before}
								alt="Before"
								style={{
									clipPath: `inset(0 ${100 - position}% 0 0)`
								}}
								className={classes.img}
								draggable={false}
							/>
							{after && (
								<img
									src={after}
									ref={imgRef}
									alt="After"
									style={{
										clipPath: `inset(0 0 0 ${position}%)`,
										backgroundColor
									}}
									className={classes.img}
									draggable={false}
								/>
							)}
							<div
								className={classes.divider}
								style={{ left: `${position}%` }}
							/>
							{after && <Button
								className={classes.button}
								onClick={captureScreenshot}
								variant='subtle'
								uppercase
							>
								Скачать
							</Button>}
						</div>
						<input
							type="range"
							min="0"
							max="100"
							value={position}
							onChange={handleSliderChange}
							hidden
						/>
					</>
				) : (
					<Skeleton height="100%" width="100%" animate={false} />
				)}
			</Paper>
		</>
	)
}

export default BeforeAfterSlider
