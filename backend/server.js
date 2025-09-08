const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Placeholder for user data (in-memory for now, will be handled by local storage on frontend)
let users = [
    { username: 'farmer1', password: 'password123', role: 'farmer' },
    { username: 'trader1', password: 'password123', role: 'trader' }
]; 
let products = [
    { id: 1, name: 'Tomato', rate: 30, farmerUsername: 'farmer1' },
    { id: 2, name: 'Potato', rate: 20, farmerUsername: 'farmer1' },
    { id: 3, name: 'Onion', rate: 25, farmerUsername: 'farmer1' }
]; 
let nextProductId = 4; // Start from 4 after dummy data

let orders = [
    { id: 1, productId: 1, productName: 'Tomato', productRate: 30, farmerUsername: 'farmer1', traderUsername: 'trader1', quantity: 10, status: 'Delivered' },
    { id: 2, productId: 2, productName: 'Potato', productRate: 20, farmerUsername: 'farmer1', traderUsername: 'trader1', quantity: 15, status: 'Pending' },
    { id: 3, productId: 3, productName: 'Onion', productRate: 25, farmerUsername: 'farmer1', traderUsername: 'trader1', quantity: 5, status: 'Shipped' }
]; 
let nextOrderId = 4; // Start from 4 after dummy data

// Signup Route
app.post('/api/signup', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already exists' });
    }
    const newUser = { username, password, role };
    users.push(newUser);
    console.log('New user signed up:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username, role: newUser.role } });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        console.log('User logged in:', user.username);
        res.status(200).json({ message: 'Login successful', user: { username: user.username, role: user.role } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Products API
app.post('/api/products', (req, res) => {
    const { name, rate, farmerUsername } = req.body;
    if (!name || !rate || !farmerUsername) {
        return res.status(400).json({ message: 'Product name, rate, and farmer username are required' });
    }
    const newProduct = { id: nextProductId++, name, rate, farmerUsername };
    products.push(newProduct);
    console.log('New product added:', newProduct);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

app.get('/api/products', (req, res) => {
    const { farmerUsername } = req.query;
    if (farmerUsername) {
        const farmerProducts = products.filter(p => p.farmerUsername === farmerUsername);
        res.status(200).json({ products: farmerProducts });
    } else {
        // If no farmerUsername is provided, return all products
        res.status(200).json({ products: products });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const productId = parseInt(id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== productId);

    if (products.length < initialLength) {
        console.log(`Product with ID ${productId} deleted.`);
        res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Orders API
app.post('/api/orders', (req, res) => {
    const { productId, quantity, traderUsername } = req.body;
    if (!productId || !quantity || !traderUsername) {
        return res.status(400).json({ message: 'Product ID, quantity, and trader username are required' });
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const newOrder = {
        id: nextOrderId++,
        productId: product.id,
        productName: product.name,
        productRate: product.rate,
        farmerUsername: product.farmerUsername,
        traderUsername,
        quantity,
        status: 'Pending' // Initial status
    };
    orders.push(newOrder);
    console.log('New order placed:', newOrder);
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
});

app.get('/api/orders', (req, res) => {
    const { traderUsername, farmerUsername } = req.query;
    let filteredOrders = orders;

    if (traderUsername) {
        filteredOrders = orders.filter(o => o.traderUsername === traderUsername);
    } else if (farmerUsername) {
        filteredOrders = orders.filter(o => o.farmerUsername === farmerUsername);
    }

    res.status(200).json({ orders: filteredOrders });
});

app.put('/api/orders/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const orderId = parseInt(id);

    const order = orders.find(o => o.id === orderId);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    console.log(`Order ${orderId} status updated to ${status}`);
    res.status(200).json({ message: 'Order status updated successfully', order });
});

// Placeholder for Reports API
app.get('/api/reports', (req, res) => {
    // For simplicity, return all orders as raw data for reports
    // In a real application, this would involve more complex filtering, aggregation, and authorization
    res.status(200).json({ reports: orders });
});

// Placeholder for Transactions API
app.get('/api/transactions', (req, res) => {
    res.status(200).json({ message: 'Transactions API - GET all transactions', transactions: [] });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
