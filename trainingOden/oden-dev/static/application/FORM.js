var menuId = "FORM"
var winFormTitle = "FORM"
var winConfigForm = {
    "DEPARTEMEN": {
        "ELEMENT": [
            "deptid",
            "deptname",
            "deptkepala",
            "deptlokasi",
            "deptkeuangan",
            "deptnomortelp",
            "deptemail",
            "deptdesc",
            "deptdate"
        ],
        "PRIMARY_KEY": [
            "deptid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "FORM",
            "PARENT"
        ],
        "REST_API": {
            "BLOCK_NAME": "DEPARTEMEN",
            "PARAM_ID": []
        },
        "LOV_API": {
            "<itemId>": {
                "ITEM_ID": "<itemId>",
                "TABLE_ID": "<tableIdLov>",
                "PARAM_ID": []
            }
        },
        "EVENT_TRANSACTION": {
            "postSelect": function(){},
            "postInsert": function(){},
            "postUpdate": function(){},
            "postDelete": function(){}
        }
    }
}
var winRestApi = function(){
	loadDataBlockAtStart();
	// restapi.restApiParam("BLOCK_NAME":"ODENTABLEDETAIL",ID_PARAM:[ITEM_ID_FK]);
}

var reloadAfterTransaction = {
	"insert": true,
	"update": false,
	"insert": true
}

var hideButton = {
	// true = hidden button
	// false = show button 
	"next" : false,
	"searchValue" : false,
	"addValue" : false,
	"addRowDb" : false,
	"updateValue" : false,
	"deleteValue" : true,
	"clearBtn" : false
}

let functionValidate = function(){
	//write your function logic in here ...
}

let validateUpperCase = function(){
	/** if(str){
		const regex = /^[A-Z]+$/;
		return regex.test(str);
	}else{
		return{"status":true}
	} **/
	if(str == str.toUpperCase()){
		return {"status": false, "tipe": "error", "pesan": "Jenengmu ono huruf gede ne. Gantinen!"}
	}
	else{
		return {"status": true}
	}
}

let validateDeptKepala = function(){
	let deptkepala = getItemValue("deptkepala")
	if(deptkepala == "JONI"){
		return {"status": false, "tipe": "error", "pesan": "Nama tidak boleh joni"}
	}
	else{
		return {"status": true}
	}
}

let elementDEPARTEMEN = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "deptid", LABEL: "Kode Departemen", LENGTH: 15}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptname", LABEL: "Nama Departemen", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptkepala", LABEL: "Kepala Departemen", LENGTH: 100, UPPER: true}, {VALIDATE_ITEM: validateUpperCase}),
	TEXTBOX.TEXTAREA({ITEM_ID: "deptlokasi", LABEL: "Lokasi", LENGTH: 100, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "deptkeuangan", LABEL: "Budget", LENGTH: 15}),
	NUMERIC.TELEPHONE({ITEM_ID: "deptnomortelp", LABEL: "Telepon", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptemail", LABEL: "Email", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTAREA({ITEM_ID: "deptdesc", LABEL: "Deskripsi"}),
	DATE.DDMMYY({ITEM_ID: "deptdate", LABEL: "Tanggal Dibentuk"}),
	{cols: [
		{},
		BUTTON.PRINTBUTTON("print", "DEPARTEMEN"),{}
	]},
]

let rulesDEPARTEMEN = {
	"deptid":webix.rules.isNotEmpty,
}

let blockDEPARTEMEN = form.SimpleForm("DEPARTEMEN", elementDEPARTEMEN, rulesDEPARTEMEN)

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockDEPARTEMEN]);
// let content = layout.baseLayoutReport([blockDEPARTEMEN]);

function renderLov(){
	return []
}
