applyStyles = (el, styleObject, additional)->
	styleObject = $.extend {}, styleObject, additional if additional
	
	for key,value of styleObject
		(el[0] or el).style[key] = value

	return el


removeStyles = (el, styleObject, stylesToReinstate)->
	for key of styleObject
		(el[0] or el).style[key] = ''

	applyStyles(el, stylesToReinstate) if stylesToReinstate

	return el