# ====================== LIST OF DATA BLOCK CLASS ======================
class MSDEND_CPegawai(FormLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "pg_id = %(pgid)s"
        self.databaseTable = "public.pegawai"
        self.nonVisibleItems = [["pg_create_user","createUser"], ["pg_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class MSDEND_CRecordPegawai(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE PEGAWAI ======================
class MSDEND_Cpg_id(TextPrimary):
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
        # pgid = self.item("pgid")
        # pgdeptid = self.item("pgdeptid")
        # pgfirstname = self.item("pgfirstname")
        # pglastname = self.item("pglastname")
        # pgtgllahir = self.item("pgtgllahir")
        # pgtglkerja = self.item("pgtglkerja")
        # pgjabatan = self.item("pgjabatan")
        # pgemail = self.item("pgemail")
        # pgnomortelp = self.item("pgnomortelp")
        # pgalamat = self.item("pgalamat")
        # pgstatus = self.item("pgstatus")
        # pgbahasa = self.item("pgbahasa")
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_dept_id(NumericNormal):
    lengthItem = 15
    itemId = "pgdeptid"
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

class MSDEND_Cpg_first_name(TextNormal):
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

class MSDEND_Cpg_last_name(TextNormal):
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

class MSDEND_Cpg_tgl_lahir(Calendar):
    lengthItem = 20
    itemId = "pgtgllahir"
    databaseColumn = "pg_tgl_lahir"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_tgl_lahir
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_tgl_kerja(Calendar):
    lengthItem = 20
    itemId = "pgtglkerja"
    databaseColumn = "pg_tgl_kerja"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_tgl_kerja
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_jabatan(TextNormal):
    lengthItem = 100
    itemId = "pgjabatan"
    databaseColumn = "pg_jabatan"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_jabatan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_email(TextNormal):
    lengthItem = 100
    itemId = "pgemail"
    databaseColumn = "pg_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_nomor_telp(TextNormal):
    lengthItem = 20
    itemId = "pgnomortelp"
    databaseColumn = "pg_nomor_telp"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_nomor_telp
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_alamat(TextNormal):
    lengthItem = 100
    itemId = "pgalamat"
    databaseColumn = "pg_alamat"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_alamat
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_status(TextNormal):
    lengthItem = 20
    itemId = "pgstatus"
    databaseColumn = "pg_status"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_status
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MSDEND_Cpg_bahasa(TextNormal):
    lengthItem = 10
    itemId = "pgbahasa"
    databaseColumn = "pg_bahasa"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column pg_bahasa
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE PEGAWAI ======================

execVcount = """
session["loggedId"] = kwargs
MSDEND_vContainer = Container()
MSDEND_vForm = Form()
MSDEND_vContainer.update(MSDEND_vForm)
MSDEND_vBlockPegawai = MSDEND_CPegawai("PEGAWAI")
MSDEND_vBlockPegawai.setListObj([MSDEND_Cpg_id, MSDEND_Cpg_dept_id, MSDEND_Cpg_first_name, MSDEND_Cpg_last_name, MSDEND_Cpg_tgl_lahir, MSDEND_Cpg_tgl_kerja, MSDEND_Cpg_jabatan, MSDEND_Cpg_email, MSDEND_Cpg_nomor_telp, MSDEND_Cpg_alamat, MSDEND_Cpg_status, MSDEND_Cpg_bahasa])
MSDEND_vBlockPegawai.ObjRecord = MSDEND_CRecordPegawai

MSDEND_vContainer.getForm().dataBlocks = []
MSDEND_vContainer.getForm().dataBlocks.append(MSDEND_vBlockPegawai)
"""

#NEW FORM INSTANCE
def newInstance_MS_DETAIL_ND_PEGAWAI():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

