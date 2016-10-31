do ($=jQuery)->
	import _parts/helpers.coffee
	import _parts/styles.coffee
	import _parts/markup.coffee
	import _parts/defaults.coffee


	MenuPopover = ({@name, @items, @desc, @highlights=[], options})->
		@options = $.extend(true, {}, defaultOptions, options)
		@isOpen = false

		@els = {}
		@els.container = $(markup.container).attr 'id', @name
		@els.overlay = $(markup.overlay).appendTo(@els.container)
		@els.list = $(markup.list).appendTo(@els.container)
		@els.desc = $(markup.desc(@desc)).appendTo(@els.list) if @desc
		@els.items = {}
		for label,action of @items
			@els.items[label] = $(markup.listItem(label)).data('action', action).appendTo(@els.list)

		@appendToDOM()
		@attachEvents()
		return MenuPopover.instances[@name] = @



	MenuPopover::appendToDOM = ()->
		applyStyles(@els.container, @options.style.container)
		applyStyles(@els.overlay, @options.style.overlay)
		applyStyles(@els.list, @options.style.list)
		applyStyles(@els.desc, @options.style.desc) if @desc
		for label,itemEl of @els.items
			applyStyles(itemEl, @options.style.listItem)
			applyStyles(itemEl, @options.style.listItemHighlight) if @highlights.includes(label)
			applyStyles(itemEl.children(), @options.style.listItemText)

		removeStyles(@els.items[Object.keys(@els.items).slice(-1)[0]], {borderBottom:''})
			
		@els.container.prependTo(document.body)



	MenuPopover::attachEvents = ()->
		@els.overlay.on 'click', ()=> @close()
		
		@els.list.on 'click', '.MenuPopover-list-item', (event)=>
			action = $(event.currentTarget).data 'action'
			@close().then(action or ()->)
		
		@els.list.on 'touchstart', '.MenuPopover-list-item', ()->
			applyStyles(@, backgroundColor:'#e3e3e3')
		
		@els.list.on 'touchend touchcancel', '.MenuPopover-list-item', ()->
			removeStyles(@, backgroundColor:'')




	MenuPopover::open = ()-> new Promise (resolve)=>
		listHeight = @els.list[0].clientHeight-30 # 30 = bottom padding
		applyStyles(@els.container, @options.styleOpenState.container)
		applyStyles(@els.overlay, @options.styleOpenState.overlay)
		applyStyles(@els.list, @options.styleOpenState.list, @options.styleOpenState.listTransform(listHeight))
		
		setTimeout ()-> window.scroll(0, 0)
		setTimeout(resolve, 300)
		
		@isOpen = true



	MenuPopover::close = ()-> new Promise (resolve)=>
		removeStyles(@els.overlay, @options.styleOpenState.overlay, @options.style.overlay)
		removeStyles(@els.list, @options.styleOpenState.list, @options.style.list)

		setTimeout ()=>
			removeStyles(@els.container, @options.styleOpenState.container, @options.style.container)
			resolve()
		, 350

		@isOpen = false












	MenuPopover.version = import ../.version.coffee
	MenuPopover.instances = {}
	window.MenuPopover = MenuPopover