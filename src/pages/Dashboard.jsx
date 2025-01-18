import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { apiURL } from "../utils/constants";

const Dashboard = () => {
  const { authData, logout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const imageDomain = `${apiURL}/uploads`;

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(`${apiURL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401) {
          alert("Unauthorized! Please log in again.");
          logout();
        }
      }
    };
    fetchProducts();
  }, [logout]);

  return (
    <div className="container my-3">
      {/* Page Header */}
      <header className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary mb-2 mb-md-0">Welcome to your Dashboard!</h2>
        <button
          className="btn btn-outline-danger btn-sm ms-md-3 mt-3 mt-md-0"
          onClick={() => {
            localStorage.removeItem("jwtToken"); 
            logout(); 
          }}
        >
          Logout
        </button>
      </header>

      <p className="text-secondary text-center mb-4">
        Here are the available products fetched from the API:
      </p>

      {/* Product Table */}
      {products.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`${imageDomain}/${product.image.replace(/\\/g, "/")}`}
                      alt={product.name}
                      style={{ width: "70px", height: "70px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-warning">No products available at the moment.</p>
      )}
    </div>
  );
};

export default Dashboard;
