// Update : 2024-01-30
// CDN Library - restApi.js -  Oden Async
// Update : - Win xp compatible
window.winDataCompare = {}
window.winDataDtSelect = {}
window.winApiCombos = []
window.winIsWithoutAPI = false
var afterInsertHead = false;
history.pushState({}, document.title, location.search);

let liveApiRequest = function() {
    /* Fungsi untuk check apakah ada API yang masih berlangsung
    Jika iya, maka prevent default untuk button transaksi yang tidak refresh halaman di element.js
    */
    var oldOpen = XMLHttpRequest.prototype.open;
    window.openHTTPs = 0;
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
      window.openHTTPs++;
      this.addEventListener("readystatechange", function() {
          if(this.readyState == 4) {
            window.openHTTPs--;
          }
        }, false);
      oldOpen.call(this, method, url, async, user, pass);
    }
}

liveApiRequest()

function loadingShow(){
    $$(menuId).disable()//enable
    $$(menuId).showProgress();//loading
}

function preventDownload(iframe) {
    iframe.contentWindow.document.oncontextmenu = function() { return false; };
    iframe.contentWindow.document.body.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.download !== undefined) {
            e.preventDefault();
        }
    });
}

// async function showLoading(){
//     await loadingShow()
// }

class RestApi{
    restApi(param){
        //api ini tidak digunakan
        let dataParam = {}
        dataParam.type = "API"
        dataParam.menuId = menuId
        dataParam.data = {}
        dataParam.apiName = param.API_NAME
        webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
            let jsonData = respond.json()
            let getData = jsonData.data;
            let getStatus = jsonData.status;
            if(getStatus == true && getData.length!=0){
                $$(param.ITEM_ID).clearAll();
                $$(param.ITEM_ID).parse(getData);
                $$(param.ITEM_ID).refresh();
            }
        })
    }
    
    restApiModalForm(param){
        let dataParam = {}
        dataParam.type = "API"
        dataParam.menuId = menuId
        dataParam.data = {}
        if(param.PARAM_ID!=undefined){
            param.PARAM_ID.forEach(function(keys){
                dataParam.data[keys] = getItemValue(keys)
                if (getItemValue(keys)==""){
                    dataParam.data[keys] = "%%"
                }        
            });

        }
        dataParam.apiName = param.API_NAME
        webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
            let jsonData = respond.json()
            let getData = jsonData.data;
            let getStatus = jsonData.status;
            if(getStatus == true && getData.length!=0){
                $$(param.ITEM_ID).clear();
                $$(param.ITEM_ID).parse(getData);
                $$(param.ITEM_ID).refresh();
            }else{
                webix.alert("Tidak ada Data","alert-error");
            }
        })
    }

    restApiParam(param){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        let blockName = param['BLOCK_NAME']
        let blockType = ""
        let dataParam = {}
        let requestValue = {}
        let bindParam = param.data || {}
        let offsetNumber = param['OFFSET_NUMBER'] || 0
        dataParam.type = "SELECT"
        dataParam.menuId = menuId
        param['PARAM_ID'].forEach(function(itemId){
            bindParam[itemId] = getItemValue(itemId)
            if (window.winDateType.includes(itemId)){
                if(bindParam[itemId]!=null && bindParam[itemId]!=''){
                    let value = bindParam[itemId].split(" ")[0]
                    let dateDDMMYY = value.split("-").reverse().join("-")
                    bindParam[itemId]=dateDDMMYY
                }
            }
            if (window.winDateTypeMMYY.includes(itemId)){
                if(bindParam[itemId]!=null && bindParam[itemId]!=''){
                    let value = bindParam[itemId].split(" ")[0]
                    let dateMMYY = value.split("-").reverse().join("-")
                    bindParam[itemId]=dateMMYY+'-01'
                }
            }
            if (window.winDateTypeYY.includes(itemId)){
                if(bindParam[itemId]!=null && bindParam[itemId]!=''){
                    let value = bindParam[itemId].split(" ")[0]
                    let dateYY = value.split("-").reverse().join("-")
                    bindParam[itemId]=dateYY+'-01-01'
                }
            }
        });
        requestValue.data = bindParam
        if("DATA" in param){
            Object.keys(param['DATA']).forEach(function(idParam){
                requestValue.data[idParam] = param['DATA'][idParam]
            })
        }
        if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="FORM"){
            if(offsetNumber==undefined){
                offsetNumber = 0
            }
            requestValue.blockName = blockName
            requestValue.blockType = "form";
            requestValue.data['offsetNumber'] = offsetNumber;
            blockType = "form";
        }else if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="DATAGRID"){
            requestValue.blockName = blockName
            requestValue.blockType = "datagrid";
            blockType = "datagrid";
            requestValue.data['offsetNumber'] = offsetNumber;
        }
        dataParam.data = requestValue
        winStartEditAfterLoadData = false

        //Check is there is subchild
        let subChildId = []
        if(winThereIsSubChild){
            Object.keys(winConfigForm).forEach(function(blockId){
                if(winConfigForm[blockId]["BLOCK_TYPE"][2] == blockName){
                    subChildId.push(blockId)
                }
            })
        }

        subChildId.forEach(function(idChild){
            webix.extend($$(idChild), webix.ProgressBar)
            $$(idChild).showProgress()
        })
        webix.extend($$(blockName), webix.ProgressBar)
        $$(blockName).showProgress()
        // if(winConfigForm[blockName]["BLOCK_TYPE"][0] == "DATAGRID"){
        //     $$(blockName).hideColumn("action_"+blockName)
        // }
        
        
        let promise = new Promise((resolve)=>{
            webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                let jsonData = respond.json()
                let getData = jsonData.data;
                let getStatus = jsonData.status;
                winValidatePromise = {}
                if(getStatus == true && getData.length!=0){
                    getData.forEach(function(record){
                        let keysRecord = Object.keys(record)
                        keysRecord.forEach(function(key){
                            if (window.winDateType.includes(key)){
                                if(record[key]!=null && record[key]!=''){
                                    let value = record[key].split(" ")[0]
                                    let dateDDMMYY = value.split("-").reverse().join("-")
                                    record[key]=dateDDMMYY
                                }
                            }
                            if (window.winDateTypeMMYY.includes(key)){
                                if(record[key]!=null && record[key]!=''){
                                    let value = record[key].split(" ")[0]
                                    let dateMMYY = value.split("-").reverse().join("-")
                                    record[key]=dateMMYY.slice(3,10)
                                }
                            }
                            if (window.winDateTypeYY.includes(key)){
                                if(record[key]!=null && record[key]!=''){
                                    let value = record[key].split(" ")[0]
                                    let dateYY = value.split("-").reverse().join("-")
                                    record[key]=dateYY.slice(6,10)
                                }
                            }
                            if (window.winClockType.includes(key)){
                                if(record[key]!=null && record[key]!=''){
                                    let time = record[key].split(" ")[1]
                                    let addSecond
                                    if(blockType == 'datagrid'){
                                        addSecond = $$(blockName).getColumnConfig(key).addSecond
                                    }else{
                                        addSecond = $$(key).config.addSecond
                                    }
                                    if(!addSecond){
                                        record[key] = time.slice(0,5)
                                    }else{
                                        record[key] = time
                                    }
                                }
                            }
                            if (window.winTimestampType.includes(key)){
                                if(record[key]!=null && record[key]!=''){
                                    let date = record[key].split(" ")[0].split("-").reverse().join("-")
                                    let time = record[key].split(" ")[1]
                                    record[key] = date + ' ' +time
                                }
                            }
                        })
                    })
                    if(!winAddData){
                        window.winSearchRecord = false
                        $$("searchValue").config.value="Search Mode"
                        $$("searchValue").refresh()
                        $$("searchValue").$view.classList.remove("webix_custom_button")
                        $$("searchValue").refresh()
                        $$("addValue").$view.classList.remove("webix_custom_button")
                        $$("addValue").refresh()
                        $$("prev").define("disabled",false)
                        $$("next").define("disabled",false)
                        // window.winAddData=false;
                        winFlagInsertBlock = ""
                        winFlagInsertChild = []
                        $$("addValue").define('disabled',false)
                        $$("updateValue").define('disabled',false)
                        $$("deleteValue").define('disabled',false)
                        window.winSearchMode = false
                    }
                    window.winCheckRadio.forEach(function(item){
                        if(!winDisplayItem.includes(item)){
                            if($$(item)!=undefined){
                                $$(item).enable()
                            }
                        }
                    })
                    if (blockType=="form"){
                        winConfigForm[blockName]['ELEMENT'].forEach(function(id){
                            if(!winDisplayItem.includes(id)){
                                if($$(id)!=undefined){
                                    $$(id).enable()
                                }
                            }
                        })
                        if(!winAddData){
                            winConfigForm[blockName]["ELEMENT"].forEach(function(id){
                                if($$(id) != undefined){
                                    $$(id).define("readonly",false)
                                    $$(id).refresh()
                                }
                            })
                        }
                        
                        window.winDataCompare[blockName] = {"data":{}}
                        
                        Object.keys(getData[0]).forEach(function(key){
                            if (window.winCurrency.includes(key)){
                                let currency = getData[0][key]
                                getData[0][key] = Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(currency)
                            }
                            if(getData[0][key]==null){
                                getData[0][key] = ''
                            }
                            if(getData[0][key]==undefined){
                                window.winDataCompare[blockName]["data"][key] = ""
                            }else{
                                window.winDataCompare[blockName]["data"][key] = getData[0][key]
                            }
                            if(winCheckRadio.includes(key)){
                                if(getData[0][key]=='' || getData[0][key]=='null'){
                                    $$(key).config.nullValue = true
                                }else{
                                    $$(key).config.nullValue = false
                                }
                            }
                        })
                        $$(blockName).parse(getData[0])
                        window.winDataMaster = $$(blockName).getValues()
                        winUploaderFile.forEach(function(idUploader){
                            console.log(299)
                            if($$(idUploader)!=undefined){
                                if(winConfigForm[blockName]['ELEMENT'].includes($$(idUploader).config.colsFile.newFileName)){
                                    let dataFile = []
                                    let fileNameDb = getItemValue($$(idUploader).config.colsFile.newFileName)
                                    let oldFileNameDb = getItemValue($$(idUploader).config.colsFile.oldFileName)
                                    if(fileNameDb!=""){
                                        let fileNameSplited = fileNameDb.split("|")
                                        let oldFileNameSplited = oldFileNameDb.split("|")
                                        oldFileNameSplited.forEach(function(nameFile){
                                            let idxName = oldFileNameSplited.indexOf(nameFile)
                                            dataFile.push({ name:nameFile, sizetext:"",status:"server", sequenceName:fileNameSplited[idxName]})
                                        })
                                    }
                                    $$(idUploader).files.parse(dataFile)
                                }
                            }
                        })
                        afterInsertHead = false
                        winConfigForm[blockName]["PRIMARY_KEY"].forEach(function (item) {
                            $$(item).define("readonly",true)
                            $$(item).refresh()
                        });
                        winIsPrimary.forEach(function (item) {
                            if($$(getBlockItem(item)).config.view=="form"){
                                $$(item).define("readonly",true)
                                $$(item).refresh()
                            }
                        });
                        
                    $$(blockName).hideProgress()
                    }else if(blockType=="datagrid"){
                        if(param.LOAD_MORE_DATA!=undefined){
                            if(param.LOAD_MORE_DATA){
                                if (winThereIsSubChild) {
                                    Object.keys(winConfigForm).forEach(function (blockId) {
                                        if (winConfigForm[blockId]['BLOCK_TYPE'][1] != "PARENT") {
                                            if (winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                                // $$(blockId).hideOverlay();
                                                $$(blockId).parse(getData)
                                                $$(blockId).refresh();
                                                // winDataDtSelect[blockId] = webix.copy(getData)
                                                // winDataDtSelect[blockId].push.apply(winDataDtSelect[blockId], webix.copy(getData))
                                                // winCountOffsetRecord[blockId] = winDataDtSelect[blockId].length
                                                
                                                winDataDtSelect[blockId].push.apply(winDataDtSelect[blockId],webix.copy(getData))
                                                winCountOffsetRecord[blockId] = winDataDtSelect[blockId].length
                                                $$(blockId).enable()
                                                // winDataChanged[blockId] = []
                                            }else
                                            {
                                                // $$(blockId).hideOverlay();
                                                $$(blockId).parse(getData)
                                                $$(blockId).refresh();
                                                winDataDtSelect[blockId].push.apply(winDataDtSelect[blockId],webix.copy(getData))
                                                winCountOffsetRecord[blockId] = winDataDtSelect[blockId].length
                                                $$(blockId).enable()
                                                // winDataChanged[blockId] = []
                                            }
                                        }
                                    })
        
        
                                }
                                else {
                                    $$(blockName).hideOverlay();
                                    $$(blockName).parse(getData);
                                    $$(blockName).refresh();
                                    winDataDtSelect[blockName].push.apply(winDataDtSelect[blockName],webix.copy(getData))
                                    winCountOffsetRecord[blockName] = winDataDtSelect[blockName].length
                                    $$(blockName).enable()
                                    // winDataChanged[blockName] = []
                                }
                            }
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
                                if (haveSubChild.includes(blockName)) {
                                    let partitionData = {}
                                    Object.keys(winConfigForm).forEach(function(blockId){
                                        let parentChild
                                        if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                            parentChild = winConfigForm[blockId]['BLOCK_TYPE'][2]
                                            partitionData[blockId] = []
                                            getData.forEach(function(record){
                                                let newRecordPartition = {}
                                                Object.keys(record).forEach(function(keyRecord){
                                                    if(winConfigForm[blockId]['ELEMENT'].includes(keyRecord)){
                                                        newRecordPartition[keyRecord] = record[keyRecord]
                                                    }
                                                    winConfigForm[winConfigForm[blockId]['BLOCK_TYPE'][2]]['PRIMARY_KEY'].forEach(function(idPkRecord){
                                                        newRecordPartition[idPkRecord] = record[idPkRecord]
                                                    })
        
                                                })
                                                partitionData[blockId].push(newRecordPartition)
                                            })
                                        }
                                      

                                        if(parentChild!=undefined){
                                          
                                            if(partitionData[parentChild]==undefined){
                                                partitionData[parentChild] = []
                                                getData.forEach(function(record){
                                                    let newRecordPartition = {}
                                                    Object.keys(record).forEach(function(keyRecord){
                                                        if(winConfigForm[parentChild]['ELEMENT'].includes(keyRecord)){
                                                            newRecordPartition[keyRecord] = record[keyRecord]
                                                        }
                                                        winConfigForm[parentChild]['PRIMARY_KEY'].forEach(function(idPkRecord){
                                                            newRecordPartition[idPkRecord] = record[idPkRecord]
                                                        })
                                                    })
                                                    partitionData[parentChild].push(newRecordPartition)
                                                })
                                            }
                                        }
                                    })
                                    if (winDataDtSelect.hasOwnProperty(blockName)) {
                                        winDataDtSelect = webix.copy(partitionData)
                                    }else{
                                        Object.assign(winDataDtSelect, partitionData);
                                    }
                                    
                                    Object.keys(winDataDtSelect).forEach(function(blockId){
                                        window.winPagerDatatable[blockId][0] = 0   
                                        $$(blockId).unselectAll();
                                        $$(blockId).clearAll();
                                        $$(blockId).hideOverlay();
                                        $$(blockId).parse(webix.copy(winDataDtSelect[blockId]));
                                        $$(blockId).refresh();
                                        $$(blockId).enable()
                                        winDataChanged[blockId] = []
                                        winDataDtSelect[blockId] = webix.copy($$(blockId).serialize())
                                    })
                                }else{
                                    $$(blockName).clearAll();
                                    $$(blockName).hideOverlay();
                                    $$(blockName).parse(getData);
                                    winDataDtSelect[blockName] = webix.copy(getData)
                                    $$(blockName).refresh();
                                    $$(blockName).enable()
                                    winDataChanged[blockName] = []
                                    window.winPagerDatatable[blockName][0] = 0   
                                }   
                            }else{ 
                            $$(blockName).clearAll();
                            $$(blockName).hideOverlay();
                            $$(blockName).parse(getData);
                            winDataDtSelect[blockName] = webix.copy(getData)
                            $$(blockName).refresh();
                            $$(blockName).enable()
                            winDataChanged[blockName] = []
                            }
                            window.winPagerDatatable[blockName][0] = 0   
                        }
                        Object.keys(winConfigForm).forEach(function(blockId){
                            $$(blockId).enable()
                        })
                        let idGenWebixDt = []
                        $$(blockName).data.order.forEach(function(index){
                            idGenWebixDt.push(index)
                        })
                        
                        window.winIdOldRecordDt[blockName] = idGenWebixDt
                        window.winPagerDatatable[blockName][1] = $$("pager_"+blockName).data.old_limit-1
                        window.winTotalRecordDt[blockName] = $$(blockName).count()
                        $$("count_"+blockName).define("count",window.winTotalRecordDt[blockName])
                        $$("count_"+blockName).define("page",window.winTotalRecordDt[blockName]-1)
                        $$("count_"+blockName).refresh()
                    }
                    $$(window.winListIdBtn[4]).define("disabled",false);
                    searchCount=0
    
                    $$(menuId).enable()//enable
                    if(subChildId.length!=0){
                        subChildId.forEach(function(idChild){
                            $$(idChild).hideProgress()
                        })
                    }
                    $$(blockName).hideProgress();//loading
                }else if(getStatus == true && getData.length==0){
                    if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="FORM"){
                        window.winDataCompare[blockName] = {"data":{}}
                        if(winSearchMode){
                            webix.alert(ALERT.ALERTWARNING("Data Tidak Ditemukan | "+blockName)).then(function(){
                                $$(blockName).clear();
                                $$(blockName).hideProgress()
                                $$(menuId).enable()//enable
                                $$(blockName).enable()
                                $$("next").define('disabled',true)
                                $$(winConfigForm[winActiveBlock.focusNow]["ELEMENT"][0]).focus()
                            })
                        }else{
                            if(winCountOffsetRecord[blockName]==0){
                                $$(blockName).clear();
                                $$(menuId).enable()//enable
                                $$(blockName).enable()
                                if(!winAddData){
                                    winConfigForm[blockName]["ELEMENT"].forEach(function(id){
                                        if($$(id) != undefined){
                                            $$(id).define("readonly",true)
                                            $$(id).refresh()
                                        }
                                    })
                                }
                                let blockNameMessage = blockName
                                if(winMultiviewBlocks.includes(blockName)){
                                    $$("tabbar"+menuId).config.options.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.value
                                            return false
                                        }
                                        return true
                                    })
                                }else if(winMultiviewBlocksVertical.includes(blockName)){
                                    $$("listMultiviewVertical"+menuId).config.data.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.title
                                            return false
                                        }
                                        return true
                                    })
                                }else{
                                    blockNameMessage = winFormTitle
                                }
                                webix.message({
                                    text:"Tidak Ada Data<br>"+blockNameMessage+" (form)",
                                    type:"debug", 
                                    expire: 10000,
                                });
                                $$(blockName).hideProgress()
                            }else if(winCountOffsetRecord[blockName]!=0){
                                let blockNameMessage = winFormTitle
                                webix.message({
                                    text:"Tidak Ada Data<br>"+blockNameMessage+" (form)",
                                    type:"debug", 
                                    expire: 10000,
                                });
                                $$(blockName).clear();
                                $$(menuId).enable()//enable
                                $$(blockName).enable()
                                if(subChildId.length!=0){
                                    subChildId.forEach(function(idChild){
                                        $$(idChild).hideProgress()
                                    })
                                }
                                $$(blockName).hideProgress()
                            }
                        }
                    }else if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="DATAGRID"){
                        if(param.LOAD_MORE_DATA==undefined){
                            $$(blockName).clearAll();
                        }
                        if($$(blockName).config.customOperator!=undefined){
                            let additionalCustomOperator = webix.copy($$(blockName).config.customOperator)
                            if(winDataDtSelect[blockName].length!=0){
                                additionalCustomOperator["RESET_DATA"] = false
                            }else{
                                additionalCustomOperator["RESET_DATA"] = true
                            }
                            updateOperatorCustomDt(additionalCustomOperator);
                        }
                        if(winCountOffsetRecord[blockName]==0){
                            if(winMultiviewBlocks.includes(blockName)){
                                let labelItem
                                $$('tabbar'+menuId).config.options.every(function(objOption){
                                    if(objOption['id']==blockName){
                                        labelItem = "Tabbar "+objOption['value']
                                        return false
                                    }
                                    return true
                                })
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
                                    if (haveSubChild.includes(blockName)) {
                                        Object.keys(winConfigForm).forEach(function(blockId){
                                            if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                                $$(blockId).clearAll();
                                                $$(menuId).enable()//enable
                                                $$(blockId).enable()
                                                $$(blockId).showOverlay("Sorry, there is no data");
                                                $$(blockId).hideProgress()
                                            }
                                            $$(blockName).clearAll();
                                            $$(blockName).enable()
                                            $$(blockName).showOverlay("Sorry, there is no data");
                                            $$(blockName).hideProgress()
                                        })
                                    }else{
                                        winDataDtSelect[blockName] = []
                                        $$(blockName).clearAll();
                                        $$(menuId).enable()//enable
                                        $$(blockName).enable()
                                        $$(blockName).showOverlay("Sorry, there is no data");
                                        $$(blockName).hideProgress()
                                    }
                                }else{
                                    $$(blockName).clearAll();
                                    $$(menuId).enable()//enable
                                    $$(blockName).enable()
                                    $$(blockName).showOverlay("Sorry, there is no data");
                                    $$(blockName).hideProgress()
                                }
                                let blockNameMessage = blockName
                                if(winMultiviewBlocks.includes(blockName)){
                                    $$("tabbar"+menuId).config.options.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.value
                                            return false
                                        }
                                        return true
                                    })
                                }else if(winMultiviewBlocksVertical.includes(blockName)){
                                    $$("listMultiviewVertical"+menuId).config.data.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.title
                                            return false
                                        }
                                        return true
                                    })
                                }else{
                                    blockNameMessage = winFormTitle
                                }
                                webix.message({
                                    text:"Tidak Ada Data<br>"+blockNameMessage+" (datagrid)",
                                    type:"debug", 
                                    expire: 5000,
                                }); 
                            }else{
                                $$(blockName).clearAll();
                                if(winConfigForm[blockName]['DATA_PER_PAGE'] != undefined){
                                    $$(blockName).define("height", (winConfigForm[blockName]['DATA_PER_PAGE']*36)+43)
                                }else{
                                    $$(blockName).define("height", (10*36)+43)
                                }
                                $$(blockName).resize()
                                $$(menuId).enable()//enable
                                $$(blockName).enable()
                                $$(blockName).showOverlay("Sorry, there is no data");
                                if(subChildId.length!=0){
                                    subChildId.forEach(function(idChild){
                                        $$(idChild).hideProgress()
                                    })
                                }
                                $$(blockName).hideProgress();//loading
                                let blockNameMessage = blockName
                                if(winMultiviewBlocks.includes(blockName)){
                                    $$("tabbar"+menuId).config.options.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.value
                                            return false
                                        }
                                        return true
                                    })
                                }else if(winMultiviewBlocksVertical.includes(blockName)){
                                    $$("listMultiviewVertical"+menuId).config.data.every(function(optionRecord){
                                        if(optionRecord.id==blockName){
                                            blockNameMessage = optionRecord.title
                                            return false
                                        }
                                        return true
                                    })
                                }else{
                                    blockNameMessage = winFormTitle
                                }
                                webix.message({
                                    text:"Tidak Ada Data<br>"+blockNameMessage+" (datagrid)",
                                    type:"debug", 
                                    expire: 10000,
                                }); 
                            }
                        }else if(winCountOffsetRecord[blockName]!=0){
                            winCountOffsetRecord[blockName] = winDataDtSelect[blockName].length
                            $$(blockName).config.dynamicLoadData = winDataDtSelect[blockName].length
                            webix.message({
                                text:"Data Tidak Ditemukan | "+blockName,
                                type:"debug", 
                                expire: 10000,
                            }); 
                            if(winDataDtSelect[blockName].length==0){
                                $$(blockName).clearAll();
                            }
                            if(winConfigForm[blockName]["LIMIT_DATA"] == 10){
                                if(!winThereIsSubChild){
                                        window.winPagerDatatable[winActiveBlock.focusNow][0]-=1
                                }else{
                                    
                                    if (Object.keys(winSubChild).includes(winActiveBlock.focusNow) || winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2] != undefined){
                                        if(winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][1] == "CHILD"){
                                            winSubChild[winActiveBlock.focusNow].forEach(function(blockSubChild){
                                                window.winPagerDatatable[blockSubChild][0]-=1
                                            })
                                            window.winPagerDatatable[winActiveBlock.focusNow][0]-=1
                                        }else if (winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][1] == "SUB_CHILD"){
                                            winSubChild[winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2]].forEach(function(blockSubChild){
                                                window.winPagerDatatable[blockSubChild][0]-=1
                                            })
                                            window.winPagerDatatable[winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2]][0]-=1
                                        }  
                                    }
                                    
                                }
                            }
                                $$(menuId).enable()//enable
                            $$(blockName).enable()
                            if(subChildId.length!=0){
                                subChildId.forEach(function(idChild){
                                    $$(idChild).hideProgress()
                                })
                            }
                            $$(blockName).hideProgress()
                        }
                    }
                }else{
                    
                    if(getData==undefined){
                        errorThisFunc = {'statusCode':500,'statusText':"Internal Server Error",'msg':jsonData.msg}
                        webix.alert(ALERT.ALERTERROR(blockName+"<br>Error Code : 500 - "+jsonData.msg))
                    }else{
                        errorThisFunc = {'statusCode':500,'statusText':"Internal Server Error",'msg':getData}
                        webix.alert(ALERT.ALERTERROR(blockName+"<br>Error Code : "+getData))
                    }
                    let textError
                    textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+errorThisFunc.statusCode+" - ("+errorThisFunc.statusText+")<br><br> Python - "+errorThisFunc.msg
                    console.log("JS - RestApiSelect - Error: "+errorThisFunc.statusCode+" - "+errorThisFunc.statusText+" - "+errorThisFunc.msg)
                    webix.message({
                        text:textError,
                        type:"error", 
                        expire: 10000,
                    });
                }
                
                winStartEditAfterLoadData = true    
                if(winConfigForm[blockName].EVENT_TRANSACTION != undefined){
                    if(winConfigForm[blockName].EVENT_TRANSACTION.postSelect != undefined){
                        return winConfigForm[blockName]["EVENT_TRANSACTION"].postSelect(jsonData)
                    }
                }
                resolve()
            })
        })
        return promise
    }
    
    restApiData(param){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
            let dataParam = {}
            dataParam.type = "API"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            if(param.PARAM_ID!=undefined){
                param.PARAM_ID.forEach(function(keys){
                    dataParam.data[keys] = getItemValue(keys)
                    if (getItemValue(keys)==""){
                        dataParam.data[keys] = "%%"
                    }        
                });

            }
            dataParam.apiName = param.API_NAME
            let idField = param.DISPLAY_ID
            let rowId = param.ROW_ID
            let promise = new Promise((resolve,reject)=>{
                webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                    let jsonData = respond.json()
                    let getData = jsonData.data;
                    let getStatus = jsonData.status;
                    
                    if(winConfigForm[param.BLOCK_ID]['BLOCK_TYPE'][0]=='FORM'){
                        if(getStatus == true && getData.length!=0){
                            if(window.winDatatable){
                                $$(window.winDatatable).clearAll();
                                $$(window.winDatatable).parse(getData);
                                $$(window.winDatatable).refresh();
                            }
                            
                            for (var x in getData[0]){
                                if (!getData[0][x]) continue;
                                if(getData[0][x]!="" && getData[0][x]!=null){
                                    if (window.winDateType.includes(idField[x])){
                                        getData[0][x] = getData[0][x].split(" ")[0]
                                        if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                            getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                        }else if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                            getData[0][x] = getData[0][x].split("-").join("-");
                                        }
                                    }
                                    if (window.winDateTypeMMYY.includes(idField[x])){
                                        getData[0][x] = getData[0][x].split(" ")[0]
                                        if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                            getData[0][x] = getData[0][x].split("-").reverse().join("-");
                                        }else if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                            getData[0][x] = getData[0][x].split("-").join("-")
                                        }
                                        getData[0][x]= getData[0][x].slice(3,10)
                                    }
                                    if (window.winDateTypeYY.includes(idField[x])){
                                        getData[0][x] = getData[0][x].split(" ")[0]
                                        if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                            getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                        }else if(getData[0][x].length==$$(idField[x]).config.attributes.maxlength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                            getData[0][x] = getData[0][x].split("-").join("-");
                                        }
                                        getData[0][x]= getData[0][x].slice(6,10)
                                    }
                                }
                                $$(idField[x]).setValue(getData[0][x]);
                            } 
                            
                            // return {"status":true,"tipe":"","pesan":""}
                            resolve({"status":true,"tipe":"","pesan":""})
                        }else if(getStatus == true && getData.length==0){
                            if(typeof idField=="string"){
                                $$(idField).setValue("")
                            }else if(typeof idField=="object"){
                                idField.forEach(function(id){
                                    $$(id).setValue("")
                                })
                            }
                            if(jsonData['msg']==undefined){
                                resolve({'status':false, 'tipe':'error', 'pesan':"Data tidak ditemukan"})
                            }else{
                                resolve({'status':false, 'tipe':'error', 'pesan':"", 'msg':jsonData['msg']})
                            }
                        }else{
                            if(jsonData['msg']==undefined){
                                resolve({"status":false,"tipe":"error","pesan":"error database"})
                            }else{
                                resolve({'status':false, 'tipe':'error', 'pesan':'', 'msg':jsonData['msg']})
                            }
                        }
                    }else if(winConfigForm[param.BLOCK_ID]['BLOCK_TYPE'][0]=='DATAGRID'){
                        if(getStatus == true && getData.length!=0){
                            if(winThereIsSubChild){
                                for (var x in getData[0]){
                                    if(getData[0][x]!="" && getData[0][x]!=null){
                                        if (window.winDateType.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-")
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                            }
                                        }
                                        if (window.winDateTypeMMYY.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-");
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                            }
                                            getData[0][x]= getData[0][x].slice(3,10)
                                        }
                                        if (window.winDateTypeYY.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-")
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-");
                                            }
                                            getData[0][x]= getData[0][x].slice(6,10)
                                        }
                                    }
                                }
                                setValueDt(idField,getData[0])
                            }else{
                                let record = $$(window.winActiveBlock['focusNow']).getItem(rowId.pos.row);
                                for (var x in getData[0]){
                                    let configColumn = $$(window.winActiveBlock['focusNow']).getColumnConfig(idField[x])
                                    if(getData[0][x]!="" && getData[0][x]!=null){
                                        if (window.winDateType.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-")
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                            }
                                        }
                                        if (window.winDateTypeMMYY.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-");
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-")
                                            }
                                            getData[0][x]= getData[0][x].slice(3,10)
                                        }
                                        if (window.winDateTypeYY.includes(idField[x])){
                                            getData[0][x] = getData[0][x].split(" ")[0]
                                            if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==4){
                                                getData[0][x] = getData[0][x].split("-").join("-")
                                            }else if(getData[0][x].length==configColumn.maxLength && getData[0][x].split("-").length<=3 && getData[0][x].split("-")[0].length==2){
                                                getData[0][x] = getData[0][x].split("-").reverse().join("-");
                                            }
                                            getData[0][x]= getData[0][x].slice(6,10)
                                        }
                                    }
                                    if(record[idField[x]]==undefined){
                                        record[idField[x]] = getData[0][x];
                                    }else{
                                        record[idField[x]] = getData[0][x];
                                    }
                                    $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row);
                                }
                                $$(menuId).enable()//enable
                            }
                            resolve({"status":true})
                        }else if(getStatus == true && getData.length==0){
                            let record = $$(window.winActiveBlock['focusNow']).getItem(window.winValidateItemPos.pos.row);
                            if(typeof idField=="string"){
                                record[idField] = ''
                                $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row);
                            }else if(typeof idField=="object"){
                                idField.forEach(function(id){
                                    record[id] = ''
                                })
                                $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row); 
                            }
                            
                            $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row);
                            if(jsonData['msg']==undefined){
                                resolve({"status":false,"tipe":"error","pesan":"Data tidak ditemukan"})
                            }else{
                                resolve({'status':false, 'tipe':'error', 'pesan':'','msg':jsonData['msg']})
                            }
                        }else{
                            let record = $$(window.winActiveBlock['focusNow']).getItem(window.winValidateItemPos.pos.row);
                            if(typeof idField=="string"){
                                record[idField] = ''
                                $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row);
                            }else if(typeof idField=="object"){
                                idField.forEach(function(id){
                                    record[id] = ''
                                })
                                $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row); 
                            }
                            $$(window.winActiveBlock['focusNow']).refresh(window.winValidateItemPos.pos.row);
                            if(jsonData['msg']==undefined){
                                resolve({"status":false,"tipe":"error","pesan":"error database"})
                            }else{
                                resolve({'status':false, 'tipe':'error', 'pesan':'','msg':jsonData['msg']})
                            }
                        }
                    }
                })
            })
            return promise
    }


    restApiSelect(param){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        try{
            loadingShow()
            let blocksName = Object.keys(winConfigForm)
            let blockName = ''
            blocksName.forEach(function(name){
                if(winConfigForm[name]["BLOCK_TYPE"][1]=="PARENT"){
                    blockName = name
                }
            })
            if(param==undefined){
                param = {'data':{},'offsetNumber':0}
            }
            let blockType = "";
            let dataParam = {}
            let requestValue = {}
            let offsetNumber = 0
            dataParam.type = "SELECT"
            dataParam.menuId = menuId
            requestValue.data = param.data
            if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="FORM"){
                if(param.offsetNumber!=undefined){
                    offsetNumber = param.offsetNumber
                }
                requestValue.blockName = blockName
                requestValue.blockType = "form";
                requestValue.data['offsetNumber'] = offsetNumber;
                blockType = "form";
                
            }else if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="DATAGRID"){
                requestValue.blockName = blockName
                requestValue.blockType = "datagrid";
                blockType = "datagrid";
                if(param.offsetNumber!=undefined){
                    offsetNumber = param.offsetNumber
                    requestValue.data['offsetNumber'] = offsetNumber;
                }else{
                    requestValue.data['offsetNumber'] = offsetNumber
                }
                $$(blockName).hideColumn("action_"+blockName)
            }
            dataParam.data = requestValue
            window.winDataMaster = ''
            winStartEditAfterLoadData = false
            
            let promiseApiCombo = []
            winApiCombos.forEach(function (api) {
                promiseApiCombo.push(api())
            })
            winApiCombos = []
            
            let promiseAll = Promise.all(promiseApiCombo)
            promiseAll.then(()=>{
                let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam);
                restLoadApi.then(function(respond){
                    winApiCombos.forEach(function (api) {
                        api()
                    })
                    winValidatePromise = {}
                    winApiCombos = []
                    winValidateItemPos = {}
                    winJenisAddValue = ""
                    let blocks = Object.keys(winConfigForm)
                    let getData = respond.json().data;
                    let getStatus = respond.json().status;
                    if(getStatus == true){
                        window.winResetData = false;
                        if(getData.length==0){
                            $$(menuId).hideProgress();//loading
                            $$(menuId).enable()//enable
                            window.winButtonCallForm.forEach(function(item){
                                if($$(item)!=undefined){
                                    $$(item).define('disabled',true)
                                }
                            })
                            if(blockType=="form"){
                                if(!window.winSearchMode){
                                    winConfigForm[blockName]['ELEMENT'].forEach(function(id){
                                        $$(id).disable()
                                    })
                                }
                                webix.message({
                                    text:"Tidak Ada Data<br>"+winFormTitle+" (form)",
                                    type:"debug", 
                                    expire: 10000,
                                }); 
                                winDisabledButton.forEach(function(idBtn){
                                    $$(idBtn).define('disabled',true)
                                })
                                $$("next").define('disabled',true)
                                $$(winConfigForm[blocks[0]]["ELEMENT"][0]).focus()
                                window.winActiveBlock.focusNow = Object.keys(winConfigForm)[0]
                                Object.keys(winConfigForm).forEach(function(id){
                                    if($$(id).config.view=="form"){
                                        $$(id).clear()
                                    }else if ($$(id).config.view=="datatable"){
                                        $$(id).clearAll();
                                        $$(id).disable();
                                        $$(id).refresh();
                                    }
                                })
                                $$(blockName).clear()
                            }else if(blockType=="datagrid"){
                                $$(blockName).clearAll();
                                $$(blockName).refresh();
                                // console.log(988)
                                webix.message({
                                    text:"Tidak Ada Data<br>"+winFormTitle+" (datagrid)",
                                    type:"debug", 
                                    expire: 10000,
                                }); 
                                $$(blockName).showOverlay("Sorry, there is no data"); 
                                if($$(blockName).config.customOperator!=undefined){
                                    let additionalCustomOperator = webix.copy($$(blockName).config.customOperator)
                                    additionalCustomOperator["RESET_DATA"] = true
                                    updateOperatorCustomDt(additionalCustomOperator);
                                }
                            }
                        }else{
                            window.winSearchRecord = false;
                            $$("searchValue").config.value="Search Mode"
                            $$("searchValue").refresh()
                            $$("searchValue").$view.classList.remove("webix_custom_button")
                            $$("searchValue").refresh()
                            $$("addValue").$view.classList.remove("webix_custom_button")
                            $$("addValue").refresh()
                            $$("prev").define("disabled",false);   //prev
                            $$("next").define("disabled",false);   //next
                            window.winAddData=false;
                            winFlagInsertBlock = ""
                            winFlagInsertChild = []
                            $$("addValue").define('disabled',false)
                            $$("updateValue").define('disabled',false)
                            $$("deleteValue").define('disabled',false)
                            window.winSearchMode = false;
                            window.winCheckRadio.forEach(function(item){
                                if(!winDisplayItem.includes(item)){
                                    if($$(item)!=undefined){
                                        $$(item).enable()
                                    }
                                }
                            })
                            window.winButtonCallForm.forEach(function(item){
                                if($$(item)!=undefined){
                                    $$(item).define('disabled',false)
                                }
                            })
                            Object.keys(winDataCompare).forEach(function(idBlock){
                                winDataCompare[idBlock]['data'] = {}
                            })
                            if (blockType=="form"){
                                winConfigForm[blockName]['ELEMENT'].forEach(function(id){
                                    if(!winDisplayItem.includes(id)){
                                        if($$(id)!=undefined){
                                            $$(id).enable()
                                        }
                                    }
                                })
                                window.winDataCompare[blockName] = {"data":{}}
                                Object.keys(getData[0]).forEach(function(key){
                                    if (window.winDateType.includes(key)){
                                        if(getData[0][key]!=null && getData[0][key]!=''){
                                            // let date = getData[0][key].split("-").reverse().join("-")
                                            // getData[0][key]=date
                                            let value = getData[0][key].split(" ")[0]
                                            if(value.length != 10){
                                                value = value.split("-").reverse().join("-");
                                                value = value.substring(value.length-10)
                                            }
                                            if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                value = value.split("-").reverse().join("-");
                                            }
                                            let hasil = cekDate(value, "DD-MM-YYYY");
                                            getData[0][key] = hasil
                                        }
                                    }
                                    if (window.winDateTypeMMYY.includes(key)){
                                        if(getData[0][key]!=null && getData[0][key]!=''){
                                            // let dateMMYY = getData[0][key].split("-").reverse().join("-")
                                            // getData[0][key]=dateMMYY.slice(3,10)
                                            let value = getData[0][key].split(" ")[0]
                                            if(value.length != 7){
                                                value = value.split("-").reverse().join("-");
                                                value = value.substring(value.length-7)
                                            }
                                            if(value.length==7 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                value = value.split("-").reverse().join("-");
                                            }
                                            let hasil = cekDate(value, "MM-YYYY");
                                            getData[0][key] = hasil
                                        }
                                    }
                                    if (window.winDateTypeYY.includes(key)){
                                        if(getData[0][key]!=null && getData[0][key]!=''){
                                            let value = getData[0][key].split(" ")[0]
                                            let dateYY = value.split("-").reverse().join("-")
                                            getData[0][key]=dateYY.slice(6,10)
                                        }
                                    }
                                    if (window.winClockType.includes(key)){
                                        if(getData[0][key]!=null && getData[0][key]!=''){
                                            let time = getData[0][key].split(" ")[1]
                                            let addSecond = $$(key).config.addSecond
                                            if(!addSecond){
                                                getData[0][key] = time.slice(0,5)
                                            }else{
                                                getData[0][key] = time
                                            }
                                        }
                                    }
                                    if (window.winTimestampType.includes(key)){
                                        if(getData[0][key]!=null && getData[0][key]!=''){
                                            let value = getData[0][key].split(" ")[0]
                                            let time = getData[0][key].split(" ")[1]
                                            let hideMinute = $$(key).config.hideMinute
                                            let hideSecond = $$(key).config.hideSecond
                                            if(value.length != 10){
                                                value = value.split("-").reverse().join("-");
                                                value = value.substring(value.length-10)
                                            }
                                            if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                value = value.split("-").reverse().join("-");
                                            }
                                            if(hideSecond){
                                                time = time.slice(0,5)
                                            }
                                            if(hideMinute){
                                                time = time.slice(0,3)
                                            }
                                            
                                            let hasil = cekDate(value, "DD-MM-YYYY");
                                            getData[0][key] = hasil + ' ' + time
                                        }
                                    }
                                    if (window.winCurrency.includes(key)){
                                        let currency = getData[0][key]
                                        getData[0][key] = Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(currency)
                                    }
                                    if(getData[0][key]==null){
                                        getData[0][key] = ''
                                    }
                                    if(getData[0][key]==undefined){
                                        window.winDataCompare[blockName]["data"][key] = ""
                                    }else{
                                        window.winDataCompare[blockName]["data"][key] = getData[0][key]
                                    }
                                    if(winCheckRadio.includes(key)){
                                        if(getData[0][key]=='' || getData[0][key]=='null'){
                                            $$(key).config.nullValue = true
                                        }else{
                                            $$(key).config.nullValue = false
                                        }
                                    }
                                })
                                window.winDataCompare[blockName]["data"] = getData[0]
                                if(Object.keys(winDataCompare[blockName]["data"]).length!=0){
                                    Object.keys(winConfigForm).forEach(function(block){
                                        if(winConfigForm[block]["BLOCK_TYPE"][1]=="SUB_PARENT"){
                                            winConfigForm[block]["ELEMENT"].forEach(function(idElementBlock){
                                                if(Object.keys(winDataCompare[blockName]["data"]).includes(idElementBlock)){
                                                    window.winDataCompare[block]["data"][idElementBlock] = winDataCompare[blockName]["data"][idElementBlock]
                                                }
                                            })
                                        }
                                    })
                                }
                                Object.keys(winDataCompare[blockName]["data"]).forEach(function(id){
                                    if(winDataCompare[blockName]["data"][id]==undefined){
                                        winDataCompare[blockName]["data"][id] = ""
                                    }
                                })
                                $$(blockName).clear()
                                $$(blockName).parse(getData[0])
    
                                winUploaderFile.forEach(function(idUploader){
                                    console.log(1247)
                                    if($$(idUploader)!=undefined){
                                        if(winConfigForm[blockName]['ELEMENT'].includes($$(idUploader).config.colsFile.newFileName)){
                                            let dataFile = []
                                            let fileNameDb = getItemValue($$(idUploader).config.colsFile.newFileName)
                                            let oldFileNameDb = getItemValue($$(idUploader).config.colsFile.oldFileName)
                                            if(fileNameDb!=""){
                                                let fileNameSplited = fileNameDb.split("|")
                                                let oldFileNameSplited = oldFileNameDb.split("|")
                                                oldFileNameSplited.forEach(function(nameFile){
                                                    let idxName = oldFileNameSplited.indexOf(nameFile)
                                                    dataFile.push({ name:nameFile, sizetext:"",status:"server", sequenceName:fileNameSplited[idxName]})
                                                })
                                            }
                                            $$(idUploader).files.parse(dataFile)
                                        }
                                    }
                                })
    
                                window.winDataMaster = $$(blockName).getValues()
                                afterInsertHead = false
                                winConfigForm[blockName]["PRIMARY_KEY"].forEach(function (item) {
                                    $$(item).define("readonly",true) 
                                    $$(item).refresh()
                                });
                                winIsPrimary.forEach(function (item) {
                                    if($$(getBlockItem(item)).config.view=="form"){
                                        $$(item).define("readonly",true)
                                        $$(item).refresh()
                                    }
                                });
    
                            }else if(blockType=="datagrid"){
                                getData.forEach(function(record){
                                    Object.keys(record).forEach(function(key){
                                        if (window.winDateType.includes(key)){
                                            if(record[key]!=null && record[key]!=''){
                                                let value = record[key].split(" ")[0]
                                                if(value.length != 10){
                                                    value = value.split("-").reverse().join("-");
                                                    value = value.substring(value.length-10)
                                                }
                                                if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                    value = value.split("-").reverse().join("-");
                                                }
                                                let hasil = cekDate(value, "DD-MM-YYYY");
                                                record[key] = hasil
                                            }
                                        }
                                        if (window.winDateTypeMMYY.includes(key)){
                                            if(record[key]!=null && record[key]!=''){
                                                let value = record[key].split(" ")[0]
                                                if(value.length != 7){
                                                    value = value.split("-").reverse().join("-");
                                                    value = value.substring(value.length-7)
                                                }
                                                if(value.length==7 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                    value = value.split("-").reverse().join("-");
                                                }
                                                let hasil = cekDate(value, "MM-YYYY");
                                                record[key] = hasil
                                            }
                                        }
                                        if (window.winDateTypeYY.includes(key)){
                                            if(record[key]!=null && record[key]!=''){
                                                let value = record[key].split(" ")[0]
                                                let dateYY = value.split("-").reverse().join("-")
                                                record[key]=dateYY.slice(6,10)
                                            }
                                        }
                                        if (window.winClockType.includes(key)){
                                            if(record[key]!=null && record[key]!=''){
                                                let time = record[key].split(" ")[1]
                                                let addSecond = $$(blockName).getColumnConfig(key).addSecond
                                                if(!addSecond){
                                                    record[key] = time.slice(0,5)
                                                }else{
                                                    record[key] = time
                                                }
                                            }
                                        }
                                        if (window.winTimestampType.includes(key)){
                                            if(record[key]!=null && record[key]!=''){
                                                let value = record[key].split(" ")[0]
                                                let time = record[key].split(" ")[1]
                                                if(value.length != 10){
                                                    value = value.split("-").reverse().join("-");
                                                    value = value.substring(value.length-10)
                                                }
                                                if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                    value = value.split("-").reverse().join("-");
                                                }
                                                let hasil = cekDate(value, "DD-MM-YYYY");
                                                record[key] = hasil + ' ' + time
                                            }
                                        }
                                        if(record[key]==null){
                                            record[key] = ''
                                        }
                                    })
                                })
    
                                $$(blockName).unselectAll();
                                $$(blockName).hideOverlay();
                                $$(blockName).clearAll();
                                $$(blockName).parse(getData);
                                $$(blockName).refresh();
                                winCountOffsetRecord[blockName]+=getData.length
                                winDataDtSelect[blockName] = webix.copy(getData)
                                $$(blockName).enable()
                                winDataChanged[blockName] = []    
                                window.winPagerDatatable[blockName][0] = 0
                                $$(blockName).config.dynamicLoadData = 0 
                            }
                            Object.keys(winConfigForm).forEach(function(blockId){
                                $$(blockId).enable()
                                if(winConfigForm[blockId]["BLOCK_TYPE"][1] != "PARENT" && winConfigForm[blockId]["BLOCK_TYPE"][0] == "DATAGRID"){
                                    $$(blockId).hideOverlay();
                                    $$(blockId).clearAll()
                                }
                            })
                            if(winMultiviewBlocksVertical.length>0){
                                winMultiviewBlocksVertical.forEach(function(idBlock){
                                    if(winConfigForm[idBlock]['BLOCK_TYPE'][1]=='SUB_PARENT'){
                                        $$(idBlock).parse(winDataCompare[idBlock]['data'])
                                    }
                                })
                            }else if(winMultiviewBlocks.length>0){
                                winMultiviewBlocks.forEach(function(idBlock){
                                    if(winConfigForm[idBlock]['BLOCK_TYPE'][1]=='SUB_PARENT'){
                                        $$(idBlock).parse(winDataCompare[idBlock]['data'])
                                    }
                                })
                            }

                            blocks.forEach(function(blockId){
                                if(blockId != blockName){
                                    if(winConfigForm[blockId].hasOwnProperty("REST_API")){
                                        if(winConfigForm[blockId]["REST_API"].hasOwnProperty("OFFSET_NUMBER")){
                                            winConfigForm[blockId]["REST_API"]["OFFSET_NUMBER"] = 0
                                        }
                                        if($$(blockId).config.view == "datatable"){
                                            $$(blockId).config.dynamicLoadData = 0 
                                        }
                                    }
                                }
                            })

                            window.winRestApi()
                            if(Object.keys(winFooterCustomFunction).length!=0){
                                Object.keys(winFooterCustomFunction).forEach(function(idCols){
                                    console.log(1398, idCols)
                                    winFooterCustomFunction[idCols]()
                                    console.log(1400)
                                })
                            }
                            winOpenValidation = true
                            $$(window.winListIdBtn[4]).define("disabled",false); //update
                            searchCount=0
                            $$(menuId).enable()//enable
                            $$(menuId).hideProgress();//loading
                        }
                        if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="FORM"){
                            let elementsBlock = Object.keys($$(blockName).elements)
                            elementsBlock.every(function(id){
                                if($$(id).config.disabled!=true){
                                    webix.UIManager.setFocus($$(id))
                                    return false
                                }
                                return true
                            })
                            
                        }else if(winConfigForm[blockName]["BLOCK_TYPE"][0]=="DATAGRID"){
                            webix.UIManager.setFocus($$(blockName))
                        }
                        winStartEditAfterLoadData = true
                        blocksName.every(function(block){
                            if(winConfigForm[block]['BASE_TABLE']){
                                window.winActiveBlock.focusNow = block
                                return false
                            }
                            return true
                        })
                    }else{
                        $$(menuId).disable()//enable
                        $$(menuId).hideProgress();//loading
                        if($$(blockName).config.view=="form"){
                            $$(blockName).clear()
                        }else{
                            $$(blockName).clearAll()
                        }
    
                        if(getData==undefined){
                            errorThisFunc = {'statusCode':500,'statusText':"Internal Server Error",'msg':respond.json().msg}
                            webix.alert(ALERT.ALERTERROR(blockName+"<br>Error Code : 500 - "+respond.json().msg))
                        }else{
                            if(getData.code == 200){
                                webix.alert(ALERT.ALERTERROR(blockName+"<br> "+getData.msg))
                                $$(menuId).enable()//enable
                                $$(menuId).hideProgress();//loading
                            }else{
                                errorThisFunc = {'statusCode':500,'statusText':"Internal Server Error",'msg':getData}
                                webix.alert(ALERT.ALERTERROR(blockName+"<br>Error Code : "+getData))
                            }
                        }
                        let textError
                        textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+errorThisFunc.statusCode+" - ("+errorThisFunc.statusText+")<br><br> Python - "+errorThisFunc.msg
                        console.log("JS - RestApiSelect - Error: "+errorThisFunc.statusCode+" - "+errorThisFunc.statusText+" - "+errorThisFunc.msg)
                        webix.message({
                            text:textError,
                            type:"error", 
                            expire: 10000,
                        });
                        
                    }
                    if(winConfigForm[blockName].EVENT_TRANSACTION != undefined){
                        if(winConfigForm[blockName].EVENT_TRANSACTION.postSelect != undefined){
                            return winConfigForm[blockName]["EVENT_TRANSACTION"].postSelect(getData)
                        }
                    }
                }).fail(function(respondFail){
                    let textError
                    errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':"RestApiSelect JS - Error Ajax Data Select"}
                    if(respondFail.status){
                        errorThisFunc = {'statusCode':respondFail.status,'statusText':respondFail.statusText,'msg':"RestApiSelect JS - Error Ajax Data Select"}
                        textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+errorThisFunc.statusCode+" - ("+errorThisFunc.statusText+")<br><br> AJAX"
                        console.log("JS - RestApiSelect - Error: "+errorThisFunc.statusCode+" - "+errorThisFunc.statusText+" - "+errorThisFunc.msg)
                    }else{
                        let stringError = String(respondFail.stack).split("at ")[1]
                        stringError = stringError.split("/")
                        let errorFile = stringError[stringError.length-1].split(":")[0]
                        let errorLine = stringError[stringError.length-1].split(":")[1]
                        errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':"RestApiSelect JS - Error Ajax Data Select"}
                        textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+respondFail.message+"<br>Position Error : "+errorFile+" line "+errorLine
                        console.log("JS - RestApiSelect - Error: "+respondFail.stack)
                    }
                    $$(menuId).hideProgress();//loading
                    $$(menuId).disable()//enable
                    webix.message({
                        text:textError,
                        type:"error", 
                        expire: 10000,
                    });
                })
                if(winActiveBlock.lastFocus!='' && winActiveBlock.focusNow!=''){
                    webix.html.removeCss($$(window.winActiveBlock["lastFocus"]).getNode(), "datablock-focus")
                    webix.html.removeCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
                }else if(winActiveBlock.lastFocus=='' && winActiveBlock.focusNow!=''){
                    webix.html.removeCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
                }
                webix.UIManager.setFocus($$(blocksName[0]))
                window.winActiveBlock.focusNow = blocksName[0]
                webix.html.addCss($$(window.winActiveBlock["focusNow"]).getNode(), "datablock-focus")
            })


        }catch(err){
            let textError
            errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':"RestApiSelect JS - Error Ajax Data Select"}
            if(err.status){
                errorThisFunc = {'statusCode':err.status,'statusText':err.statusText,'msg':"RestApiSelect JS - Error Ajax Data Select"}
                textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+errorThisFunc.statusCode+" - ("+errorThisFunc.statusText+")<br><br> AJAX"
                console.log("JS - RestApiSelect - Error: "+errorThisFunc.statusCode+" - "+errorThisFunc.statusText+" - "+errorThisFunc.msg)
            }else{
                let stringError = String(err.stack).split("at ")[1]
                stringError = stringError.split("/")
                let errorFile = stringError[stringError.length-1].split(":")[0]
                let errorLine = stringError[stringError.length-1].split(":")[1]
                errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':"RestApiSelect JS - Error Ajax Data Select"}
                textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+err.message+"<br>Position Error : "+errorFile+" line "+errorLine
                console.log("JS - RestApiSelect - Error: "+err.stack)
            }
            $$(menuId).hideProgress();//loading
            $$(menuId).disable()//enable
            webix.message({
                text:textError,
                type:"error", 
                expire: 10000,
            });
        }
        
    }

    restApiNewForm(blockName){
        // try{
        //     throw Error()
        // }catch(e){
        //     console.error(e)
        // }
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        // try{
            let dataParam = {}
            dataParam.type = "API"
            dataParam.menuId = menuId
            dataParam.data = {}
            if(winConfigForm[blockName]["BLOCK_TYPE"][1]=="CHILD"){
                let blocks = Object.keys(winConfigForm)
                blocks.forEach(function(id){
                    if(winConfigForm[id]["BLOCK_TYPE"][1]=="PARENT"){
                        dataParam.data = getBlockValue(id)
                    }
                })
            }
            dataParam.apiName = "newInstance_"+menuId+"_"+blockName
            let promise = new Promise((resolve)=>{
                webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                    let jsonData = respond.json()
                    let getMsg = jsonData.msg;
                    let getStatus = jsonData.status;
                    let getData = jsonData.data;
                    if(getStatus == true){
                        if(winThereIsSubChild){
                            let ChildParent
                            Object.keys(winConfigForm).every(function(blockId){
                                if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                    if(winConfigForm[blockId]['BLOCK_TYPE'][2]==blockId){
                                        ChildParent = blockId
                                        return false
                                    }else{
                                        ChildParent = winConfigForm[blockId]['BLOCK_TYPE'][2]
                                        return false
                                    }
                                }
                                return true
                            })
                            Object.keys(winConfigForm).forEach(function(blockId){
                                if(winConfigForm[blockId]['BLOCK_TYPE'][1]=="SUB_CHILD"){
                                    if(winConfigForm[blockId]['BLOCK_TYPE'][2]==ChildParent){
                                        let newDictData = {}
                                        Object.keys(getData).forEach(function(id){
                                            if(winConfigForm[blockId]['ELEMENT'].includes(id)){
                                                newDictData[id] = getData[id]
                                            }
                                        })
                                        winConfigForm[blockId]['WHEN_NEW_FORM'] = Object.assign({},winConfigForm[blockId]['WHEN_NEW_FORM'],newDictData)
                                    }
                                }
                            })
        
                            let newDictData = {}
                            Object.keys(getData).forEach(function(id){
                                if(winConfigForm[ChildParent]['ELEMENT'].includes(id)){
                                    newDictData[id] = getData[id]
                                }
                            })
                            winConfigForm[ChildParent]['WHEN_NEW_FORM'] = Object.assign({},winConfigForm[ChildParent]['WHEN_NEW_FORM'],newDictData)
                        }else{
                            winConfigForm[blockName]['WHEN_NEW_FORM'] = Object.assign({},winConfigForm[blockName]['WHEN_NEW_FORM'],getData)
                        }                    
                    }else{
                        webix.alert({
                            type:"alert-error",
                            title:"Error",
                            text:getMsg 
                        }).then(function(){
                            location.reload();
                        });
                    }
                    resolve()
                })
            })
            return promise
            
    }

    restApiSubmit(param,type){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
            loadingShow()
            let blocks = Object.keys(winConfigForm)
            let idChangedEachBlock = {}
            Object.keys(param['data']).forEach(function(blockId){
                if(param['data'][blockId]['blockType']=="datagrid"){
                    idChangedEachBlock[blockId] = param['data'][blockId]['idChanged']
                    delete param['data'][blockId]['idChanged']
                }
            })
            let promise = new Promise((resolve,reject)=>{
                webix.ajax().headers({'Content-Type':'application/json'}).get("/",param).then(function(respond){
                        let jsonData = respond.json()
                        let getMsg = jsonData.msg;
                        let getStatus = jsonData.status;
                        if(getStatus == true){
                            winAutoNumber = 0;
                            winValidatePromise = {}
                            if(type=='Insert Data'){
                                $$(window.winListIdBtn[3]).config.value = "Add New Data"
                                $$(window.winListIdBtn[3]).config.image = "https://hocdnoden0201.sat.co.id/img/addBtn.png"
                                $$(window.winListIdBtn[3]).$view.classList.remove("webix_custom_button")
                                $$(window.winListIdBtn[3]).refresh()
                                window.winAddData=false;
                                winFlagInsertBlock = ""
                                winFlagInsertChild = []
                                window.winSearchMode=false;
                                $$("prev").define('disabled',true)
                                $$("next").define('disabled',true)
                                $$("searchValue").define('disabled',false)
                                $$("updateValue").define('disabled',false)
                                $$("addRowDb").define('hidden',true)
                                $$("deleteValue").define('disabled',false)
                                $$(window.winListIdBtn[2]).$view.classList.remove("webix_custom_button")
                                $$(window.winListIdBtn[2]).refresh()

                                blocks.forEach(function(block){
                                    if(block!=window.winActiveBlock['focusNow']){
                                        if($$(block).config.view == "form"){
                                            Object.keys($$(block).elements).forEach(function(id){
                                                if (!winDisplayItem.includes(id)){
                                                    if($$(id)!=undefined){
                                                        $$(id).enable()
                                                    }
                                                }
                                            })
                                        }
                                    }
                                    if(block==winActiveBlock.focusNow){
                                        if(winConfigForm[block]['BLOCK_TYPE'][0]=="DATAGRID"){
                                            winConfigForm[block]["PRIMARY_KEY"].forEach(function(pkCol){
                                                let columns = $$(block).config.columns
                                                columns.forEach(function(colObj){
                                                    if(colObj.id==pkCol && colObj.jenis !="combo"){
                                                        if(!$$(block).getColumnConfig(colObj.id).disabledItem){
                                                            colObj.editor = "text"
                                                        }
                                                    }
                                                })
                                            })
                                            let row_id = $$(window.winActiveBlock['focusNow']).getLastId();
                                            webix.UIManager.setFocus($$(window.winActiveBlock['focusNow']));
                                            if(row_id != undefined){
                                                $$(window.winActiveBlock['focusNow']).select(row_id,winConfigForm[block]['PRIMARY_KEY'][0], false)
                                            }
                                        }
                                    }
                                })
                                
                                let indexObj = blocks.indexOf(winActiveBlock.focusNow)
                                for(let a=0; a<=indexObj; a++){
                                    if(winConfigForm[blocks[a]]['BLOCK_TYPE'][0]=="FORM"){
                                        winConfigForm[blocks[a]]["PRIMARY_KEY"].forEach(function (item) {
                                            $$(item).define("readonly",true)
                                            $$(item).refresh()
                                        });
                                    }
                                }
                                Object.keys(param).forEach(function(id){
                                    if (param[id]['blockType']=='form'){
                                        if(param[id]['data'].length!=0){
                                            afterInsertHead = true
                                        }else{
                                            afterInsertHead = false
                                        }
                                    }
                                })
                                for(let a=0; a<=indexObj; a++){
                                    if(winConfigForm[blocks[a]]['BLOCK_TYPE'][0]=="FORM"){
                                        let insertedData = getBlockValue(blocks[a])
                                        window.winDataCompare[blocks[a]] = {'data':{}}
                                        window.winDataCompare[blocks[a]]['data'] = insertedData
                                        Object.keys(winDataCompare[blocks[a]]['data']).forEach(function(id){
                                            if(winDataCompare[blocks[a]]['data'][id]==undefined || winButtonCallForm.includes(id)){
                                                winDataCompare[blocks[a]]['data'][id] = ""
                                            }
                                        })
                                    }
                                }
                                winAddRecord = false
                                Object.keys(param.data).forEach(function(block){
                                    if(winConfigForm[block]["BLOCK_TYPE"][0]=="FORM"){

                                    }else if(winConfigForm[block]["BLOCK_TYPE"][0]=="DATAGRID"){
                                        param.data[block].data.forEach(function(recordInsert){
                                            let copyLastRecord = webix.copy(winDataDtSelect[block][winDataDtSelect[block].length-1])
                                            Object.keys(copyLastRecord).forEach(function(id){
                                                copyLastRecord[id] = null
                                            })
                                            let indxRecord = param.data[block].data.indexOf(recordInsert)
                                            Object.keys(winDataChanged[block][indxRecord]).forEach(function(id){
                                                copyLastRecord[id] = winDataChanged[block][indxRecord][id]
                                            })
                                            winDataDtSelect[block].push(copyLastRecord)
                                        })
                                    }
                                    
                                })
                                if(reloadAfterTransaction.insert && !winStatusCallForm){
                                    webix.message({text:type+" Success",expire: 5000});
                                    let parentBlock
                                    
                                    Object.keys(winConfigForm).every(function(block){
                                        if(winConfigForm[block]['BLOCK_TYPE'][1]=="PARENT"){
                                            parentBlock = block
                                            return false 
                                        }else{
                                            return true
                                        }
                                    })
                                    
                                    Object.keys(jsonData.data).forEach(function(key){
                                        if(!winConfigForm[parentBlock]['ELEMENT'].includes(key)){
                                            delete jsonData.data[key]
                                        }
                                        if(!winConfigForm[parentBlock]['PRIMARY_KEY'].includes(key)){
                                            delete jsonData.data[key]
                                        }
                                    })
                                    
                                    restapi.restApiSelect({'data':jsonData.data})   
                                    
                                    winActiveCell = ''
                                    $$(menuId).enable()//enable
                                    $$(menuId).hideProgress();//loading
                                }else{
                                    // console.log(1758, jsonData.data)
                                    // Object.keys(jsonData.data).forEach(function(idItem){
                                    //     $$(idItem).setValue(jsonData.data[idItem])
                                    // })

                                    let parentBlock

                                    Object.keys(winConfigForm).every(function(block){
                                        if(winConfigForm[block]['BLOCK_TYPE'][1]=="PARENT"){
                                            parentBlock = block
                                            return false 
                                        }else{
                                            return true
                                        }
                                    })
                                    Object.keys(jsonData.data).forEach(function(idItem){
                                        if(winConfigForm[parentBlock]['PRIMARY_KEY'].includes(idItem)){
                                            if (window.winDateType.includes(idItem)){
                                                if(jsonData.data[idItem]!=null && jsonData.data[idItem]!=''){
                                                    // let date = jsonData.data[idItem].split("-").reverse().join("-")
                                                    // jsonData.data[idItem]=date
                                                    let value = jsonData.data[idItem].split(" ")[0]
                                                    if(value.length != 10){
                                                        value = value.split("-").reverse().join("-");
                                                        value = value.substring(value.length-10)
                                                    }
                                                    if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                        value = value.split("-").reverse().join("-");
                                                    }
                                                    let hasil = cekDate(value, "DD-MM-YYYY");
                                                    jsonData.data[idItem] = hasil
                                                    $$(idItem).setValue(jsonData.data[idItem])
                                                }
                                            }else if (window.winDateTypeMMYY.includes(idItem)){
                                                if(jsonData.data[idItem]!=null && jsonData.data[idItem]!=''){
                                                    // let dateMMYY = jsonData.data[idItem].split("-").reverse().join("-")
                                                    // jsonData.data[idItem]=dateMMYY.slice(3,10)
                                                    let value = jsonData.data[idItem].split(" ")[0]
                                                    if(value.length != 7){
                                                        value = value.split("-").reverse().join("-");
                                                        value = value.substring(value.length-7)
                                                    }
                                                    if(value.length==7 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                        value = value.split("-").reverse().join("-");
                                                    }
                                                    let hasil = cekDate(value, "MM-YYYY");
                                                    jsonData.data[idItem] = hasil
                                                    $$(idItem).setValue(jsonData.data[idItem])
                                                }
                                            }else if (window.winDateTypeYY.includes(idItem)){
                                                if(jsonData.data[idItem]!=null && jsonData.data[idItem]!=''){
                                                    let value = jsonData.data[idItem].split(" ")[0]
                                                    let dateYY = value.split("-").reverse().join("-")
                                                    jsonData.data[idItem]=dateYY.slice(6,10)
                                                    $$(idItem).setValue(jsonData.data[idItem])
                                                }
                                            }else{
                                                $$(idItem).setValue(jsonData.data[idItem])
                                            }
                                        }
                                    })
                                    webix.message({text:type+" Success",expire: 5000});
                                    $$(menuId).enable()//enable
                                    $$(menuId).hideProgress();//loading
                                }
                                Object.keys(winDataChanged).forEach(function(block){
                                    winDataChanged[block] = []
                                })
                                winJenisAddValue = ""
                            }else if(type=='Update Data'){
                                
                                let blockName = Object.keys(winConfigForm)
                                blockName.forEach(function(block){
                                    if($$(block).config.view=="form"){
                                        window.winDataCompare[block] = {'data':{}}
                                        if($$(block).config.view=="form"){
                                            let updatedData = $$(block).getValues()
                                            window.winDataCompare[block]['data'] = updatedData
                                        }
                                    }
                                })
                                
                                window.winAddData=false;
                                winFlagInsertBlock = ""
                                winFlagInsertChild = []
                                window.winSearchMode=false;
                                
                                Object.keys(param['data']).forEach(function(blockUpd){
                                    if(param['data'][blockUpd]['blockType']!="form"){
                                        if (winThereIsSubChild) {
                                            idChangedEachBlock[blockUpd].forEach(function(idChanged){
                                                let indx = idChangedEachBlock[blockUpd].indexOf(idChanged)
                                                let tampungan = {}
                                                if(getRecordForCompare(blockUpd,idChanged) != undefined){
                                                        tampungan = getRecordForCompare(blockUpd,idChanged)
                                                }
                                                Object.keys(param['data'][blockUpd]['data'][indx]).forEach(function(idUpdSuccess){
                                                    tampungan[idUpdSuccess] = param['data'][blockUpd]['data'][indx][idUpdSuccess]
                                                })
                                            })    
                                        }else{
                                            // ^ Awalnya ini
                                            idChangedEachBlock[blockUpd].forEach(function(idChanged){
                                                let indx = idChangedEachBlock[blockUpd].indexOf(idChanged)
                                                let tampungan = getRecordForCompare(blockUpd,idChanged)
                                                Object.keys(param['data'][blockUpd]['data'][indx]).forEach(function(idUpdSuccess){
                                                    tampungan[idUpdSuccess] = param['data'][blockUpd]['data'][indx][idUpdSuccess]
                                                })
                                            })
                                        }
                                    }
                                })
                                
                                Object.keys(param.data).forEach(function(block){
                                    if(winConfigForm[block]["BLOCK_TYPE"][0]=="FORM"){
                                    }else if(winConfigForm[block]["BLOCK_TYPE"][0]=="DATAGRID"){
                                        param.data[block].data.forEach(function(recordUpd){
                                            let indxRecord = param.data[block].data.indexOf(recordUpd)
                                            winDataDtSelect[block].forEach(function(recordDtSelect){
                                                if(recordDtSelect["id"]==idChangedEachBlock[block][indxRecord]){
                                                    Object.keys(recordUpd).forEach(function(id){
                                                        winDataDtSelect[block][indxRecord][id] = recordUpd[id]
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                                
                                if(reloadAfterTransaction.update){
                                    winSearchParam = {status:false, param:{}}
                                    webix.message({text:type+" Success",expire: 5000});
                                    let parentBlock
                                    Object.keys(winConfigForm).every(function(block){
                                        if(winConfigForm[block]['BLOCK_TYPE'][1]=="PARENT"){
                                            parentBlock = block
                                            return false
                                        }else{
                                            return true
                                        }
                                    })
                                    Object.keys(jsonData.data).forEach(function(key){
                                        if(!winConfigForm[parentBlock]['ELEMENT'].includes(key)){
                                            delete jsonData.data[key]
                                        }
                                        if(!winConfigForm[parentBlock]['PRIMARY_KEY'].includes(key)){
                                            delete jsonData.data[key]
                                        }
                                    })
                                    restapi.restApiSelect({'data':jsonData.data})
                                    winActiveCell = ''
                                }else{
                                    webix.message({text:type+" Success",expire: 5000});
                                    $$(menuId).enable()//enable
                                    $$(menuId).hideProgress();//loading
                                }
                                Object.keys(winDataChanged).forEach(function(block){
                                    winDataChanged[block] = []
                                })
                                $$("prev").define('disabled',false)
                                $$("next").define('disabled',false)
                                $$("searchValue").define('disabled',false)
                                $$("addValue").define('disabled',false)

                                let indexObj = blocks.indexOf(winActiveBlock.focusNow)
                                for(let a=0; a<=indexObj; a++){
                                    if(winConfigForm[blocks[a]]['BLOCK_TYPE'][0]=="FORM"){
                                        let updatedData = $$(blocks[a]).getValues()
                                        window.winDataCompare[blocks[a]] = {'data':{}}
                                        window.winDataCompare[blocks[a]]['data'] = updatedData
                                        Object.keys(winDataCompare[blocks[a]]['data']).forEach(function(id){
                                            if(winButtonCallForm.includes(id)){
                                                winDataCompare[blocks[a]]['data'][id] = ""
                                            }
                                        })
                                    }
                                }
                                resolve({"status":true, "message":"Submit Berhasil"})
                            }else if(type=='Delete Data'){
                                if($$(window.winActiveBlock['focusNow']).config.view=='form'){
                                    webix.message({text:type+" Success",expire: 5000});
                                    console.log(jsonData)
                                    if(reloadAfterTransaction.delete){
                                        if(winConfigForm[window.winActiveBlock['focusNow']]["BLOCK_TYPE"][1] == "CHILD"){
                                            let param = [{}]
                                            let valuesData = {}
                                            winConfigForm[getBlockParent()]['PRIMARY_KEY'].forEach(function(itemId){
                                                param[0][itemId] = $$(itemId).getValue()
                                            })
                                            valuesData[getBlockParent()] = {}
                                            valuesData[getBlockParent()]["blockType"] = "form"
                                            valuesData[getBlockParent()]['data'] = param
                                            let formattedParam = formatParamAjax(valuesData,"Delete Data")
                                            restapi.restApiSelect({'data':formattedParam[getBlockParent()]['data'][0]})  
                                        }else{
                                            restapi.restApiSelect()
                                            winActiveCell = ''
                                            // $$(menuId).enable()//enable
                                            // $$(menuId).hideProgress();//loading
                                        }
                                    }
                                }else if($$(window.winActiveBlock['focusNow']).config.view=='datatable'){
                                    if(winThereIsSubChild){
                                        let idFocusNow = $$(window.winActiveBlock['focusNow']).getSelectedId().row
                                        let indexDelete
                                        $$(window.winActiveBlock['focusNow']).serialize().forEach(function(record, idx){
                                            if(idFocusNow == record.id){
                                                indexDelete = idx
                                            }
                                        })

                                        if (Object.keys(winSubChild).includes(winActiveBlock.focusNow) || winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2] != undefined){
                                            if(winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][1] == "CHILD"){
                                                winSubChild[winActiveBlock.focusNow].forEach(function(blockSubChild){
                                                    let subChildId = $$(blockSubChild).serialize()[indexDelete].id
                                                    $$(blockSubChild).remove(subChildId)
                                                })
                                                let parentChildId = $$(winActiveBlock.focusNow).serialize()[indexDelete].id
                                                $$(winActiveBlock.focusNow).remove(parentChildId);
                                            }else if (winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][1] == "SUB_CHILD"){
                                                winSubChild[winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2]].forEach(function(blockSubChild){
                                                    let subChildId = $$(blockSubChild).serialize()[indexDelete].id
                                                    $$(blockSubChild).remove(subChildId)
                                                })
                                                let parentChildId = $$(winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2]).serialize()[indexDelete].id
                                                $$(winConfigForm[winActiveBlock.focusNow]["BLOCK_TYPE"][2]).remove(parentChildId);
                                            }   
                                        }
                                    }else{
                                        $$(window.winActiveBlock['focusNow']).remove($$(window.winActiveBlock['focusNow']).getSelectedId());
                                    }
                                    webix.message({text:type+" Success",expire: 5000});
                                    $$(menuId).enable()//enable
                                    $$(menuId).hideProgress();//loading
                                }
                                resolve({status:true})
                            }
                            Object.keys(winConfigForm).forEach(function(block){
                                if(winConfigForm[block].EVENT_TRANSACTION != undefined){
                                    if(type == "Insert Data"){
                                        if(winConfigForm[block].EVENT_TRANSACTION.postInsert != undefined){
                                            return winConfigForm[block]["EVENT_TRANSACTION"].postInsert(jsonData, Object.keys(param["data"]))
                                        }
                                    }else if(type == "Update Data"){
                                        if(winConfigForm[block].EVENT_TRANSACTION.postUpdate != undefined){
                                            return winConfigForm[block]["EVENT_TRANSACTION"].postUpdate(jsonData, Object.keys(param["data"]))
                                        }
                                    }else if(type == "Delete Data"){
                                        if(winConfigForm[block].EVENT_TRANSACTION.postDelete != undefined){
                                            return winConfigForm[block]["EVENT_TRANSACTION"].postDelete(jsonData, Object.keys(param["data"]))
                                        }
                                    }
                                }
                            })
                        }else{
                            $$(menuId).hideProgress();//loading
                            $$(menuId).enable()//enable
                            
                            webix.alert({
                                type:"alert-error",
                                title:"Error "+type,
                                text:getMsg
                            }).then(function(){
                                $$(window.winCurrentItem).focus();
                            });
                            resolve({"status":false, "message":"Gagal Submit"})
                        }
                })
            })
            return promise
        
            // if(restLoadApi.status!=200){
            //     errorThisFunc = {'statusCode':restLoadApi.status,'statusText':restLoadApi.statusText,'msg':"RestApiCombo JS - Error Back-End"}
            //     throw errorThisFunc
            // }
            
        // }catch(err){
        //     let textError
        //     errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':"RestApiSelect JS - Error Ajax Data Select"}
        //     if(err.status){
        //         errorThisFunc = {'statusCode':err.status,'statusText':err.statusText,'msg':"RestApiSelect JS - Error Ajax Data Select"}
        //         textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+errorThisFunc.statusCode+" - ("+errorThisFunc.statusText+")<br><br> AJAX"
        //         console.log("JS - RestApiSelect - Error: "+errorThisFunc.statusCode+" - "+errorThisFunc.statusText+" - "+errorThisFunc.msg)
        //     }else{
        //         let stringError = String(err.stack).split("at ")[1]
        //         stringError = stringError.split("/")
        //         let errorFile = stringError[stringError.length-1].split(":")[0]
        //         let errorLine = stringError[stringError.length-1].split(":")[1]
        //         textError = "Error Detected, please capture this error and contact IT HO: <br><br>Error: "+err.message+"<br>Position Error : "+errorFile+" line "+errorLine
        //         console.log("JS - RestApiSelect - Error: "+err.stack)
        //     }
        //     $$(menuId).showProgress({type:"icon",hide:true});//loading
        //     $$(menuId).disable()//enable
            
        //     webix.message({
        //         text:textError,
        //         type:"error", 
        //         expire: 10000,
        //     });
        // }
    }

    restApiCombo(param){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        // try{
            let dataParam = {}
            dataParam.type = "API"
            dataParam.menuId = menuId
            dataParam.data = {}
            dataParam.apiName = param.API_NAME
            let blocks = Object.keys(winConfigForm)
            let blockName = ""
            blocks.forEach(function(block){
                if(winConfigForm[block]['ELEMENT'].includes(param.ITEM_ID)){
                    blockName = block
                } 
            })
            if(winConfigForm[blockName]["BLOCK_TYPE"][0] == "FORM"){
                let fungsiCombo = function () {
                    let idFieldcombo = $$(param.ITEM_ID).getPopup().getList();
                    let result = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                        let jsonData = respond.json()
                        let getData = jsonData.data;
                        let getStatus = jsonData.status;
                        if(getStatus == true){
                            idFieldcombo.clearAll();
                            idFieldcombo.parse(getData);
                            idFieldcombo.refresh();
                        }
                    })
                    return result
                }

                winApiCombos.push(fungsiCombo)

                if(winIsWithoutAPI){
                    let idFieldcombo = $$(param.ITEM_ID).getPopup().getList();
                    webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                        let jsonData = respond.json()
                        let getData = jsonData.data;
                        let getStatus = jsonData.status;
                        if(getStatus == true){
                            idFieldcombo.clearAll();
                            idFieldcombo.parse(getData);
                            idFieldcombo.refresh();
                        }
                    })
                }

                // if(restLoadApi.status!=200){
                //     errorThisFunc = {'statusCode':restLoadApi.status,'statusText':restLoadApi.statusText,'msg':"RestApiCombo JS - Error Back-End"}
                //     throw errorThisFunc
                // }
            }else {
                let fungsiCombo = function () {
                    let fieldComboDt = $$(blockName).getColumnConfig(param.ITEM_ID).collection
                    let result = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                        let jsonData = respond.json()
                        let getData = jsonData.data;
                        let getStatus = jsonData.status;
                        if(getStatus == true){
                                fieldComboDt.clearAll()
                                fieldComboDt.parse(getData)
                        }else{
                            webix.alert("Tidak ada data","alert-error"); 
                        }
                    })   
                    return result
                }
                winApiCombos.push(fungsiCombo)   
                
                if(winIsWithoutAPI){
                    let fieldComboDt = $$(blockName).getColumnConfig(param.ITEM_ID).collection
                    webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                        let jsonData = respond.json()
                        let getData = jsonData.data;
                        let getStatus = jsonData.status;
                        if(getStatus == true){
                                fieldComboDt.clearAll()
                                fieldComboDt.parse(getData)
                        }else{
                            webix.alert("Tidak ada data","alert-error"); 
                        }
                    })   
                }
            }

    }

    restApiDataCombo(param){
        let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        let dataParam = {}
        dataParam.type = "API"
        dataParam.menuId = menuId
        dataParam.data = {}
        dataParam.apiName = param.API_NAME
        param.PARAM_ID.forEach(function(keys){
            dataParam.data[keys] = getItemValue(keys)            
        });
        let blocks = Object.keys(winConfigForm)
        let blockName = ""
        blocks.forEach(function(block){
            if(winConfigForm[block]['ELEMENT'].includes(param.ITEM_ID)){
                blockName = block
            }
        })
        if(winConfigForm[blockName]["BLOCK_TYPE"][0] == "FORM"){
            let idFieldcombo = $$(param.ITEM_ID).getPopup().getList();
            webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                let jsonData = respond.json()
                let getData = jsonData.data;
                let getStatus = jsonData.status;
                if(getStatus == true){
                    idFieldcombo.clearAll();
                    idFieldcombo.parse(getData);
                    idFieldcombo.refresh();
                }                   
            })
        }else{
            let fieldComboDt = $$(blockName).getColumnConfig(param.ITEM_ID).collection
            webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond){
                let jsonData = json.data()
                let getData = jsonData.data;
                let getStatus = jsonData.status;
                if(getStatus == true){
                        fieldComboDt.clearAll()
                        fieldComboDt.parse(getData)
                }  
            })
        }
    }

    restApiLov(param){
            // if(winMultiSelect != {}){
            //     try{
            //     throw Error()
            // }catch(e){
            //     console.error(e)
            // }

            // }
            let errorThisFunc = {'statusCode':undefined,'statusText':undefined,'msg':undefined}
        // try{
            let dataParam = {}
            dataParam.type = "API"
            dataParam.menuId = menuId
            dataParam.data = param.DATA

            if(param.ID_LOV_DISPLAY!=undefined){
                dataParam.data["offset"] = 0
            }else{
                if(dataParam.data==undefined){
                    dataParam.data = {"offset":0, "search":"%%"}
                }
                if(dataParam.data["search"]==undefined){
                    dataParam.data["search"] = "%%"
                }else if(dataParam.data["search"]!="%%"){
                    dataParam.data["search"] = "%"+dataParam.data["search"].toUpperCase()+"%"
                }
            }
            if(param.PARAM_ID!=undefined){
                $$(param.TABLE_ID).define("paramId",param.PARAM_ID)
                param.PARAM_ID.forEach(function(keys){
                    dataParam.data[keys] = getItemValue(keys)
                    if (getItemValue(keys)==""){
                        dataParam.data[keys] = "%%"
                    }        
                });

            }else if($$(param.TABLE_ID).config.paramId.length!=0){
                $$(param.TABLE_ID).config.paramId.forEach(function(keys){
                    dataParam.data[keys] = getItemValue(keys)
                    if (getItemValue(keys)==""){
                        dataParam.data[keys] = "%%"
                    }        
                });
            }
            if(dataParam.data['offset']==undefined){
                dataParam.data["offset"] = 0
            }
            dataParam.apiName = "lov_"+param.ITEM_ID+"_"+menuId
            // webix.extend($$(param.TABLE_ID), webix.ProgressBar);
            // $$(param.TABLE_ID).showProgress()
            
            let promise = new Promise((resolve)=>{

                let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam);
                // if(restLoadApi.status!=200){
                //     errorThisFunc = {'statusCode':restLoadApi.status,'statusText':restLoadApi.statusText,'msg':"RestApiCombo JS - Error Back-End"}
                //     throw errorThisFunc
                // }
                restLoadApi.then(function(respond){
                    
                    let jsonData = respond.json()
                    let getData = jsonData.data;
                    if(getData.length==0){
                        let labelItem
                        let blockId = getBlockItem(param.ITEM_ID)
                        if($$(blockId).config.view == "form"){
                            // console.log(param.ITEM_ID)
                            labelItem = $$(param.ITEM_ID).config.label
                        }else if($$(blockId).config.view == "datatable"){
                            labelItem = $$(blockId).getColumnConfig(param.ITEM_ID).header[0]['text']
                        }
                        $$(param.TABLE_ID).config.scrollCondition = false
                        webix.message({
                            text:"Data tidak ditemukan | "+labelItem,
                            type:"warning", 
                            expire: 10000,
                        });
                    }
                    let getStatus = jsonData.status;
                    if(getStatus == true && getData.length!=0){
                        if(param.ID_DATE_TYPE != undefined){
                            if(param.ID_DATE_TYPE.length != 0){
                                getData.forEach(function(record){
                                    param.ID_DATE_TYPE.forEach(function(id){
                                        let value = record[id].split(" ")[0]
                                            if(value.length != 10){
                                                value = value.split("-").reverse().join("-");
                                                value = value.substring(value.length-10)
                                            }
                                            if(value.length==10 && value.split("-").length>1 && value.split("-")[0].length==4){
                                                value = value.split("-").reverse().join("-");
                                            }
                                            let hasil = cekDate(value, "DD-MM-YYYY");
                                            record[id] = hasil
                                    })
                                })
                            }
                        }
                        if(param.DATA==undefined){
                            $$(param.TABLE_ID).clearAll();
                            $$(param.TABLE_ID).parse(getData);
                            $$(param.TABLE_ID).refresh();
                        }else{
                            $$(param.TABLE_ID).parse(getData);
                            $$(param.TABLE_ID).refresh();
                        }
                        }else if(getData.length==0 && param.DATA==undefined){
                            $$(param.TABLE_ID).clearAll();
                            $$(param.TABLE_ID).refresh();
                        }
                    if(param.WD_ID){
                        $$(param.WD_ID).enable()//enable
                        // $$(param.WD_ID).showProgress({type:"icon",hide:true});//loading
                    }else{
                        $$(menuId).enable()//enable
                        // $$(menuId).showProgress({type:"icon",hide:true});//loading
                    }
                })
                resolve()
            })
            return promise
                
            // })
    }

    isWithoutApi(menuId){
        winIsWithoutAPI = true
        winStartEditAfterLoadData = true
        winOpenValidation = true
        let promiseApiCombo = []
        winApiCombos.forEach(function (api) {
            promiseApiCombo.push(api())
        })
        let promiseAll = Promise.all(promiseApiCombo)
        promiseAll.then(()=>{
            $$(menuId).showProgress({type:"icon",hide:true});//loading
            $$(menuId).enable()//enable
            if(typeof afterIsWithoutAPI !== 'undefined'){
                return afterIsWithoutAPI()
            }
        })
    }

    restApiCustom(param){
        let dataParam = {}
        dataParam.type = "API"
        dataParam.menuId = menuId
        dataParam.data = param.DATA
        dataParam.apiName = param.ITEM_ID+"_"+menuId
        $$(menuId).showProgress();//loading
        let promise = new Promise((resolve,reject)=>{
            webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam).then(function(respond,xhr){
                let jsonData = respond.json()
                let getData = jsonData.data;
                let getStatus = jsonData.status;
                let getMsg = jsonData.msg;
                resolve({status:getStatus,data:getData,msg:getMsg, pesan:getMsg})
                $$(menuId).hideProgress();//loading
            })
        })
        return promise
    }

    restApiCallForm(param){
        let dataParam = {}
        dataParam.type = "CALL_FORM"
        dataParam.menuId = menuId
        dataParam.data = param.DATA
        dataParam.apiName = param.ITEM_ID+"_"+menuId
        let promise = new Promise((resolve,reject)=>{
        
        let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam);
            restLoadApi.then(function(respond){
                console.log(respond)
                let jsonData = respond.json()
                let getData = jsonData.data;
                let getStatus = jsonData.status;
                let getMsg = jsonData.msg;
                resolve({status:getStatus,data:getData,msg:getMsg})
            })
        })
        return promise
    }

    restApiTotalCount(param){
        let dataParam = {}
        dataParam.type = "API"
        dataParam.menuId = menuId
        dataParam.data = param.DATA || {}
        dataParam.apiName = "totalCount_"+param.BLOCK_NAME+"_"+menuId
        let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).get("/",dataParam);
        restLoadApi.then(function(respond){
            let jsonData = respond.json()
            let getData = jsonData.data;
            let getStatus = jsonData.status;
            let getMsg = jsonData.msg;
            if(getStatus){
                $$("count_"+param.BLOCK_NAME).define("count",getData[0])
                $$("count_"+param.BLOCK_NAME).refresh()
            }
        })
    }

    restApiFile(param){
        console.log(2403, param)
        let dataParam = {}
        let typeAPI = param.TYPE
        if(typeAPI =="download"){
            dataParam.type = "DOWNLOADFILES"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            dataParam.jenisFile = param.JENIS_FILE
            dataParam.dataParam = param.DATA_PARAM
            $$(menuId).showProgress()
            webix.ajax().response("blob").headers({'Content-Type':'application/json'}).post("/fileOden",dataParam).then(function(file){
                $$(menuId).hideProgress()
                let fileExtension = file.type;
                if (fileExtension.includes("json")){
                    console.log(file)
                    file.text().then(function(stringFile){
                        // console.log(json.parse(stringFile))
                        webix.alert(JSON.parse(stringFile)['msg'],"alert-error");
                    })
                }else{
                    if(param["FILE_TYPE"]=="single"){
                        let link=document.createElement('a');
                        link.href=window.URL.createObjectURL(file);
                        link.download=param.DATA[0]['oldName'];
                        link.click();
                    }
                }
                $$(menuId).hideProgress()
            });
        }else if(typeAPI =="viewFile"){
            dataParam.type = "DOWNLOADFILES"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            dataParam.jenisFile = param.JENIS_FILE
            dataParam.dataParam = param.DATA_PARAM
            $$(menuId).showProgress()
            console.log(2426,dataParam)
            webix.ajax().response("blob").headers({'Content-Type':'application/json'}).post("/fileOden",dataParam).then(function(file){
                if(param["FILE_TYPE"]=="single"){
                    $$(menuId).hideProgress()
                    let fileExtension = file.type;
                    if (fileExtension.includes("json")){
                        file.text().then(function(stringFile){
                            // console.log(json.parse(stringFile))
                            webix.alert(JSON.parse(stringFile)['msg'],"alert-error");
                        })
                    }else{

                        let urlFile = URL.createObjectURL(file)
                        console.log(2437, urlFile)
                        let contentView
                        
                        let fixContent = []
                        if (fileExtension.includes("pdf")) {
                            contentView = {
                                view: "pdfviewer",
                                id: "pdfViewer",
                                toolbar : "toolbarViewFile",
                                url: `binary->${urlFile}`
                            }
                            fixContent.push({ view:"pdfbar", id:"toolbarViewFile" })
                            fixContent.push(contentView)
                        } else {
                            if(param['DOWNLOAD_FILE']){
                                console.log(2385)
                                contentView = {
                                    template: "<iframe src='" + urlFile + "' style='width:100%; height:100%; border:none;'></iframe>"
                                };    
                            }else{
                                contentView = {
                                    template: "<iframe src='" + urlFile + "' style='width:100%; height:100%; border:none;' onload='preventDownload(this)'></iframe>"
                                };
                            }
                            fixContent.push(contentView)
                        }
                        
                        webix.ui({
                            view: "window",
                            id: "fileWindow",
                            // fullscreen:true,
                            height: (0.75*window.innerHeight),
                            width: (0.75*window.innerWidth),
                            position:"center",
                            head: {
                                view: "toolbar", cols: [
                                    { view: "label", label: "File Viewer" },
                                    { view: "button", label: "Close", width: 100, align: "right", click: function(){
                                        $$('fileWindow').close();
                                    } }
                                ]
                            },
                            body: {
                                rows:fixContent
                            }
                        }).show();
    
                        let currPage = 1; //Pages are 1-based not 0-based
                        let numPages = 0;
                        let thePDF = null;
    
                        function handlePages(page){
                            //This gives us the page's dimensions at full scale
                            console.log(page)
                            var viewport = page.getViewport( 1 );
    
                            //We'll create a canvas for each page to draw it on
                            var canvas = document.createElement( "canvas" );
                            canvas.style.display = "block";
                            var context = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
    
                            //Draw it on the canvas
                            page.render({canvasContext: context, viewport: viewport});
    
                            //Add it to the web page
                        //console.log($$("pdf").$view)
                        let div = $$("pdfViewer").$view.childNodes[0]
                        div.appendChild( canvas )
                            //document.body.appendChild( canvas );
    
                            //Move to next page
                            currPage++;
                            if ( thePDF !== null && currPage <= numPages )
                            {
                                thePDF.getPage( currPage ).then( handlePages );
                            }
                        }
    
                        //$$("toolbar").hide()
                        
                        if(fileExtension.includes("pdf")){
                            if(!param['DOWNLOAD_FILE']){
                                $$("toolbarViewFile").queryView({"type":"icon", "icon":"wxi-download"}).hide()
                            }
    
                            // $$("toolbarViewFile").queryView({"type":"icon", "icon":"wxi-download"}).hide()
                            let objsBtn = $$("toolbarViewFile").queryView({"view":"button"},"all")
                            objsBtn[0].hide()
                            objsBtn[1].hide()
                            
                            let objsText = $$("toolbarViewFile").queryView({"view":"text"},"all")
                            objsText[0].hide()
    
                            let objsTemplate = $$("toolbarViewFile").queryView(function(view){
                                return view.config.data;
                            });
                            objsTemplate.hide()
                            
                            console.log($$("pdfViewer"))
                            $$("pdfViewer").attachEvent("onDocumentReady", function(){
                                let div = $$("pdfViewer").$view.childNodes[0]
                                div.innerHTML = ''
                                console.log(urlFile)
    
                                const reader = new FileReader();
                                reader.readAsArrayBuffer(file);
    
                                reader.onload = function() {
                                    const arrayBuffer = reader.result;
    
                                    console.log(PDFJS.getDocument({ data: arrayBuffer }))
    
                                    PDFJS.getDocument({ data: arrayBuffer }).promise.then(pdfDoc => {
    
                                        console.log(2657, pdfDoc)
                                        //Set PDFJS global object (so we can easily access in our page functions
                                        thePDF = pdfDoc;
    
                                        //How many pages it has
                                        numPages = pdfDoc.numPages;
    
                                        //Start with first page
                                        pdfDoc.getPage( 1 ).then( handlePages );
                                        
                                    })
                                }
    
    
                                // PDFJS.getDocument(urlFile).then(function(pdf){
                                //     console.log(2657, pdf)
                                //     //Set PDFJS global object (so we can easily access in our page functions
                                //     thePDF = pdf;
    
                                //     //How many pages it has
                                //     numPages = pdf.numPages;
    
                                //     //Start with first page
                                //     pdf.getPage( 1 ).then( handlePages );
                                // })
                            })
                        }
                    }
                }
                $$(menuId).hideProgress()
            });
        }else if(typeAPI == "delete"){
            dataParam.type = "DELETEFILES"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            $$(menuId).showProgress()
            let promise = new Promise((resolve,reject)=>{
                webix.ajax().headers({'Content-Type':'application/json'}).post("/fileOden",dataParam).then(function(respond){
                    let jsonData = respond.json()
                    if(jsonData.status){
                        resolve({status:jsonData.status, filename:jsonData.filename})
                    }else{
                        resolve({status:jsonData.status, msg:jsonData.msg, pesan:jsonData.msg})
                    }
                    $$(menuId).hideProgress()
                })
            })
            return promise
        }else if(typeAPI == "createSpreadsheet"){
            dataParam.type = "CREATESPREADSHEET"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            $$(menuId).showProgress();//loading
            $$(menuId).disable()//enable
            let promise = new Promise((resolve,reject)=>{
                let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).post("/fileOden",dataParam);
                restLoadApi.then(function(respond){
                    let jsonDataCreate = respond.json()
                    if(jsonDataCreate.status){
                        if($$(getBlockItem(param.ID_FILE)).config.view == "form"){
                            $$(param.ID_FILE).setValue(jsonDataCreate.data['idFile'])
                            $$(param.FILE_NAME).setValue(jsonDataCreate.data['fileName'])
                        }else{
                            setValueDt([param.ID_FILE,param.FILE_NAME],[jsonDataCreate.data['idFile'],jsonDataCreate.data['fileName']])
                        }
                    }
                    $$(menuId).enable()//enable
                    $$(menuId).hideProgress();//loading
                    resolve(jsonDataCreate)
                })
            })
            return promise
        }else if(typeAPI == "calculateSpreadsheet"){
            dataParam.type = "CALCULATESPREADSHEET"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            $$(menuId).showProgress();//loading
            $$(menuId).disable()//enable
            let promise = new Promise((resolve,reject)=>{
                let restLoadApi = webix.ajax().headers({'Content-Type':'application/json'}).post("/fileOden",dataParam).then(function(respond){
                    let jsonDataCreate = respond.json()
                    // console.log(2328,jsonDataCreate)
                    $$(menuId).enable()//enable
                    $$(menuId).hideProgress();//loading
                    resolve(jsonDataCreate)
                })
            })
            return promise
        }else if(typeAPI == "loadPhoto"){
            dataParam.type = "LOADPHOTO"
            dataParam.menuId = menuId
            dataParam.data = param.DATA
            dataParam.apiName = param.API_NAME
            webix.ajax().response("blob").headers({'Content-Type':'application/json'}).post("/fileOden",dataParam).then(function(file){
                // fileJSON = JSON.parse(fileText)
                if(file.type!='application/json'){
                    let reader = new FileReader();
                    reader.readAsDataURL(file); 
                    reader.onloadend = function() {
                        let base64data = reader.result;  
                        $$(dataParam.data[0]['TEMPLATE_ID']).setHTML('<img src="'+base64data+'" width="180px" height="200px" class="content" ondragstart="return false"/>')              
                    }
                }else{
                    $$(dataParam.data[0]['TEMPLATE_ID']).setHTML('<img src="static/fotoprofil.jpeg" width="180px" height="200px" class="content" ondragstart="return false"/>')
                    
                }

                
            });
        }
    }

}

let restapi = new RestApi()