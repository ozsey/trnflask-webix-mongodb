// """
// Update : 2024-01-30
// Common Library - form.js -  Oden V3
// Update : - win xp compability
// """
class Form {

	SimpleForm(id,elements,rulesNow){
		let form1 = {
			view:"form", 
			id:id,
			elements:elements,
			rules:rulesNow
		}
		console.log(id)
		window.winCountOffsetRecord[id] = 0
		window.winDataCompare[id] = {}
		window.winDataCompare[id]['data'] = {}
		if(winConfigForm[id]!=undefined){
			if(winConfigForm[id]["BLOCK_TYPE"][1] == "SUB_PARENT"){
				window.winSubParent.push(id)
			}
		}
		return form1
	}
}

let form = new Form()