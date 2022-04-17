const express = require("express");
const {
  newOrder,
  getSingleOrder,
  getLoggedInUserOrders,
  getAllOrders,
  updateOrderStatus,
  deletOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, getLoggedInUserOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrderStatus);
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deletOrder);
module.exports = router;
