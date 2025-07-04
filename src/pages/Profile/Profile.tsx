import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import profile_icon from '/profile_icon.webp';
import { logout } from '../../firebase';
import { useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  createdAt: string;
}

const Profile = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const context = useContext(UserContext); 

  if (!context) {
    throw new Error('UserContext is not available');
  }

  const { user, loading } = context;

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchUserProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, where('userId', '==', user.uid));

        const querySnapshot = await getDocs(q);

        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];

        setProducts(productsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserProducts();
  }, [user]); 

  if (loading) {
    return <div className="flex w-full h-screen items-center justify-center">
    <div >Loading...</div>
  </div>
  }

  return (
    <>
      <Navbar />
      <div className="w-full flex">
        <div className="w-[30%] px-3 py-6">
          <div className="flex flex-col items-center">
            <img src={profile_icon} alt="" width="80px" className="rounded-full" />
            <h3 className="font-semibold text-[25px]">{user?.displayName || 'Username'}</h3>
          </div>
          <div className="flex justify-evenly p-3">
            <span>0 following</span>
            <span>0 followers</span>
          </div>
          <div className="flex flex-col items-center py-5 px-14">
            <button className="border rounded-md py-1 w-full" onClick={handleLogout}>
              logout
            </button>
          </div>
        </div>
        <div className="w-[70%] flex mt-10">
          <ul>
            {products.map(product => (
              <Link key={product.id} to={`/item/${product.id}`}>
              <li>
                <ProductCard product={product} />
              </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
