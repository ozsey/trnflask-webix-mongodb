var menuId = "MS_DETAIL"
var winFormTitle = "MS_DETAIL"
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
    },
    "PEGAWAI": {
        "ELEMENT": [
            "pgid",
            "pgfirstname",
            "pglastname",
            "pgpendidikan",
            "pgjeniskelamin",
            "pghobi",
            "btnDetail"
        ],
        "PRIMARY_KEY": [
            "pgid"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": true,
        "REST_API": {
            "BLOCK_NAME": "PEGAWAI",
            "PARAM_ID": [
                "deptid"
            ]
        },
        "LOV_API": {
            "pgpendidikan": {
                "ITEM_ID": "pgpendidikan",
                "TABLE_ID": "dtLovPendidikan",
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

let validateLOVPendidikan = function(){
	//write your function logic in here ...
	return validateLov({
		"LOV_CODE": "pgpendidikan", "DISPLAY_ID": ["pendidikandesc"], "API_NAME": "validateLOVPendidikan_"+ menuId, "PARAM_ID": ["pgpendidikan"]
	})
}

let callFormButton = function(){
	callForm("MS_DETAIL_ND")
}

let elementDEPARTEMEN = [
	{
		cols:
		[
			TEXTBOX.TEXTPRIMARY({ITEM_ID: "deptid", LABEL: "dept_id",LENGTH: 15, CUSTOM_WIDTH: 100}),
			TEXTBOX.TEXTNORMAL({ITEM_ID: "deptname", LABEL: "dept_name", LENGTH: 20, UPPER: true, CUSTOM_WIDTH: 400}),
			TEXTBOX.TEXTNORMAL({ITEM_ID: "deptkepala", LABEL: "dept_kepala", LENGTH: 100, UPPER: true})
		]
	},
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptlokasi", LABEL: "dept_lokasi", LENGTH: 100, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "deptkeuangan", LABEL: "dept_keuangan", LENGTH: 15}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptnomortelp", LABEL: "dept_nomor_telp", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptemail", LABEL: "dept_email", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "deptdesc", LABEL: "dept_desc", LENGTH: 100, UPPER: true}),
	DATE.DDMMYY({ITEM_ID: "deptdate", LABEL: "dept_date"}),
]

let elementPEGAWAI = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "pgid", LABEL: "pg_id", LENGTH: 10, UPPER: true, CUSTOM_WIDTH: 100}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pgfirstname", LABEL: "pg_first_name", LENGTH: 50, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "pglastname", LABEL: "pg_last_name", LENGTH: 50, UPPER: true}),

	LOVFIELD.TEXTLOVMULTICOLS(
	{ITEM_ID: ["pgpendidikan", "pendidikandesc"], 
	LABEL: ["Kode Pendidikan", "Deskripsi"],
	WINDOW_ID: "wdLovPendidikan",
	TOTAL_COLS: 2
	}, {VALIDATE_ITEM: validateLOVPendidikan}),

	COMBO.COMBOLISTDEFAULT({ITEM_ID: "pgjeniskelamin",
	LABEL: "Jenis Kelamin", 
	OPTIONS: [
		{id: "L", value: "LAKI-LAKI"},
		{id: "P", value: "PEREMPUAN"}
		]}),

	COMBO.COMBOLISTAPI(
	{ITEM_ID: "pghobi", LABEL: "Hobi", IDPARAM:[]}),

	BUTTON.BUTTONDATAGRID({
	"ITEM_ID": "btnDetail",
	"LABEL": "Detail"
	}, {CUSTOM_CLICK: callFormButton})
	
]

let rulesDEPARTEMEN = {
	"deptid":webix.rules.isNotEmpty,
}

let rulesPEGAWAI = {
	"pgid":webix.rules.isNotEmpty,
}

let blockDEPARTEMEN = form.SimpleForm("DEPARTEMEN", elementDEPARTEMEN, rulesDEPARTEMEN)
let blockPEGAWAI = datatable.SimpleDatatable("PEGAWAI", elementPEGAWAI, rulesPEGAWAI, [1,2])

webix.ready(function(){
	restapi.restApiCombo(
	{"ITEM_ID": "pghobi", 
	"API_NAME": "comboListHobi_" + menuId,
	'PARAM_ID':[]
	}),
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockDEPARTEMEN,blockPEGAWAI]);

function renderLov(){
	return [
		lov.lovField("LovPendidikan", ["pgpendidikan", "pendidikandesc"], ["Kodee", "Desc"], 2)
	]
}
