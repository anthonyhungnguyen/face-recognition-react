import React, { useEffect } from 'react'
import * as faceapi from 'face-api.js'

export default function Home() {
	useEffect(() => {
		loadModels()
	}, [])
	const loadModels = async () => {
		const MODEL_URL = process.env.PUBLIC_URL + '/models'
		await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
	}

	return <div>Hello</div>
}
