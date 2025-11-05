from flask import  request, session, redirect, jsonify, send_file, make_response
from datetime import datetime, date
from flask_session import Session
import psycopg2, json, sys, redis, globalVar, requests, pickle, smtplib, os, uuid, socket, io


APP_NAME = 'SKELETON'
def getLibrary(param) :
    import urllib.request
    print(param)
    result = urllib.request.urlopen(f'{globalVar.URL_LIB}/?lib_id={param}&app_id={APP_NAME}')
    if result.status == 200 :
        rsData = result.read()
        try :
            exec(rsData, globals())
        except :
            raise Exception("Check requirements yang diperlukan / jalankan debug source")
    else :
        raise Exception("Tidak bisa melakukan koneksi ke server standard library")

#def getLibrary(param) :
#    import urllib.request
#    # result = open(f"filepyClientOld/{param}.py","r").read()
#    print(param)
#    result = open(f"cgi-bin/filepyClient/{param}.py","r").read()
#    exec(result, globals())

getLibrary("satlog")
getLibrary("satgetdatetime")
getLibrary("saturl")
getLibrary("satssowebclientnd")
getLibrary("accessoden")
getLibrary("satconnectserver2RO")
getLibrary("satconnectserver2")
getLibrary("lib_errorCodePG")
getLibrary("utilities")
getLibrary("base")
getLibrary("connectredis")
getLibrary("satconnectbucket")

app.secret_key = 'oden'
app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.from_url(f'redis://{globalVar.HOST_REDIS}:{globalVar.PORT_REDIS}', password=globalVar.PASSWORD_REDIS)
app.config['SESSION_COOKIE_NAME'] = 'CLIENT'
app.config['PERMANENT_SESSION_LIFETIME'] = globalVar.TIME_EXPIRED_REDIS
app.config.from_object(__name__)

Session(app)
sso=SSO(app)
menuActive = {}


@app.route("/",methods=["GET"])
def index():
    #=============SSO AUTHENTICATE================#
    cookie = request.cookies.get("ALFAMART")
    menuId = request.args.get('menuId')
    authData = odenAuthorize(sso,cookie,menuId)

        #=========== REDIS =============#
    odenRedis = DatabaseRedis()
    redisKey = "session:"+str(request.cookies.get("CLIENT"))
    if odenRedis.exists(redisKey)[1] == 1:
        odenRedis.expire(redisKey)
        #=========== END REDIS =========#
          
    if authData[0] == False:
        if odenRedis.exists(redisKey)[1] == 1:
            odenRedis.delete(redisKey)
        return redirect(authData[1]['continue_url'])
    kwargs = authData[1]
    session["loggedId"] = kwargs
    #=================END SSO=====================#

    global menuActive
    ajaxData = {}
    dynamicVal = ""
    requestArgs = request.args.get('type')
    vContainer = Container()

    #===============GET LIST MENU==================#
    listMenu = []
    getmenu = kwargs["list_menu"]
    for menu in getmenu[1]['data']['menu_id']:
        listMenu.append(menu[0])
    #===============END LIST MENU==================#

    #=============CEK HAK AKSES MENU===============#
    if len(request.args)!=0:
        menuId = request.args.get("menuId")
        if menuId not in listMenu:
            return redirect(sso.urlLogout)
        if kwargs["access_menu"]["success"] == False:
            return redirect(sso.urlLogout)
    #===========END OF CEK HAK AKSES MENU===========#

    if request.args.get("data") is not None:
        ajaxData = json.loads(request.args.get('data'))
    if requestArgs == "VIEW":
        if menuId not in menuActive.keys():
            stringExec = fileToString(f'./application/{menuId}.py')
            exec(stringExec,globals())
            menuActive.update({menuId:{"vCount":execVcount}})

        exec(menuActive[menuId]["vCount"])
        baseScript = fileToString("templates/baseExec.html")
        baseScript = baseScript.replace("[URL_CDN]",globalVar.URL_CDN)
        stringHtml = fileToString(f'./static/application/{menuId}.js')
        baseScript = baseScript.replace("[contentCustom]",stringHtml)
        baseScript = baseScript.replace("[COMPANY]",kwargs["attributes"]["company_code"])
        sideBar = baseScript.replace("[sidebarCustom]",set_user_menu(getmenu))
        content = sideBar.replace("[formId]",menuId)
        script = content.replace("[NIK_SSO]",kwargs["nik"])
        dynamicVal = script.replace("[NAMA_SSO]",kwargs["attributes"]["name"])
    elif requestArgs == "SELECT":
        allowCharacter = checkSpecialChar(ajaxData)
        if allowCharacter["status"]:
            #=============== CEK CALL FORM ==================#
            if session.get("gVar") is not None:
                if len(session["gVar"]["gCallForm"])!=0:
                    dataCall = session["gVar"]["gCallForm"][len(session["gVar"]["gCallForm"])-1]
                    for gCallForm in reversed(session["gVar"]["gCallForm"]):
                        if(gCallForm["menuId"] == menuId):
                            ajaxData["data"].update(dataCall["callFormParam"]["bindParamCallForm"])
                            break
                        else:
                            ajaxData["data"].update(dataCall["callFormParam"]["bindParamCallBack"])
                            if(session["vForm"].callFormLevel == 0):
                                del session["gVar"]
                                break
                            session["gVar"]["gCallForm"].pop()
                            break
                elif len(session["gVar"]["gCallForm"]) == 0:
                    del session["gVar"]
            #=============== END CALL FORM ==================#
            print("SELECT", ajaxData)
            dynamicVal = vContainer.selectDataStatement(ajaxData,ajaxData['blockName'])
        else:
            dynamicVal = allowCharacter
    elif requestArgs == "INSERT":
        dynamicVal = vContainer.insertDataStatement(ajaxData)
    elif requestArgs == "UPDATE":
        dynamicVal = vContainer.updateDataStatement(ajaxData)
    elif requestArgs == "DELETE":
        dynamicVal = vContainer.deleteDataStatement(ajaxData)
    elif requestArgs == "API":
        allowCharacter = checkSpecialChar(ajaxData)
        if allowCharacter["status"]:
            apiNewInstacne = request.args.get('apiName')
            dynamicVal = globals()[apiNewInstacne]()
        else:
            dynamicVal = allowCharacter
    elif requestArgs == "REPORT":
        nonBaseResult = vContainer.validateNonBase(ajaxData)
        if nonBaseResult['status']:
            dynamicVal = sendApiPrintReport(session["loggedId"],menuId,nonBaseResult['data'][0],cookie)
        else:
            dynamicVal = rMsgBox(nonBaseResult['msg'])
    elif requestArgs == "CALL_FORM":
        allowCharacter = checkSpecialChar(ajaxData)
        if allowCharacter["status"]:
            validateCallForm = validatePkCallForm()
            addOnApi = None
            if validateCallForm["status"]:
                apiNewInstacne = request.args.get('apiName')
                addOnApi = globals()[apiNewInstacne]()
            if addOnApi is None:
                dynamicVal = validateCallForm
            else:
                dynamicVal = addOnApi
        else:
            dynamicVal = allowCharacter
    elif requestArgs == "LOGOUT":
        if odenRedis.exists(redisKey)[1] == 1:
            odenRedis.delete(redisKey)
        session.clear()
        dynamicVal = redirect(sso.urlLogout)
    else:
        baseScript = fileToString("templates/index.html")
        baseScript = baseScript.replace("[URL_CDN]",globalVar.URL_CDN)
        stringHtml = "let content = {}"
        if len(listMenu)==0:
            stringHtml = """let content =
                webix.alert({title:'Access Denied',ok:'Logout',text:'You dont have access',type:'alert-warning'
                }).then(function(){webix.send('/',{'type':'LOGOUT'}, 'GET')})"""
        baseScript = baseScript.replace("[contentCustom]",stringHtml)
        sideBar = baseScript.replace("[sidebarCustom]",set_user_menu(getmenu))
        content = sideBar.replace("[formId]",'')
        script = content.replace("[NIK_SSO]",kwargs["nik"])
        script = script.replace("[NAMA_SSO]",kwargs["attributes"]["name"])
        dynamicVal = script
    del odenRedis
    del vContainer
    dynamicVal = make_response(dynamicVal)
    dynamicVal.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    dynamicVal.headers["Pragma"] = "no-cache"
    dynamicVal.headers["Expires"] = "0"
    return dynamicVal 

@app.route("/fileOden",methods=["POST"])
def upload():
    #=============SSO AUTHENTICATE================#
    cookie = request.cookies.get("ALFAMART")
    menuId = request.form.get('menuId') or request.json.get('menuId')
    authData = odenAuthorize(sso,cookie,menuId)
    #     #=========== REDIS =============#
    odenRedis = DatabaseRedis()
    redisKey = "session:"+str(request.cookies.get("CLIENT"))
    if odenRedis.exists(redisKey)[1] == 1:
        odenRedis.expire(redisKey)
    #     #=========== END REDIS =========#

    if authData[0] == False:
        if odenRedis.exists(redisKey)[1] == 1:
            odenRedis.delete(redisKey)
        return redirect(authData[1]['continue_url'])
    kwargs = authData[1]
    session["loggedId"] = kwargs
    # print("session masuk", session['loggedId'])
    # #=================END SSO=====================#

    global menuActive
    ajaxData = {}
    dynamicVal = ""
    requestForm = request.form.get('type')
    vContainer = Container()

    # #===============GET LIST MENU==================#
    listMenu = []
    getmenu = kwargs["list_menu"]
    for menu in getmenu[1]['data']['menu_id']:
        listMenu.append(menu[0])
    # #===============END LIST MENU==================#

    # #=============CEK HAK AKSES MENU===============#
    if len(request.form)!=0:
        menuId = request.form.get("menuId")
        if menuId not in listMenu:
            return redirect(sso.urlLogout)
        if kwargs["access_menu"]["success"] == False:
            return redirect(sso.urlLogout)
    # #===========END OF CEK HAK AKSES MENU===========#

    if request.form.get('type') == "UPLOADFILES":
        apiNewInstance = request.form.get('apiName')
        dynamicVal = globals()[apiNewInstance]("uploadFile")
    elif request.json.get('type') == "DOWNLOADFILES":
        apiNewInstance = request.json['apiName']
        dynamicVal = globals()[apiNewInstance]("downloadFile")
    elif request.json.get('type') == "DELETEFILES":
        apiNewInstance = request.json['apiName']
        dynamicVal = globals()[apiNewInstance]("deleteFile")
    elif request.json.get('type') == "CREATESPREADSHEET":
        apiNewInstance = request.json['apiName']
        dynamicVal = globals()[apiNewInstance]("create")
    elif request.json.get('type') == "GENERATESPREADSHEET":
        apiNewInstance = request.json['apiName']
        dynamicVal = globals()[apiNewInstance]("generate")
    elif request.json.get('type') == "CALCULATESPREADSHEET":
        apiNewInstance = request.json['apiName']
        dynamicVal = globals()[apiNewInstance]("calculate")
    
    return dynamicVal

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8125, debug=True)
