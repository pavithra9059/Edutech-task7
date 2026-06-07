const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// Read products
function getProducts() {
  const data = fs.readFileSync("./products.json", "utf8");
  return JSON.parse(data);
}

// Home Dashboard UI
app.get("/", (req, res) => {
  const products = getProducts();

  res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Product API Dashboard</title>

<style>
body{
margin:0;
font-family:Arial;
background:linear-gradient(135deg,#0f172a,#1e293b);
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.container{
text-align:center;
padding:40px;
background:rgba(255,255,255,0.1);
border-radius:20px;
backdrop-filter:blur(10px);
width:80%;
}

.card{
margin:10px;
padding:15px;
background:rgba(255,255,255,0.1);
border-radius:10px;
}
</style>
</head>

<body>

<div class="container">
<h1>🚀 Product API Dashboard</h1>

<div class="card">Server: ONLINE</div>
<div class="card">Environment: ${process.env.NODE_ENV}</div>
<div class="card">Products: ${products.length}</div>
<div class="card">Port: ${process.env.PORT}</div>

<br><br>

<a href="/api/products">View Products</a><br>
<a href="/api/products/1">View Product 1</a>
</div>

</body>
</html>
  `);
});

// Get all products
app.get("/api/products", (req, res) => {
  const products = getProducts();

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
  const products = getProducts();

  const product = products.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.json({
    success: true,
    data: product
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
