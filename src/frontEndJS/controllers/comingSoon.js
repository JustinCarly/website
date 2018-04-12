export default class ComingSoonController {
	constructor(){
		this.process();
	}
	
	process() {
		$('.comingSoon').hover(
			function() {
				const $this = $(this); // caching $(this)
				//$this.data('initialText', $this.text());
				$this.text("Coming Soon!");
			},
			function() {
				const $this = $(this); // caching $(this)
				$this.text($this.data('initialtext'));
			}
		);
	}
}