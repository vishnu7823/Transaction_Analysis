const axios = require('axios');
const Product = require('../Models/Product');

// Initialize the database with product data from an external source
const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;

    const products = data.map(item => ({
      title: item.title || 'No Title',
      description: item.description || 'No Description',
      price: !isNaN(item.price) ? item.price : 0,
      dateOfSale: item.dateOfSale ? new Date(item.dateOfSale) : new Date(),
      category: item.category || 'Unknown',
      isSold: item.isSold || false
    }));

    await Product.insertMany(products);
    res.status(200).json({ message: 'Database initialized with product data.' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ message: 'Failed to initialize database.', error: error.message });
  }
};

// List products with search and pagination
const listProducts = async (req, res) => {
  const { search = '', page = 1, perPage = 10 } = req.query;
  const query = search
    ? {
        $or: [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { price: parseFloat(search) || undefined }
        ]
      }
    : {};

  try {
    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const totalCount = await Product.countDocuments(query);

    res.status(200).json({
      total: totalCount,
      page: Number(page),
      perPage: Number(perPage),
      products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to retrieve products.', error: error.message });
  }
};

// Get product statistics
const getStatistics = async (req, res) => {
  try {
    const products = await Product.find();

    const totalRevenue = products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
    const totalProducts = products.length;
    const averagePrice = products.length ? totalRevenue / totalProducts : 0;

    res.status(200).json({ totalRevenue, totalProducts, averagePrice });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Failed to retrieve statistics.', error: error.message });
  }
};

// Get data for a bar chart
const getBarChart = async (req, res) => {
  try {
    const products = await Product.find();

    const barChartData = products.map(product => ({
      name: product.title,
      quantity: product.quantity || 1
    }));

    res.status(200).json(barChartData);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ message: 'Failed to retrieve bar chart data.', error: error.message });
  }
};

// Get data for a pie chart
const getPieChart = async (req, res) => {
  try {
    const products = await Product.find();

    const categoryData = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + (product.quantity || 1);
      return acc;
    }, {});

    const pieChartData = Object.keys(categoryData).map(category => ({
      category,
      quantity: categoryData[category]
    }));

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ message: 'Failed to retrieve pie chart data.', error: error.message });
  }
};

// Get combined statistics, bar chart, and pie chart data
const getCombinedData = async (req, res) => {
  try {
    const products = await Product.find();

    const totalRevenue = products.reduce((acc, product) => acc + product.price * (product.quantity || 1), 0);
    const totalProducts = products.length;
    const averagePrice = products.length ? totalRevenue / totalProducts : 0;

    const barChartData = products.map(product => ({
      name: product.title,
      quantity: product.quantity || 1
    }));

    const categoryData = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + (product.quantity || 1);
      return acc;
    }, {});

    const pieChartData = Object.keys(categoryData).map(category => ({
      category,
      quantity: categoryData[category]
    }));

    res.status(200).json({
      statistics: { totalRevenue, totalProducts, averagePrice },
      barChartData,
      pieChartData
    });
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ message: 'Failed to retrieve combined data.', error: error.message });
  }
};

// Export the functions correctly
module.exports = {
  initializeDatabase,
  listProducts,
  getStatistics,
  getBarChart,
  getPieChart,
  getCombinedData
};
