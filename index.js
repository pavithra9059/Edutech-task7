const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

function getProducts() {
  const data = fs.readFileSync("./products.json", "utf8");
  return JSON.parse(data);
}

// Beautiful Dashboard
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
*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}

body{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#0f172a,#1e293b,#312e81);
overflow:hidden;
}

.container{
width:90%;
max-width:1100px;
padding:40px;
background:rgba(255,255,255,0.08);
backdrop-filter:blur(20px);
border-radius:25px;
box-shadow:0 0 40px rgba(0,0,0,.4);
color:white;
text-align:center;
}

h1{
font-size:3rem;
margin-bottom:10px;
}

.subtitle{
opacity:.8;
margin-bottom:30px;
}

.cards{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
margin-top:30px;
}

.card{
background:rgba(255,255,255,0.1);
padding:25px;
border-radius:20px;
transition:.4s;
}

.card:hover{
transform:translateY(-8px);
box-shadow:0 0 25px #60a5fa;
}

.number{
font-size:2.5rem;
font-weight:bold;
margin-top:10px;
}

.online{
color:#22c55e;
}

.buttons{
margin-top:35px;
}

a{
text-decoration:none;
}

.btn{
display:inline-block;
padding:15px 30px;
margin:10px;
border-radius:50px;
background:linear-gradient(45deg,#06b6d4,#8b5cf6);
color:white;
font-weight:bold;
transition:.3s;
}

.btn:hover{
transform:scale(1.05);
}

.footer{
margin-top:30px;
opacity:.7;
}
</style>
</head>

<body>

<div class="container">

<h1>🚀 Product API Dashboard</h1>

<p class="subtitle">
Backend Environment Setup using Node.js & Express
</p>

<div class="cards">

<div class="card">
<h2>Server Status</h2>
<div class="number online">ONLINE</div>
</div>

<div class="card">
<h2>Environment</h2>
<div class="number">${process.env.NODE_ENV}</div>
</div>

<div class="card">
<h2>Products</h2>
<div class="number">${products.length}</div>
</div>

<div class="card">
<h2>Port</h2>
<div class="number">${process.env.PORT}</div>
</div>

</div>

<div class="buttons">
<a href="/api/products" class="btn">
View Products
</a>

<a href="/api/products/1" class="btn">
Sample Product
</a>
</div>

<div class="footer">
Express Server Running Successfully 🚀
</div>

</div>

</body>
</html>
  `);
});

// API: All Products
app.get("/api/products", (req, res) => {
  const products = getProducts();

  res.json({
    success: true,
    count: products.length,
    data: products
  });
});


app.get("/api/products/:id", (req, res) => {
  const products = getProducts();

  const id = Number(req.params.id);

  const product = products.find(product => product.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with ID ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: product
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});
