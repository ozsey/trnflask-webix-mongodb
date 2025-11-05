# ====================== LIST OF DATA BLOCK CLASS ======================
class TRNS_CCustomer(FormLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "wr.customer"
        self.nonVisibleItems = [["cus_create_user","createUser"], ["cus_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
class TRNS_CSales(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "wr.sales"
        self.nonVisibleItems = [["sal_create_user","createUser"], ["sal_create_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
class TRNS_CItem(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "wr.item"
        self.nonVisibleItems = [["itm_create_user","createUser"], ["itm_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
class TRNS_CSales_Detail(DataGridLayout):
    """
    Class ini digunakan untuk class block layout
    @return: -
    """
    def __init__(self, blockId):
        super().__init__(blockId)
        self.whereclause = ""
        self.databaseTable = "wr.sales_detail"
        self.nonVisibleItems = [["sd_create_user","createUser"], ["sd_update_user","updateUser"]] #ketik manual kolom yang mau ditempatkan sebagai non visible items
        self.noDbItems = []
        self.orderBy = ""
# ====================== LIST OF DATA BLOCK CLASS ======================

# ====================== LIST OF DATA RECORD CLASS ======================
class TRNS_CRecordCustomer(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class TRNS_CRecordSales(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class TRNS_CRecordItem(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

class TRNS_CRecordSales_Detail(Record):
    def validate(self):
        """
         Fungsi ini digunakan untuk validasi record
         @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
                  key msg = nilai string
        """
        return {"status":True,"msg":"", "msg_Param": {}}

# ====================== LIST OF DATA RECORD CLASS ======================

# ====================== LIST OF COLUMN TABLE CUSTOMER ======================
class TRNS_Ccus_id(TextPrimary):
    lengthItem = 10
    itemId = "cusid"
    databaseColumn = "cus_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # cusid = self.item("cusid")
        # cusfirstname = self.item("cusfirstname")
        # cuslastname = self.item("cuslastname")
        # cusaddress = self.item("cusaddress")
        # custelephone = self.item("custelephone")
        # cusemail = self.item("cusemail")
        # cusid = self.item("cusid")
        # cusfirstname = self.item("cusfirstname")
        # cuslastname = self.item("cuslastname")
        # cusaddress = self.item("cusaddress")
        # custelephone = self.item("custelephone")
        # cusemail = self.item("cusemail")
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_first_name(TextNormal):
    lengthItem = 20
    itemId = "cusfirstname"
    databaseColumn = "cus_first_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_first_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_last_name(TextNormal):
    lengthItem = 20
    itemId = "cuslastname"
    databaseColumn = "cus_last_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_last_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_address(TextNormal):
    lengthItem = 100
    itemId = "cusaddress"
    databaseColumn = "cus_address"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_address
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_telephone(TextNormal):
    lengthItem = 15
    itemId = "custelephone"
    databaseColumn = "cus_telephone"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_telephone
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_email(TextNormal):
    lengthItem = 50
    itemId = "cusemail"
    databaseColumn = "cus_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_id(TextPrimary):
    lengthItem = 10
    itemId = "cusid"
    databaseColumn = "cus_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_first_name(TextNormal):
    lengthItem = 20
    itemId = "cusfirstname"
    databaseColumn = "cus_first_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_first_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_last_name(TextNormal):
    lengthItem = 20
    itemId = "cuslastname"
    databaseColumn = "cus_last_name"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_last_name
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_address(TextNormal):
    lengthItem = 100
    itemId = "cusaddress"
    databaseColumn = "cus_address"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_address
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_telephone(TextNormal):
    lengthItem = 15
    itemId = "custelephone"
    databaseColumn = "cus_telephone"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_telephone
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Ccus_email(TextNormal):
    lengthItem = 50
    itemId = "cusemail"
    databaseColumn = "cus_email"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column cus_email
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE CUSTOMER ======================

# ====================== LIST OF COLUMN TABLE SALES ======================
class TRNS_Csal_id(TextPrimary):
    lengthItem = 6
    itemId = "salid"
    databaseColumn = "sal_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        # cusid = self.item("cusid")
        # cusfirstname = self.item("cusfirstname")
        # cuslastname = self.item("cuslastname")
        # cusaddress = self.item("cusaddress")
        # custelephone = self.item("custelephone")
        # cusemail = self.item("cusemail")
        # cusid = self.item("cusid")
        # cusfirstname = self.item("cusfirstname")
        # cuslastname = self.item("cuslastname")
        # cusaddress = self.item("cusaddress")
        # custelephone = self.item("custelephone")
        # cusemail = self.item("cusemail")
        # salid = vContainer.block("ODENTABLEHEAD").item("salid")
        # salcusid = vContainer.block("ODENTABLEHEAD").item("salcusid")
        # salcshid = vContainer.block("ODENTABLEHEAD").item("salcshid")
        # saldate = vContainer.block("ODENTABLEHEAD").item("saldate")
        # saltotalprice = vContainer.block("ODENTABLEHEAD").item("saltotalprice")
        # salstatus = vContainer.block("ODENTABLEHEAD").item("salstatus")
        # salid = vContainer.block("ODENTABLEHEAD").item("salid")
        # salcusid = vContainer.block("ODENTABLEHEAD").item("salcusid")
        # salcshid = vContainer.block("ODENTABLEHEAD").item("salcshid")
        # saldate = vContainer.block("ODENTABLEHEAD").item("saldate")
        # saltotalprice = vContainer.block("ODENTABLEHEAD").item("saltotalprice")
        # salstatus = vContainer.block("ODENTABLEHEAD").item("salstatus")
        # itmid = self.item("itmid")
        # itmcatid = self.item("itmcatid")
        # itmname = self.item("itmname")
        # itmbrand = self.item("itmbrand")
        # itmpurchaseprice = self.item("itmpurchaseprice")
        # itmsalesprice = self.item("itmsalesprice")
        # itmproductiondate = self.item("itmproductiondate")
        # itmstatus = self.item("itmstatus")
        # itmstock = self.item("itmstock")
        # sdsalid = self.item("sdsalid")
        # sditmid = self.item("sditmid")
        # sdsalesprice = self.item("sdsalesprice")
        # sdquantity = self.item("sdquantity")
        # sdupdateuser = self.item("sdupdateuser")
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_cus_id(TextNormal):
    lengthItem = 6
    itemId = "salcusid"
    databaseColumn = "sal_cus_id"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_cus_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_csh_id(TextNormal):
    lengthItem = 6
    itemId = "salcshid"
    databaseColumn = "sal_csh_id"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_csh_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_date(Calendar):
    lengthItem = 20
    itemId = "saldate"
    databaseColumn = "sal_date"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_date
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_total_price(NumericNormal):
    lengthItem = 15
    itemId = "saltotalprice"
    databaseColumn = "sal_total_price"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_total_price
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_status(TextNormal):
    lengthItem = 15
    itemId = "salstatus"
    databaseColumn = "sal_status"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_status
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_id(TextPrimary):
    lengthItem = 6
    itemId = "salid"
    databaseColumn = "sal_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_cus_id(TextNormal):
    lengthItem = 6
    itemId = "salcusid"
    databaseColumn = "sal_cus_id"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_cus_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_csh_id(TextNormal):
    lengthItem = 6
    itemId = "salcshid"
    databaseColumn = "sal_csh_id"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_csh_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_date(Calendar):
    lengthItem = 20
    itemId = "saldate"
    databaseColumn = "sal_date"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_date
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_total_price(NumericNormal):
    lengthItem = 15
    itemId = "saltotalprice"
    databaseColumn = "sal_total_price"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_total_price
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csal_status(TextNormal):
    lengthItem = 15
    itemId = "salstatus"
    databaseColumn = "sal_status"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sal_status
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE SALES ======================

# ====================== LIST OF COLUMN TABLE ITEM ======================
class TRNS_Citm_id(TextPrimary):
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

class TRNS_Citm_cat_id(TextNormal):
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

class TRNS_Citm_name(TextNormal):
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

class TRNS_Citm_brand(TextNormal):
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

class TRNS_Citm_purchase_price(NumericNormal):
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

class TRNS_Citm_sales_price(NumericNormal):
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

class TRNS_Citm_production_date(Calendar):
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

class TRNS_Citm_status(TextNormal):
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

class TRNS_Citm_stock(NumericNormal):
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

# ====================== LIST OF COLUMN TABLE SALES_DETAIL ======================
class TRNS_Csd_sal_id(TextPrimary):
    lengthItem = 6
    itemId = "sdsalid"
    databaseColumn = "sd_sal_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sd_sal_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csd_itm_id(TextPrimary):
    lengthItem = 6
    itemId = "sditmid"
    databaseColumn = "sd_itm_id"
    databaseItem = True
    nullable = False
    primaryKey = True
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sd_itm_id
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csd_sales_price(NumericNormal):
    lengthItem = 15
    itemId = "sdsalesprice"
    databaseColumn = "sd_sales_price"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sd_sales_price
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csd_quantity(NumericNormal):
    lengthItem = 15
    itemId = "sdquantity"
    databaseColumn = "sd_quantity"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sd_quantity
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

class TRNS_Csd_update_user(TextNormal):
    lengthItem = 15
    itemId = "sdupdateuser"
    databaseColumn = "sd_update_user"
    databaseItem = True
    nullable = True
    primaryKey = False
    allowSpecialChar = []
    def validate(self):
        """
       Fungsi ini digunakan untuk validasi column sd_update_user
        @return: dictionary dengan key status = nilai boolean (True = validasi berhasil, False = validasi gagal)
            key msg = nilai string
        """
        return {"status": True, "msg": "", "msg_Param": {}}

# ====================== LIST OF COLUMN TABLE SALES_DETAIL ======================

execVcount = """
session["loggedId"] = kwargs
TRNS_vContainer = Container()
TRNS_vForm = Form()
TRNS_vContainer.update(TRNS_vForm)
TRNS_vBlockCustomer = TRNS_CCustomer("CUSTOMER")
TRNS_vBlockCustomer.setListObj([TRNS_Ccus_id, TRNS_Ccus_first_name, TRNS_Ccus_last_name, TRNS_Ccus_address, TRNS_Ccus_telephone, TRNS_Ccus_email, TRNS_Ccus_id, TRNS_Ccus_first_name, TRNS_Ccus_last_name, TRNS_Ccus_address, TRNS_Ccus_telephone, TRNS_Ccus_email])
TRNS_vBlockCustomer.ObjRecord = TRNS_CRecordCustomer

TRNS_vBlockSales = TRNS_CSales("SALES")
TRNS_vBlockSales.relationBlock = TRNS_vBlockCustomer
TRNS_vBlockSales.setListObj([TRNS_Csal_id, TRNS_Csal_cus_id, TRNS_Csal_csh_id, TRNS_Csal_date, TRNS_Csal_total_price, TRNS_Csal_status, TRNS_Csal_id, TRNS_Csal_cus_id, TRNS_Csal_csh_id, TRNS_Csal_date, TRNS_Csal_total_price, TRNS_Csal_status])
TRNS_vBlockSales.ObjRecord = TRNS_CRecordSales

TRNS_vBlockItem = TRNS_CItem("ITEM")
TRNS_vBlockItem.relationBlock = TRNS_vBlockCustomer
TRNS_vBlockItem.setListObj([TRNS_Citm_id, TRNS_Citm_cat_id, TRNS_Citm_name, TRNS_Citm_brand, TRNS_Citm_purchase_price, TRNS_Citm_sales_price, TRNS_Citm_production_date, TRNS_Citm_status, TRNS_Citm_stock])
TRNS_vBlockItem.ObjRecord = TRNS_CRecordItem

TRNS_vBlockSales_Detail = TRNS_CSales_Detail("SALES_DETAIL")
TRNS_vBlockSales_Detail.relationBlock = TRNS_vBlockCustomer
TRNS_vBlockSales_Detail.setListObj([TRNS_Csd_sal_id, TRNS_Csd_itm_id, TRNS_Csd_sales_price, TRNS_Csd_quantity, TRNS_Csd_update_user])
TRNS_vBlockSales_Detail.ObjRecord = TRNS_CRecordSales_Detail

TRNS_vContainer.getForm().dataBlocks = []
TRNS_vContainer.getForm().dataBlocks.append(TRNS_vBlockCustomer)
TRNS_vContainer.getForm().dataBlocks.append(TRNS_vBlockSales)
TRNS_vContainer.getForm().dataBlocks.append(TRNS_vBlockItem)
TRNS_vContainer.getForm().dataBlocks.append(TRNS_vBlockSales_Detail)
"""

#NEW FORM INSTANCE
def newInstance_TRANSAKSI_CUSTOMER():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_TRANSAKSI_SALES():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_TRANSAKSI_ITEM():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

def newInstance_TRANSAKSI_SALES_DETAIL():
    newInstance = {"status":True,"data":{},"msg":""}
    # newInstance = selectHeaderQueryRO(sql)
    # newInstance = selectDataHeaderQueryRO(sql,param)
    return newInstance

