# ====================== LIST OF DATA BLOCK CLASS ======================
class ODEN_CDepartemen(FormLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "public.departemen"
        self.nonVisibleItems = [["dept_create_user","createUser"], ["dept_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class ODEN_CRecordDepartemen(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE DEPARTEMEN ======================
class ODEN_Cdept_id(TextPrimary):
    lengthItem = 15
    itemId = "deptid"
    databaseColumn = "dept_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """        
        # deptid = self.item("deptid")
        # deptname = self.item("deptname")
        # deptkepala = self.item("deptkepala")
        # deptlokasi = self.item("deptlokasi")
        # deptkeuangan = self.item("deptkeuangan")
        # deptnomortelp = self.item("deptnomortelp")
        # deptemail = self.item("deptemail")
        # deptdesc = self.item("deptdesc")
        # deptdate = self.item("deptdate")
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_name(TextNormal):
    lengthItem = 100
    itemId = "deptname"
    databaseColumn = "dept_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_kepala(TextNormal):
    lengthItem = 100
    itemId = "deptkepala"
    databaseColumn = "dept_kepala"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_kepala
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        deptkepala =self.item("deptkepala").value
        if(deptkepala == "HOSEA"):
            return{"status": False, "msg": "Nama terlalu tanvam dan pemberani", "msg_Param":{}}
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_lokasi(TextNormal):
    lengthItem = 100
    itemId = "deptlokasi"
    databaseColumn = "dept_lokasi"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_lokasi
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_keuangan(NumericNormal):
    lengthItem = 15
    itemId = "deptkeuangan"
    databaseColumn = "dept_keuangan"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_keuangan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_nomor_telp(TextNormal):
    lengthItem = 20
    itemId = "deptnomortelp"
    databaseColumn = "dept_nomor_telp"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_nomor_telp
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_email(TextNormal):
    lengthItem = 100
    itemId = "deptemail"
    databaseColumn = "dept_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_desc(TextNormal):
    lengthItem = 100
    itemId = "deptdesc"
    databaseColumn = "dept_desc"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_desc
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class ODEN_Cdept_date(Calendar):
    lengthItem = 20
    itemId = "deptdate"
    databaseColumn = "dept_date"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column dept_date
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE DEPARTEMEN ======================

execVcount = """
session["loggedId"] = kwargs
ODEN_vContainer = Container()
ODEN_vForm = Form()
ODEN_vContainer.update(ODEN_vForm)
ODEN_vBlockDepartemen = ODEN_CDepartemen("DEPARTEMEN")
ODEN_vBlockDepartemen.setListObj([ODEN_Cdept_id, ODEN_Cdept_name, ODEN_Cdept_kepala, ODEN_Cdept_lokasi, ODEN_Cdept_keuangan, ODEN_Cdept_nomor_telp, ODEN_Cdept_email, ODEN_Cdept_desc, ODEN_Cdept_date])
ODEN_vBlockDepartemen.ObjRecord = ODEN_CRecordDepartemen

ODEN_vContainer.getForm().dataBlocks = []
ODEN_vContainer.getForm().dataBlocks.append(ODEN_vBlockDepartemen)
"""

#NEW FORM INSTANCE
def newInstance_FORM_DEPARTEMEN():
    newInstance = {"status":True,"data":{"deptid":"44"},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

