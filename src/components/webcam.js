import React, { useRef } from 'react'
import Webcam from 'react-webcam'
import * as faceapi from 'face-api.js'

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: 'user'
}

const Camera = () => {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)

	const detectFace = async () => {
		const ctx = canvasRef.current.getContext('2d')
		const videoActualSize = webcamRef.current.video.getBoundingClientRect()
		console.log(webcamRef.current)
		const displaySize = {
			width: videoActualSize.width,
			height: videoActualSize.height
		}
		canvasRef.current.width = displaySize.width
		canvasRef.current.height = displaySize.height
		faceapi.matchDimensions(ctx, displaySize)
		setInterval(async () => {
			const detections = await faceapi
				.detectAllFaces(
					webcamRef.current.video,
					new faceapi.TinyFaceDetectorOptions()
				)
				.withFaceLandmarks()
				.withFaceExpressions()
			const resizedDetections = faceapi.resizeResults(detections, displaySize)
			ctx.clearRect(0, 0, displaySize.width, displaySize.height)
			faceapi.draw.drawDetections(ctx, resizedDetections)
			faceapi.draw.drawFaceLandmarks(ctx, resizedDetections)
			faceapi.draw.drawFaceExpressions(ctx, resizedDetections)
		}, 100)
	}

	return (
		<div>
			<button onClick={detectFace} className='video_detect_button'>
				Detect
			</button>
			<div style={{ position: 'relative' }}>
				<Webcam
					audio={false}
					height={600}
					ref={webcamRef}
					width={600}
					style={{ position: 'absolute' }}
					videoConstraints={videoConstraints}
				></Webcam>
				<canvas ref={canvasRef} style={{ position: 'absolute' }}></canvas>
			</div>
		</div>
	)
}

export default Camera
