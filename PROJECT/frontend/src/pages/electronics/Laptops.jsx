import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../services/productService";

const Laptops = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then(data => {
      const filtered = data.filter(
        p => p.category === "Laptops"
      );
      setProducts(filtered);
    });
  }, []);

  return (
    <div>
      <h2>Laptops</h2>

      <div className="grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Laptops;
