var menuId = "CUSTOMER"
var winFormTitle = "CUSTOMER"
var winConfigForm = {
    "CUSTOMER": {
        "ELEMENT": [
            "cusid",
            "cusfirstname",
            "cuslastname",
            "cusaddress",
            "custelephone",
            "cusemail"
        ],
        "PRIMARY_KEY": [
            "cusid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "FORM",
            "PARENT"
        ],
        "REST_API": {
            "BLOCK_NAME": "CUSTOMER",
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
    },
    "DETAIL": {
        "ELEMENT": [
            "cusid",
            "cusfirstname",
            "cuslastname",
            "cusaddress",
            "custelephone",
            "cusemail"
        ],
        "PRIMARY_KEY": [
            "cusid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": true,
        "REST_API": {
            "BLOCK_NAME": "CUSTOMER",
            "PARAM_ID": [
                "cusid"
            ]
        },
        "EVENT_TRANSACTION": {
            "postSelect": function(){},
            "postInsert": function(){},
            "postUpdate": function(){},
            "postDelete": function(){}
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
	"deleteValue" : false,
	"clearBtn" : false
}

let functionValidate = function(){
	//write your function logic in here ...
}

let elementCUSTOMER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cusid", LABEL: "cus_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusfirstname", LABEL: "cus_first_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cuslastname", LABEL: "cus_last_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusaddress", LABEL: "cus_address", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "custelephone", LABEL: "cus_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusemail", LABEL: "cus_email", LENGTH: 50, UPPER: true}),
	{cols: [
		{},
		BUTTON.PRINTBUTTON("print", "CUSTOMER"),{}
	]},
]

let elementPEGAWAI = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cusid", LABEL: "cus_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusfirstname", LABEL: "pg_first_name", LENGTH: 50, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cuslastname", LABEL: "pg_last_name", LENGTH: 50, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusaddress", LABEL: "cus_address", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "custelephone", LABEL: "cus_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusemail", LABEL: "cus_email", LENGTH: 50, UPPER: true}),
	BUTTON.BUTTONDATAGRID({
	"ITEM_ID": "btnDetail",
	"LABEL": "Detail"
	}, {CUSTOM_CLICK: callFormButton})
	
]

let rulesCUSTOMER = {
	"cusid":webix.rules.isNotEmpty,
}

let blockCUSTOMER = form.SimpleForm("CUSTOMER", elementCUSTOMER, rulesCUSTOMER)

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockCUSTOMER]);

function renderLov(){
	return []
}
