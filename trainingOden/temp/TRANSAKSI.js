var menuId = "TRANSAKSI"
var winFormTitle = "TRANSAKSI"
var winConfigForm = {
    "CUSTOMER": {
        "ELEMENT": [
            "cusid",
            "cusfirstname",
            "cuslastname",
            "cusaddress",
            "custelephone",
            "cusemail",
            "cusid",
            "cusfirstname",
            "cuslastname",
            "cusaddress",
            "custelephone",
            "cusemail"
        ],
        "PRIMARY_KEY": [
            "cusid",
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
    "SALES": {
        "ELEMENT": [
            "salid",
            "salcusid",
            "salcshid",
            "saldate",
            "saltotalprice",
            "salstatus",
            "salid",
            "salcusid",
            "salcshid",
            "saldate",
            "saltotalprice",
            "salstatus"
        ],
        "PRIMARY_KEY": [
            "salid",
            "salid"
        ],
        "RELATION_KEY": [
            "salcusid",
            "salcusid"
        ],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": true,
        "REST_API": {
            "BLOCK_NAME": "SALES",
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
    },
    "SALES_DETAIL": {
        "ELEMENT": [
            "sdsalid",
            "sditmid",
            "sdsalesprice",
            "sdquantity",
            "sdupdateuser"
        ],
        "PRIMARY_KEY": [
            "sdsalid",
            "sditmid"
        ],
        "RELATION_KEY": [
            "sdsalid",
            "sditmid"
        ],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "SALES_DETAIL",
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

let elementCUSTOMER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cusid", LABEL: "cus_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusfirstname", LABEL: "cus_first_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cuslastname", LABEL: "cus_last_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusaddress", LABEL: "cus_address", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "custelephone", LABEL: "cus_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusemail", LABEL: "cus_email", LENGTH: 50, UPPER: true}),
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cusid", LABEL: "cus_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusfirstname", LABEL: "cus_first_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cuslastname", LABEL: "cus_last_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusaddress", LABEL: "cus_address", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "custelephone", LABEL: "cus_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cusemail", LABEL: "cus_email", LENGTH: 50, UPPER: true}),
]

let elementSALES = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "salid", LABEL: "sal_id", LENGTH: 6, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salcusid", LABEL: "sal_cus_id", LENGTH: 6, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salcshid", LABEL: "sal_csh_id", LENGTH: 6, UPPER: true}),
	DATE.DDMMYY({ITEM_ID: "saldate", LABEL: "sal_date"}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "saltotalprice", LABEL: "sal_total_price", LENGTH: 15}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salstatus", LABEL: "sal_status", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "salid", LABEL: "sal_id", LENGTH: 6, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salcusid", LABEL: "sal_cus_id", LENGTH: 6, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salcshid", LABEL: "sal_csh_id", LENGTH: 6, UPPER: true}),
	DATE.DDMMYY({ITEM_ID: "saldate", LABEL: "sal_date"}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "saltotalprice", LABEL: "sal_total_price", LENGTH: 15}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "salstatus", LABEL: "sal_status", LENGTH: 15, UPPER: true}),
]

let elementITEM = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "itmid", LABEL: "itm_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmcatid", LABEL: "itm_cat_id", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmname", LABEL: "itm_name", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmbrand", LABEL: "itm_brand", LENGTH: 100, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmpurchaseprice", LABEL: "itm_purchase_price", LENGTH: 15}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmsalesprice", LABEL: "itm_sales_price", LENGTH: 15}),
	DATE.DDMMYY({ITEM_ID: "itmproductiondate", LABEL: "itm_production_date"}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "itmstatus", LABEL: "itm_status", LENGTH: 20, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "itmstock", LABEL: "itm_stock", LENGTH: 15}),
]

let elementSALES_DETAIL = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "sdsalid", LABEL: "sd_sal_id", LENGTH: 6, UPPER: true}),
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "sditmid", LABEL: "sd_itm_id", LENGTH: 6, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "sdsalesprice", LABEL: "sd_sales_price", LENGTH: 15}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "sdquantity", LABEL: "sd_quantity"}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "sdupdateuser", LABEL: "sd_update_user"}),
]

let rulesCUSTOMER = {
	"cusid":webix.rules.isNotEmpty,
	"cusid":webix.rules.isNotEmpty,
}

let rulesSALES = {
	"salid":webix.rules.isNotEmpty,
	"salid":webix.rules.isNotEmpty,
}

let rulesITEM = {
	"itmid":webix.rules.isNotEmpty,
	"itmcatid":webix.rules.isNotEmpty,
	"itmproductiondate":webix.rules.isNotEmpty,
}

let rulesSALES_DETAIL = {
	"sdsalid":webix.rules.isNotEmpty,
	"sditmid":webix.rules.isNotEmpty,
}

let blockCUSTOMER = form.SimpleForm("CUSTOMER", elementCUSTOMER, rulesCUSTOMER)
let blockSALES = datatable.SimpleDatatable("SALES", elementSALES, rulesSALES, [0,0])
let blockITEM = datatable.SimpleDatatable("ITEM", elementITEM, rulesITEM, [0,0])
let blockSALES_DETAIL = datatable.SimpleDatatable("SALES_DETAIL", elementSALES_DETAIL, rulesSALES_DETAIL, [0,0])
let tab0 = multiview.element("sales", blockSALES)
let tab1 = multiview.element("item", blockITEM)
let tab2 = multiview.element("sales_detail", blockSALES_DETAIL)
let multiviewGrouping = multiview.view([tab0,tab1,tab2])

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockCUSTOMER,multiviewGrouping]);

function renderLov(){
	return []
}
