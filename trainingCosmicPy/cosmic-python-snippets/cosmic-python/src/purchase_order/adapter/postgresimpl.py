from purchase_order.adapter.repository import PurchaseOrderRepository
from purchase_order.domain.purchase_order_model import PurchaseOrderModel

class PurchaseOrderPostgresqlImpl(PurchaseOrderRepository):

    def __init__(self):
        self._db=None

    def check_status_purchase_order(self,store_id,dc_id):
        
        max_date = self._db.select_one("""
            SELECT MAX(arrive_date) as arrive_date FROM tx_po_det tpd
            inner join ms_container m on tpd.plu = (m.plu * 10 + 2) and branch_id = %(branch_id)s
                                             WHERE store_id = %(store_id)s
                                             AND faktur NOT LIKE 'L%%'
        """, {'store_id': store_id, 'branch_id': dc_id})
        return max_date
    
    def get_po_by_faktur(self,faktur)->PurchaseOrderModel:
        data = self._db.select_one("""
        select plu,qty,arrive_date,faktur from purchase_order where faktur=%(faktur)s
        """, {'faktur': faktur})
        po=PurchaseOrderModel.from_dict(data)
        return po