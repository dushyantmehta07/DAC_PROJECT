import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { toast } from "react-toastify";

export function ProductCard({ product }) {
  const handleAddToCart = () => {
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 3000,
    });
  };

  return (
    <Card
      style={{
        backgroundColor: "#FAFAF5",
        border: "1px solid #D5D5C0",
        borderRadius: "12px",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease",
        height: "100%",
      }}
      className="product-card"
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.name}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          className="product-image"
        />
      </div>
      <CardBody style={{ padding: "20px" }}>
        <CardTitle
          tag="h5"
          style={{
            color: "#2D2D2D",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          {product.name}
        </CardTitle>
        <CardText
          style={{
            color: "#6B6B5A",
            fontSize: "14px",
            marginBottom: "16px",
            lineHeight: "1.5",
          }}
        >
          {product.description}
        </CardText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "#5C4A3D",
            }}
          >
            {product.price}
          </span>
          <Button
            onClick={handleAddToCart}
            style={{
              backgroundColor: "#5C4A3D",
              borderColor: "#5C4A3D",
              borderRadius: "8px",
            }}
          >
            Add to Cart
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}