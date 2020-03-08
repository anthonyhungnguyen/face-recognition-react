import React, { useState, useEffect, useRef } from 'react'
import * as faceapi from 'face-api.js'

const Photo = () => {
	const [faceBox, setFaceBox] = useState(null)
	const imgRef = useRef(null)
	const [imgUrl, setImgUrl] = useState(require('../assets/1.jpg'))
	const [imgData, setImgData] = useState({})
	useEffect(() => {
		handleDrawFace()
	}, [imgUrl])

	const handleDrawFace = async () => {
		const detections = await detectFace()
		drawFace(detections)
	}

	const detectFace = async () => {
		const img = await faceapi.fetchImage(imgUrl)
		const detections = await faceapi.detectAllFaces(img)
		return detections
	}

	const drawFace = async detections => {
		let naturalWidth = imgRef.current.naturalWidth
		let naturalHeight = imgRef.current.naturalHeight
		let width = imgRef.current.width
		let height = imgRef.current.height
		let offsetLeft = imgRef.current.offsetParent.offsetLeft

		let widthRate = naturalWidth / width
		let heightRate = naturalHeight / height

		if (!!detections) {
			let dB = detections.map((detection, i) => {
				let _H = detection._box._height / heightRate
				let _W = detection._box._width / widthRate
				let _X = detection._box._x / widthRate - offsetLeft
				let _Y = detection._box._y / heightRate
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
		setFaceBox(null)
		await setImgUrl(URL.createObjectURL(e.target.files[0]))
	}

	const handleImageOnLoad = () => {
		setImgData({
			naturalWidth: imgRef.current.naturalWidth,
			naturalHeight: imgRef.current.naturalHeight,
			width: imgRef.current.width,
			height: imgRef.current.height,
			offsetTop: imgRef.current.offsetParent.offsetLeft
		})
	}

	return (
		<div>
			<input
				type='file'
				placeholder='pick an image'
				onChange={handleImageChange}
			/>

			<div
				style={{
					position: 'relative'
				}}
			>
				<div style={{ position: 'absolute' }}>
					<img
						src={imgUrl}
						id='myImg'
						style={{ width: '100%' }}
						ref={imgRef}
						onLoad={handleImageOnLoad}
					/>
				</div>
				{faceBox ? faceBox : null}
			</div>
		</div>
	)
}

export default Photo
