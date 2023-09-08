import { useRef, useState } from 'react'
import {
	Badge,
	Button,
	LoadingOverlay,
	Paper,
	Skeleton,
	Text,
	createStyles
} from '@mantine/core'
import html2canvas from 'html2canvas' // Import html2canvas library
import { useAppSelector } from '@/redux/hooks'

interface Props {
	isLoading?: boolean
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
		position: 'absolute',
		objectFit: 'contain'
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
			color: 'var(--ya-primary-text)'
		}
	}
}))

function getRandomColor() {
	const COLORS = ['green', 'blue', 'cyan', 'grape', 'indigo', 'pink', 'teal']

	const randomIndex = Math.floor(Math.random() * COLORS.length)
	return COLORS[randomIndex]
}

const BeforeAfterSlider = ({ isLoading = false }: Props) => {
	const { classes } = useStyles()
	const [position, setPosition] = useState<number>(50)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const st = useAppSelector(state => state.slice)

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
		if (!st.after || !imgRef.current) return

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
				{st.before ? (
					<>
						<div
							className={classes.slider}
							onMouseMove={handleMouseMove}
						>
							<img
								src={st.before}
								alt="Before"
								style={{
									clipPath: `inset(0 ${100 - position}% 0 0)`
								}}
								className={classes.img}
								draggable={false}
							/>
							{st.after && (
								<img
									src={`data:image/png;base64,${st.after}`}
									ref={imgRef}
									alt="After"
									style={{
										clipPath: `inset(0 0 0 ${position}%)`,
										backgroundColor: st.background
									}}
									className={classes.img}
									draggable={false}
								/>
							)}
							<div
								className={classes.divider}
								style={{ left: `${position}%` }}
							/>
							{st.after && (
								<Button
									className={classes.button}
									onClick={captureScreenshot}
									variant="subtle"
									uppercase
								>
									Скачать
								</Button>
							)}
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
			{st.after && (
				<div className="col" style={{ gap: 8 }}>
					{st.description && <Text>{st.description}</Text>}
					{st.tags && (
						<div className="row" style={{ gap: 8 }}>
							{st.tags.map((tag, i) => (
								<Badge key={i} color={getRandomColor()}>
									{tag}
								</Badge>
							))}
						</div>
					)}
				</div>
			)}
		</>
	)
}

export default BeforeAfterSlider
