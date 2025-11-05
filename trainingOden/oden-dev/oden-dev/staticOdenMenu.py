import os
from flask import request

kwargs = {
                        "access_menu":
                            {"branch":
                                 ["MZ01", "1GZ1", "RZ01", "XZ01", "1MZ1", "LZ01", "BZ01", "Z001", "1SZ1", "AZ01",
                                  "UZ01", "2JZ1", "JZ01", "1PZ1", "PZ01", "CZ01", "TZ01", "1VZ1"
                                     , "1DZ1", "EZ01", "HZ01", "NZ01", "QZ01", "WZ01", "1YZ1", "1AZ1", "YZ01", "2DZ1",
                                  "1JZ1", "OZ01", "2GZ1", "VZ01", "IZ01", "2AZ1", "KZ01"],
                             "msg": "success",
                             "short_desc": "Y",
                             "status_access":
                                 {"delete": "Y",
                                  "insert": "Y",
                                  "update": "Y"},
                             "success": True}
                        ,
                        "attributes": {
                            "branch_code": "Z001",
                            "company": "SAT",
                            "company_code": "01",
                            "name": "Guest Development Oden",
                            "present_store_code": "Z001",
                            "section": "C2271",
                            "tittle_code": "C2271",
                            "store_status":"H"
                        },
                        "message": "Ada Session ID",
                        "nik": "2209116",
                    }


menu = [['MENU_DEV','List Menu','']]

for formName in os.listdir("application/"):
    if formName!='__pycache__':
        if formName.split(".")[1]=='py':
            form = formName.split(".")[0]
            menu.append([form,form,'MENU_DEV'])

list_menu = (True,{'data':{   'datetime':'26-08-22 03:57:53:576864',
                'menu_id':menu,
                'msg':'success',
                'success':True
}})