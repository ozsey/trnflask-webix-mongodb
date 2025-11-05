import logging
from globalVar import LOG_NAME
import os
from datetime import datetime
from pathlib import Path

class Logger() :
    def __init__(self) :
        if os.environ.get("CLOUD_APPS") == "CLOUD_RUN":
            self.__logger = logging
            self.__logger.basicConfig(format='%(message)s', level=logging.INFO)
        else :
            Path(f'{os.getcwd()}/log').mkdir(parents=True, exist_ok=True) # asli
            self.__logger = f'{os.getcwd()}/log/{datetime.now().strftime("%d-%m-%Y")}.txt'

    def __logStruct(self, severity, message):
        if os.environ.get("CLOUD_APPS") == "CLOUD_RUN" :
            dictParam = f"""{severity} | {datetime.now().strftime("%Y-%m-%d")} | {datetime.now().strftime("%H:%M:%S")} | {message}"""
            self.__logger.log_text(dictParam, severity=severity)
        else :
            fileOpen = open(self.__logger, "a")
            currentDatetime = datetime.now()
            dictParam = currentDatetime.strftime('%Y/%m/%d %H:%M:%S %f') +" | "+str(message)+" | "+str(severity)
            fileOpen.write(f'{str(dictParam)}\n')
            fileOpen.close()

    def debug(self, message):
        tempmsg = f"{LOG_NAME} | {message}"
        self.__logStruct(severity='DEBUG', message=tempmsg)

    def info(self, message):
        tempmsg = f"{LOG_NAME} | {message}"
        self.__logStruct(severity='INFO', message=tempmsg)

    def warning(self, message):
        tempmsg = f"{LOG_NAME} | {message}"
        self.__logStruct(severity='WARNING', message=tempmsg)

    def error(self, message):
        tempmsg = f"{LOG_NAME} | {message}"
        self.__logStruct(severity='ERROR', message=tempmsg)

    def critical(self, message):
        tempmsg = f"{LOG_NAME} | {message}"
        self.__logStruct(severity='CRITICAL', message=tempmsg)

log = Logger()