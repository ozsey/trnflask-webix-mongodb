from flask import Blueprint, request, jsonify
from purchase_order.service_layer.purchase_order_service import PurchaseOrderService
from purchase_order.adapter.postgresimpl import PurchaseOrderPostgresqlImpl

purchase_order_bp = Blueprint('purchase_order', __name__)

repo=PurchaseOrderPostgresqlImpl()
service=PurchaseOrderService(repo)

@purchase_order_bp.route('/purchase_order/<string:store_id>/<string:dc_id>')
def check_expired_po(store_id,dc_id):
    is_expired=service.check_expired_po(store_id,dc_id)
    return jsonify({'is_expired':is_expired})

@purchase_order_bp.route('/purchase_order/faktur/<string:faktur>')
def get_po(faktur):
    po=service.get_po_by_faktur(faktur)
    return jsonify(po)