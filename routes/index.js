const express = require('express');
const router = express.Router();

const authController =
  require('../controllers/authController');
const homeController =
  require('../controllers/homeController');
const aboutController =
  require('../controllers/aboutController');
const menuController =
  require('../controllers/menuController');
const orderController =
  require('../controllers/orderController');
const adminController =
  require('../controllers/adminController');
const {
  requireAuth,
  requireAdmin,
  requireSuperAdmin
} = require('../middleware/auth');
const superAdminController =
  require('../controllers/superAdminController');

router.get('/', homeController.getHome);
router.get('/about', aboutController.getAbout);

router.get(
  '/restaurants/:id/menu',
  menuController.getMenuByRestaurant
);

router.post(
  '/orders',
  requireAuth,
  orderController.createOrder
);

router.get(
  '/orders/:id',
  orderController.getOrder
);

router.post(
  '/orders/:id/update',
  orderController.updateOrder
);

router.post(
  '/orders/:id/cancel',
  orderController.cancelOrder
);

router.get(
  '/verify/:token',
  authController.verifyEmail
);
router.get(
  '/signup',
  authController.showSignup
);

router.post(
  '/signup',
  authController.signup
);

router.get(
  '/login',
  authController.showLogin
);

router.post(
  '/login',
  authController.login
);

router.post(
  '/logout',
  authController.logout
);
router.get(
  '/forgot-password',
  authController.showForgotPassword
);

router.post(
  '/forgot-password',
  authController.forgotPassword
);

router.get(
  '/reset-password/:token',
  authController.showResetPassword
);

router.post(
  '/reset-password/:token',
  authController.resetPassword
);
router.get(
  '/admin/dashboard',
  requireAdmin,
  adminController.dashboard
);

router.post(
  '/admin/menu',
  requireAdmin,
  adminController.addMenuItem
);
router.get(
  '/superadmin/dashboard',
  requireSuperAdmin,
  superAdminController.dashboard
);

router.post(
  '/superadmin/restaurants',
  requireSuperAdmin,
  superAdminController.addRestaurant
);

router.post(
  '/superadmin/restaurants/:id/remove',
  requireSuperAdmin,
  superAdminController.removeRestaurant
);

router.post(
  '/superadmin/grant-admin',
  requireSuperAdmin,
  superAdminController.grantAdmin
);
module.exports = router;