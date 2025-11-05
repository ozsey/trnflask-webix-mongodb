var menuId = "MULTIVIEW"
var winFormTitle = "MULTIVIEW"
var winConfigForm = {
    "RC_GROUPING_POSISI": {
        "ELEMENT": [
            "rcgpcode",
            "rcgpdivcode",
            "rcgpdesc",
            "rcgpjobdesc",
            "rcgpjeniskelamin",
            "rcgpusiamin",
            "rcgpusiamax",
            "rcgppendidikan",
            "rcgpjurusan",
            "rcgpnosim",
            "rcgppengalaman",
            "rcgpkualifikasi",
            "rcgpbahasa",
            "rcgprckpocode",
            "rcgpipk"
        ],
        "PRIMARY_KEY": [
            "rcgpcode"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "FORM",
            "PARENT"
        ],
        "REST_API": {
            "BLOCK_NAME": "RC_GROUPING_POSISI",
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
    "RC_GROUP_POSISI_STATUS_NIKAH": {
        "ELEMENT": [
            "rgpnkodestatus"
        ],
        "PRIMARY_KEY": [
            "rgpnkodestatus"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": true,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_STATUS_NIKAH",
            "PARAM_ID": ["rcgpcode"]
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
    "RC_GROUP_POSISI_SIM": {
        "ELEMENT": [
            "rgpskodesim"
        ],
        "PRIMARY_KEY": [
            "rgpskodesim"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_SIM",
            "PARAM_ID": ["rcgpcode"]
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
    "RC_GROUP_POSISI_KEMAMPUAN": {
        "ELEMENT": [
            "rgpkkodekemampuan"
        ],
        "PRIMARY_KEY": [
            "rgpkkodekemampuan"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_KEMAMPUAN",
            "PARAM_ID": ["rcgpcode"]
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
    "RC_GROUP_POSISI_BAHASA": {
        "ELEMENT": [
            "rgpbkodebahasa"
        ],
        "PRIMARY_KEY": [
            "rgpbkodebahasa"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_BAHASA",
            "PARAM_ID": ["rcgpcode"]
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
    "RC_GROUP_POSISI_PENDIDIKAN": {
        "ELEMENT": [
            "rgppkodependidikan"
        ],
        "PRIMARY_KEY": [
            "rgppkodependidikan"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_PENDIDIKAN",
            "PARAM_ID": ["rcgpcode"]
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
    "RC_GROUP_POSISI_JURUSAN": {
        "ELEMENT": [
            "rgpjkodejurusan"
        ],
        "PRIMARY_KEY": [
            "rgpjkodejurusan"
        ],
        "RELATION_KEY": [],
        "WHEN_NEW_FORM": {},
        "BLOCK_TYPE": [
            "DATAGRID",
            "CHILD"
        ],
        "LOAD_DATA_AT_START": false,
        "REST_API": {
            "BLOCK_NAME": "RC_GROUP_POSISI_JURUSAN",
            "PARAM_ID": ["rcgpcode"]
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

let functionApi = makePromise(function(resolve){
	let kodenikah = getItemValue("rgpnkodestatus")
	let api = restapi.restApiCustom({
	"ITEM_ID": "statusnikah", 
	"DATA": {"kode": kodenikah}})
	api.then(function(response){
		if(response.status == true){
			let data = response.data.deskripsi
			setValueDt(["rgpndescstatus"],[data])
			resolve({"status": true})
		}else{
			resolve({"status": false, "tipe": "error", "pesan": response.msg})
		}
	})
})

// let functionApi = makePromise(function (resolve) {
//     let kodenikah = getItemValue("rgpnkodestatus");
//     let api = restapi.restApiCustom({
//         "ITEM_ID": "statusnikah",
//         "DATA": { "kode": kodenikah }
//     });
// 
//     api.then(function (response) {
//         console.log("API Response:", response);
// 
//         if (response.status === true) {
//             setValueDt(response.data.deskripsi);
//             resolve({ "status": true });
//         } else {
//             console.error("Error:", response.msg);
//             resolve({ "status": false, "tipe": "error", "pesan": response.msg });
//         }
//     }).catch(function (error) {
//         console.error("API Error:", error);
//         resolve({ "status": false, "tipe": "error", "pesan": "Error connecting to the server." });
//     });
// });
// 
// function setValueDt(description) {
//     document.getElementById("descriptionField").value = description;
//     console.log("Description set to:", description);
// }

let elementRC_GROUPING_POSISI = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rcgpcode", LABEL: "rcgp_code", LENGTH: 7, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpdivcode", LABEL: "rcgp_div_code", LENGTH: 13, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpdesc", LABEL: "rcgp_desc", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpjobdesc", LABEL: "rcgp_job_desc", LENGTH: 1000, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpjeniskelamin", LABEL: "rcgp_jenis_kelamin", LENGTH: 1, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpusiamin", LABEL: "rcgp_usia_min", LENGTH: 3, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpusiamax", LABEL: "rcgp_usia_max", LENGTH: 3, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgppendidikan", LABEL: "rcgp_pendidikan", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpjurusan", LABEL: "rcgp_jurusan", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpnosim", LABEL: "rcgp_no_sim", LENGTH: 100, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgppengalaman", LABEL: "rcgp_pengalaman", LENGTH: 500, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpkualifikasi", LABEL: "rcgp_kualifikasi", LENGTH: 1000, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgpbahasa", LABEL: "rcgp_bahasa", LENGTH: 250, UPPER: true}),
	TEXTBOX.TEXTNORMAL({ITEM_ID: "rcgprckpocode", LABEL: "rcgp_rckpo_code", LENGTH: 50, UPPER: true}),
	NUMERIC.NUMERICNORMAL({ITEM_ID: "rcgpipk", LABEL: "rcgp_ipk", LENGTH: 15}),
]

let elementRC_GROUP_POSISI_STATUS_NIKAH = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgpnkodestatus", LABEL: "rgpn_kode_status", LENGTH: 20, UPPER: true}, {VALIDATE_ITEM: functionApi}),
	TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgpndescstatus",
			LABEL:"rgpn_desc_status"
		}
	)
]

let elementRC_GROUP_POSISI_SIM = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgpskodesim", LABEL: "rgps_kode_sim", LENGTH: 10, UPPER: true}),
	TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgpsdescsim",
			LABEL:"rgps_desc_sim"
		}
	)
]

let elementRC_GROUP_POSISI_KEMAMPUAN = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgpkkodekemampuan", LABEL: "rgpk_kode_kemampuan", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgpkdesckemampuan",
			LABEL:"rgpk_desc_kemampuan"
		}
	)
]

let elementRC_GROUP_POSISI_BAHASA = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgpbkodebahasa", LABEL: "rgpb_kode_bahasa", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgpbdescbahasa",
			LABEL:"rgpb_desc_bahasa"
		}
	)
]

let elementRC_GROUP_POSISI_PENDIDIKAN = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgppkodependidikan", LABEL: "rgpp_kode_pendidikan", LENGTH: 20, UPPER: true}),
	TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgppdescpendidikan",
			LABEL:"rgpp_desc_pendidikan"
		}
	)
]

let elementRC_GROUP_POSISI_JURUSAN = [
	TEXTBOX.TEXTPRIMARY({ITEM_ID: "rgpjkodejurusan", LABEL: "rgpj_kode_jurusan", LENGTH: 20, UPPER: true}),
		TEXTBOX.TEXTDISPLAY(
		{
			ITEM_ID:"rgpjdescjurusan",
			LABEL:"rgpj_desc_jurusan"
		}
	)
]

let rulesRC_GROUPING_POSISI = {
	"rcgpcode":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_STATUS_NIKAH = {
	"rgpnkodestatus":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_SIM = {
	"rgpskodesim":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_KEMAMPUAN = {
	"rgpkkodekemampuan":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_BAHASA = {
	"rgpbkodebahasa":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_PENDIDIKAN = {
	"rgppkodependidikan":webix.rules.isNotEmpty,
}

let rulesRC_GROUP_POSISI_JURUSAN = {
	"rgpjkodejurusan":webix.rules.isNotEmpty,
}

let blockRC_GROUPING_POSISI = form.SimpleForm("RC_GROUPING_POSISI", elementRC_GROUPING_POSISI, rulesRC_GROUPING_POSISI)
let blockRC_GROUP_POSISI_STATUS_NIKAH = datatable.SimpleDatatable("RC_GROUP_POSISI_STATUS_NIKAH", elementRC_GROUP_POSISI_STATUS_NIKAH, rulesRC_GROUP_POSISI_STATUS_NIKAH, [0,0])
let blockRC_GROUP_POSISI_SIM = datatable.SimpleDatatable("RC_GROUP_POSISI_SIM", elementRC_GROUP_POSISI_SIM, rulesRC_GROUP_POSISI_SIM, [0,0])
let blockRC_GROUP_POSISI_KEMAMPUAN = datatable.SimpleDatatable("RC_GROUP_POSISI_KEMAMPUAN", elementRC_GROUP_POSISI_KEMAMPUAN, rulesRC_GROUP_POSISI_KEMAMPUAN, [0,0])
let blockRC_GROUP_POSISI_BAHASA = datatable.SimpleDatatable("RC_GROUP_POSISI_BAHASA", elementRC_GROUP_POSISI_BAHASA, rulesRC_GROUP_POSISI_BAHASA, [0,0])
let blockRC_GROUP_POSISI_PENDIDIKAN = datatable.SimpleDatatable("RC_GROUP_POSISI_PENDIDIKAN", elementRC_GROUP_POSISI_PENDIDIKAN, rulesRC_GROUP_POSISI_PENDIDIKAN, [0,0])
let blockRC_GROUP_POSISI_JURUSAN = datatable.SimpleDatatable("RC_GROUP_POSISI_JURUSAN", elementRC_GROUP_POSISI_JURUSAN, rulesRC_GROUP_POSISI_JURUSAN, [0,0])
let tab0 = multiview.element("STATUS NIKAH", blockRC_GROUP_POSISI_STATUS_NIKAH)
let tab1 = multiview.element("SIM", blockRC_GROUP_POSISI_SIM)
let tab2 = multiview.element("KEMAMPUAN", blockRC_GROUP_POSISI_KEMAMPUAN)
let tab3 = multiview.element("BAHASA", blockRC_GROUP_POSISI_BAHASA)
let tab4 = multiview.element("PENDIDIKAN", blockRC_GROUP_POSISI_PENDIDIKAN)
let tab5 = multiview.element("JURUSAN", blockRC_GROUP_POSISI_JURUSAN)
let multiviewGrouping = multiview.view([tab0,tab1,tab2,tab3,tab4,tab5])

webix.ready(function(){
	restapi.restApiSelect()
})

let content = layout.baseLayout([blockRC_GROUPING_POSISI,multiviewGrouping]);

function renderLov(){
	return []
}
