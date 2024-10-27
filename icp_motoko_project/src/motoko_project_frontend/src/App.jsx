import React, { useState, useEffect } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const backend = window.ic.shopping_backend;
    const productsList = await backend.getAllProducts();
    setProducts(productsList);
  }

  async function addProduct(e) {
    e.preventDefault();
    const backend = window.ic.shopping_backend;
    await backend.addProduct(name, parseInt(price));
    await loadProducts();
    setName('');
    setPrice('');
    setAlertVisible(true);
    setTimeout(() => setAlertVisible(false), 3000); 
  }

  return (
    <div>
      <header style={{ backgroundColor: '#4a90e2', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>Shopping App</h1>
      </header>
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
          <h2>Ürün Ekle</h2>
          <form onSubmit={addProduct}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ürün Adı" required />
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Fiyat" required />
            <button type="submit">Ürün Ekle</button>
          </form>
          {alertVisible && <div style={{ color: '#28a745', fontWeight: 'bold', marginTop: '10px' }}>Ürün başarıyla eklendi!</div>}
        </div>
        <div id="productList" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {products.map((product, index) => (
            <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' }}>
              <h3>{product.name}</h3>
              <p>Fiyat: ₺{product.price}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
