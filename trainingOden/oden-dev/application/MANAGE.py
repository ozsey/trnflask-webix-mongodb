# ====================== LIST OF DATA BLOCK CLASS ======================
class MANG_CCategory(FormLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "wr.category"
        self.nonVisibleItems = [["cat_create_user","createUser"], ["cat_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
class MANG_CSupplier(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        # self.whereclause = "sup_id = %(supid)s"
        self.databaseTable = "wr.supplier"
        self.nonVisibleItems = [["sup_create_user","createUser"], ["sup_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
                select sup_name as supname
                from wr.supplier
                where sup_id = %(supid)s
        """
        param = ["supid"]
        setDesc = ["supname"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}

class MANG_CCashier(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        # self.whereclause = "csh_id = %(cshid)s"
        self.databaseTable = "wr.cashier"
        self.nonVisibleItems = [["csh_create_user","createUser"], ["csh_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
                select csh_first_name as cshfirstname
                from wr.cashier
                where csh_id = %(cshid)s
        """
        param = ["cshid"]
        setDesc = ["cshfirstname"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}

    
class MANG_CItem(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        # self.whereclause = "itm_id = %(itmid)s"
        self.databaseTable = "wr.item"
        self.nonVisibleItems = [["itm_create_user","createUser"], ["itm_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""

    def postSelect(self, data):
        sql = """
                select itm_name as itmname
                from wr.item
                where itm_id = %(itmid)s
        """
        param = ["itmid"]
        setDesc = ["itmname"]
        data = getDataDisplayItem({
            "DATA": data, "BLOCK_TYPE": self.blockType, "SQL": sql, "PARAM": param, "SET_DESC": setDesc
        })
        return {"status": data["status"], "data": data["data"]}
        
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class MANG_CRecordCategory(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MANG_CRecordSupplier(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MANG_CRecordCashier(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class MANG_CRecordItem(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE CATEGORY ======================
class MANG_Ccat_id(TextPrimary):
    lengthItem = 10
    itemId = "catid"
    databaseColumn = "cat_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # catid = self.item("catid")
        # catname = self.item("catname")
        # catdesc = self.item("catdesc")
        # catid = self.item("catid")
        # catname = self.item("catname")
        # catdesc = self.item("catdesc")
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccat_name(TextNormal):
    lengthItem = 100
    itemId = "catname"
    databaseColumn = "cat_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccat_desc(TextNormal):
    lengthItem = 100
    itemId = "catdesc"
    databaseColumn = "cat_desc"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_desc
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccat_id(TextPrimary):
    lengthItem = 10
    itemId = "catid"
    databaseColumn = "cat_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccat_name(TextNormal):
    lengthItem = 100
    itemId = "catname"
    databaseColumn = "cat_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccat_desc(TextNormal):
    lengthItem = 100
    itemId = "catdesc"
    databaseColumn = "cat_desc"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cat_desc
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE CATEGORY ======================

# ====================== LIST OF COLUMN TABLE SUPPLIER ======================
class MANG_Csup_id(TextPrimary):
    lengthItem = 7
    itemId = "supid"
    databaseColumn = "sup_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # catid = self.item("catid")
        # catname = self.item("catname")
        # catdesc = self.item("catdesc")
        # catid = self.item("catid")
        # catname = self.item("catname")
        # catdesc = self.item("catdesc")
        # supid = vContainer.block("ODENTABLEHEAD").item("supid")
        # supname = vContainer.block("ODENTABLEHEAD").item("supname")
        # supalamat = vContainer.block("ODENTABLEHEAD").item("supalamat")
        # supkota = vContainer.block("ODENTABLEHEAD").item("supkota")
        # supprovinsi = vContainer.block("ODENTABLEHEAD").item("supprovinsi")
        # suptelepon = vContainer.block("ODENTABLEHEAD").item("suptelepon")
        # supemail = vContainer.block("ODENTABLEHEAD").item("supemail")
        # cshid = self.item("cshid")
        # cshfirstname = self.item("cshfirstname")
        # cshlastname = self.item("cshlastname")
        # cshaddress = self.item("cshaddress")
        # cshtelephone = self.item("cshtelephone")
        # cshemail = self.item("cshemail")
        # itmid = self.item("itmid")
        # itmcatid = self.item("itmcatid")
        # itmname = self.item("itmname")
        # itmbrand = self.item("itmbrand")
        # itmpurchaseprice = self.item("itmpurchaseprice")
        # itmsalesprice = self.item("itmsalesprice")
        # itmproductiondate = self.item("itmproductiondate")
        # itmstatus = self.item("itmstatus")
        # itmstock = self.item("itmstock")
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_name(TextNormal):
    lengthItem = 25
    itemId = "supname"
    databaseColumn = "sup_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_alamat(TextNormal):
    lengthItem = 30
    itemId = "supalamat"
    databaseColumn = "sup_alamat"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_alamat
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_kota(TextNormal):
    lengthItem = 30
    itemId = "supkota"
    databaseColumn = "sup_kota"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_kota
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_provinsi(TextNormal):
    lengthItem = 30
    itemId = "supprovinsi"
    databaseColumn = "sup_provinsi"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_provinsi
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_telepon(TextNormal):
    lengthItem = 14
    itemId = "suptelepon"
    databaseColumn = "sup_telepon"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_telepon
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Csup_email(TextNormal):
    lengthItem = 20
    itemId = "supemail"
    databaseColumn = "sup_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sup_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE SUPPLIER ======================

# ====================== LIST OF COLUMN TABLE CASHIER ======================
class MANG_Ccsh_id(TextPrimary):
    lengthItem = 10
    itemId = "cshid"
    databaseColumn = "csh_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccsh_first_name(TextNormal):
    lengthItem = 20
    itemId = "cshfirstname"
    databaseColumn = "csh_first_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_first_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccsh_last_name(TextNormal):
    lengthItem = 20
    itemId = "cshlastname"
    databaseColumn = "csh_last_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_last_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccsh_address(TextNormal):
    lengthItem = 100
    itemId = "cshaddress"
    databaseColumn = "csh_address"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_address
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccsh_telephone(TextNormal):
    lengthItem = 15
    itemId = "cshtelephone"
    databaseColumn = "csh_telephone"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_telephone
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Ccsh_email(TextNormal):
    lengthItem = 50
    itemId = "cshemail"
    databaseColumn = "csh_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column csh_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE CASHIER ======================

# ====================== LIST OF COLUMN TABLE ITEM ======================
class MANG_Citm_id(TextPrimary):
    lengthItem = 10
    itemId = "itmid"
    databaseColumn = "itm_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_cat_id(TextNormal):
    lengthItem = 10
    itemId = "itmcatid"
    databaseColumn = "itm_cat_id"
    databaseItem = True
    nullable = False
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_cat_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_name(TextNormal):
    lengthItem = 100
    itemId = "itmname"
    databaseColumn = "itm_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_brand(TextNormal):
    lengthItem = 100
    itemId = "itmbrand"
    databaseColumn = "itm_brand"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_brand
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_purchase_price(NumericNormal):
    lengthItem = 15
    itemId = "itmpurchaseprice"
    databaseColumn = "itm_purchase_price"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_purchase_price
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_sales_price(NumericNormal):
    lengthItem = 15
    itemId = "itmsalesprice"
    databaseColumn = "itm_sales_price"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_sales_price
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_production_date(Calendar):
    lengthItem = 20
    itemId = "itmproductiondate"
    databaseColumn = "itm_production_date"
    databaseItem = True
    nullable = False
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_production_date
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_status(TextNormal):
    lengthItem = 20
    itemId = "itmstatus"
    databaseColumn = "itm_status"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_status
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class MANG_Citm_stock(NumericNormal):
    lengthItem = 15
    itemId = "itmstock"
    databaseColumn = "itm_stock"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column itm_stock
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE ITEM ======================

execVcount = """
session["loggedId"] = kwargs
MANG_vContainer = Container()
MANG_vForm = Form()
MANG_vContainer.update(MANG_vForm)
MANG_vBlockCategory = MANG_CCategory("CATEGORY")
MANG_vBlockCategory.setListObj([MANG_Ccat_id, MANG_Ccat_name, MANG_Ccat_desc, MANG_Ccat_id, MANG_Ccat_name, MANG_Ccat_desc])
MANG_vBlockCategory.ObjRecord = MANG_CRecordCategory

MANG_vBlockSupplier = MANG_CSupplier("SUPPLIER")
MANG_vBlockSupplier.relationBlock = MANG_vBlockCategory
MANG_vBlockSupplier.setListObj([MANG_Csup_id, MANG_Csup_name, MANG_Csup_alamat, MANG_Csup_kota, MANG_Csup_provinsi, MANG_Csup_telepon, MANG_Csup_email])
MANG_vBlockSupplier.ObjRecord = MANG_CRecordSupplier

MANG_vBlockCashier = MANG_CCashier("CASHIER")
MANG_vBlockCashier.relationBlock = MANG_vBlockCategory
MANG_vBlockCashier.setListObj([MANG_Ccsh_id, MANG_Ccsh_first_name, MANG_Ccsh_last_name, MANG_Ccsh_address, MANG_Ccsh_telephone, MANG_Ccsh_email])
MANG_vBlockCashier.ObjRecord = MANG_CRecordCashier

MANG_vBlockItem = MANG_CItem("ITEM")
MANG_vBlockItem.relationBlock = MANG_vBlockCategory
MANG_vBlockItem.setListObj([MANG_Citm_id, MANG_Citm_cat_id, MANG_Citm_name, MANG_Citm_brand, MANG_Citm_purchase_price, MANG_Citm_sales_price, MANG_Citm_production_date, MANG_Citm_status, MANG_Citm_stock])
MANG_vBlockItem.ObjRecord = MANG_CRecordItem

MANG_vContainer.getForm().dataBlocks = []
MANG_vContainer.getForm().dataBlocks.append(MANG_vBlockCategory)
MANG_vContainer.getForm().dataBlocks.append(MANG_vBlockSupplier)
MANG_vContainer.getForm().dataBlocks.append(MANG_vBlockCashier)
MANG_vContainer.getForm().dataBlocks.append(MANG_vBlockItem)
"""

#NEW FORM INSTANCE
def newInstance_MANAGE_CATEGORY():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MANAGE_SUPPLIER():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MANAGE_CASHIER():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_MANAGE_ITEM():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

