var menuId = "MS_DETAIL_ND"
var winFormTitle = "MS_DETAIL_ND"
var winConfigForm = {
    "PEGAWAI": {
        "ELEMENT": [
            "pgid",
            "pgdeptid",
            "pgfirstname",
            "pglastname",
            "pgtgllahir",
            "pgtglkerja",
            "pgjabatan",
            "pgemail",
            "pgnomortelp",
            "pgalamat",
            "pgstatus",
            "pgbahasa",
            "btnBack"
        ],
        "PRIMARY_KEY": [
            "pgid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "FORM",
            "PARENT"
        ],
        "REST_API": {
            "BLOCK_NAME": "PEGAWAI",
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

let buttonBack = function(){
	callBack("MS_DETAIL")
}

let elementPEGAWAI = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "pgid", LABEL: "pg_id", LENGTH: 10, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "pgdeptid", LABEL: "pg_dept_id", LENGTH: 15}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgfirstname", LABEL: "pg_first_name", LENGTH: 50, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pglastname", LABEL: "pg_last_name", LENGTH: 50, UPPER: true}),
	DATE.DDMMYY({ITEM_ID: "pgtgllahir", LABEL: "pg_tgl_lahir"}),
	DATE.DDMMYY({ITEM_ID: "pgtglkerja", LABEL: "pg_tgl_kerja"}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgjabatan", LABEL: "pg_jabatan", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgemail", LABEL: "pg_email", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgnomortelp", LABEL: "pg_nomor_telp", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgalamat", LABEL: "pg_alamat", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgstatus", LABEL: "pg_status", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgbahasa", LABEL: "pg_bahasa", LENGTH: 10, UPPER: true}),
	{
		cols:
		[
		{}, BUTTON.BUTTONFORM({"ITEM_ID": "btnBack", "LABEL": "Back"}, {CUSTOM_CLICK: buttonBack}) 	
		]
	}
]

let rulesPEGAWAI = {
	"pgid":webix.rules.isNotEmpty,
	"pgdeptid":webix.rules.isNotEmpty,
}

let blockPEGAWAI = form.SimpleForm("PEGAWAI", elementPEGAWAI, rulesPEGAWAI)

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockPEGAWAI]);

function renderLov(){
	return []
}
