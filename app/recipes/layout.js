export default function RecipesLayout({ children }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
     <h1 style={{
  fontSize: "2.5rem",
  color: "#333",
  marginBottom: "20px",
  background: "linear-gradient(90deg, #f9572a, #ff9b05)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  
}}>
  Your Shared Recipes
</h1>



      {/* Render the content from the page */}
      <main>
        {children}
      </main>
    </div>
  );
}
