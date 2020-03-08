import React from 'react'
import Photo from './components/photo'
import Webcam from './components/webcam'
import Home from './components/home'
import Navigation from './components/navigation'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'

function App() {
	return (
		<Router>
			<Navigation />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/photo'>
					<Photo />
				</Route>
				<Route path='/camera'>
					<Webcam />
				</Route>
			</Switch>
		</Router>
	)
}

export default App
