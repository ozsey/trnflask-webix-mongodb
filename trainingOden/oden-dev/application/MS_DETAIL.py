# ====================== LIST OF DATA BLOCK CLASS ======================
class MSDE_CDepartemen(FormLayout):
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
class MSDE_CPegawai(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "pg_dept_id = %(deptid)s"
        self.databaseTable = "public.pegawai"
        self.nonVisibleItems = [["pg_create_user","createUser"], ["pg_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mspe_desc as pendidikandesc
            FROM public.ms_pendidikan
            where mspe_code = %(pgpendidikan)s
        """ 
        param = ["pgpendidikan"]
        setDesc = ["pendidikandesc"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class MSDE_CRecordDepartemen(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MSDE_CRecordPegawai(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE DEPARTEMEN ======================
class MSDE_Cdept_id(TextPrimary):
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

class MSDE_Cdept_name(TextNormal):
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

class MSDE_Cdept_kepala(TextNormal):
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
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cdept_lokasi(TextNormal):
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

class MSDE_Cdept_keuangan(NumericNormal):
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

class MSDE_Cdept_nomor_telp(TextNormal):
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

class MSDE_Cdept_email(TextNormal):
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

class MSDE_Cdept_desc(TextNormal):
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

class MSDE_Cdept_date(Calendar):
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

# ====================== LIST OF COLUMN TABLE PEGAWAI ======================
class MSDE_Cpg_id(TextPrimary):
    lengthItem = 10
    itemId = "pgid"
    databaseColumn = "pg_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_id
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
        # pgid = vContainer.block("ODENTABLEHEAD").item("pgid")
        # pgdeptid = vContainer.block("ODENTABLEHEAD").item("pgdeptid")
        # pgfirstname = vContainer.block("ODENTABLEHEAD").item("pgfirstname")
        # pglastname = vContainer.block("ODENTABLEHEAD").item("pglastname")
        # pgtgllahir = vContainer.block("ODENTABLEHEAD").item("pgtgllahir")
        # pgtglkerja = vContainer.block("ODENTABLEHEAD").item("pgtglkerja")
        # pgjabatan = vContainer.block("ODENTABLEHEAD").item("pgjabatan")
        # pgemail = vContainer.block("ODENTABLEHEAD").item("pgemail")
        # pgnomortelp = vContainer.block("ODENTABLEHEAD").item("pgnomortelp")
        # pgalamat = vContainer.block("ODENTABLEHEAD").item("pgalamat")
        # pgstatus = vContainer.block("ODENTABLEHEAD").item("pgstatus")
        # pgpendidikan = vContainer.block("ODENTABLEHEAD").item("pgpendidikan")
        # pgjeniskelamin = vContainer.block("ODENTABLEHEAD").item("pgjeniskelamin")
        # pghobi = vContainer.block("ODENTABLEHEAD").item("pghobi")
        # pgbahasa = vContainer.block("ODENTABLEHEAD").item("pgbahasa")
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_dept_id(NumericNormal):
    lengthItem = 15
    itemId = "deptid"
    databaseColumn = "pg_dept_id"
    databaseItem = True
    nullable = False
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_dept_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_first_name(TextNormal):
    lengthItem = 50
    itemId = "pgfirstname"
    databaseColumn = "pg_first_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_first_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_last_name(TextNormal):
    lengthItem = 50
    itemId = "pglastname"
    databaseColumn = "pg_last_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_last_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_pendidikan(Lov):
    lengthItem = 10
    itemId = "pgpendidikan"
    databaseColumn = "pg_pendidikan"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_pendidikan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_jenis_kelamin(ComboList):
    lengthItem = 10
    itemId = "pgjeniskelamin"
    databaseColumn = "pg_jenis_kelamin"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_jenis_kelamin
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpg_hobi(TextNormal):
    lengthItem = 20
    itemId = "pghobi"
    databaseColumn = "pg_hobi"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_hobi
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDE_Cpendidikan_desc(TextItem):
    itemId = "pendidikandesc"
    databaseItem = False

# ====================== LIST OF COLUMN TABLE PEGAWAI ======================

execVcount = """
session["loggedId"] = kwargs
MSDE_vContainer = Container()
MSDE_vForm = Form()
MSDE_vContainer.update(MSDE_vForm)
MSDE_vBlockDepartemen = MSDE_CDepartemen("DEPARTEMEN")
MSDE_vBlockDepartemen.setListObj([MSDE_Cdept_id, MSDE_Cdept_name, MSDE_Cdept_kepala, MSDE_Cdept_lokasi, MSDE_Cdept_keuangan, MSDE_Cdept_nomor_telp, MSDE_Cdept_email, MSDE_Cdept_desc, MSDE_Cdept_date])
MSDE_vBlockDepartemen.ObjRecord = MSDE_CRecordDepartemen

MSDE_vBlockPegawai = MSDE_CPegawai("PEGAWAI")
MSDE_vBlockPegawai.relationBlock = MSDE_vBlockDepartemen
MSDE_vBlockPegawai.setListObj([MSDE_Cpg_id, MSDE_Cpg_dept_id, MSDE_Cpg_first_name, MSDE_Cpg_last_name,  MSDE_Cpg_pendidikan, MSDE_Cpg_jenis_kelamin, MSDE_Cpg_hobi, MSDE_Cpendidikan_desc])
MSDE_vBlockPegawai.ObjRecord = MSDE_CRecordPegawai

MSDE_vContainer.getForm().dataBlocks = []
MSDE_vContainer.getForm().dataBlocks.append(MSDE_vBlockDepartemen)
MSDE_vContainer.getForm().dataBlocks.append(MSDE_vBlockPegawai)
"""

#NEW FORM INSTANCE
def newInstance_MS_DETAIL_DEPARTEMEN():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MS_DETAIL_PEGAWAI():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def comboListHobi_MS_DETAIL():
    sql = """
            select hb_code as id, hb_desc as value
            from public.hobi
    """
    return selectHeaderQueryRO(sql)

def lov_pgpendidikan_MS_DETAIL():
    ajaxData = json.loads(request.args.get("data"))
    sqlLov = """
            select
                mspe_code as lovKode,
                mspe_code as lovDesc
            from public.ms_pendidikan
            where
            (mspe_code like %(search)s or mspe_desc like %(search)s)
            offset %(offset)s
            limit 50
    """
    result = selectDataHeaderQueryRO(sqlLov, ajaxData)
    print(413, "selectDataHeaderQueryRO", result)
    return result

def validateLOVPendidikan_MS_DETAIL():
    ajaxData = json.loads(request.args.get("data"))
    sql = """
        select
            mspe_desc as pendidikandesc
        from public.ms_pendidikan
        where
        mspe_code = %(pgpendidikan)s
    """
    result = selectDataQueryRO(sql, ajaxData)
    print(426, "selectDataQueryRO", result)
    return result

def callForm_MS_DETAIL_ND_MS_DETAIL():
    pass
