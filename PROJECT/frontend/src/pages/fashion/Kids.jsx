import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { fetchProducts } from "../../services/productService";
import Loader from "../../components/Loader";

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(
          data.filter(p => p.category === "Kids")
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <h2>Kids</h2>
      <div className="grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default Kids;
