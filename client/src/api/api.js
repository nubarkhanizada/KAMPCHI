import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000/api/v1";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const services = {
  productAPI: {
    createProduct: async (productData, setProduct) => {
      await axios
        .post(`${BASE_URL}/products/create`, productData)
        .then((response) => {
          setProduct(response.data);
          toast.success("Product created successfully.");
        })
        .catch((error) => {
          console.error("Failed to create product:", error);
          toast.error("Failed to create product.");
        });
    },
    getAllProducts: async (setProducts) => {
      await axios
        .get(`${BASE_URL}/products/all`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    },
    getRecentProducts: async (setRecentProducts) => {
      await axios
        .get(`${BASE_URL}/products/recents`)
        .then((response) => setRecentProducts(response.data))
        .catch((error) => console.log(error));
    },
    getProductsByCategoryId: async (id, setProducts) => {
      await axios
        .get(`${BASE_URL}/products/category/${id}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    },
    getProductsByUserId: async (id, setProducts) => {
      await axios
        .get(`${BASE_URL}/products/user/${id}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    },
    getProductById: async (id, setProduct) => {
      await axios
        .get(`${BASE_URL}/products/details/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.log(error));
    },
    filterProducts: async (id, value, setProducts) => {
      await axios
        .get(`${BASE_URL}/products/sort?value=${value}&id=${id}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    },
    searchProducts: async (value, setProducts) => {
      await axios
        .get(`${BASE_URL}/products/search?title=${value}`)
        .then((response) => setProducts(response.data))
        .catch((error) => console.log(error));
    },
    updateProduct: async (id, productData) => {
      await axios
        .put(`${BASE_URL}/products/update/${id}`, productData)
        .then((response) => {
          toast.success("Product updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          toast.error("Failed to update product.");
        });
    },
    deleteProductById: async (id) => {
      try {
        // const response = await axios.delete(`${BASE_URL}/products/${id}`);
        toast.success("Product deleted successfully.");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete product.");
      }
    },
  },
  productCategoryAPI: {
    getProductCategories: async (setProductCategories) => {
      await axios
        .get(`${BASE_URL}/products/categories/all`)
        .then((response) => setProductCategories(response.data))
        .catch((error) => console.log(error));
    },
    getSpecificProductCategories: async (setSpecificCategories) => {
      await axios
        .get(`${BASE_URL}/products/categories/specific`)
        .then((response) => setSpecificCategories(response.data))
        .catch((error) => console.log(error));
    },
  },
  tourAPI: {
    createTour: async (tourData, setTour) => {
      await axios
        .post(`${BASE_URL}/tours/create`, tourData)
        .then((response) => {
          setTour(response.data);
          toast.success("Tour created successfully.");
        })
        .catch((error) => {
          console.error("Failed to create tour:", error);
          toast.error("Failed to create tour.");
        });
    },
    getAllTours: async (setTours) => {
      await axios
        .get(`${BASE_URL}/tours/all`)
        .then((response) => setTours(response.data))
        .catch((error) => console.log(error));
    },
    getRecentTours: async (setRecentTours) => {
      await axios
        .get(`${BASE_URL}/tours/recents`)
        .then((response) => setRecentTours(response.data))
        .catch((error) => console.log(error));
    },
    getToursByCategoryId: async (id, setTours) => {
      await axios
        .get(`${BASE_URL}/tours/category/${id}`)
        .then((response) => setTours(response.data))
        .catch((error) => console.log(error));
    },
    getToursByUserId: async (id, setTours) => {
      await axios
        .get(`${BASE_URL}/tours/user/${id}`)
        .then((response) => setTours(response.data))
        .catch((error) => console.log(error));
    },
    getTourById: async (id, setTour) => {
      await axios
        .get(`${BASE_URL}/tours/details/${id}`)
        .then((response) => setTour(response.data))
        .catch((error) => console.log(error));
    },
    filterTours: async (id, value, setTours) => {
      await axios
        .get(`${BASE_URL}/tours/sort?value=${value}&id=${id}`)
        .then((response) => setTours(response.data))
        .catch((error) => console.log(error));
    },
    searchTours: async (value, setTours) => {
      await axios
        .get(`${BASE_URL}/tours/search?title=${value}`)
        .then((response) => setTours(response.data))
        .catch((error) => console.log(error));
    },
    updateTour: async (id, tourData) => {
      await axios
        .put(`${BASE_URL}/tours/update/${id}`, tourData)
        .then((response) => {
          toast.success("Tour updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating tour:", error);
          toast.error("Failed to update tour.");
        });
    },
    deleteTourById: async (id) => {
      try {
        // const response = await axios.delete(`${BASE_URL}/tours/${id}`);
        toast.success("Tour deleted successfully.");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete tour.");
      }
    },
  },
  tourCategoryAPI: {
    getTourCategories: async (setTourCategories) => {
      await axios
        .get(`${BASE_URL}/tours/categories/all`)
        .then((response) => setTourCategories(response.data))
        .catch((error) => console.log(error));
    },
    getSpecificTourCategories: async (setSpecificCategories) => {
      await axios
        .get(`${BASE_URL}/tours/categories/specific`)
        .then((response) => setSpecificCategories(response.data))
        .catch((error) => console.log(error));
    },
  },
  authAPI: {
    registerCustomer: async (customer) => {
      await axios
        .post(`${BASE_URL}/auth/register`, customer)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    registerSeller: async (seller) => {
      await axios
        .post(`${BASE_URL}/auth/register/seller`, seller)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    registerGuide: async (guide) => {
      await axios
        .post(`${BASE_URL}/auth/register/guide`, guide)
        .then((response) => {
          return response;
        })
        .catch((error) => {
          throw error;
        });
    },
    loginUser: async (user) => {
      return axios
        .post(`${BASE_URL}/auth/login`, user)
        .then((response) => {
          if (response && response.data && response.data.token) {
            return response;
          } else {
            throw new Error("No data returned from server.");
          }
        })
        .catch((error) => {
          throw error;
        });
    },
    logoutCustomer: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    decodeToken: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        return await axios
          .get(`${BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
          })
          .catch((error) => console.error(error));
      }
    },
  },
  weatherAPI: {
    getWeatherByCity: async (city, setWeather) => {
      await axios
        .get(`${WEATHER_API_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
        .then((response) => setWeather(response.data))
        .catch((error) => console.log(error));
    },
  },
};

export default services;