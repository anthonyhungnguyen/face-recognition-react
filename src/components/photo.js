import React, { useState, useRef } from 'react'
import * as faceapi from 'face-api.js'

const Photo = () => {
	const imgRef = useRef(null)
	const canvasRef = useRef(null)
	const [imgUrl, setImgUrl] = useState(require('../assets/1.jpg'))

	const detectFaces = async () => {
		let ctx = canvasRef.current.getContext('2d')
		const displaySize = {
			width: imgRef.current.width,
			height: imgRef.current.height
		}
		canvasRef.current.width = displaySize.width
		canvasRef.current.height = displaySize.height
		faceapi.matchDimensions(ctx, displaySize)
		const img = await faceapi.fetchImage(imgUrl)
		const detections = await faceapi.detectAllFaces(img)
		const resizedDetections = faceapi.resizeResults(detections, displaySize)
		ctx.drawImage(imgRef.current, 0, 0, displaySize.width, displaySize.height)
		faceapi.draw.drawDetections(ctx, resizedDetections)
	}

	const handleImageChange = async e => {
		await setImgUrl(URL.createObjectURL(e.target.files[0]))
	}

	return (
		<div>
			<input
				type='file'
				placeholder='pick an image'
				onChange={handleImageChange}
				className='photo_input'
			/>
			<img
				ref={imgRef}
				src={imgUrl}
				style={{ display: 'none' }}
				onLoad={detectFaces}
				alt='for nothing'
			/>
			<canvas ref={canvasRef} className='photo_canvas'></canvas>
		</div>
	)
}

export default Photo
