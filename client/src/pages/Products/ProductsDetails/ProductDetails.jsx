import ProductDetailsCard from "../../../components/Cards/ProductDetailsCard/ProductDetailsCard";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import services from '../../../api/api';
import BarLoader from 'react-spinners/BarLoader';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        await services.productAPI.getProductById(id, (data) => {
          if (data && data.length > 0) {
            setProduct(data[0]);
          } else {
            setProduct(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  return (
    <div className='productDetails'>
      {loading ? (
        <div className="loaderContainer">
          <BarLoader color="#212121" width="50%" height={6} />
        </div>
      ) : (
        product && <ProductDetailsCard key={id} item={product} />
      )}
    </div>
  )
}

export default ProductDetails