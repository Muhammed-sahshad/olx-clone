import ProductCard from "../../components/ProductCard"
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../../firebase'
import { Link } from "react-router-dom";

interface Product {
  id: string
  category: string;
  name: string;
  description: string;
  price: string;
  location:string;
  images: string[];
  createdAt: string;
}

const Recommendation = () => {

  const [products, setProducts] = useState<Product[]>([])
const [loading , setLoading] = useState<boolean>(false)
const [error, setError] = useState<string>()


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products"); 
      const productSnapshot = await getDocs(productsCollection); 
      const productList = productSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[]; 

      setProducts(productList); 
      setLoading(false);
    } catch (err) {
      console.log(err)
      setError("Failed to fetch products");
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

if (loading) {
  return <div>Loading products...</div>;
}

if (error) {
  return <div>{error}</div>;
}

  return (
    <div className="px-10 mt-2">
        <h1 className="text-2xl mb-3">Fresh recommendations</h1>
        <ul className="flex gap-4">
          {products.map(product =>{
           return (
            <Link to={`/item/${product.id}`}  key={product.id}>
            <li><ProductCard  product={product}/></li> 
            </Link>
           )        
          })}
        </ul>
    </div>
  )
}

export default Recommendation