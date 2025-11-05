var menuId = "MANAGE"
var winFormTitle = "MANAGE"
var winConfigForm = {
    "CATEGORY": {
        "ELEMENT": [
            "catid",
            "catname",
            "catdesc",
        ],
        "PRIMARY_KEY": [
            "catid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "FORM",
            "PARENT"
        ],
        "REST_API": {
            "BLOCK_NAME": "CATEGORY",
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
    "SUPPLIER": {
        "ELEMENT": [
            "supid",
            "supname",
            "supalamat",
            "supkota",
            "supprovinsi",
            "suptelepon",
            "supemail"
        ],
        "PRIMARY_KEY": [
            "supid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": true,
        "REST_API": {
            "BLOCK_NAME": "SUPPLIER",
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
    "CASHIER": {
        "ELEMENT": [
            "cshid",
            "cshfirstname",
            "cshlastname",
            "cshaddress",
            "cshtelephone",
            "cshemail"
        ],
        "PRIMARY_KEY": [
            "cshid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "CASHIER",
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
    "ITEM": {
        "ELEMENT": [
            "itmid",
            "itmcatid",
            "itmname",
            "itmbrand",
            "itmpurchaseprice",
            "itmsalesprice",
            "itmproductiondate",
            "itmstatus",
            "itmstock"
        ],
        "PRIMARY_KEY": [
            "itmid"
        ],
        "RELATION_KEY": [
            "itmcatid"
        ],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "ITEM",
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
	"deleteValue" : false,
	"clearBtn" : false
}

let functionValidate = function(){
	//write your function logic in here ...
}

let elementCATEGORY = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "catid", LABEL: "cat_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "catname", LABEL: "cat_name", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "catdesc", LABEL: "cat_desc", LENGTH: 100, UPPER: true}),
]

let elementSUPPLIER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "supid", LABEL: "sup_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supname", LABEL: "sup_name", LENGTH: 25, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supalamat", LABEL: "sup_alamat", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supkota", LABEL: "sup_kota", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supprovinsi", LABEL: "sup_provinsi", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "suptelepon", LABEL: "sup_telepon", LENGTH: 14, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supemail", LABEL: "sup_email", LENGTH: 20, UPPER: true}),
]

let elementCASHIER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cshid", LABEL: "csh_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshfirstname", LABEL: "csh_first_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshlastname", LABEL: "csh_last_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshaddress", LABEL: "csh_address", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshtelephone", LABEL: "csh_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshemail", LABEL: "csh_email", LENGTH: 50, UPPER: true}),
]

let elementITEM = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "itmid", LABEL: "itm_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmcatid", LABEL: "itm_cat_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmname", LABEL: "itm_name", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmbrand", LABEL: "itm_brand", LENGTH: 100, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmpurchaseprice", LABEL: "itm_purchase_price", LENGTH: 15}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmsalesprice", LABEL: "itm_sales_price", LENGTH: 15}),
	DATE.DDMMYY({ITEM_ID: "itmproductiondate", LABEL: "itm_production_date"}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmstatus", LABEL: "itm_status", LENGTH: 20, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmstock", LABEL: "itm_stock", LENGTH: 15}),
]

let rulesCATEGORY = {
	"catid":webix.rules.isNotEmpty
}

let rulesSUPPLIER = {
	"supid":webix.rules.isNotEmpty,
}

let rulesCASHIER = {
	"cshid":webix.rules.isNotEmpty,
}

let rulesITEM = {
	"itmid":webix.rules.isNotEmpty,
	"itmcatid":webix.rules.isNotEmpty,
	"itmproductiondate":webix.rules.isNotEmpty,
}

let blockCATEGORY = form.SimpleForm("CATEGORY", elementCATEGORY, rulesCATEGORY)
let blockSUPPLIER = datatable.SimpleDatatable("SUPPLIER", elementSUPPLIER, rulesSUPPLIER, [1,0])
let blockCASHIER = datatable.SimpleDatatable("CASHIER", elementCASHIER, rulesCASHIER, [1,0])
let blockITEM = datatable.SimpleDatatable("ITEM", elementITEM, rulesITEM, [1,0])
let tab0 = multiview.element("supplier", blockSUPPLIER)
let tab1 = multiview.element("cashier", blockCASHIER)
let tab2 = multiview.element("item", blockITEM)
let multiviewGrouping = multiview.view([tab0,tab1,tab2])

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockCATEGORY,multiviewGrouping]);
// let content = layout.baseLayout([blockCATEGORY,blockCATEGORY]);

function renderLov(){
	return []
}
