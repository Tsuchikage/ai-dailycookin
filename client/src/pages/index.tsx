import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { useUploadMutation } from '@/redux/api'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
	setAfter,
	setBackground,
	setBefore,
	setDescription,
	setTags
} from '@/redux/slice'
import { faker } from '@faker-js/faker'
import {
	Button,
	ColorInput,
	FileButton,
	Paper,
	SimpleGrid,
	Text,
	TextInput,
	createStyles
} from '@mantine/core'
import { useMemo, useState } from 'react'

const useStyles = createStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		gap: theme.spacing.xl,
		color: 'var(--ya-primary-text)',
		width: '100%'
	},
	button: {
		backgroundColor: 'var(--ya-yellow)',
		color: 'var(--ya-primary-text)',
		flex: 1,

		'&:hover': {
			backgroundColor: 'var(--ya-yellow-hover)'
		}
	},
	card: {
		display: 'flex',
		justifyContent: 'space-between',
		backgroundColor: theme.white,
		flexShrink: 0
	},
	add: {
		backgroundColor: 'var(--ya-gray)',
		color: 'var(--ya-primary-text)',

		'&:hover': {
			backgroundColor: 'var(--ya-gray-hover)'
		}
	},
	text: { color: 'var(--ya-primary-text)', lineHeight: '20px' }
}))

const COLORS = [
	'#25262b',
	'#868e96',
	'#fa5252',
	'#e64980',
	'#be4bdb',
	'#7950f2',
	'#4c6ef5',
	'#228be6',
	'#15aabf',
	'#12b886',
	'#40c057',
	'#82c91e',
	'#fab005',
	'#fd7e14'
]

export default function Home() {
	const { classes } = useStyles()
	const st = useAppSelector(state => state.slice)
	const dispatch = useAppDispatch()

	const [file, setFile] = useState<File | null>(null)

	const productName = useMemo(() => faker.commerce.productName(), [])

	const handleFileChange = (f: File) => {
		if (f) {
			dispatch(setAfter(null))

			const reader = new FileReader()

			reader.onloadend = () => {
				setFile(f)
				dispatch(setBefore(reader.result as string))
			}

			reader.readAsDataURL(f)
		} else {
			setFile(null)
			dispatch(setBefore(null))
		}
	}

	const [upload, { isLoading, isError }] = useUploadMutation()

	const handleSubmit = () => {
		if (!file) return
		dispatch(setAfter(null))

		const formData = new FormData()
		formData.set('image', file)

		upload(formData)
			.then(res => {
				// @ts-ignore
				const { base64_image, description, tags } = res.data
				dispatch(setAfter(base64_image))
				dispatch(setDescription(description))
				dispatch(setTags(tags))
			})
			.catch(console.log)
	}

	return (
		<div className={classes.root}>
			<Text className={classes.text} size="xl" weight="bold">
				Главное о товаре
			</Text>

			<Paper p={0} className={classes.card}>
				<SimpleGrid w="100%" cols={2}>
					<TextInput
						placeholder="Название товара"
						value={productName}
						readOnly
						withAsterisk
					/>
					<FileButton
						onChange={handleFileChange}
						accept="image/png,image/jpeg"
						disabled={isLoading}
					>
						{props => (
							<Button {...props} className={classes.add}>
								{file ? file.name : 'Изображение'}
							</Button>
						)}
					</FileButton>
					<ColorInput
						placeholder="Цвет фона"
						onChange={color => dispatch(setBackground(color))}
						value={st.background}
						withEyeDropper
						swatchesPerRow={7}
						swatches={COLORS}
						disabled={isLoading}
					/>
					<Button
						className={classes.button}
						onClick={handleSubmit}
						disabled={isLoading}
					>
						Сохранить
					</Button>
				</SimpleGrid>
			</Paper>

			<BeforeAfterSlider isLoading={isLoading} />
		</div>
	)
}
