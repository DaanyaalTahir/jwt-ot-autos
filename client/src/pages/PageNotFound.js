import React from "react";

function PageNotFound() {
  return (
    <div style={styles.pageNotFound}>
      <h1 style={styles.heading}>403</h1>
      <p style={styles.paragraph}>Page Not Found</p>
    </div>
  );
}

const styles = {
  pageNotFound: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f44336", // Red background
    color: "white", // text color
  },
  heading: {
    fontSize: "4rem",
    marginBottom: "20px",
    padding: "10px",
    border: "4px solid black", // border around the text
    borderRadius: "5px", // rounds the corners
  },
  paragraph: {
    fontSize: "1.5rem", // Medium font size for the paragraph
  },
};

export default PageNotFound;
