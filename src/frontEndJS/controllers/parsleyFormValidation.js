export default class ParsleyFormValidationController {
	constructor(){
		this.process();
	}
	
	process() {
		$(document).ready(() => {
			
			$('.parsleyFormValidate').parsley();
			
			$.listen('parsley:form:error', () => {
				console.log("Form is now invalid!");
			});
			$.listen('parsley:form:success', () => {
				console.log("Form is now VALID!");
			});
			
			// let ParsleyForm = new Parsley();
			// console.log(ParsleyForm);
			
			console.log("this shit getting hit??!");
		});
	}
}