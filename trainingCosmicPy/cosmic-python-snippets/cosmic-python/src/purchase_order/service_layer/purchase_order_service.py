from purchase_order.adapter.repository import PurchaseOrderRepository
from datetime import datetime, timedelta

class PurchaseOrderService:

    def __init__(self,repo:PurchaseOrderRepository):
        self.repo=repo

    def check_expired_po(self,store_id,dc_id):
        arrive_date=self.repo.check_status_purchase_order(store_id,dc_id)
        current_date=datetime.now().date()
        return arrive_date>=current_date
    
    def get_po_by_faktur(self,faktur):
        po=self.repo.get_po_by_faktur(faktur)
        return po


