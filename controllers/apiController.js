const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// Return all restaurants
exports.getRestaurants = async (req, res) => {
  const restaurants = await Restaurant.getAllRestaurants();
  res.json(restaurants);
};

// Return one restaurant and its menu
exports.getRestaurantMenu = async (req, res) => {
  const restaurant = await Restaurant.getRestaurantById(req.params.id);

  if (!restaurant) {
    return res.status(404).json({
      error: 'Restaurant not found'
    });
  }

  const menuItems = await MenuItem.getMenuByRestaurant(req.params.id);

  res.json({
    restaurant,
    menuItems
  });
};

// Return one order
exports.getOrder = async (req, res) => {
  const order = await Order.getOrderById(req.params.id);

  if (!order) {
    return res.status(404).json({
      error: 'Order not found'
    });
  }

  res.json(order);
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { itemId } = req.body;

  const item =
    await MenuItem.getMenuItemById(itemId);

  if (!item) {
    return res.status(400).json({
      error: 'Invalid menu item'
    });
  }

  const order = await Order.createOrder(
    item.id,
    item.price,
    req.session.user.id
  );

  res.status(201).json(order);
};

// Return order statistics and popular items
exports.getStats = async (req, res) => {
  const stats = await Order.getStats();
  const popularItems = await Order.getPopularItems();

  res.json({
    stats,
    popularItems
  });
};