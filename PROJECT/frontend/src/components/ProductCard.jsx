import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img
        src={`http://localhost:8080/images/${product.image}`}
        alt={product.name}
        className="product-img"
      />

      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      <Link to={`/product/${product.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
};

export default ProductCard;
