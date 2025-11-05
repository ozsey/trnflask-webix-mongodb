# SETTING MODUL APLIKASI
MD5 = 'Y'
BASE64 = 'Y'
BZ2 = 'Y'

LOGIN = 'WEB'
MINIMAL_TIME_DIFFERENCE = -60
SALTED_HASH_EXPIRES = 900
LOG_NAME = 'SSO_'+str(LOGIN)
# URL_SERVER = "https://stag-dot-sso-web-sat-prd.et.r.appspot.com"
URL_SERVER = "https://stag-asl.sat.co.id"
URL_SERVER_VERIFY = "http://10.176.42.34"
PRODUCTION = "N" #--> localhost 'N' / app engine 'Y'
PRODUCTION_ODEN = "N"

# SIGNATURE KEY
"""
local       : app id untuk client web
key         : signature key untuk masing-masing app id
continueUrl : value yang hanya dimilik client web
* catatan *
    - APP_ID disini case sensitive
"""
APP_ID = "oden-v3"
SIGNATURE_KEY = "cCoSFRmExoGUaYezkeo5mPzBpcGnydfvrbeHSP3tmSpfAi2frHzAnOIw2tMtMZq6"
CONTINUE_URL = "http://34.101.52.114:8014"

# =================================================== END OF SSO =================================================

import sys
connRO = None
if PRODUCTION == "N":
    URL = 'http://localhost:8080'
    URL_LIB = "http://localhost:6000"
    # URL_CDN = "http://34.128.84.194:8081/js-async"  #lighttpd development
    # URL_CDN = "http://34.128.84.194:8081/js-async"  #lighttpd development
    # URL_CDN = "https://hocdnoden0201.sat.co.id/js-dev-async"   #CDN staging
    URL_CDN = "static/js-async" #static folder development
    URL_REPORT = "http://34.128.84.194:8080/cgi-bin/fw_report.py"
    HOST_REDIS = 'localhost'
    PORT_REDIS = 6379
    PASSWORD_REDIS = "KgY2yVk3aZAdNyyZfx9bpzeEs" 
    TIME_EXPIRED_REDIS = 900
    SATBUCKET_DESTINATION_LOCAL_FOLDER = ""
    SATBUCKET_FILE_EXTENSION = ""
    DEFAULT_BUCKET = "oden-upload-training"
    DEFAULT_LOCAL = "/home/nicky" #ganti userName dengan nama user pada direktori CE
    DB_NAME = 'training'
elif PRODUCTION == "Y":
    URL = 'https://dev-odenprojectv2-dot-satdev-magang.df.r.appspot.com'
    URL_LIB = "http://10.176.42.24:8081"
    # URL_CDN = "https://hocdnoden0201.sat.co.id/js"        
    URL_CDN = "https://hocdnoden0201.sat.co.id/js-dev"  #uptodate now
    URL_REPORT = "https://horeporthc0201.sat.co.id/cgi-bin/fw_report.py"
    HOST_REDIS = '127.0.0.1'
    PORT_REDIS = 6379
    PASSWORD_REDIS = None
    TIME_EXPIRED_REDIS = 900
    SATBUCKET_DESTINATION_LOCAL_FOLDER = ""
    SATBUCKET_FILE_EXTENSION = ""
    DEFAULT_BUCKET = "oden-upload"
    DEFAULT_LOCAL = "/home/userName" #ganti userName dengan nama user pada direktori CE
    DB_NAME = 'dbdmhr'
else:
    print('konfigurasi globalVar.PRODUCTION tidak sesuai')
    sys.exit()


