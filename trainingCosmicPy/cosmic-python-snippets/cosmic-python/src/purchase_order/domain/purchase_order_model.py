from datetime import date
from typing import Any


class PurchaseOrderModel:
    plu:str
    qty:int
    arrive_date:date
    faktur:str
    
    @staticmethod
    def from_dict(obj: Any) -> 'PurchaseOrderModel':
        _plu = obj.get('plu')
        _qty = obj.get('qty')
        _arrive_date =  obj.get('arrive_date')
        _faktur = obj.get('faktur')
        return PurchaseOrderModel(_plu, _qty, _arrive_date, _faktur)