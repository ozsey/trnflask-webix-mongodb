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

function validasiInputSupplier(supplier) {
	if(supplier.supid){
		if (!/^[A-Z0-9]{1,10}$/.test(supplier.supid)) {
			return {"Status": false, "tipe": "error", "pesan": "sup_id harus berupa alfanumerik, huruf kapital, dan panjang 1-10 karakter." }
		}
	    else if (supplier.supid == null){
	    	return {"Status": false, "tipe": "error", "pesan": "sup_id tidak boleh kosong" }
	    }
	    else{
	    	return {"Status": true}
	    }
	}

	if(supplier.supname){
		if (!/^[A-Z0-9]{1,10}$/.test(supplier.supname)) {
			return {"Status": false, "tipe": "error", "pesan": "sup_id harus berupa alfanumerik, huruf kapital, dan panjang 1-10 karakter." }
		}
	    else if (supplier.supid == null){
	    	return {"Status": false, "tipe": "error", "pesan": "sup_id tidak boleh kosong" }
	    }
	    else{
	    	return {"Status": true}
	    }
	}
}

function validasiInputKasir(kasir) {
    const errors = [];

    if (!/^[A-Z0-9]{1,10}$/.test(kasir.cshid)) {
        errors.push("csh_id harus berupa alfanumerik, huruf kapital, dan panjang 1-10 karakter.");
    }
    if (!/^[A-Z\s]{1,20}$/.test(kasir.cshfirstname)) {
        errors.push("csh_first_name harus berupa huruf kapital dan maksimal 20 karakter.");
    }
    if (!/^[A-Z\s]{1,20}$/.test(kasir.cshlastname)) {
        errors.push("csh_last_name harus berupa huruf kapital dan maksimal 20 karakter.");
    }
    if (!/^[A-Z0-9\s,.-]{1,100}$/.test(kasir.cshaddress)) {
        errors.push("csh_address harus berupa huruf kapital, angka, dan maksimal 100 karakter.");
    }
    if (!/^[A-Z0-9\s\-]{1,15}$/.test(kasir.cshtelephone)) {
        errors.push("csh_telephone harus berupa huruf kapital, angka, dan maksimal 15 karakter.");
    }
    if (!/^[A-Z0-9@.]{1,50}$/.test(kasir.cshemail)) {
        errors.push("csh_email harus berupa format email yang valid dengan maksimal 50 karakter.");
    }

    return errors;
}

function validasiInputItem(item) {
    const errors = [];

    if (!/^[A-Z0-9]{1,10}$/.test(item.itmid)) {
        errors.push("itm_id harus berupa alfanumerik, huruf kapital, dan panjang 1-10 karakter.");
    }
    if (!/^[A-Z0-9]{1,10}$/.test(item.itmcatid)) {
        errors.push("itm_cat_id harus berupa alfanumerik, huruf kapital, dan panjang 1-10 karakter.");
    }
    if (!/^[A-Z\s]{1,100}$/.test(item.itmname)) {
        errors.push("itm_name harus berupa huruf kapital dan maksimal 100 karakter.");
    }
    if (!/^[A-Z\s]{1,100}$/.test(item.itmbrand)) {
        errors.push("itm_brand harus berupa huruf kapital dan maksimal 100 karakter.");
    }
    if (isNaN(item.itmpurchaseprice) || item.itmpurchaseprice < 0) {
        errors.push("itm_purchase_price harus berupa angka positif yang valid.");
    }
    if (isNaN(item.itmsalesprice) || item.itmsalesprice < 0) {
        errors.push("itm_sales_price harus berupa angka positif yang valid.");
    }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(item.itmproductiondate)) {
        errors.push("itm_production_date harus dalam format DD-MM-YYYY.");
    }
    if (!/^[A-Z\s]{1,20}$/.test(item.itmstatus)) {
        errors.push("itm_status harus berupa huruf kapital dan maksimal 20 karakter.");
    }
    if (isNaN(item.itmstock) || item.itmstock < 0) {
        errors.push("itm_stock harus berupa angka positif yang valid.");
    }

    return errors;
}

let callSuppliersButton = function(){
	callForm("LIST_SUPPLIERS")
}

let callChasiersButton = function(){
	callForm("LIST_CHASIERS")
}

let callItemsButton = function(){
	callForm("LIST_ITEMS")
}

let elementCATEGORY = [
	{
		cols:
		[
			TEXTBOX.TEXTPRIMARY({ITEM_ID: "catid", LABEL: "cat_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
			TEXTBOX.TEXTNORMAL({ITEM_ID: "catname", LABEL: "cat_name", LENGTH: 100, UPPER: true}),
		]
	},
	TEXTBOX.TEXTAREA({ITEM_ID: "catdesc", LABEL: "cat_desc", LENGTH: 100, UPPER: true}),
]

let elementSUPPLIER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "supid", LABEL: "sup_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supname", LABEL: "sup_name", LENGTH: 25, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supalamat", LABEL: "sup_alamat", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supkota", LABEL: "sup_kota", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supprovinsi", LABEL: "sup_provinsi", LENGTH: 30, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "suptelepon", LABEL: "sup_telepon", LENGTH: 14, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "supemail", LABEL: "sup_email", LENGTH: 20, UPPER: true}),
	BUTTON.BUTTONDATAGRID({
	"ITEM_ID": "btnDetail",
	"LABEL": "Detail"
	}, {CUSTOM_CLICK: callSuppliersButton})
]

let elementCASHIER = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "cshid", LABEL: "csh_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshfirstname", LABEL: "csh_first_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshlastname", LABEL: "csh_last_name", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshaddress", LABEL: "csh_address", LENGTH: 100, UPPER: true}),
	NUMERIC.TELEPHONE({ITEM_ID: "cshtelephone", LABEL: "csh_telephone", LENGTH: 15, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "cshemail", LABEL: "csh_email", LENGTH: 50, UPPER: true}),
	BUTTON.BUTTONDATAGRID({
	"ITEM_ID": "btnDetail",
	"LABEL": "Detail"
	}, {CUSTOM_CLICK: callChasiersButton})
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
	BUTTON.BUTTONDATAGRID({
	"ITEM_ID": "btnDetail",
	"LABEL": "Detail"
	}, {CUSTOM_CLICK: callItemsButton})
]

let rulesCATEGORY = {
	"catid":webix.rules.isNotEmpty,
	"catname":webix.rules.isNotEmpty,
	"catdesc":webix.rules.isNotEmpty
}

let rulesSUPPLIER = {
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
let blockSUPPLIER = datatable.SimpleDatatable("SUPPLIER", elementSUPPLIER, rulesSUPPLIER, [1,2])
let blockCASHIER = datatable.SimpleDatatable("CASHIER", elementCASHIER, rulesCASHIER, [1,2])
let blockITEM = datatable.SimpleDatatable("ITEM", elementITEM, rulesITEM, [1,2])
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
