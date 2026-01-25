export function PageHeader({ title, description }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "48px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#2D2D2D",
          marginBottom: "16px",
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#6B6B5A",
          maxWidth: "600px",
          margin: "0 auto",
          lineHeight: "1.6",
        }}
      >
        {description}
      </p>
    </div>
  );
}