import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
	return (
		<nav>
			<div>Face Recognition App</div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/photo'>Photo</Link>
				</li>
				<li>
					<Link to='/camera'>Camera</Link>
				</li>
			</ul>
		</nav>
	)
}
