from datetime import date, timedelta
from unittest import TestCase

from purchase_order.adapter.repository import PurchaseOrderRepository
from purchase_order.service_layer.purchase_order_service import PurchaseOrderService


class MockPurchaseOrderRepository(PurchaseOrderRepository):
    def check_status_purchase_order(self,store_id,dc_id):
        return date.today() - timedelta(days=1)

class TestPurchaseOrderService(TestCase):
    def test_check_expired_po(self):
        repo=MockPurchaseOrderRepository()
        service=PurchaseOrderService(repo)
        is_expired=service.check_expired_po(1,2)
        self.assertFalse(is_expired)