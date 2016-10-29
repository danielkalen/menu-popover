style = 
	container:
		position: 'absolute'
		zIndex: '4000'
		top: '0'
		left: '0'
		width: '100vw'
		height: '100vh'
		visibility: 'hidden'

	overlay:
		position: 'fixed'
		zIndex: '1'
		left: '0'
		top: '0'
		width: '100vw'
		height: '100vh'
		backgroundColor: 'rgba(0,0,0,0.70)'
		opacity: 0
		transition: 'opacity 0.25s'

	list:
		position: 'absolute'
		zIndex: '2'
		top: '100vh'
		width: '100%'
		paddingBottom: '30px'
		backgroundColor: 'white'
		webkitTransform: 'translateY(0)'
		mozTransform: 'translateY(0)'
		msTransform: 'translateY(0)'
		oTransform: 'translateY(0)'
		transform: 'translateY(0)'
		transition: 'transform 0.25s'

	listItem:
		position: 'relative'
		width: '100%'
		height: '66px'
		padding: '0 20px'
		borderBottom: '1px solid #e6e6e6'
		boxSizing: 'border-box'
		fontSize: '18px'
		fontWeight: '500'
		color: '#181818'
	
	listItemHighlight:
		fontWeight: '600'
		color: '#f1c618'
	
	listItemText:
		position: 'absolute'
		top: '50%'
		left: '0'
		right: '0'
		width: '100%'
		textAlign: 'center'
		lineHeight: '1'
		webkitTransform: 'translateY(-50%)'
		mozTransform: 'translateY(-50%)'
		msTransform: 'translateY(-50%)'
		oTransform: 'translateY(-50%)'
		transform: 'translateY(-50%)'


styleOpenState =
	container:
		visibility: 'visible'
	
	overlay:
		opacity: '1'

	list:
		opacity: '1'
		visibility: 'visible'
		transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'

	listTransform: (height)->
		webkitTransform: "translateY(-#{height}px)"
		mozTransform: "translateY(-#{height}px)"
		msTransform: "translateY(-#{height}px)"
		oTransform: "translateY(-#{height}px)"
		transform: "translateY(-#{height}px)"





