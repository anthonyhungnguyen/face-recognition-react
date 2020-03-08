import React, { useState, useEffect } from 'react'
import * as faceapi from 'face-api.js'
import './App.css'

function App() {
	const [faceBox, setFaceBox] = useState(null)
	const [imgUrl, setImgUrl] = useState(require('./1.jpg'))
	useEffect(() => {
		loadModels()
	}, [imgUrl])

	const loadModels = async () => {
		const MODEL_URL = process.env.PUBLIC_URL + '/models'
		await faceapi.loadSsdMobilenetv1Model(MODEL_URL).then(async () => {
			const detections = await detectFace()
			drawFace(detections)
		})
	}

	const detectFace = async () => {
		const img = await faceapi.fetchImage(imgUrl)
		const detections = await faceapi.detectAllFaces(img)
		return detections
	}

	const drawFace = async detections => {
		if (!!detections) {
			let dB = detections.map((detection, i) => {
				let _H = detection._box._height
				let _W = detection._box._width
				let _X = detection._box._x
				let _Y = detection._box._y
				return (
					<div key={i}>
						<div
							style={{
								position: 'absolute',
								border: 'solid',
								borderColor: 'blue',
								height: _H,
								width: _W,
								transform: `translate(${_X}px,${_Y}px)`
							}}
						/>
					</div>
				)
			})
			setFaceBox(dB)
		}
	}

	const handleImageChange = async e => {
		await setImgUrl(URL.createObjectURL(e.target.files[0]))
	}

	return (
		<div style={{ margin: 'auto' }}>
			<input
				type='file'
				placeholder='pick an image'
				onChange={handleImageChange}
			/>
			{faceBox ? (
				<div
					style={{
						position: 'relative'
					}}
				>
					<div style={{ position: 'absolute' }}>
						<img src={imgUrl} id='myImg' />
					</div>
					{faceBox}
				</div>
			) : null}
		</div>
	)
}

export default App
