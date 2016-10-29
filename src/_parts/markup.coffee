markup = 
	container: "<div class='MenuPopover'></div>"
	overlay: "<div class='MenuPopover-overlay'></div>"
	list: "<div class='MenuPopover-list'></div>"
	listItem: (label)-> "
		<div class='MenuPopover-list-item'>
			<div class='MenuPopover-list-item-label'>#{label}</div>
		</div>
	"
