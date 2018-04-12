export default class NavigationController {
	constructor(){
		this.process();
		this.menuExpand();
	}
	
	process(){
		/*
		This functionality is to make dropdown show on hover rather than onClick.
		 */
		$('body').on('mouseenter mouseleave','.dropdown',function(e){
			var _d=$(e.target).closest('.dropdown');_d.addClass('show');
			setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
			},300);
		});
	}
	
	/*
	Function used to make navbar appear to "push" content down screen when you expand it.
	 */
	menuExpand(){
		$(document).ready(() => {
			$("#toggleExpandMenu").on('click', () => {
				$('.paddingContent').toggleClass('menuActive').toggleClass('menuInactive');
			});
		});
	}
}