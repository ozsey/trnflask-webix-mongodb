// """
// Update : 2024-01-30
// Common Library - layout.js -  Oden V3
// Update : 
// """

var winFormTitle = winFormTitle ? winFormTitle : "Master Detail"
let widthFormNameLabel = 500;

function heightCustom(words){
    let widthWords = webix.html.getTextSize(words).width
    if(widthWords <= widthFormNameLabel){
        return 60
    }else{
        return 80
    }
} 

class Layout{

    indexLayout(){
        let output = {
            id:"indexLayout",
            view: "scrollview",
            scroll: false,
            body: {
                type:"space",
                css:{
                    "background-image":"url(../static/img/background.png)",
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "background-size": "cover"
                }, 
                rows:[
                ]
            }
        }
        return output
    }

    baseLayout(blockItems){
        function getBlock(blockItems){
            let fixBlock = []
            blockItems.forEach(function(block){
                if(block.view != undefined){
                    fixBlock.push(block)
                }else if(block.viewCustom=='tabbar'){
                    fixBlock.push(block)
                }else if(block.cols!=undefined){
                    let tempObj = {
                        type:"space",
	                    borderless:true,
                        cols:[
                       ] 
                    }
                    block.cols.forEach(function(allBlockDatagrid){
                      let tempObjBlock = {
                              rows:[
                           ] 
                      }
                      tempObjBlock.rows.push({view:"template", type:"header", template:allBlockDatagrid[0], height:40})
                      tempObjBlock.rows.push({height:10})
                      tempObjBlock.rows.push(allBlockDatagrid[1][0])
                      tempObjBlock.rows.push(allBlockDatagrid[1][1])
                      tempObjBlock.rows.push(allBlockDatagrid[1][2])
                      tempObj.cols.push(tempObjBlock)
                      
                    })
                   fixBlock.push(tempObj)
                 }
                else{
                    if(block.rows!=undefined){
                        block.rows.forEach(function(rowBlock){
                            fixBlock.push(rowBlock)
                        })
                    }else{
                        block.forEach(function(itemBlock){
                            fixBlock.push(itemBlock)
                        })
                    }
                }
            })
            fixBlock.push({})
            fixBlock.push({height:30})
            
            return fixBlock
        }

        let output = {
            id:menuId,
            view: "scrollview",
            body: {
                type:"space",
                id:"a1",
                rows:[
                    {
                        view:"toolbar",
                        id:"myToolbar",
                        borderless:true,
                        responsive:"a1",
                        // minWidth:300,
                        height:heightCustom(winFormTitle),
                        cols:[
                            {
                                responsive:"myToolbar",
                                id:"formNameLabel",
                                borderless:true,
                                view:"template",
                                template: "<h3>"+winFormTitle||0+"</h3>",
                                width:(140+webix.html.getTextSize(winFormTitle).width),
                            },
                            // {minWidth:0},
                            {cols:[
                                {},
                                BUTTON.PREVBUTTON("prev"),//berubah
                                BUTTON.NEXTBUTTON("next"),//berubah
                                BUTTON.PREVBLOCKBUTTON("prevBlock"),//berubah
                                BUTTON.NEXTBLOCKBUTTON("nextBlock"),//berubah
                                BUTTON.SEARCHBUTTON("searchValue","/"),//berubah
                                BUTTON.ADDVALUEBUTTON("addValue","addRowDb"),//berubah
                                BUTTON.ADDROWDATABUTTON("addRowDb"),//berubah
                                BUTTON.UPDATEVALUEBUTTON("updateValue"),//berubah
                                BUTTON.DELETEBUTTON("deleteValue"),
                                BUTTON.CLEARBUTTON("clearBtn")
                            ]},
                        ]
                    },
                    {
                        view: "scrollview",
                        minWidth:300,
                        borderless:true,
                        scroll: "y",
                        body:{
                            type:"space",
                            padding:{
                                right:2, left:0, top:0
                            },
                            rows:getBlock(blockItems)
                        }
                    },
                ]
            }
        }
        return output
    }

    baseLayoutReport(blockItems){
        function getBlockReport(blockItems){
            let fixBlock = []
            blockItems.forEach(function(block){
                if(block.view != undefined){
                    fixBlock.push(block)
                }else{
                    block.forEach(function(itemBlock){
                        fixBlock.push(itemBlock)
                    })
                }
            })
            fixBlock.push({cols:[BUTTON.PRINTBUTTON("printBtn",blockItems[0]['id']),BUTTON.CLEARBUTTONRPT("clearBtn",blockItems[0]['id']),[]]}) 
            return fixBlock

            
        }

        let outputReport = {
            id:menuId,
            view: "scrollview",
            body: {
                type:"space",
                id:"a1",
                rows:[
                    {
                        view:"toolbar",
                        id:"myToolbar",
                        responsive:"a1",
                        // minWidth:300,
                        height:heightCustom(winFormTitle),
                        cols:[
                            {
                                responsive:"myToolbar",
                                id:"formNameLabel",
                                borderless:true,
                                view:"template",
                                template: "<h3>"+winFormTitle||0+"</h3>",
                                width:(70+webix.html.getTextSize(winFormTitle).width),
                            },
                            // {minWidth:0},
                            {cols:[
                                {},
                            ]},
                        ]
                    },
                    {
                        view: "scrollview",
                        minWidth:300,
                        borderless:true,
                        scroll: "xy",
                        body:{
                            type:"space",
                            padding:{
                                right:2, left:0, top:0
                            },
                            rows:getBlockReport(blockItems),
                            
                        }
                    },
                ]
            }
        }
        return outputReport
    }
}

function adjustBtn(dataBtn){
    Object.keys(dataBtn).forEach(function(id){
        if(dataBtn[id]==false){
            $$(id).define("hidden",true)
        }
    })
}

let layout = new Layout()