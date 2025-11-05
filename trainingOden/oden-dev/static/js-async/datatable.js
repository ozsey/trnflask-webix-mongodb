// Update : 2024-01-30
// CDN Library - datatable.js -  Oden Async
// Update : - win xp compatible firefox 52 / 49
window.winActiveCell = "";
window.winValOld = "";
window.winDataChanged = {};
window.winPagerDatatable = {};
window.winIdAttach = [];
window.winIdOldRecordDt = {}
window.winNewDataDt = {}
window.winDataAwalDt = {}
window.winAllowEditCell = true
window.winIdOldRecordDt = {}
window.winPagerDatatable = {}
window.winTotalRecordDt = {}
window.winHideColumnsDt = {}
window.winOperatorDt = {}
window.winValidatePromise = {}
window.winFooterCustomFunction = {}
var oldValueCombo = ""
var popUpTextAreaDt = false
var idPopUp = []
var winChangedRecord = {}

function onClickLOVCell(obj,rowCell,columnCell){
    let view = $$(obj.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("view_id"))
    view.unselectAll()
    view.select(rowCell,columnCell)
    let editCellAddData = true
    if(window.winAddData){
        for (let x=0; x<window.winIdOldRecordDt[winActiveBlock.focusNow].length; x++){
            if(window.winIdOldRecordDt[winActiveBlock.focusNow][x]==rowCell){
                editCellAddData = false
                break;
            }
        }
    }else{
        if(winConfigForm[view.config.id]['PRIMARY_KEY'].includes(columnCell)){
            editCellAddData = false
        }
    }
    if(editCellAddData){
        let thisColumn = $$(winActiveBlock.focusNow).getColumnConfig(winActiveCell.pos.column)
        if(thisColumn.restApiLov !=""){
            thisColumn.restApiLov()
        }
        window.winOpenPopUp = "open";
        window.winOldCellLov = $$(view.config.id).getItem(window.winActiveCell['pos'].row)[window.winActiveCell['pos'].column]
        window.winActiveBlock['lastFocus'] = window.winActiveBlock['focusNow'] 
        window.winActiveBlock['focusNow'] = thisColumn.wdLOV
        $$(window.winActiveBlock['lastFocus']).editCancel();
        $$(thisColumn.wdLOV).show()
    }
}

function hideColumnsDatagrids(){
    Object.keys(winHideColumnsDt).forEach(function(block){
        if(winHideColumnsDt[block].length!=0){
            winHideColumnsDt[block].forEach(function(idCols){
                $$(block).hideColumn(idCols)
            })
        }
        $$(block).hideColumn("action_"+block)
    })
}

function cekDate(value,format){
    let dateString = moment(value, format).format()
    let dateObject = new Date(dateString)
    if (!isNaN(dateObject.getTime())){
        return moment(dateObject).format(format)
    }else{
        return null
    }
}

function getRulesNotNull(rulesId){
    let rulesFix = {};
    for (let i = 0; i < rulesId.length; i++) {
        rulesFix[rulesId[i]] = webix.rules.isNotEmpty
    }
    return rulesFix
}

function updateFooterDatagrid(idTable){
    let dtTable = $$(idTable)
    let promiseAll = []
    let columnFooter = []
    
    for (const column of dtTable.config.columns) {
        if(column.customFooter!=undefined){
            console.log(92,column)
            columnFooter.push(column)
            promiseAll.push(updateFooterDt(dtTable,column))
        }
    }

    Promise.all(promiseAll).then(function(respond){
        let level = 0
        respond.forEach(function(result,index){
            columnFooter[index]['footer']=result
            if(result.length>level){
                level = result.length
                dtTable.define("footerLevel",result.length) 
                dtTable.define("height",dtTable.$height+=(result.length*43))
            }
        })
        dtTable.refreshColumns();
        // dtTable.resize()
    })
}


function deleteRecordFromDataChanged(blockId, indexDelRecord) {

    // ^ PENJELASAN FUNGSI
    // ------------------------------------------------------
    // ^ Fungsi ini digunakan untuk menghapus tempat tampungan data atau winDataChanged.
    // ^ blockId -> nama block yang akan dihapus winDataChanged nya
    // ^ indexDelRecord -> index record datagrid yang ingin di hapus dari data changed



    let idDelRow = $$(blockId).serialize()[indexDelRecord]['id'];
    let indxDelRow;

    winDataChanged[blockId].every(function (recordInsert) {
        if (recordInsert.id === idDelRow) {
            indxDelRow = winDataChanged[blockId].indexOf(recordInsert);
        }
        if (indxDelRow !== undefined) {
            winDataChanged[blockId].splice(indxDelRow, 1);
            return false;
        }
        return true;
    });
}

function checkToDatachanged(param) {
    // param = rowId, columnId, datarow
    let blocks = Object.keys(winConfigForm)
    let idBaru = true;
    let activeCellRow
    let blockActive = param.blockActive || winActiveBlock.focusNow
    let indexRecord = undefined

    if (param.dataRow != undefined) {
        winDataRow = param.dataRow
        activeCellRow = param.dataRow.id
    } else {
        winDataRow = $$(blockActive).getItem(param.rowId)
        activeCellRow = winActiveCell.pos.row
    }
    
    if(window.winDataChanged[blockActive]!=undefined){
        if (window.winDataChanged[blockActive].length != 0) {
            for (var i in window.winDataChanged[blockActive]) {
                if (window.winDataChanged[blockActive][i].id == window.winDataRow.id) {
                    indexRecord = i
                    let indexObj = blocks.indexOf(winActiveBlock.focusNow)
                    for(let a=0; a<=indexObj; a++){
                        if (winConfigForm[blocks[a]]['BASE_TABLE'] == undefined){
                            winConfigForm[blocks[a]]['BASE_TABLE'] = true
                        }
                        if(winConfigForm[blocks[a]]['BLOCK_TYPE'][0]=="FORM"  && winConfigForm[blocks[a]]['BASE_TABLE']){
                            winConfigForm[blocks[a]]["PRIMARY_KEY"].forEach(function(id){
                                let item = $$(id).config
                                window.winDataRow[id] = $$(id).getValue()
                                if (window.winDateType.includes(id) || window.winDateTypeMMYY.includes(id)){
                                    if(window.winDataRow[id].length != item.attributes.maxLength){
                                        window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                        window.winDataRow[id] = window.winDataRow[id].substring(window.winDataRow[id].length-item.attributes.maxLength)
                                        if(window.winDateTypeMMYY.includes(id)){
                                            window.winDataRow[id]=window.winDataRow[id]+"-01"
                                        }
                                    }
                                    if(window.winDataRow[id].length==item.attributes.maxLength && window.winDataRow[id].split("-").length>1 && window.winDataRow[id].split("-")[0].length==4){
                                        window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                    } 
                                }else if(window.winDateTypeYY.includes(id)){
                                    window.winDataRow[id]=window.winDataRow[id]+"-01-01"
                                }
                            })
                            winConfigForm[blockActive]["RELATION_KEY"].forEach(function(id){
                                let item = $$(id).config
                                window.winDataRow[id] = $$(id).getValue()
                                if (window.winDateType.includes(id) || window.winDateTypeMMYY.includes(id)){
                                    if(window.winDataRow[id].length != item.attributes.maxLength){
                                        window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                        window.winDataRow[id] = window.winDataRow[id].substring(window.winDataRow[id].length-item.attributes.maxLength)
                                        if(window.winDateTypeMMYY.includes(id)){
                                            window.winDataRow[id]=window.winDataRow[id]+"-01"
                                        }
                                    }
                                    if(window.winDataRow[id].length==item.attributes.maxLength && window.winDataRow[id].split("-").length>1 && window.winDataRow[id].split("-")[0].length==4){
                                        window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                    } 
                                }else if(window.winDateTypeYY.includes(id)){
                                    window.winDataRow[id]=window.winDataRow[id]+"-01-01"
                                }
                            })
                        }
                    }

                    if (winThereIsSubChild) {
                        if (winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2] == undefined) {
                            let subChild = 0
                            blocks.forEach(function (id) {
                                if (winConfigForm[id]["BLOCK_TYPE"][2] == winActiveBlock.focusNow) {
                                    subChild++
                                }
                            })
                            if (subChild != 0) {
                                window.winDataChanged[blockActive].splice(i,1,winDataRow)
                            } else {
                                window.winDataChanged[blockActive].splice(i,1,winDataRow)
                            }
                        } else {
                            if (winThereIsSubChild) {
                                window.winDataChanged[blockActive].splice(i,1,winDataRow)
                                
                            }
                        }                    
                    }else{
                        window.winDataChanged[blockActive].splice(i,1,winDataRow)
                    }
                    idBaru = false;
                    break; //Stop this loop, we found it!
                }
            }
        }
        if(idBaru==true){
            if(param.rowId==activeCellRow){
                let indexObj = blocks.indexOf(winActiveBlock.focusNow)
                for(let a=0; a<=indexObj; a++){
                    if (winConfigForm[blocks[a]]['BASE_TABLE'] == undefined){
                        winConfigForm[blocks[a]]['BASE_TABLE'] = true
                    }
                    if(winConfigForm[blocks[a]]['BLOCK_TYPE'][0]=="FORM"  && winConfigForm[blocks[a]]['BASE_TABLE']){
                        winConfigForm[blocks[a]]["PRIMARY_KEY"].forEach(function(id){
                            let item = $$(id).config
                            winDataRow[id] = $$(id).getValue()
                            if (window.winDateType.includes(id) || window.winDateTypeMMYY.includes(id)){
                                if(winDataRow[id].length != item.attributes.maxLength){
                                    winDataRow[id] = winDataRow[id].split("-").reverse().join("-");
                                    winDataRow[id] = winDataRow[id].substring(winDataRow[id].length-item.attributes.maxLength)
                                    if(window.winDateTypeMMYY.includes(id)){
                                        winDataRow[id]=winDataRow[id]+"-01"
                                    }
                                }
                                if(winDataRow[id].length==item.attributes.maxLength && winDataRow[id].split("-").length>1 && winDataRow[id].split("-")[0].length==4){
                                    winDataRow[id] = winDataRow[id].split("-").reverse().join("-");
                                } 
                            }else if(window.winDateTypeYY.includes(id)){
                                winDataRow[id]=winDataRow[id]+"-01-01"
                            }
                        })
                        winConfigForm[blockActive]["RELATION_KEY"].forEach(function(id){
                            let item = $$(id).config
                            window.winDataRow[id] = $$(id).getValue()
                            if (window.winDateType.includes(id) || window.winDateTypeMMYY.includes(id)){
                                if(window.winDataRow[id].length != item.attributes.maxLength){
                                    window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                    window.winDataRow[id] = window.winDataRow[id].substring(window.winDataRow[id].length-item.attributes.maxLength)
                                    if(window.winDateTypeMMYY.includes(id)){
                                        window.winDataRow[id]=window.winDataRow[id]+"-01"
                                    }
                                }
                                if(window.winDataRow[id].length==item.attributes.maxLength && window.winDataRow[id].split("-").length>1 && window.winDataRow[id].split("-")[0].length==4){
                                    window.winDataRow[id] = window.winDataRow[id].split("-").reverse().join("-");
                                } 
                            }else if(window.winDateTypeYY.includes(id)){
                                window.winDataRow[id]=window.winDataRow[id]+"-01-01"
                            }
                        })
                    }

                }

                if (winThereIsSubChild) { 
                    if (winConfigForm[blockActive]["BLOCK_TYPE"][2] == undefined) {
                        let subChild = 0
                        blocks.forEach(function (id) {
                            if (winConfigForm[id]["BLOCK_TYPE"][2] == blockActive) {
                                subChild++
                            }
                        })
                        if (subChild != 0) {
                            window.winDataChanged[blockActive].push(winDataRow)
                        } else {
                            window.winDataChanged[blockActive].push(winDataRow)
                        }
                    } else {
                        if (winThereIsSubChild) {
                            window.winDataChanged[blockActive].push(winDataRow)
                        }   
                    }
                }else{
                    window.winDataChanged[blockActive].push(winDataRow)
                }
            }
        }
        if(winThereIsSubChild){
            let parentChild = ""
            let child = []
            blocks.every(function (blockId) {
                if (winConfigForm[blockId]["BLOCK_TYPE"][2] != undefined) {
                    parentChild = winConfigForm[blockId]["BLOCK_TYPE"][2]
                    return false;
                }
                return true
            })
            blocks.forEach(function (blockId) {
                if (winConfigForm[blockId]["BLOCK_TYPE"][2] == parentChild) {
                    child.push(blockId)
                }
            })
            if (winDataChanged[parentChild].length != 0) {
                if (indexRecord == undefined) {
                    indexRecord = (winDataChanged[parentChild].length) - 1
                }
                let recordParent = winDataChanged[parentChild][indexRecord]
                child.forEach(function (childId) {
                    if(winConfigForm[parentChild].PRIMARY_KEY != undefined){
                        winConfigForm[parentChild].PRIMARY_KEY.every(function(idPK){
                            if (winDataChanged[childId][indexRecord] != undefined) {
                                if (winDataChanged[childId][indexRecord][idPK] == undefined) {
                                    winDataChanged[childId][indexRecord][idPK]=recordParent[idPK]
                                }
                            }
                        })  
                    }
                })
            }
        }
    }
}

function onClickComboDt(dtTable,objValue){
    let blocks = Object.keys(winConfigForm)
    let pos = $$(dtTable.id).getSelectedId();
    let valueCombo = $$($$(dtTable.id).config.id).getItem(pos.row)
    valueCombo[pos.column] = objValue.id
    let newValueCombo = valueCombo[pos.column]
    $$(window.winActiveBlock['focusNow']).updateItem(pos.row, valueCombo);
    if(oldValueCombo!=newValueCombo){
        checkToDatachanged({rowId:pos.row, columnId:pos.column})
    }
    webix.UIManager.setFocus($$(window.winActiveBlock['focusNow']));
    $$(window.winActiveBlock.focusNow).select(winActiveCell.pos.row, winActiveCell.pos.column)
}

async function calculateDt(datatableId, columnId, operation, customFunction, idOperatorDt, digitAfterComa) {
    // console.log(1055, "run calculateDt")
    // console.log(1058, operation)
    var datatable = $$(datatableId);
    if(datatable==undefined){
        return 0
    }
    var data = webix.copy(datatable.data.pull);
    console.log(333,data)
    var values = [];

    for (var id in data) {
        if (data.hasOwnProperty(id)) {
            console.log(338,data[id], data[id][columnId])
            values.push(data[id][columnId]);
        }
    }

    values = values.map(function(item) {
        if (item === "") {
            return 0;
        }else if (!isNaN(item)) {
            return parseFloat(item);
        }
    });

    switch (operation) {
        case "SUM":
            var sum = 0;
            for (var i = 0; i < values.length; i++) {
                if(isNaN(values[i])){
                    sum += 0;
                }else{
                    sum += values[i]
                }
            }
            // console.log(datatable.config.id)
            if (!winOperatorDt[datatable.config.id]) {
                winOperatorDt[datatable.config.id] = {};
            }
            winOperatorDt[datatable.config.id][idOperatorDt] = sum
            console.log(264, sum)
            return sum;
        case "MIN":
            // console.log(1084, values)
            var min = null;
            for (var i = 0; i < values.length; i++) {
                if(!isNaN(values[i])){
                    if (values[i] < min) {
                        min = values[i];
                    }
                }
            }
            if (!winOperatorDt[datatable.config.id]) {
                winOperatorDt[datatable.config.id] = {};
            }
            winOperatorDt[datatable.config.id][idOperatorDt] = min
            // console.log(1094, min)
            return min;
        case "MAX":
            var max = null;
            for (var i = 0; i < values.length; i++) {
                if(!isNaN(values[i])){
                    if (values[i] > max) {
                        max = values[i];
                    }
                }
            }
            if (!winOperatorDt[datatable.config.id]) {
                winOperatorDt[datatable.config.id] = {};
            }
            winOperatorDt[datatable.config.id][idOperatorDt] = max
            return max;
        case "AVG":
            var sum = 0;
            for (var i = 0; i < values.length; i++) {
                if(isNaN(values[i])){
                    sum += 0;
                }else{
                    sum += values[i]
                }
            }
            let avg = sum / values.length
            if(digitAfterComa!=undefined){
                avg = avg.toFixed(digitAfterComa)
            }
            console.log(405, sum, values,values.length, avg)
            if (!winOperatorDt[datatable.config.id]) {
                winOperatorDt[datatable.config.id] = {};
            }
            winOperatorDt[datatable.config.id][idOperatorDt] = avg
            return avg; 
        case "CUSTOM_FUNCTION":
            let resultFunction = await customFunction()
            // console.log(1098989898,resultFunction)
            return resultFunction
        default:
            return 0;
    }
}

async function updateFooterDt(block,item){
    // console.log(1194, "run updateFooterDt")
    let respondFooterObj = []
    let tampunganOperator = []
    console.log(918, item.customFooter)
    for (const footerObj of item.customFooter) {
        let operatorseq = 0
        console.log(920,footerObj)
        if(footerObj.content == "MULTI_COLUMNS"){
            let tampunganmulti = []

            for (const subFooterObj of footerObj.columns) {
                if(typeof(subFooterObj)=="string"){
                    tampunganmulti.push(`<div>${subFooterObj}</div>`)
                }else{
                    let idOperatorDt = item.id + "." + subFooterObj.content;
                    while (tampunganOperator.includes(idOperatorDt)) {
                        operatorseq++;
                        idOperatorDt = item.id + "." + subFooterObj.content + "." + operatorseq;
                    }
                    tampunganOperator.push(idOperatorDt)
                    // console.log(1233, idOperatorDt)
                    let respondSubFooterObj = await calculateDt(block,item.id,subFooterObj.content, subFooterObj.customFunction, idOperatorDt, subFooterObj.digitAfterComa)
                    tampunganmulti.push(`<div>${respondSubFooterObj}</div>`)
                }
            }
            let respondFooterColumnsObj = `<div class="two-column-cell">${tampunganmulti.join('')}</div>`
            respondFooterObj.push(respondFooterColumnsObj)
        }else{
            let idOperatorDt = item.id + "." + footerObj.content
            while (tampunganOperator.includes(idOperatorDt)) {
                operatorseq++;
                idOperatorDt = item.id + "." + footerObj.content + "." + operatorseq;
            }
            let respondFooterColumnsObj
            let tampunganmulti = []
            tampunganOperator.push(idOperatorDt)
            if("customText" in footerObj){
                tampunganmulti.push(`<div>${footerObj['customText']}</div>`)
                let calculateResult = await calculateDt(block,item.id,footerObj.content, footerObj.customFunction, idOperatorDt, footerObj.digitAfterComa)
                tampunganmulti.push(`<div>${calculateResult}</div>`)
                respondFooterColumnsObj = `<div class="two-column-cell">${tampunganmulti.join('')}</div>`
            }else{
                respondFooterColumnsObj = await calculateDt(block,item.id,footerObj.content, footerObj.customFunction, idOperatorDt, footerObj.digitAfterComa)
            }
            respondFooterObj.push(respondFooterColumnsObj)
        }
    }
    // console.log(1272,tampunganOperator)
    // column['footer'] = item.customFooterDt
    // let respond = ['<div>aaaaa</div>','<div>bbbbb</div>','<div>ccccc</div>',]
    // console.log(1225, "end updateFooterDt", respondFooterObj)
    return respondFooterObj
    // item['footer'] = respondFooterObj
}

class DatatableCustom { 
    // "ODENTABLEDET", elementODENTABLEDET, rulesODENTABLEDET,[0,0], buttonDatagrid,customOperatorDatagrid 
    SimpleDatatable(idTable,columnsCustom,notNullElements,splitDt=[0,0], additionalButton, additionalCustomOperator, actionDatagrid={"delete":"temp", "status":undefined}){
        let blocks = Object.keys(winConfigForm)
        winIdOldRecordDt[idTable] = []
        winPagerDatatable[idTable] = [0,0]
        winDataChanged[idTable] = []
        window.winCountOffsetRecord[idTable] = 0
        window.winTotalRecordDt[idTable] = 0
        window.winHideColumnsDt[idTable] = []
        winDataDtSelect[idTable] = []
        window.winNewCustomOperator = {}
        // Main of Datatable Object
        let dtTable = {
            view:"datatable",
            resizeColumn:true, 
            id:idTable,
            // height:403,
            // autoheight:true,
            minHeight:403,
            customOperator:additionalCustomOperator || undefined,
            tooltip:true,
            scroll:"x",
            dynamicLoadData:0,
            editable:true,
            footer:true,
            footerLevel:0,
            pager:"pager_"+idTable,
            select:"cell",
            editaction: "custom",
            columns:[],
            leftSplit:splitDt[0],
            rightSplit:splitDt[1],
            rules:notNullElements,
            scheme:{
                $change:function(cell){
                        let columnDatatable = $$(this.owner).config.columns
                        let dtTable = $$(this.owner)
                        columnDatatable.forEach(function(item){
                            if (item.editor==undefined){
                                dtTable.addCellCss(cell.id, item.id, "disableCells", true);
                            }
                            
                        })
                }
            },
            on:{
                onAfterAdd: function (id, index) {
                    if(winThereIsSubChild){
                        checkToDatachanged({ rowId: id, dataRow: this.getItem(id) , blockActive:this.config.id})
                    }
                },
                onBeforeUnselect(){
                    console.log("onbeforeunselect")
                    let positionNow = window.winActiveCell
                    let validationData = {'status':true}
                    if(!winAddRecord && !winNextRecord && !winPrevRecord && !winDeleteRecord && !winSearchRecord && !winClearResetRecord){
                        if(!(winValidatePromise instanceof Promise)){
                            window.winValidateItemPos = positionNow
                        }
                        if(positionNow!='' && !positionNow.pos.column.includes("action_")){
                            if(window.winActiveCell.view.getColumnConfig(window.winActiveCell.pos.column).validateItem){
                                if(!window.winResetData){
                                    if(window.winActiveCell.pos.row==winEditor.row && window.winActiveCell.pos.column==winEditor.column){
                                        let headerColumn = window.winActiveCell.view.getColumnConfig(window.winActiveCell.pos.column).header[0].text
                                        validationData = window.winActiveCell.view.getColumnConfig(window.winActiveCell.pos.column).validateItem()
                                        console.log(validationData)
                                        winValidatePromise = validationData
                                        console.log(winValidatePromise)
                                        validationData.then(function(respond){
                                            console.log(respond)
                                            if(respond.status){
                                                winEditor = {}
                                                winValidatePromise = {}
                                                validationData = {status:true}
                                            }else{
                                                function isWebixPopupOpen() {
                                                    // Check if any Webix popup alerts exist
                                                    var popupAlerts = document.querySelectorAll('.webix_alert-error, .webix_alert-warning');
                                                    return popupAlerts.length > 0;
                                                }
                                                if(isWebixPopupOpen()==false){
                                                    if (respond.tipe=="info"){
                                                        webix.alert(ALERT.ALERTINFO(respond.pesan+"<br><br><strong>Kolom "+headerColumn+"</strong>")).then(
                                                            function(){
                                                                $$(window.menuId).enable()//enable
                                                                $$(window.winActiveBlock.focusNow).select(positionNow.pos.row, positionNow.pos.column)
                                                                positionNow.view.edit(positionNow.pos)
                                                            }
                                                            )
                                                    }else if (respond.tipe=="warning"){
                                                        webix.alert(ALERT.ALERTWARNING(respond.pesan+"<br><br><strong>Kolom "+headerColumn+"</strong>")).then(
                                                            function(){
                                                                $$(window.menuId).enable()//enable
                                                                $$(window.winActiveBlock.focusNow).select(positionNow.pos.row, positionNow.pos.column)
                                                                positionNow.view.edit(positionNow.pos)
                                                            }
                                                            )
                                                    }else if (respond.tipe=="error"){
                                                        webix.alert(ALERT.ALERTERROR(respond.pesan+"<br><br><strong>Kolom "+headerColumn+"</strong>")).then(
                                                            function(){
                                                                $$(window.menuId).enable()//enable
                                                                $$(window.winActiveBlock.focusNow).select(positionNow.pos.row, positionNow.pos.column)
                                                                positionNow.view.edit(positionNow.pos)
                                                            }
                                                            ) 
                                                    }else{
                                                        webix.alert(ALERT.ALERTERROR("<strong>Kolom "+headerColumn+"</strong>")).then(
                                                            function(){
                                                                $$(window.menuId).enable()//enable
                                                                $$(window.winActiveBlock.focusNow).select(positionNow.pos.row, positionNow.pos.column)
                                                                positionNow.view.edit(positionNow.pos)
                                                            }
                                                            )    
                                                    }
                                                }
                                            }
                                        })
                                    }else{
                                        validationData = {status:true}
                                    }
                                    
                                }
                            }else{

                                validationData = {status:true}
                            }
                        }
                    }
                },
                onAfterUnselect:function(selection){
                    this.unselect(selection.row, selection.column);
                    this.unselectAll();
                },
                onAfterSelect:function(){
                    let view = this
                    let pos = view.getSelectedId();
                    window.winActiveCell = {'pos':pos,'view':view}
                    window.winAllowEditCell = true
                },
                onItemClick:function(id){
                    let view = this
                    webix.UIManager.setFocus(view)
                    window.winActiveBlock.focusNow = this.config.id
                    let pos = view.getSelectedId();
                    window.winActiveCell = {'pos':pos,'view':view}
                    let thisColumn = view.config.columns[view.getColumnIndex(window.winActiveCell['pos'].column)]
                    if(thisColumn.editor=="btnDatagrid"){
                        window.winValidateItemPos = window.winActiveCell
                        thisColumn.customTrigger()
                    }else if(thisColumn.jenis=="combo"){
                        $$(winActiveBlock.focusNow).edit(id);
                    }
                },
                onItemDblClick:function(id, e, node){
                    if($$(window.winActiveBlock['focusNow']).config.view=="datatable"){
                        let view = $$(window.winActiveBlock['focusNow'])
                        let pos = view.getSelectedId();
                        window.winActiveCell = {'pos':pos,'view':view}
                        let thisColumn = view.config.columns[view.getColumnIndex(window.winActiveCell['pos'].column)]
                        let validationData = view.validate()
                        // console.log("masuk", thisColumn)
                        if (!window.winIdAttach.includes(thisColumn.id)){
                            window.winIdAttach.push(thisColumn.id)
                        }
                        if(thisColumn.jenis=="checkBox"){
                            if(!thisColumn.disabledItem){
                                if(window.winAddData==true){
                                    window.winActiveCell = {"pos":pos, "view":view}
                                    let editCellAddData = true
                                    for (let x=0; x<window.winIdOldRecordDt[winActiveBlock.focusNow].length; x++){
                                        if(window.winIdOldRecordDt[winActiveBlock.focusNow][x]==pos.row){
                                            editCellAddData = false
                                            break;
                                        }
                                    }
                                    if(editCellAddData){
                                        onEnterCheckbox(view,pos)    
                                    }
                                }else{
                                    onEnterCheckbox(view,pos)
                                }
                            }
                        }else if(thisColumn.jenis=="customElement"){

                        }else{
                            if(window.winAddData==true){
                                window.winActiveCell = {"pos":pos, "view":view}
                                let editCellAddData = true
                                for (let x=0; x<window.winIdOldRecordDt[winActiveBlock.focusNow].length; x++){
                                    if(window.winIdOldRecordDt[winActiveBlock.focusNow][x]==pos.row){
                                        editCellAddData = false
                                        break;
                                    }
                                }
                                if(editCellAddData){
                                    if(!(winValidatePromise instanceof Promise)){
                                        view.edit(pos);
                                    }else{
                                        winValidatePromise.then(function(respond){
                                            console.log(respond)
                                            if(respond.status == true || winValidateItemPos.pos.column == pos.column){
                                                view.edit(pos);
                                            }
                                        })
                                    }
                                }
                            }else if(window.winSearchMode==true){
                                console.log("masuk 976")
                                window.winActiveCell = {"pos":pos, "view":view}
                                if(!winDisplayItem.includes(pos.column)){
                                    view.edit(pos);
                                }
                            }else{
                                console.log("masuk 981")
                                let inArrayPK = winConfigForm[window.winActiveBlock['focusNow']]["PRIMARY_KEY"].includes(pos.column)
                                if(inArrayPK == false){
                                    console.log(winValidatePromise)
                                    if(!(winValidatePromise instanceof Promise)){
                                        view.edit(pos);
                                    }else{
                                        winValidatePromise.then(function(respond){
                                            console.log(respond)
                                            if(respond.status == true || winValidateItemPos.pos.column == pos.column){
                                                view.edit(pos);
                                            }
                                        })
                                    }
                                    window.winActiveCell = {"pos":pos, "view":view}
                                }
                                window.winActiveCell = {"pos":pos, "view":view}
                            }
                        }
                    }
                },
                onFocus:function(){
                    if(window.winActiveBlock["focusNow"]==""){
                        window.winActiveBlock["focusNow"] = this.config.id
                        webix.html.addCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
                    }else if(window.winActiveBlock["focusNow"]==this.config.id){
                        let blocks = Object.keys(winConfigForm)
                        if(blocks.includes(window.winActiveBlock["lastFocus"])){
                            webix.html.removeCss($$(window.winActiveBlock["lastFocus"]).getNode(), "datablock-focus")
                        }
                        webix.html.addCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
                    }else if(window.winActiveBlock["focusNow"]!=this.config.id && $$(window.winActiveBlock["focusNow"]).validate()==true){
                        window.winActiveBlock["lastFocus"] = window.winActiveBlock["focusNow"]
                        window.winActiveBlock["focusNow"] = this.config.id
                        if(window.winActiveBlock["lastFocus"]!=""){
                            webix.html.removeCss($$(window.winActiveBlock["lastFocus"]).getNode(), "datablock-focus")
                        }
                        webix.html.addCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
                    }else if(window.winActiveBlock["focusNow"]!=this.config.id && $$(window.winActiveBlock["focusNow"]).validate()==false){
                        webix.alert(ALERT.ALERTERROR('Validasi Gagal'))
                    }
                },
                onBeforeEditStart:function(cell){
                    this.select(cell.row, cell.column)
                    if(this.getColumnConfig(cell.column).preItem){
                        if(!this.getColumnConfig(cell.column).preItem()){
                            winAllowEditCell = false
                            this.editCancel();
                        }else{
                            winAllowEditCell = true
                        }
                    }else{
                        winAllowEditCell = true
                    }
                    if(this.getColumnConfig(cell.column).isPrimaryKey && this.getColumnConfig(cell.column).jenis =="combo"){
                        if(winAddData && !winIdOldRecordDt[this.config.id].includes(this.getSelectedId().row)|| winSearchMode ){
                            winAllowEditCell = true
                        }else{
                            winAllowEditCell = false
                            this.editCancel();
                        }
                    }
                    
                },
                onBeforeEditStop:function(state,editor){
                    let item = this.getColumnConfig(editor.column)
                    if (window.winDateType.includes(editor.column) || window.winDateTypeMMYY.includes(editor.column)){
                            if(state.value!="" && state.value!=null){
                                if(state.value.length != item.maxLength){
                                    state.value = state.value.split("-").reverse().join("-");
                                    state.value = state.value.substring(state.value.length-item.maxLength)
                                }
                                if(state.value.length==item.maxLength && state.value.split("-").length>1 && state.value.split("-")[0].length==4){
                                    state.value = state.value.split("-").reverse().join("-");
                                } 
                                state.value = cekDate(state.value, item.formatJenis);
                            }
                    }
                },
                onAfterEditStart:function(){
                    if(winAllowEditCell){
                        let editState = this.getEditState()
                        this.select(winActiveCell.pos.row, editState.column)
                        this.refresh()
                        let blocks = Object.keys(winConfigForm)
                        let view = this
                        let pos = view.getSelectedId();
                        window.winActiveCell = {'pos':pos,'view':view}
                        let thisColumn = view.config.columns[view.getColumnIndex(window.winActiveCell['pos'].column)]
                        // console.log(thisColumn)
                        attchActionEvent(thisColumn)
                        if(thisColumn.jenis!="textarea"){
                            $$(window.winActiveBlock.focusNow).getEditor().getInputNode().setAttribute("maxlength",thisColumn.maxLength)
                        }
                        if(thisColumn.editor=="combo"){
                            let pos = view.getSelectedId();
                            oldValueCombo = $$(view.config.id).getItem(pos.row)[pos.column]
                        }
                        window.winDataAwalDt = view.getItem(pos.row)[pos.column]
                    }else{
                        this.editCancel()
                    }
                },
                onAfterEditStop:function(state,editor){
                    
                    // console.log("onAfterEditStop",editor.column)
                    if(!winAddRecord && !winNextRecord && !winPrevRecord && !winDeleteRecord && !winSearchRecord && !winClearResetRecord){
                        if(editor.config.jenis=="lov"){
                            webix.UIManager.removeHotKey("ctrl+l", null, this);
                        }
                        window.winOldCellLov = this.getItem(window.winActiveCell['pos'].row)[window.winActiveCell['pos'].column]
                        
                        if(editor.config.jenis!='textarea'){
                            // jika bukan text area
                            if(window.winOpenPopUp=="closed"){
                                let status = false;
                                window.winEditor = {row:editor.row,column:editor.column}
                                winValidateItemPos = {'pos':{'row':editor.row,'column':editor.column,'id':editor.row+'_'+editor.column},'view':this}
                                let validationData = this.getColumnConfig(editor.column).validateItem(state.value)
                                // console.log(editor.column, validationData)
                                winValidatePromise = validationData
                                let view = this
                                validationData.then(function(respond){
                                    // console.log(respond)
                                    if(winSearchMode){
                                        respond.status = true
                                    }
                                    status = respond.status
                                    if(window.winOpenPopUp=="closed"){
                                        if (status){
                                            $$(window.winActiveBlock.focusNow).detachEvent("onKeyPress");
                                            winValidatePromise = {}
                                            if(state.value!="" && state.value!=state.old){
                                                checkToDatachanged({rowId:editor.row, columnId:editor.column,blockActive:view.config.id})
                                            }
                                        }else{
                                            function isWebixPopupOpen() {
                                                // Check if any Webix popup alerts exist
                                                var popupAlerts = document.querySelectorAll('.webix_alert-error, .webix_alert-warning');
                                                return popupAlerts.length > 0;
                                            }
                                            if(isWebixPopupOpen()==false){
                                                if (respond.tipe=="info"){
                                                    webix.alert(ALERT.ALERTINFO(respond.pesan+"<br><br><strong>Kolom "+editor.config.header[0].text+"</strong>")).then(
                                                        function(){
                                                            $$(window.menuId).enable()//enable
                                                            winValidateItemPos.view.edit(winValidateItemPos.pos)
                                                        }
                                                        )
                                                }else if (respond.tipe=="warning"){
                                                    webix.alert(ALERT.ALERTWARNING(respond.pesan+"<br><br><strong>Kolom "+editor.config.header[0].text+"</strong>")).then(
                                                        function(){
                                                            $$(window.menuId).enable()//enable
                                                            winValidateItemPos.view.edit(winValidateItemPos.pos)
                                                        }
                                                        )
                                                }else if (respond.tipe=="error"){
                                                    webix.alert(ALERT.ALERTERROR(respond.pesan+"<br><br><strong>Kolom "+editor.config.header[0].text+"</strong>")).then(
                                                        function(){
                                                            
                                                            $$(window.menuId).enable()//enable
                                                            winValidateItemPos.view.edit(winValidateItemPos.pos)
                                                        }
                                                        )
                                                }else{
                                                    webix.alert(ALERT.ALERTERROR("<strong>Kolom "+editor.config.header[0].text+"</strong>")).then(
                                                        function(){
                                                            $$(window.menuId).enable()//enable
                                                            winValidateItemPos.view.edit(winValidateItemPos.pos)
                                                        }
                                                        )    
                                                }
                                            }
                                        }
                                    }
                                })
                                
                            }
                        }else{
                            // jika item jenis text area
                            let dataBaruTextArea = this.getItem(editor.row)[editor.column]
                            if(dataBaruTextArea!=window.winDataAwalDt){
                                checkToDatachanged({rowId:editor.row, columnId:editor.column, dataRow:this.getItem(editor.row)})
                            }
                        }
                        
                        
                        let item = this.getColumnConfig(editor.column)
                        let wdLov = winActiveBlock.focusNow
                        if (window.winDateType.includes(editor.column) || window.winDateTypeMMYY.includes(editor.column)){
                            if(winOpenPopUp == "open"){
                                if(editor.config.jenis=="lov"){
                                    winActiveBlock.focusNow = winActiveBlock.lastFocus
                                }
                            }
                            window.winDataChanged[window.winActiveBlock['focusNow']].forEach(function(record){
                                if(record.id==editor.row){
                                    let idx = winDataChanged[window.winActiveBlock['focusNow']].indexOf(record)
                                    if(record[editor.column]!="" && record[editor.column]!=null){
                                        if(record[editor.column].length != item.maxLength){
                                            record[editor.column] = record[editor.column].split("-").reverse().join("-");
                                            record[editor.column] = record[editor.column].substring(record[editor.column].length-item.maxLength)
                                        }
                                        if(record[editor.column].length==item.maxLength && record[editor.column].split("-").length>1 && record[editor.column].split("-")[0].length==4){
                                            record[editor.column] = record[editor.column].split("-").reverse().join("-");
                                        } 
                                        record[editor.column] = cekDate(record[editor.column], item.formatJenis);
                                    }
                                }
                            })
                            if(winOpenPopUp == "open"){
                                if(editor.config.jenis=="lov"){
                                    winActiveBlock.focusNow = wdLov
                                }
                            }
                        }

                        let dtTable = this
                        let promiseAll = []
                        let columnFooter = []
                        
                        for (const column of dtTable.config.columns) {
                            if(column.customFooter!=undefined){
                                columnFooter.push(column)
                                promiseAll.push(updateFooterDt(dtTable,column))
                            }
                        }

                        Promise.all(promiseAll).then(function(respond){
                            let level = 0
                            respond.forEach(function(result,index){
                                columnFooter[index]['footer']=result
                                if(result.length>level){
                                    level = result.length
                                    dtTable.define("footerLevel",result.length) 
                                    dtTable.define("height",dtTable.$height+=(result.length*43))
                                }
                            })
                            dtTable.refreshColumns();
                            // dtTable.resize()
                        })
    
                        webix.UIManager.setFocus($$(window.winActiveBlock['focusNow']));
                    }
                }, 
                onEditorChange: function(id, value){
                    // let view = $$(window.winActiveBlock['focusNow'])
                    // let pos = view.getSelectedId();
                    // window.winActiveCell = {'pos':pos,'view':view}
                    window.winEditor = {row:id.row,column:id.column}
                    if(this.getColumnConfig(id.column).jenis=="currency"){
                        value = this.getColumnConfig(id.column).editFormat(value)
                    }else{
                        if(this.getColumnConfig(id.column).format){
                            value = this.getColumnConfig(id.column).format(value)
                        }
                    }

                    let item = this.getColumnConfig(id.column)
                    if(item.jenis == "lov" && window.winActiveBlock.focusNow == item.wdLOV){
                        window.winActiveBlock.focusNow = window.winActiveBlock.lastFocus
                    }
                    window.winDataRow = $$(window.winActiveBlock['focusNow']).getItem(id.row)
                    if (window.winDateType.includes(id.column) || window.winDateTypeMMYY.includes(id.column)){
                        window.winDataChanged[winActiveBlock.focusNow].forEach(function(record){
                            if(record.id==id.row){
                                let idx = winDataChanged[winActiveBlock.focusNow].indexOf(record)
                                if(record[id.column]!="" && record[id.column]!=null){
                                    if(record[id.column].length != item.maxLength){
                                        record[id.column] = record[id.column].split("-").reverse().join("-");
                                        record[id.column] = record[id.column].substring(record[id.column].length-item.maxLength)
                                    }
                                    if(record[id.column].length==item.maxLength && record[id.column].split("-").length>1 && record[id.column].split("-")[0].length==4){
                                        record[id.column] = record[id.column].split("-").reverse().join("-");
                                    } 
                                    record[id.column] = cekDate(record[id.column], item.formatJenis);
                                }
                            }
                        })
                    }

                    winDataRow[id.column] = value
                    let datarowEditorchanged = webix.copy(winDataRow)
                    
                    checkToDatachanged({rowId:id.row, columnId:id.column, dataRow:datarowEditorchanged}) 
                    
                    if (window.winDateType.includes(id.column) || window.winDateTypeMMYY.includes(id.column)){
                        window.winDataChanged[winActiveBlock.focusNow].forEach(function(record){
                            if(record.id==id.row){
                                if(record[id.column]!="" && record[id.column]!=null){
                                    if(record[id.column].length != item.maxLength){
                                        record[id.column] = record[id.column].split("-").reverse().join("-");
                                        record[id.column] = record[id.column].substring(record[id.column].length-item.maxLength)
                                    }
                                    if(record[id.column].length==item.maxLength && record[id.column].split("-").length>1 && record[id.column].split("-")[0].length==4){
                                        record[id.column] = record[id.column].split("-").reverse().join("-");
                                    } 
                                    record[id.column] = cekDate(record[id.column], item.formatJenis);
                                }
                            }
                        })
                    }

                    console.log(996)
                },
                onCheck:function(row, col, val){
                    console.log(1484, col)
                    let view = $$(window.winActiveBlock['focusNow'])
                    let pos = { column:col, row:row}
                    window.winActiveCell = {'pos':pos,'view':view}
                    window.winEditor = {row:row,column:col}
                    let blocks = Object.keys(winConfigForm)
                    let columnsDt = this.config.columns
                    view.getColumnConfig(col).searchItem = true
                    view.refresh()
                    let recordActive = $$(window.winActiveBlock.focusNow).getItem(row);
                    window.winValidateItemPos = winActiveCell
                    this.getColumnConfig(col).validateItem().then((respond)=>{
                        if(respond.status){
                            recordActive[col] = val
                            winDataRow = recordActive

                            let datarowOnCheck = webix.copy(winDataRow)
                            
                            checkToDatachanged({rowId:row, columnId:col, dataRow:datarowOnCheck})
                            
                            let item = this.getColumnConfig(col)
                            if (window.winDateType.includes(col) || window.winDateTypeMMYY.includes(col)){
                                window.winDataChanged[winActiveBlock.focusNow].forEach(function(record){
                                    if(record.id==row){
                                        let idx = winDataChanged[winActiveBlock.focusNow].indexOf(record)
                                        
                                        if(record[col].length != item.maxLength){
                                            record[col] = record[col].split("-").reverse().join("-");
                                            record[col] = record[col].substring(record[col].length-item.maxLength)
                                        }
                                        if(record[col].length==item.maxLength && record[col].split("-").length>1 && record[col].split("-")[0].length==4){
                                            record[col] = record[col].split("-").reverse().join("-");
                                        } 
                                        record[col] = cekDate(record[col], item.formatJenis);
                                    }
                                })
                            }
                            let dtTable = view
                            let promiseAll = []
                            let columnFooter = []
                            
                            for (const column of dtTable.config.columns) {
                                if(column.customFooter!=undefined){
                                    columnFooter.push(column)
                                    promiseAll.push(updateFooterDt(dtTable,column))
                                }
                            }

                            Promise.all(promiseAll).then(function(respond){
                                let level = 0
                                respond.forEach(function(result,index){
                                    columnFooter[index]['footer']=result
                                    if(result.length>level){
                                        level = result.length
                                        dtTable.define("footerLevel",result.length) 
                                        dtTable.define("height",dtTable.$height+=(result.length*43))
                                    }
                                })
                                dtTable.refreshColumns();
                                // dtTable.resize()
                            })
                        }else{
                            if(val==this.getColumnConfig(col).checkValue){
                                recordActive[col] = this.getColumnConfig(col).uncheckValue
                            }else if(val==this.getColumnConfig(col).uncheckValue){
                                recordActive[col] = this.getColumnConfig(col).checkValue
                            }
                            $$(window.winActiveBlock.focusNow).updateItem(row, recordActive);
                        }
                    })
                },
                onAfterLoad:function(){
                    if(winConfigForm[idTable]['DATA_PER_PAGE']!=undefined){
                        let footerHeight = 0
                        if(document.getElementsByClassName("webix_ss_footer")){
                            Array.from(document.getElementsByClassName("webix_ss_footer")).every(function(divObj){
                                if(divObj.parentElement.getAttribute("view_id")==idTable){
                                    footerHeight = divObj.offsetHeight
                                    return false
                                }
                                return true
                            })
                            
                        }
                        $$(idTable).define("height", (winConfigForm[idTable]['DATA_PER_PAGE']*36)+footerHeight)
                        $$(idTable).resize()
                    }else{
                        let footerHeight = 0
                        if(document.getElementsByClassName("webix_ss_footer")){
                            Array.from(document.getElementsByClassName("webix_ss_footer")).every(function(divObj){
                                if(divObj.parentElement.getAttribute("view_id")==idTable){
                                    footerHeight = divObj.offsetHeight
                                    return false
                                }
                                return true
                            })
                            
                        }
                        $$(idTable).define("height", this.minHeight+footerHeight)
                        $$(idTable).resize()
                    }
                    // console.log(1734)
                    winOperatorDt[this.config.id] = {}
                    if(!winAddData){
                        let idGenWebixDt = []
                        this.data.order.forEach(function(index){
                            idGenWebixDt.push(index)
                        })
                        window.winIdOldRecordDt[idTable] = idGenWebixDt
                        // console.log(1079,"datagrid", $$("pager_"+idTable).data.old_limit)
                        window.winPagerDatatable[idTable][1] = $$("pager_"+idTable).data.old_limit-1
                        window.winTotalRecordDt[idTable] = $$(idTable).count()
                        $$("count_"+idTable).define("count",window.winTotalRecordDt[idTable])
                        $$("count_"+idTable).define("page",window.winTotalRecordDt[idTable]-1)
                        $$("count_"+idTable).refresh()
                    }

                    let dtTable = this
                    let promiseAll = []
                    let columnFooter = []
                    
                    for (const column of dtTable.config.columns) {
                        if(column.customFooter!=undefined){
                            console.log(1599, column)
                            columnFooter.push(column)
                            promiseAll.push(updateFooterDt(dtTable,column))
                        }
                    }

                    Promise.all(promiseAll).then(function(respond){
                        let level = 0
                        respond.forEach(function(result,index){
                            columnFooter[index]['footer']=result
                            if(result.length>level){
                                // console.log("masuk", result.length)
                                level = result.length
                                dtTable.define("footerLevel",result.length) 
                                dtTable.define("height",dtTable.$height+=(result.length*43))
                                // console.log(1883,dtTable.config.height)
                            }
                        })
                        dtTable.refreshColumns();
                        dtTable.resize()
                    })
                },
                onBlur:function(){
                    this.editStop()
                },
                onKeyPress:function(code,e){
                    if(code==9){
                        webix.UIManager.removeHotKey("tab", null);
                        e.preventDefault();
                    }
                },
                onScrollX:function(){
                    let state = this.getScrollState();
                    if($$('customOperatorDatagrid_'+dtTable.id).config.hidden==false){
                        $$('customOperatorDatagrid_'+dtTable.id).scrollTo(state.x)
                    }    
                    
                },
                
            },
            onClick:{
                "deleteRowDt":function(event, id, node){
                    if($$(winActiveBlock.focusNow).getSelectedId() == undefined){
                        $$(window.winActiveBlock['focusNow']).select($$(winActiveBlock.focusNow).getFirstId(), "action_"+winActiveBlock.focusNow)
                    }
                    $$(window.winActiveBlock['focusNow']).unselectAll()
                    let pesan = "Apakah Anda Yakin untuk Menghapus Data: <br><br>"
                    
                    if(winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][1]=="PARENT"){
                        winConfigForm[winActiveBlock['focusNow']]['PRIMARY_KEY'].forEach(function(primaryId){
                            pesan+=primaryId+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                        })
                    }else{
                        if(winThereIsSubChild){
                            let haveSubChild = [] 
                            Object.keys(winConfigForm).forEach(function (blockId) {
                                if (winConfigForm[blockId]["BLOCK_TYPE"][2] != undefined) {
                                    haveSubChild.push(blockId)
                                }
                                if (!haveSubChild.includes(winConfigForm[blockId]["BLOCK_TYPE"][2])) {
                                    if(winConfigForm[blockId]["BLOCK_TYPE"][2]!= undefined){
                                        haveSubChild.push(winConfigForm[blockId]["BLOCK_TYPE"][2])
                                    }
                                }
                            })
                            let parentBlockId = getBlockParent()
                            if (!haveSubChild.includes(winActiveBlock.focusNow)) {
                                winConfigForm[parentBlockId]['PRIMARY_KEY'].forEach(function(primaryId){
                                    if(getItemValue(primaryId)!=undefined){
                                        let labelItem = ""
                                        if($$(parentBlockId).config.view == "form"){
                                            labelItem = $$(primaryId).config.label
                                        }else if($$(parentBlockId).config.view == "datatable"){
                                            labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                        }
                                        pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                    }
                                })
                                winConfigForm[winActiveBlock['focusNow']]['PRIMARY_KEY'].forEach(function(primaryId){
                                    if(getItemValue(primaryId)!=undefined){
                                        if($$(winActiveBlock['focusNow']).getColumnConfig(primaryId)!=undefined){
                                            let labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                            pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                        }
                                    }
                                })
                            }else{
                                winConfigForm[parentBlockId]['PRIMARY_KEY'].forEach(function(primaryId){
                                    if(getItemValue(primaryId)!=undefined){
                                        let labelItem = ""
                                        if($$(parentBlockId).config.view == "form"){
                                            labelItem = $$(primaryId).config.label
                                        }else if($$(parentBlockId).config.view == "datatable"){
                                            labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                        }
                                        pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"    
                                    }
                                })
                                if(winConfigForm[winActiveBlock['focusNow']]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                    winConfigForm[winConfigForm[winActiveBlock['focusNow']]['BLOCK_TYPE'][2]]['PRIMARY_KEY'].forEach(function(primaryId){
                                        if(winDataRow[primaryId]!=undefined){
                                            if($$(winConfigForm[winActiveBlock['focusNow']]['BLOCK_TYPE'][2]).getColumnConfig(primaryId)!=undefined){
                                                let labelItem = $$(winConfigForm[winActiveBlock['focusNow']]['BLOCK_TYPE'][2]).getColumnConfig(primaryId).header[0]['text']
                                                pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                            }
                                        }
                                    })
                                }
                                else{
                                    winConfigForm[winActiveBlock['focusNow']]['PRIMARY_KEY'].forEach(function(primaryId){
                                        if(getItemValue(primaryId)!=undefined){
                                            if($$(winActiveBlock['focusNow']).getColumnConfig(primaryId)!=undefined){
                                                let labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                                pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                            }
                                        }
                                    })
                                }    
                            }

                        }else{
                            let parentBlockId = getBlockParent()
                            winConfigForm[parentBlockId]['PRIMARY_KEY'].forEach(function(primaryId){
                                if(getItemValue(primaryId)!=undefined){
                                    let labelItem = ""
                                    if($$(parentBlockId).config.view == "form"){
                                        labelItem = $$(primaryId).config.label
                                    }else if($$(parentBlockId).config.view == "datatable"){
                                        labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                    }
                                    pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                }
                            })
                            
                            winConfigForm[winActiveBlock['focusNow']]['PRIMARY_KEY'].forEach(function(primaryId){
                                if(getItemValue(primaryId)!=undefined){
                                    if($$(winActiveBlock['focusNow']).getColumnConfig(primaryId)!=undefined){
                                        let labelItem = $$(winActiveBlock['focusNow']).getColumnConfig(primaryId).header[0]['text']
                                        pesan+=labelItem+"&nbsp;&nbsp;:&nbsp;&nbsp;"+$$(winActiveBlock['focusNow']).getItem(id.row)[primaryId]+"<br>"
                                    }
                                }
                            })
                        }
                        
                    }
                    
                    webix.confirm({
                        title:"Konfirmasi Hapus Data Insert",
                        text:pesan,
                        cancel:"Batal",
                        type:"alert-warning"
                    }).then(function(result){
                        if(result){
                            if(winThereIsSubChild){
                                let haveSubChild = [] 
                                Object.keys(winConfigForm).forEach(function (blockId) {
                                    if (winConfigForm[blockId]["BLOCK_TYPE"][2] != undefined) {
                                        haveSubChild.push(blockId)
                                    }
                                    if (!haveSubChild.includes(winConfigForm[blockId]["BLOCK_TYPE"][2])) {
                                        if(winConfigForm[blockId]["BLOCK_TYPE"][2]!= undefined){
                                            haveSubChild.push(winConfigForm[blockId]["BLOCK_TYPE"][2])
                                        }
                                    }
                                })
                                if (!haveSubChild.includes(winActiveBlock.focusNow)) {
                                    let idDelRow = id.row
                                    let indxDelRow
                                    winDataChanged[winActiveBlock.focusNow].every(function(recordInsert){
                                        if(recordInsert.id==idDelRow){
                                            indxDelRow = winDataChanged[winActiveBlock.focusNow].indexOf(recordInsert)
                                            return false
                                        }
                                        return true
                                    })
                                    if(indxDelRow!=undefined){
                                        winDataChanged[winActiveBlock.focusNow].splice(indxDelRow, 1);
                                    }
                                    
                                    $$(window.winActiveBlock['focusNow']).remove(idDelRow);
                                    let row_id = $$(window.winActiveBlock['focusNow']).getLastId();
                                    $$(window.winActiveBlock['focusNow']).select(row_id,$$(window.winActiveBlock['focusNow'])['config']['columns'][0]['id'], false)
                                }else{
                                    let ChildParent = ''
                                    let indexDelRecord
                                    Object.keys(winConfigForm).every(function(blockId){
                                        if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                            if(winConfigForm[blockId]['BLOCK_TYPE'][2]==winActiveBlock['focusNow']){
                                                ChildParent = winActiveBlock['focusNow']
                                                let datagridData = $$(winActiveBlock['focusNow']).serialize()
                                                indexDelRecord = datagridData.findIndex(record => record.id === winActiveCell['pos']['row'])
                                                return false
                                            }else{
                                                ChildParent =  winConfigForm[winActiveBlock['focusNow']]['BLOCK_TYPE'][2] 
                                                let datagridData = $$(winActiveBlock['focusNow']).serialize()
                                                indexDelRecord = datagridData.findIndex(record => record.id === winActiveCell['pos']['row'])
                                                return false
                                            }
                                        }
                                        return true
                                    })
                                    
                                    Object.keys(winConfigForm).forEach(function(blockId){
                                        if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                            if(winConfigForm[blockId]['BLOCK_TYPE'][2]==ChildParent){
                                                deleteRecordFromDataChanged(blockId, indexDelRecord) 
                                                let datagridData = $$(blockId).serialize()
                                                let idDelRow = datagridData[indexDelRecord]['id'] 
                                            
                                                $$(blockId).remove(idDelRow);
                                                if (winActiveBlock.focusNow == blockId) {
                                                    if (!indexDelRecord == 0 ) {   
                                                        $$(blockId).select(datagridData[indexDelRecord-1].id,$$(blockId).config.columns[0].id)
                                                    }else if(indexDelRecord == 0 && datagridData.length > 1){
                                                        $$(blockId).select(datagridData[indexDelRecord+1].id,$$(blockId).config.columns[0].id)
                                                    }
                                                }
                                            }
                                        }
                                        if(blockId == ChildParent){
                                            deleteRecordFromDataChanged(ChildParent, indexDelRecord)
                                            let datagridData = $$(ChildParent).serialize()
                                            let idDelRow = datagridData[indexDelRecord]['id'] 
    
                                            $$(ChildParent).remove(idDelRow);
                                            if (winActiveBlock.focusNow == ChildParent) {
                                                if (!indexDelRecord == 0 ) {   
                                                    $$(ChildParent).select(datagridData[indexDelRecord-1].id,$$(ChildParent).config.columns[0].id)
                                                }else if(indexDelRecord == 0 && datagridData.length > 1){
                                                    $$(ChildParent).select(datagridData[indexDelRecord+1].id,$$(ChildParent).config.columns[0].id)
                                                }
                                            }
                                        }
                                    })
                                }
                            }else{
                                let idDelRow = id.row
                                let indxDelRow
                                winDataChanged[winActiveBlock.focusNow].every(function(recordInsert){
                                    if(recordInsert.id==idDelRow){
                                        indxDelRow = winDataChanged[winActiveBlock.focusNow].indexOf(recordInsert)
                                        return false
                                    }
                                    return true
                                })
                                if(indxDelRow!=undefined){
                                    winDataChanged[winActiveBlock.focusNow].splice(indxDelRow, 1);
                                }
                                $$(window.winActiveBlock['focusNow']).remove(idDelRow);
                                let row_id = $$(window.winActiveBlock['focusNow']).getLastId();
                                $$(window.winActiveBlock['focusNow']).select(row_id,$$(window.winActiveBlock['focusNow'])['config']['columns'][0]['id'], false)
                            }
                            
                        }
                    });
                }
            },
            ready:function(){
                // if(winConfigForm[idTable]['DATA_PER_PAGE']!=undefined){
                //     let footerHeight = 0
                //     if(document.getElementsByClassName("webix_ss_footer")){
                //         Array.from(document.getElementsByClassName("webix_ss_footer")).every(function(divObj){
                //             if(divObj.parentElement.getAttribute("view_id")==idTable){
                //                 footerHeight = divObj.offsetHeight
                //                 return false
                //             }
                //             return true
                //         })
                        
                //     }
                //     $$(idTable).define("height", (winConfigForm[idTable]['DATA_PER_PAGE']*36)+43+footerHeight)
                //     $$(idTable).resize()
                // }else{
                //     let footerHeight = 0
                //     if(document.getElementsByClassName("webix_ss_footer")){
                //         Array.from(document.getElementsByClassName("webix_ss_footer")).every(function(divObj){
                //             if(divObj.parentElement.getAttribute("view_id")==idTable){
                //                 footerHeight = divObj.offsetHeight
                //                 return false
                //             }
                //             return true
                //         })
                        
                //     }
                //     $$(idTable).define("height", this.minHeight+footerHeight)
                //     $$(idTable).resize()
                // }
            }
        }

        let pagerCustom = {
			view:"pager",
			id:"pager_"+idTable,
			size:winConfigForm[idTable]['DATA_PER_PAGE'] || 10,
			// group:5,
            width:140,
            count:0,
			template: "&nbsp;Page {common.page()} from #limit#",
            css:{
                "margin-top":"inherit !important",
            }
		};

        function attchActionEvent(){
            let thisColumn = $$(winActiveBlock.focusNow).getColumnConfig($$(winActiveBlock.focusNow).getSelectedId().column)
            // console.log(thisColumn)
            if($$(window.winActiveBlock['focusNow']).config.view=="datatable"){
                if(thisColumn.jenis=="number"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa", code)
                        if ((code < 48 || code > 57) && code != 190 && code!=8 && code!=9 && code!=13 && code!=37 && code!=39 && code!=189) {
                            e.preventDefault()
                        }
                    });
                }
                if(thisColumn.jenis=="float"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa")
                        if ((code < 48 || code > 57) && code != 190 && code!=8 && code!=9 && code!=13 && code!=37 && code!=39) {
                            e.preventDefault()
                        }
                    });
                }
                if(thisColumn.jenis=="currency"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa")
                        if ((code < 48 || code > 57) && code != 190 && code!=8 && code!=9 && code!=13 && code!=37 && code!=39) {
                            e.preventDefault()
                        }
                    },thisColumn)
                }else if(thisColumn.jenis=="date"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa")
                        if ((code < 48 || code > 57) && code!=8 && code!=9 && code!=13 && code!=37 && code!=39) {
                            e.preventDefault()
                        }
                        // view.getColumnConfig()
                    })
                }else if(thisColumn.jenis=="clock"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa")
                        if ((code < 48 || code > 58) && code!=8 && code!=9 && code!=13 && code!=37 && code!=39) {
                            e.preventDefault()
                        }
                        // view.getColumnConfig()
                    })
                }else if(thisColumn.jenis=="timestamp"){
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){
                        console.log("aaaaaaaaaaaa")
                        if ((code < 48 || code > 58) && code!=8 && code!=9 && code!=13 && code!=37 && code!=39 && code!=32) {
                            e.preventDefault()
                        }
                        // view.getColumnConfig()
                    })
                }else if(thisColumn.jenis=="lov"){
                    webix.UIManager.removeHotKey("ctrl+l", null, window.winActiveCell['view']);
                    webix.UIManager.addHotKey("ctrl+l", function(view,e){
                        if(thisColumn.restApiLov !=""){
                            thisColumn.restApiLov()
                        }
                        window.winOpenPopUp = "open";
                        e.preventDefault()
                        window.winOldCellLov = $$(view.config.id).getItem(window.winActiveCell['pos'].row)[window.winActiveCell['pos'].column]
                        window.winActiveBlock['lastFocus'] = window.winActiveBlock['focusNow'] 
                        window.winActiveBlock['focusNow'] = thisColumn.wdLOV
                        $$(window.winActiveBlock['lastFocus']).editCancel();
                        $$(thisColumn.wdLOV).show()
                    },window.winActiveCell['view'])
                }else if(thisColumn.jenis=="telephone"){                    
                    $$(window.winActiveBlock.focusNow).attachEvent("onKeyPress",function(code,e){  
                        console.log("aaaaaaaaaaaa")                      
                        if ((code < 48 || code > 57) && code!=8 && code!=9 && code!=13 && code!=37 && code!=39) {                            
                            e.preventDefault()                        
                        }                    
                    });                
                }
            }
        }

        function onEnterCheckbox(view,pos,thisColumn){
                let blocks = Object.keys(winConfigForm)
                let valueCheckbox = $$(view.config.id).getItem(pos.row)
                if(valueCheckbox[pos.column]!=undefined){
                    if(valueCheckbox[pos.column]==view.getColumnConfig(pos.column)['checkValue']){
                        valueCheckbox[pos.column] = view.getColumnConfig(pos.column)['uncheckValue']
                    }else if(valueCheckbox[pos.column]==view.getColumnConfig(pos.column)['uncheckValue']){
                        valueCheckbox[pos.column] = view.getColumnConfig(pos.column)['checkValue']
                    }
                }else{
                    valueCheckbox[pos.column] = view.getColumnConfig(pos.column)['checkValue']
                }
                view.callEvent("onCheck",[pos.row,pos.column,valueCheckbox[pos.column]])
                // $$(view.config.id).updateItem(pos.row, valueCheckbox);
                
                // checkToDatachanged({rowId:pos.row, columnId:pos.column})
        }

        this.addElement(dtTable,columnsCustom)

        // let totalCountDt = {
        //     view:"label",
        //     label:"&nbsp;Showing {Object.keys(winConfigForm).length} from {Object.keys(winConfigForm).length}"
        // }

        let countCustom = {
			view:"pager",
			id:"count_"+idTable,
            master:false,
            width:250,
            size: 1,
			template: '- &nbsp;Showing {common.page()} &nbsp;&nbsp;from #limit#&nbsp;',
            css:{
                "margin-top":"inherit !important"
            }
		};

        let belowDatagrid = {cols:[pagerCustom,countCustom,{}]}
        if(additionalButton!=undefined){
            if(additionalButton.length!=0){
                additionalButton.forEach(function(button){
                    belowDatagrid.cols.push(button)
                })
            }
        }
        

        let customOperatorDatagrid = {
            view:"datatable", 
            header:false,
            autoheight:true,
            borderless:true,
            hidden:true,
            select:false,
            blockselect:false,
            id:'customOperatorDatagrid_'+dtTable.id,
            columns:[],
            on:{
                onScrollX:function(){
                    let state = this.getScrollState();
                    $$(dtTable.id).scrollTo(state.x)  
                },
            }
        }
        if(winConfigForm[dtTable.id]["BLOCK_TYPE"][1] != "NONE"){
            this.addActionColumn(dtTable, idTable, additionalCustomOperator, actionDatagrid)
        }
        // console.log(1351, dtTable.columns)
        if(winConfigForm[dtTable.id]["BLOCK_TYPE"][1] == "SUB_CHILD"){
            if(!winSubChild.hasOwnProperty(winConfigForm[dtTable.id]["BLOCK_TYPE"][2])){
                winSubChild[winConfigForm[dtTable.id]["BLOCK_TYPE"][2]] = []
                winSubChild[winConfigForm[dtTable.id]["BLOCK_TYPE"][2]].push(dtTable.id)
            }else{
                winSubChild[winConfigForm[dtTable.id]["BLOCK_TYPE"][2]].push(dtTable.id)
            }
        }

		return [dtTable,customOperatorDatagrid ,belowDatagrid]
    }

    addActionColumn(dtTable, idTable, additionalCustomOperator, actionDatagrid){
        // console.log(1355, idTable)   
        let thisDatatable = dtTable 
        if(actionDatagrid['delete']==undefined){
            actionDatagrid['delete'] = 'temp'
        }
        function actionDatagridDelete(obj){
            if(actionDatagrid['delete']!=undefined){
                let delicon = "<span class='deleteRowDt mdi mdi-24px mdi-delete-empty' style='color:red;'></span>";
                if(winIdOldRecordDt[idTable]!=undefined){
                    if(winIdOldRecordDt[idTable].length!=0){
                        if(actionDatagrid['delete']=="temp"){
                            if(winIdOldRecordDt[idTable].includes(obj.id)){
                                return ''
                            }else{
                                return delicon
                            }
                        }else{
                            return delicon
                        }
                    }else{
                        return delicon
                    }
                }else{
                    return ''
                }
            }else{
                // console.log("false del")
                return false
            }
        }
        
        
        
        function actionDatagridStatus(obj){
            if(actionDatagrid['status']!=undefined){
                let checkGreen = "<span class='statusTrueDt mdi mdi-24px mdi-checkbox-marked-circle-outline' style='color:green;'></span>";
                let closeRed = "<span class='statusFalseDt mdi mdi-24px mdi-close-circle-outline' style='color:red;'></span>";
                
                let value = obj[actionDatagrid['status']]
                if(value==true || value=='Y' || value==1 || value=="1"){
                    return checkGreen
                }else{
                    return closeRed
                }
            }else{
                return false
            }
        }

        let lastColumn = { id:"action_"+idTable, header:[{ text:"ActionButton",css:{'text-align':'center'}}],css:{'text-align':'center'},width:200, template:function(obj, common, value, config){
            let customTemplate = [actionDatagridStatus(obj),actionDatagridDelete(obj)]
            let copytampungan = webix.copy(customTemplate)
            copytampungan.forEach(function(value){
                if(value==false){
                    customTemplate.splice(copytampungan.indexOf(value),1)
                }
            })
            // console.log(1408, customTemplate)
            let templatehtml = ''
            if(customTemplate.length>0){
                customTemplate.forEach(function(icon){
                    // console.log(1413,templatehtml)
                    if(customTemplate.indexOf(icon)==customTemplate.length-1){
                        templatehtml+=icon
                    }else{
                        templatehtml+=(icon+"&emsp;")
                    }
                    
                })
            }
            // console.log(1421,templatehtml)
            let statusHtml = false
            let delBtn = false
            if(templatehtml.includes("circle-outline")){
                statusHtml = true
            }
            if(templatehtml.includes("delete-empty")){
                delBtn = true
            }
            if(statusHtml && delBtn){
                $$(idTable).getColumnConfig("action_"+idTable).header = 'Status Data | Delete Row';
                $$(idTable).getHeaderNode("action_"+idTable).innerHTML = 'Status Data | Delete Row';
            }else if(statusHtml==false && delBtn==true){
                $$(idTable).getColumnConfig("action_"+idTable).header = 'Delete Row';
                $$(idTable).getHeaderNode("action_"+idTable).innerHTML = 'Delete Row';
            }else{
                $$(idTable).getColumnConfig("action_"+idTable).header = 'action';
                $$(idTable).getHeaderNode("action_"+idTable).innerHTML = 'action';
            }
            // console.log(1439,templatehtml)
            return templatehtml
        }}
        let lastFormat = {
            editor: "",
            tooltip:"",
            // hidden:true,
        }
        // console.log(thisDatatable)
        thisDatatable.columns.push(Object.assign(lastColumn, lastFormat))

    }

    addElement(dtTable,items){
        let additionalFooter = []
        // console.log(1383,items)
        items.forEach(function(item,index,array){
            if(item.cols){
                for(let i in item.cols){
                    let format = {}
                    let column = {}
                    if(i==0){
                        function cekVal(value) {
                            if(value=="" || value==undefined){
                                return "‎"
                            }else{
                                return value
                            }
                        }
                        column = {
                            id: item.cols[i].id,
                            header: item.cols[i].label,
                            width: 300,
                            jenis: item.cols[i].jenis,
                            preItem: item.cols[i].preItem || function(){return true},
                            formatJenis: item.cols[i].formatJenis,
                            validateItem: item.cols[i].validateItem || function(){return {"status":true}},
                            maxLength : item.cols[i].attributes.maxlength,
                            css:item.cols[i].cssDt,
                            preItem: item.cols[i].preItem || function(){return true},
                            wdLOV:item.cols[i].idWd,
                            restApiLov:item.cols[i].restApiLov,
                            isPrimaryKey:item.cols[i].isPrimaryKey,
                            upperValue:item.cols[i].upperValue,
                            lowerValue:item.cols[i].lowerValue,
                            hideItem:item.cols[i].hidden || false,
                            // hidden:item.cols[i].hidden || false,
                            customFooter:item.cols[i].customFooterDt,
                            tooltip:item.cols[i].tooltip || "LOV",
                            // template:"#!"+item.cols[i].id+"#"
                            template: (r,s,val,obj,idval) => {
                                // console.log(1940,obj.id)
                                return `<div class="content_cell_icon_datagrid">${cekVal(r[item.cols[i].id])} <span class='test1 webix_input_icon mdi mdi-table-edit' style='cursor:pointer;' onclick='onClickLOVCell(this,`+r.id+`,"`+obj.id+`")'></span></div>`;
                            },
                        }
                        
                        
                        
                        if(item.cols[i].width!=undefined){
                            column.width = item.cols[i].width
                        }

                        if(column.hideItem){
                            window.winHideColumnsDt[dtTable.id].push(column.id)
                        }
                        
                        let footercolumn = item.cols[i].customFooterDt || []
                        if(footercolumn.length!=0){
                            additionalFooter.push(column.id)
                        }

                        format = {
                            editor: "text",
                            format: (value) => { return value },
                            editFormat: (value) => { return value },
                        }

                        if(item.cols[i].upperValue){
                            format = {
                                editor: "text",
                                format: (value) => {
                                    return value.toUpperCase()
                                },
                                editFormat: (value) => { return value },
                                editParse: (value) => {
                                    return value.toUpperCase()
                                },
                            }
                        }

                        if(item.cols[i].lowerValue){
                            format = {
                                editor: "text",
                                format: (value) => {
                                    return value.toLowerCase()
                                },
                                editFormat: (value) => { return value },
                                editParse: (value) => {
                                    return value.toLowerCase()
                                },
                            }
                        }
                    }else{
                        column = {
                            id: item.cols[i].id,
                            header: item.cols[i].label,
                            width: 300,
                            jenis: item.cols[i].jenis,
                            formatJenis: item.cols[i].formatJenis,
                            css:item.cols[i].cssDt,
                            hideItem:item.cols[i].hidden || false,
                            // hidden:item.cols[i].hidden || false,
                            customFooter:item.cols[i].customFooterDt,
                            tooltip:item.cols[i].tooltip || ""  ,
                            template:"#!"+item.cols[i].id+"#"   
                        }

                        if(item.cols[i].width!=undefined){
                            column.width = item.cols[i].width
                        }

                        let footercolumn = item.cols[i].customFooterDt || []
                        if(footercolumn.length!=0){
                            additionalFooter.push(column.id)
                        }

                        if(column.hideItem){
                            window.winHideColumnsDt[dtTable.id].push(column.id)
                        }
                        format = {
                            editor: item.view,
                            format: (value) => { return value },
                            editFormat: (value) => { return value },
                        }
                    }
                    if(index===array.length-1){
                        column.minWidth = 300,
                        column.fillspace=true
                    }
                    dtTable.columns.push(Object.assign(column,format))
                }
            }else{
                // if(item.customFooterDt!=undefined){
                //     if(item.customFooterDt.length>dtTable.footerLevel){
                //         dtTable.footerLevel = item.customFooterDt.length
                //         dtTable.minHeight+=(item.customFooterDt.length*43)
                //         dtTable.height = dtTable.minHeight
                //     }
                // }
                let column = {}
                let format = {}
                if(item.jenis == 'btnDatagrid'){
                    column = {
                        id : item.id,
                        header : item.header,
                        fillspace : item.fillspace,
                        width : item.width,
                        template : item.template,
                        css : item.css,
                        editor : item.editor,
                        customTrigger : item.customTrigger,
                        customFooter:item.customFooterDt,
                        tooltip:"",
                    }
                    format = {}
                    if(index===array.length-1){
                        column.minWidth = 300,
                        column.fillspace=true
                    }
                    let footercolumn = item.customFooterDt || []
                    if(footercolumn.length!=0){
                        additionalFooter.push(column.id)
                    }
                }else if(item.jenis == "customElement"){

                    let templateItem
                
                    if(typeof(item.template)!= "function"){
                        templateItem = function(obj, common, value, config){
                            let template = ""
                            if(item.compare != undefined && item.status != undefined){
                                if(obj[item.status] == "Y" || obj[item.status]==true|| obj[item.status]==1 || obj[item.status]=="1"){
                                    template = item.compare.true
                                }else{
                                    template = item.compare.false
                                }
                            }
                            template += item.template
                            return template
                        }
                    }else{
                        templateItem = item.template
                    }

                    column = {
                        id : item.id,
                        header : item.header,
                        fillspace : item.fillspace,
                        jenis : item.jenis,
                        width : item.width,
                        status : item.status,
                        compare : item.compare,
                        template : templateItem,
                        css : item.css,
                        editor : item.editor,
                        tooltip:"",
                    }
                    if(index===array.length-1){
                        column.minWidth = 300,
                        column.fillspace=true
                    }
                    format = {}
                }else{
                    // console.log(item.id, item)
                    column = {
                        id: item.id,
                        header: item.label,
                        width: 300,
                        jenis: item.jenis,
                        addSecond: item.addSecond || false,
                        dateId: item.dateId || undefined,
                        hideSecond: item.hideSecond || false,
                        hideMinute: item.hideMinute || false,
                        formatJenis: item.formatJenis,
                        validateItem: item.validateItem || item.validateDt || function(){return {"status":true}},
                        maxLength : item.attributes.maxlength,
                        css:item.cssDt,
                        preItem: item.preItem || function(){return true},
                        isPrimaryKey:item.isPrimaryKey,
                        upperValue:item.upperValue,
                        lowerValue:item.lowerValue,
                        hideItem:item.hidden || false,
                        customErrorSymbol:item.customErrorSymbol || false,
                        // hidden:item.hidden || false,
                        disabledItem:item.disabled || false,
                        customFooter:item.customFooterDt,
                        tooltip:item.tooltip || "",
                        template:"#!"+item.id+"#"
                        // options:item.options, 
                        // fillspace:true,
                    }
                    if(item.customFooterDt!=undefined){
                        additionalFooter.push(column.id)
                    }
                    if(item.width!=undefined){
                        column.width = item.width
                    }
                    
                    if(column.hideItem){
                        window.winHideColumnsDt[dtTable.id].push(column.id)
                    }
                    

                    format = {}
                    if (item.view === "checkbox") {
                        format = {
                            editor: item.view,
                            checkValue:item.checkValue,
                            uncheckValue:item.uncheckValue,
                            defaultValue:item.uncheckValue,
                            template: "{common.checkbox()}",
                        }

                        column["searchItem"] = false
                        
                        // if(item.disabled){
                        //     format.template = function(obj, common, value, config){
                        //         var checked = (value == config.checkValue) ? 'checked="true"' : '';
                        //         return "<input disabled class='webix_table_checkbox' type='checkbox' "+checked+">";
                        //     }
                        //     format.editor = undefined
                        // }else{
                        //     // if (item.customCSS) {
                        //     //     format.template = function(obj, common, value, config){
                        //     //         var checked = (value == config.checkValue) ? 'checked="true"' : '';
                        //     //             if (value){
                        //     //                 return "<div class='webix_custom_checkbox_x_datagrid custom checked'> X </div>";
                        //     //             }else{
                        //     //                 return "<div class='webix_custom_checkbox_x_datagrid custom notchecked'>  </div>";
                        //     //             }
                        //     //     }
                        //     // }
                        // }

                        if(item.disabled){
                            if (item.customCheckbox) {
                                format.template = function(obj, common, value, config){
                                    var checked = (value == config.checkValue) ? 'checked="true"' : '';
                                    return ' <div class="custom-checkbox"><input disabled type="checkbox" id="checkbox1"><label for="checkbox1" class="checkbox-icon"></label></div>';
                                };
                                format.editor = undefined;
                            }else{
                                format.template = function(obj, common, value, config){
                                    var checked = (value == config.checkValue) ? 'checked="true"' : '';
                                    return "<input disabled class='webix_table_checkbox ' type='checkbox' "+checked+">";
                                }
                                format.editor = undefined

                            }
                        }else{
                            if (item.customCheckbox) {
                                format.template = function(obj, common, value, config){
                                    var checked = (value == config.checkValue) ? 'checked="true"' : '';
                                    if (checked){
                                        return "<div class='webix_custom_checkbox_x_datagrid custom checked'> A    </div>";
                                    }else{
                                        return "<div class='webix_custom_checkbox_x_datagrid custom checked'>  </div>";
                                    }
                                }
                            }else{
                                format.template = function(obj, common, value, config){
                                    var checked = (value == config.checkValue) ? 'checked="true"' : '';
                                    return "<input class='webix_table_checkbox ' type='checkbox' "+checked+">";
                                }
                            }
                        }

                        let itemId = item.id
                        window.winNewDataDt[itemId]=item.checkValue
                    } else {
                        // console.log(2293, item)
                        if (item.format !== undefined) {
                            format = {
                                editor: item.view,
                                numberFormat: item.format,
                            }
                        } else {
                            if (item.jenis=="date"){
                                let returnEditor = "text"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        if(value!="" && value!=null){
                        
                                            if(value.split(" ")[0].length != item.attributes.maxlength){
                                                value = value.split(" ")[0].split("-").reverse().join("-");
                                                value = value.split(" ")[0].substring(value.split(" ")[0].length-item.attributes.maxlength)
                                            }
                                            if(value.split(" ")[0].length==item.attributes.maxlength && value.split(" ")[0].split("-").length>1 && value.split(" ")[0].split("-")[0].length==4){
                                                value = value.split(" ")[0].split("-").reverse().join("-");
                                            }
                                            let hasil = cekDate(value, item.formatJenis);
                                            
                                            return hasil
                                        }else{
                                            return value
                                        }
                                    },
                                    editFormat: (value) => {
                                        if(value!="" && value!=null){
                                            if(value.length != item.attributes.maxlength){
                                                value = value.split("-").reverse().join("-");
                                                value = value.substring(value.length-item.attributes.maxlength)
                                            }
                                            if(value.length==item.attributes.maxlength && value.split("-").length>1 && value.split("-")[0].length==4){
                                                value = value.split("-").reverse().join("-");
                                            }
                                            let hasil = cekDate(value, item.formatJenis);
                                            return hasil
                                        }else{
                                            return value
                                        }
                                    },
                                    editParse: (value) => {
                                        // if(value!=""){
                                        //     let hasil = cekDate(value, item.formatJenis);
                                        //     return hasil
                                        // }
                                        return value
                                    },
                                }
                            }else if(item.jenis=="clock"){
                                let returnEditor = "text"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        if(value.includes(":")){
                                                if(parseInt(value.slice(0, 2))<24){     // check hour
                                                    if(parseInt(value.slice(3, 5))<=59){    // check minuutes
                                                        if(parseInt(value.slice(6, 8))<=59 && !isNaN(parseInt(value.slice(6, 8)))){ // check seconds 
                                                            value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(6, 8))) && item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(6, 8))) && !item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")
                                                            return value
                                                        }
                                                        else{
                                                            value = ""
                                                            return value
                                                        }
                                                    }else{
                                                        value = ""
                                                        return value
                                                    }
                                                }
                                                else{
                                                    value = ""
                                                    return value
                                                }
                                            }else{
                                                if(parseInt(value.slice(0, 2))<24){
                                                    if(parseInt(value.slice(2, 4))<=59 && !isNaN(parseInt(value.slice(2, 4)))){
                                                        if(parseInt(value.slice(4, 6))<=59 && !isNaN(parseInt(value.slice(4, 6)))){
                                                            if(item.addSecond){
                                                                value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                                return value
                                                            }else{
                                                                value = moment(value,'HH:mm').format("HH:mm")
                                                                return value
                                                            }
                                                        }
                                                        else if(isNaN(parseInt(value.slice(4, 6))) && item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(4, 6))) && !item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")
                                                            return value
                                                        }
                                                        else{
                                                            value = ""
                                                            return value
                                                        }
                                                    }else if(isNaN(parseInt(value.slice(2, 4)))){
                                                        value = moment(value,'HH:mm').format("HH:mm")
                                                        return value
                                                    }else{
                                                        value = ""
                                                        return value
                                                    }
                                                }
                                                else{
                                                    value = ""
                                                    return value
                                                }
                                            }
                                        },
                                    editFormat: (value) => {    
                                        if(value.includes(":")){
                                                if(parseInt(value.slice(0, 2))<24){
                                                    if(parseInt(value.slice(3, 5))<=59){
                                                        if(parseInt(value.slice(6, 8))<=59 && !isNaN(parseInt(value.slice(6, 8)))){
                                                            value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(6, 8))) && item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(6, 8))) && !item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")
                                                            return value
                                                        }
                                                        else{
                                                            value = ""
                                                            return value
                                                        }
                                                    }else{
                                                        value = ""
                                                        return value
                                                    }
                                                }
                                                else{
                                                    value = ""
                                                    return value
                                                }
                                            }else{
                                                if(parseInt(value.slice(0, 2))<24){
                                                    if(parseInt(value.slice(2, 4))<=59 && !isNaN(parseInt(value.slice(2, 4)))){
                                                        if(parseInt(value.slice(4, 6))<=59 && !isNaN(parseInt(value.slice(4, 6)))){
                                                            if(item.addSecond){
                                                                value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                                return value
                                                            }else{
                                                                value = moment(value,'HH:mm').format("HH:mm")
                                                                return value
                                                            }
                                                        }
                                                        else if(isNaN(parseInt(value.slice(4, 6))) && item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                            return value
                                                        }
                                                        else if(isNaN(parseInt(value.slice(4, 6))) && !item.addSecond){
                                                            value = moment(value,'HH:mm').format("HH:mm")
                                                            return value
                                                        }
                                                        else{
                                                            value = ""
                                                            return value
                                                        }
                                                    }else if(isNaN(parseInt(value.slice(2, 4)))){
                                                        value = moment(value,'HH:mm').format("HH:mm")
                                                        return value
                                                    }else{
                                                        value = ""
                                                        return value
                                                    }
                                                }
                                                else{
                                                    value = ""
                                                    return value
                                                }
                                            }
                                    },
                                    editParse: (value) => {
                                        if(value.includes(":")){
                                            if(parseInt(value.slice(0, 2))<24){
                                                if(parseInt(value.slice(3, 5))<=59){
                                                    if(parseInt(value.slice(6, 8))<=59 && !isNaN(parseInt(value.slice(6, 8)))){
                                                        value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                        return value
                                                    }
                                                    else if(isNaN(parseInt(value.slice(6, 8))) && item.addSecond){
                                                        value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                        return value
                                                    }
                                                    else if(isNaN(parseInt(value.slice(6, 8))) && !item.addSecond){
                                                        value = moment(value,'HH:mm').format("HH:mm")
                                                        return value
                                                    }
                                                    else{
                                                        value = ""
                                                        return value
                                                    }
                                                }else{
                                                    value = ""
                                                    return value
                                                }
                                            }
                                            else{
                                                value = ""
                                                return value
                                            }
                                        }else{
                                            if(parseInt(value.slice(0, 2))<24){
                                                if(parseInt(value.slice(2, 4))<=59 && !isNaN(parseInt(value.slice(2, 4)))){
                                                    if(parseInt(value.slice(4, 6))<=59 && !isNaN(parseInt(value.slice(4, 6)))){
                                                        if(item.addSecond){
                                                            value = moment(value,'HH:mm:ss').format("HH:mm:ss")
                                                            return value
                                                        }else{
                                                            value = moment(value,'HH:mm').format("HH:mm")
                                                            return value
                                                        }
                                                    }
                                                    else if(isNaN(parseInt(value.slice(4, 6))) && item.addSecond){
                                                        value = moment(value,'HH:mm').format("HH:mm")+':00'
                                                        return value
                                                    }
                                                    else if(isNaN(parseInt(value.slice(4, 6))) && !item.addSecond){
                                                        value = moment(value,'HH:mm').format("HH:mm")
                                                        return value
                                                    }
                                                    else{
                                                        value = ""
                                                        return value
                                                    }
                                                }else if(isNaN(parseInt(value.slice(2, 4)))){
                                                    value = moment(value,'HH:mm').format("HH:mm")
                                                    return value
                                                }else{
                                                    value = ""
                                                    return value
                                                }
                                            }
                                            else{
                                                value = ""
                                                return value
                                            }
                                        }
                                    },   
                                }
                            }else if(item.jenis=="timestamp"){
                                let returnEditor = "text"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        if(value!="" && value!=null){
                                            if(item.hideMinute){
                                                value = cekDate(value, "DD-MM-YYYY HH")
                                                return value
                                            }
                                            if(item.hideSecond){
                                                value = cekDate(value, "DD-MM-YYYY HH:mm")
                                                return value
                                            }
                                            value = cekDate(value, "DD-MM-YYYY HH:mm:ss")
                                            return value
                                        }else{
                                            return value
                                        }
                                    },
                                    editFormat: (value) => {
                                        if(value!="" && value!=null){
                                            if(item.hideMinute){
                                                value = cekDate(value, "DD-MM-YYYY HH")
                                                return value
                                            }
                                            if(item.hideSecond){
                                                value = cekDate(value, "DD-MM-YYYY HH:mm")
                                                return value
                                            }
                                            value = cekDate(value, "DD-MM-YYYY HH:mm:ss")
                                            return value
                                        }else{
                                            return value
                                        }
                                    },
                                    editParse: (value) => {
                                        if(value!="" && value!=null){
                                            if(item.hideMinute){
                                                value = cekDate(value, "DD-MM-YYYY HH")
                                                return value
                                            }
                                            if(item.hideSecond){
                                                value = cekDate(value, "DD-MM-YYYY HH:mm")
                                                return value
                                            }
                                            value = cekDate(value, "DD-MM-YYYY HH:mm:ss")
                                            return value
                                        }else{
                                            return value
                                        }
                                    }, 
                                }
                            }else if (item.jenis=="upperText"){
                                let returnEditor = "text"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        return value.toUpperCase()
                                    },
                                    editFormat: (value) => { return value },
                                    editParse: (value) => {
                                        return value.toUpperCase()
                                    },
                                }
                            }else if (item.jenis=="lowerText"){
                                let returnEditor = "text"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        return value.toLowerCase()
                                    },
                                    editFormat: (value) => { return value },
                                    editParse: (value) => {
                                        return value.toLowerCase()
                                    },
                                }
                            }else if (item.jenis=="combo"){
                                
                                let returnEditor = "combo"
                                if(!item.isPrimaryKey){
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                }

                                function getValueById(dicttemp,id) {
                                    for (var key in dicttemp) {
                                        if (dicttemp[key].id === id) {
                                            return dicttemp[key].value;
                                        }
                                    }
                                    // If id is not found, return null or any other appropriate value
                                    return "‎";
                                }
                                
                                column = Object.assign(column,{
                                    collection:item.options || [],
                                    editor:returnEditor,
                                    template: (r,s,val,obj,idval) => {
                                        return `<div class="content_cell_icon_datagrid">${getValueById(obj['collection']['data']['pull'],r[item.id])} <span class='test1 webix_icon wxi-angle-down'></span></div>`;
                                    },
                                    suggest:{
                                        on:{
                                            onValueSuggest:function(objValue){
                                                onClickComboDt(dtTable,objValue)
                                            }
                                        }
                                    }
                                })

                                delete column['template']
                            }else if (item.jenis=="display"){
                                format = {
                                    format: (value) => { return value },
                                    editFormat: (value) => { return value },
                                }
                            }else if (item.jenis=="textarea"){
                                let returnEditor = "popup"
                                // if(item.disabled){
                                //     // returnEditor =  undefined
                                // }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => { return value },
                                    editFormat: (value) => { return value },
                                }

                                if(item.upperValue){
                                    format = {
                                        editor: returnEditor,
                                        format: (value) => {
                                            return value.toUpperCase()
                                        },
                                        editFormat: (value) => { return value },
                                        editParse: (value) => {
                                            return value.toUpperCase()
                                        },
                                    }
                                }
        
                                if(item.lowerValue){
                                    format = {
                                        editor: returnEditor,
                                        format: (value) => {
                                            return value.toLowerCase()
                                        },
                                        editFormat: (value) => { return value },
                                        editParse: (value) => {
                                            return value.toLowerCase()
                                        },
                                    }
                                }
                                let editablepopup
                                if(item.disabled){
                                    editablepopup = false
                                }else{
                                    editablepopup = true
                                }
                                webix.editors.$popup = {
                                    text:{
                                        view:"popup",
                                        id:item.id+"popup",
                                        body:{
                                            view:"textarea",
                                            width:250,
                                            height:100,
                                            attributes:{maxlength:item.attributes.maxlength}
                                        },
                                        on:{
                                            onBeforeShow:function(){
                                                popUpTextAreaDt = true
                                                if($$(winActiveBlock.focusNow).getColumnConfig(winActiveCell.pos.column).disabledItem){
                                                    this.disable()
                                                }else{
                                                    this.enable()
                                                }
                                            }
                                        }
                                    }
                                };
                            }else if (item.jenis=="currency"){
                                // console.log(2247, column)
                                let textAlignRightCss = webix.html.createCss({"text-align":"right"});
                                if(column['isPrimaryKey']){
                                    textAlignRightCss = webix.html.createCss({"text-align":"right", "background-color": "lightgreen"});
                                }
                                column['css'] = textAlignRightCss
                                let returnEditor = item.view
                                if(item.disabled){
                                    returnEditor =  undefined
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        if(value!==null && value!=""){
                                            return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);
                                        }else{
                                            return value
                                        }                                    
                                    },
                                    editFormat: (value) => {
                                        return value
                                    },
                                }
                                delete column['template']
                            }else if (item.jenis=="number"){
                                // console.log(2266, column)
                                let textAlignRightCss = webix.html.createCss({"text-align":"right"});
                                if(column['isPrimaryKey']){
                                    textAlignRightCss = webix.html.createCss({"text-align":"right", "background-color": "lightgreen"});
                                }
                                column['css'] = textAlignRightCss
                                let returnEditor = item.view
                                if(item.disabled){
                                    returnEditor =  undefined
                                    if(item.isPrimaryKey){
                                        returnEditor = "text"
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        if(value!==null && value!=""){
                                            return parseInt(value)
                                        }else{
                                            return value
                                        }                                    
                                    },
                                    editFormat: (value) => {
                                        if(value!==null && value!=""){
                                            return parseInt(value)
                                        }else{
                                            return value
                                        }  
                                    },
                                }
                            }else if (item.jenis=="telephone"){                                
                                let returnEditor = item.view                                
                                if(item.disabled){                                    
                                    returnEditor =  undefined                                    
                                    if(item.isPrimaryKey){                                        
                                        returnEditor = "text"                                    
                                    }                                
                                }                                
                                    
                                format = {                                    
                                    editor: returnEditor,                                    
                                    format: (value) => {                                        
                                        return value                                                                 
                                    },                                    
                                    editFormat: (value) => {                                        
                                    return value                                    
                                    },                                
                                }                            
                            }else if(item.jenis=="float"){
                                // console.log(2292, column)
                                let textAlignRightCss = webix.html.createCss({"text-align":"right"});
                                if(column['isPrimaryKey']){
                                    textAlignRightCss = webix.html.createCss({"text-align":"right", "background-color": "lightgreen"});
                                }
                                column['css'] = textAlignRightCss
                                let returnEditor = item.view
                                if(item.disabled){
                                    returnEditor =  undefined
                                    if(item.isPrimaryKey){
                                        returnEditor = "text"
                                    }
                                }
                                format = {
                                    editor: returnEditor,
                                    format: (value) => {
                                        console.log(2846,value)
                                        if(value != "" && value != null){
                                            if(!(value.toString().includes('.'))){
                                                let newValue = value.toString() + '.0'
                                                console.log(2850,newValue)
                                                return newValue
                                            }else{
                                                return value
                                            }
                                        }else{
                                            return value
                                        }
                                        
                                    },
                                    editFormat: (value) => {
                                        console.log(2841,value)
                                        if(value != "" && value != null){
                                            if(!(value.toString().includes('.'))){
                                                let newValue = value.toString() + '.0'
                                                console.log(2864,value)
                                                return newValue
                                            }else{
                                                return value
                                            }
                                        }else{
                                            return value
                                        }
                                    },
                                }
                                delete column['template']
                            }else{
                                if(item.isPrimaryKey){
                                        let returnEditor = "text"
                                        format = {
                                            editor: returnEditor,
                                            format: (value) => { return value },
                                            editFormat: (value) => { return value },
                                        }
                                        if(item.upperValue){
                                            format = {
                                                editor: returnEditor,
                                                format: (value) => {
                                                    return value.toUpperCase()
                                                },
                                                editFormat: (value) => { return value },
                                                editParse: (value) => {
                                                    return value.toUpperCase()
                                                },
                                            }
                                        }
                
                                        if(item.lowerValue){
                                            format = {
                                                editor: returnEditor,
                                                format: (value) => {
                                                    return value.toLowerCase()
                                                },
                                                editFormat: (value) => { return value },
                                                editParse: (value) => {
                                                    return value.toLowerCase()
                                                },
                                            }
                                        }
                                }else{
                                    let returnEditor = item.view
                                    if(item.disabled){
                                        returnEditor =  undefined
                                    }
                                    format = {
                                        editor: returnEditor,
                                        format: (value) => { return value },
                                        editFormat: (value) => { return value },
                                    }
                                    if(item.upperValue){
                                        format = {
                                            editor: item.view,
                                            format: (value) => {
                                                return value.toUpperCase()
                                            },
                                            editFormat: (value) => { return value },
                                            editParse: (value) => {
                                                return value.toUpperCase()
                                            },
                                        }
                                    }
            
                                    if(item.lowerValue){
                                        format = {
                                            editor: item.view,
                                            format: (value) => {
                                                return value.toLowerCase()
                                            },
                                            editFormat: (value) => { return value },
                                            editParse: (value) => {
                                                return value.toLowerCase()
                                            },
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(index===array.length-1){
                        column.minWidth = 300,
                        column.fillspace=true
                    }
                }
                dtTable.columns.push(Object.assign(column,format))
            }
            
        })
        // console.log(2073, additionalFooter)
        if(additionalFooter.length==0){
            dtTable.footer = false
        }
        // dtTable.columns.push({ id: "detail", header:{ text:"Detail", css:"datatablAlignCenter",}, fillspace:false, width:150, template:"<input class='detail' type='button' value=' Detail '>", css:"datatablAlignCenter", editor:"btn"})
    }
}

let datatable = new DatatableCustom()