# ====================== LIST OF DATA BLOCK CLASS ======================
class MULTI_CRc_Grouping_Posisi(FormLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "public.rc_grouping_posisi"
        self.nonVisibleItems = [["rcgp_create_user","createUser"], ["rcgp_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
class MULTI_CRc_Group_Posisi_Status_Nikah(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgpn_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_status_nikah"
        self.nonVisibleItems = [["rgpn_create_user","createUser"], ["rgpn_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mssn_desc as rgpndescstatus
            FROM public.ms_status_nikah
            where mssn_code = %(rgpnkodestatus)s
        """ 
        param = ["rgpnkodestatus"]
        setDesc = ["rgpndescstatus"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}

class MULTI_CRc_Group_Posisi_Sim(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgps_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_sim"
        self.nonVisibleItems = [["rgps_create_user","createUser"], ["rgps_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mssim_desc as rgpsdescsim
            FROM public.ms_sim
            where mssim_code = %(rgpskodesim)s
        """ 
        param = ["rgpskodesim"]
        setDesc = ["rgpsdescsim"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
    
        
class MULTI_CRc_Group_Posisi_Kemampuan(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgpk_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_kemampuan"
        self.nonVisibleItems = [["rgpk_create_user","createUser"], ["rgpk_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mhs_desc as rgpkdesckemampuan
            FROM public.ms_hard_skill
            where mhs_code = %(rgpkkodekemampuan)s
        """ 
        param = ["rgpkkodekemampuan"]
        setDesc = ["rgpkdesckemampuan"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
        
class MULTI_CRc_Group_Posisi_Bahasa(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgpb_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_bahasa"
        self.nonVisibleItems = [["rgpb_create_user","createUser"], ["rgpb_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mb_desc as rgpbdescbahasa
            FROM public.ms_bahasa
            where mb_code = %(rgpbkodebahasa)s
        """ 
        param = ["rgpbkodebahasa"]
        setDesc = ["rgpbdescbahasa"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
        
class MULTI_CRc_Group_Posisi_Pendidikan(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgpp_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_pendidikan"
        self.nonVisibleItems = [["rgpp_create_user","createUser"], ["rgpp_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select mspe_desc as rgppdescpendidikan
            FROM public.ms_pendidikan
            where mspe_code = %(rgppkodependidikan)s
        """ 
        param = ["rgppkodependidikan"]
        setDesc = ["rgppdescpendidikan"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
        
class MULTI_CRc_Group_Posisi_Jurusan(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = "rgpj_rcgp_code = %(rcgpcode)s"
        self.databaseTable = "public.rc_group_posisi_jurusan"
        self.nonVisibleItems = [["rgpj_create_user","createUser"], ["rgpj_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
            select msjr_desc as rgpjdescjurusan
            FROM public.ms_jurusan
            where msjr_code = %(rgpjkodejurusan)s
        """ 
        param = ["rgpjkodejurusan"]
        setDesc = ["rgpjdescjurusan"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
        
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class MULTI_CRecordRc_Grouping_Posisi(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Status_Nikah(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Sim(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Kemampuan(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Bahasa(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Pendidikan(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MULTI_CRecordRc_Group_Posisi_Jurusan(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE RC_GROUPING_POSISI ======================
class MULTI_Crcgp_code(TextPrimary):
    lengthItem = 7
    itemId = "rcgpcode"
    databaseColumn = "rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # rcgpcode = self.item("rcgpcode")
        # rcgpdivcode = self.item("rcgpdivcode")
        # rcgpdesc = self.item("rcgpdesc")
        # rcgpjobdesc = self.item("rcgpjobdesc")
        # rcgpjeniskelamin = self.item("rcgpjeniskelamin")
        # rcgpusiamin = self.item("rcgpusiamin")
        # rcgpusiamax = self.item("rcgpusiamax")
        # rcgppendidikan = self.item("rcgppendidikan")
        # rcgpjurusan = self.item("rcgpjurusan")
        # rcgpnosim = self.item("rcgpnosim")
        # rcgppengalaman = self.item("rcgppengalaman")
        # rcgpkualifikasi = self.item("rcgpkualifikasi")
        # rcgpbahasa = self.item("rcgpbahasa")
        # rcgprckpocode = self.item("rcgprckpocode")
        # rcgpipk = self.item("rcgpipk")
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_div_code(TextNormal):
    lengthItem = 13
    itemId = "rcgpdivcode"
    databaseColumn = "rcgp_div_code"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_div_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_desc(TextNormal):
    lengthItem = 100
    itemId = "rcgpdesc"
    databaseColumn = "rcgp_desc"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_desc
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_job_desc(TextNormal):
    lengthItem = 1000
    itemId = "rcgpjobdesc"
    databaseColumn = "rcgp_job_desc"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_job_desc
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_jenis_kelamin(TextNormal):
    lengthItem = 1
    itemId = "rcgpjeniskelamin"
    databaseColumn = "rcgp_jenis_kelamin"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_jenis_kelamin
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_usia_min(TextNormal):
    lengthItem = 3
    itemId = "rcgpusiamin"
    databaseColumn = "rcgp_usia_min"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_usia_min
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_usia_max(TextNormal):
    lengthItem = 3
    itemId = "rcgpusiamax"
    databaseColumn = "rcgp_usia_max"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_usia_max
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_pendidikan(TextNormal):
    lengthItem = 100
    itemId = "rcgppendidikan"
    databaseColumn = "rcgp_pendidikan"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_pendidikan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_jurusan(TextNormal):
    lengthItem = 100
    itemId = "rcgpjurusan"
    databaseColumn = "rcgp_jurusan"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_jurusan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_no_sim(TextNormal):
    lengthItem = 100
    itemId = "rcgpnosim"
    databaseColumn = "rcgp_no_sim"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_no_sim
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_pengalaman(TextNormal):
    lengthItem = 500
    itemId = "rcgppengalaman"
    databaseColumn = "rcgp_pengalaman"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_pengalaman
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_kualifikasi(TextNormal):
    lengthItem = 1000
    itemId = "rcgpkualifikasi"
    databaseColumn = "rcgp_kualifikasi"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_kualifikasi
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_bahasa(TextNormal):
    lengthItem = 250
    itemId = "rcgpbahasa"
    databaseColumn = "rcgp_bahasa"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_bahasa
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_rckpo_code(TextNormal):
    lengthItem = 50
    itemId = "rcgprckpocode"
    databaseColumn = "rcgp_rckpo_code"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_rckpo_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crcgp_ipk(NumericNormal):
    lengthItem = 15
    itemId = "rcgpipk"
    databaseColumn = "rcgp_ipk"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rcgp_ipk
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUPING_POSISI ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_STATUS_NIKAH ======================
class MULTI_Crgpn_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgpn_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpn_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # rcgpcode = self.item("rcgpcode")
        # rcgpdivcode = self.item("rcgpdivcode")
        # rcgpdesc = self.item("rcgpdesc")
        # rcgpjobdesc = self.item("rcgpjobdesc")
        # rcgpjeniskelamin = self.item("rcgpjeniskelamin")
        # rcgpusiamin = self.item("rcgpusiamin")
        # rcgpusiamax = self.item("rcgpusiamax")
        # rcgppendidikan = self.item("rcgppendidikan")
        # rcgpjurusan = self.item("rcgpjurusan")
        # rcgpnosim = self.item("rcgpnosim")
        # rcgppengalaman = self.item("rcgppengalaman")
        # rcgpkualifikasi = self.item("rcgpkualifikasi")
        # rcgpbahasa = self.item("rcgpbahasa")
        # rcgprckpocode = self.item("rcgprckpocode")
        # rcgpipk = self.item("rcgpipk")
        # rgpnrcgpcode = vContainer.block("ODENTABLEHEAD").item("rgpnrcgpcode")
        # rgpnkodestatus = vContainer.block("ODENTABLEHEAD").item("rgpnkodestatus")
        # rgpsrcgpcode = self.item("rgpsrcgpcode")
        # rgpskodesim = self.item("rgpskodesim")
        # rgpkrcgpcode = self.item("rgpkrcgpcode")
        # rgpkkodekemampuan = self.item("rgpkkodekemampuan")
        # rgpbrcgpcode = self.item("rgpbrcgpcode")
        # rgpbkodebahasa = self.item("rgpbkodebahasa")
        # rgpprcgpcode = self.item("rgpprcgpcode")
        # rgppkodependidikan = self.item("rgppkodependidikan")
        # rgpjrcgpcode = self.item("rgpjrcgpcode")
        # rgpjkodejurusan = self.item("rgpjkodejurusan")
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgpn_kode_status(TextPrimary):
    lengthItem = 20
    itemId = "rgpnkodestatus"
    databaseColumn = "rgpn_kode_status"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpn_kode_status
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_STATUS_NIKAH ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_SIM ======================
class MULTI_Crgps_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgps_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgps_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgps_kode_sim(TextPrimary):
    lengthItem = 10
    itemId = "rgpskodesim"
    databaseColumn = "rgps_kode_sim"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgps_kode_sim
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_SIM ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_KEMAMPUAN ======================
class MULTI_Crgpk_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgpk_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpk_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgpk_kode_kemampuan(TextPrimary):
    lengthItem = 20
    itemId = "rgpkkodekemampuan"
    databaseColumn = "rgpk_kode_kemampuan"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpk_kode_kemampuan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_KEMAMPUAN ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_BAHASA ======================
class MULTI_Crgpb_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgpb_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpb_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgpb_kode_bahasa(TextPrimary):
    lengthItem = 20
    itemId = "rgpbkodebahasa"
    databaseColumn = "rgpb_kode_bahasa"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpb_kode_bahasa
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_BAHASA ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_PENDIDIKAN ======================
class MULTI_Crgpp_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgpp_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpp_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgpp_kode_pendidikan(TextPrimary):
    lengthItem = 20
    itemId = "rgppkodependidikan"
    databaseColumn = "rgpp_kode_pendidikan"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpp_kode_pendidikan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_PENDIDIKAN ======================

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_JURUSAN ======================
class MULTI_Crgpj_rcgp_code(TextPrimary):
    lengthItem = 20
    itemId = "rcgpcode"
    databaseColumn = "rgpj_rcgp_code"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpj_rcgp_code
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MULTI_Crgpj_kode_jurusan(TextPrimary):
    lengthItem = 20
    itemId = "rgpjkodejurusan"
    databaseColumn = "rgpj_kode_jurusan"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column rgpj_kode_jurusan
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE RC_GROUP_POSISI_JURUSAN ======================

execVcount = """
session["loggedId"] = kwargs
MULTI_vContainer = Container()
MULTI_vForm = Form()
MULTI_vContainer.update(MULTI_vForm)
MULTI_vBlockRc_Grouping_Posisi = MULTI_CRc_Grouping_Posisi("RC_GROUPING_POSISI")
MULTI_vBlockRc_Grouping_Posisi.setListObj([MULTI_Crcgp_code, MULTI_Crcgp_div_code, MULTI_Crcgp_desc, MULTI_Crcgp_job_desc, MULTI_Crcgp_jenis_kelamin, MULTI_Crcgp_usia_min, MULTI_Crcgp_usia_max, MULTI_Crcgp_pendidikan, MULTI_Crcgp_jurusan, MULTI_Crcgp_no_sim, MULTI_Crcgp_pengalaman, MULTI_Crcgp_kualifikasi, MULTI_Crcgp_bahasa, MULTI_Crcgp_rckpo_code, MULTI_Crcgp_ipk])
MULTI_vBlockRc_Grouping_Posisi.ObjRecord = MULTI_CRecordRc_Grouping_Posisi

MULTI_vBlockRc_Group_Posisi_Status_Nikah = MULTI_CRc_Group_Posisi_Status_Nikah("RC_GROUP_POSISI_STATUS_NIKAH")
MULTI_vBlockRc_Group_Posisi_Status_Nikah.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Status_Nikah.setListObj([MULTI_Crgpn_rcgp_code, MULTI_Crgpn_kode_status])
MULTI_vBlockRc_Group_Posisi_Status_Nikah.ObjRecord = MULTI_CRecordRc_Group_Posisi_Status_Nikah

MULTI_vBlockRc_Group_Posisi_Sim = MULTI_CRc_Group_Posisi_Sim("RC_GROUP_POSISI_SIM")
MULTI_vBlockRc_Group_Posisi_Sim.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Sim.setListObj([MULTI_Crgps_rcgp_code, MULTI_Crgps_kode_sim])
MULTI_vBlockRc_Group_Posisi_Sim.ObjRecord = MULTI_CRecordRc_Group_Posisi_Sim

MULTI_vBlockRc_Group_Posisi_Kemampuan = MULTI_CRc_Group_Posisi_Kemampuan("RC_GROUP_POSISI_KEMAMPUAN")
MULTI_vBlockRc_Group_Posisi_Kemampuan.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Kemampuan.setListObj([MULTI_Crgpk_rcgp_code, MULTI_Crgpk_kode_kemampuan])
MULTI_vBlockRc_Group_Posisi_Kemampuan.ObjRecord = MULTI_CRecordRc_Group_Posisi_Kemampuan

MULTI_vBlockRc_Group_Posisi_Bahasa = MULTI_CRc_Group_Posisi_Bahasa("RC_GROUP_POSISI_BAHASA")
MULTI_vBlockRc_Group_Posisi_Bahasa.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Bahasa.setListObj([MULTI_Crgpb_rcgp_code, MULTI_Crgpb_kode_bahasa])
MULTI_vBlockRc_Group_Posisi_Bahasa.ObjRecord = MULTI_CRecordRc_Group_Posisi_Bahasa

MULTI_vBlockRc_Group_Posisi_Pendidikan = MULTI_CRc_Group_Posisi_Pendidikan("RC_GROUP_POSISI_PENDIDIKAN")
MULTI_vBlockRc_Group_Posisi_Pendidikan.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Pendidikan.setListObj([MULTI_Crgpp_rcgp_code, MULTI_Crgpp_kode_pendidikan])
MULTI_vBlockRc_Group_Posisi_Pendidikan.ObjRecord = MULTI_CRecordRc_Group_Posisi_Pendidikan

MULTI_vBlockRc_Group_Posisi_Jurusan = MULTI_CRc_Group_Posisi_Jurusan("RC_GROUP_POSISI_JURUSAN")
MULTI_vBlockRc_Group_Posisi_Jurusan.relationBlock = MULTI_vBlockRc_Grouping_Posisi
MULTI_vBlockRc_Group_Posisi_Jurusan.setListObj([MULTI_Crgpj_rcgp_code, MULTI_Crgpj_kode_jurusan])
MULTI_vBlockRc_Group_Posisi_Jurusan.ObjRecord = MULTI_CRecordRc_Group_Posisi_Jurusan

MULTI_vContainer.getForm().dataBlocks = []
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Grouping_Posisi)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Status_Nikah)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Sim)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Kemampuan)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Bahasa)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Pendidikan)
MULTI_vContainer.getForm().dataBlocks.append(MULTI_vBlockRc_Group_Posisi_Jurusan)
"""

#NEW FORM INSTANCE
def newInstance_MULTIVIEW_RC_GROUPING_POSISI():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_STATUS_NIKAH():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_SIM():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_KEMAMPUAN():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_BAHASA():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_PENDIDIKAN():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MULTIVIEW_RC_GROUP_POSISI_JURUSAN():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance


# def statusnikah_MULTIVIEW():
#     ajaxData = json.loads(request.args.get("data"))
#     sql = """
#         select count(*) from public.ms_status_nikah
#         where mssn_code = %(kode)s
#     """
#     # sql = """
#     #     select mssn_desc as deskripsi
#     #     from public.ms_status_nikah
#     #     where mssn_code = %(kode)s
#     # """
#     result = selectDataHeaderQueryRO(sql, ajaxData)
#     print(846, result)
# 
#     if (len(result["data"]) != 0):
#         if(int(result["data"][0]["count"]) != 0):
#             return{"status": True, "data": [], "msg": "Kode ditemukan di master."}
#         else:
#             return{"status": False, "data": result["data"][0], "msg": "Kode [ajaxData['kode']]  tidak ditemukan di master."}

def statusnikah_MULTIVIEW():
    ajaxData = json.loads(request.args.get("data"))
    
    sql_check = """
        SELECT COUNT(*) FROM public.ms_status_nikah
        WHERE mssn_code = %(kode)s
    """
    
    result_check = selectDataHeaderQueryRO(sql_check, ajaxData)
    print(846, result_check)
    
    if len(result_check["data"]) != 0 and int(result_check["data"][0]["count"]) != 0:
        sql_desc = """
            SELECT mssn_desc AS deskripsi
            FROM public.ms_status_nikah
            WHERE mssn_code = %(kode)s
        """
        
        result_desc = selectDataHeaderQueryRO(sql_desc, ajaxData)
        
        if result_desc["data"]:
            return {"status": True, "data": result_desc["data"][0], "msg": "Kode ditemukan di master."}
        else:
            return {"status": False, "data": [], "msg": "Deskripsi tidak ditemukan untuk kode yang diberikan."}
    else:
        return {"status": False, "data": [], "msg": f"Kode [{ajaxData['kode']}] tidak ditemukan di master."}
