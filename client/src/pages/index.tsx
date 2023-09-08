import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { useUploadMutation } from '@/redux/api'
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

export default function Home() {
	const { classes } = useStyles()
	const [file, setFile] = useState<File | null>(null)

	const [beforeImgUrl, setBeforeImgUrl] = useState<string | null>(null)
	const [afterImgUrl, setAfterImgUrl] = useState<string | null>(null)

	// const [isLoading, setIsLoading] = useState(false)

	const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF')

	const productName = useMemo(() => faker.commerce.productName(), [])

	const handleFileChange = (f: File) => {
		if (f) {
			const reader = new FileReader()

			reader.onloadend = () => {
				setFile(f)
				setBeforeImgUrl(reader.result as string)
			}

			reader.readAsDataURL(f)
		} else {
			setFile(null)
			setBeforeImgUrl(null)
		}
	}

	const [upload, { isLoading, isError }] = useUploadMutation()

	const handleSubmit = () => {
		if (!file) return
		setAfterImgUrl(null)

		const formData = new FormData()
		formData.set('image', file)

		upload(formData)
			.then(res => {
				// @ts-ignore
				setAfterImgUrl(res.data.base64_image)
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
					>
						{props => (
							<Button {...props} className={classes.add}>
								{file ? file.name : 'Изображение'}
							</Button>
						)}
					</FileButton>
					<ColorInput
						placeholder="Цвет фона"
						onChange={setBackgroundColor}
						value={backgroundColor}
						withEyeDropper
						swatchesPerRow={7}
						swatches={[
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
						]}
						disabled={!file}
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

			<BeforeAfterSlider
				before={beforeImgUrl}
				after={afterImgUrl && `data:image/png;base64,${afterImgUrl}`}
				// before="/before.jpg"
				// after="/after.png"
				backgroundColor={backgroundColor}
				isLoading={isLoading}
			/>
		</div>
	)
}
