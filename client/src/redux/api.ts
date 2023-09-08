import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: "/api",
	// credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		headers.set('ngrok-skip-browser-warning', '69420')		
return headers
	}
})

interface Response {
	base64_image: string
	some_param: string
}

export const api = createApi({
	reducerPath: 'splitApi',
	baseQuery,
	tagTypes: ['API'],
	endpoints: build => ({
		upload: build.mutation<Response, FormData>({
			query: body => ({
				url: '/images/process_image',
				method: 'POST',
				body
			})
		})
	})
})

export const { useUploadMutation } = api
