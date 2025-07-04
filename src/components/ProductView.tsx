 import Navbar from './Navbar'
import like_icon from '../assets/like_icon.svg'
import profile_img from '/profile_icon.webp'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { displayDate } from '../utils/dateUtils'

interface Product {
    category: string;
    name: string;
    description: string;
    price: string;
    location: string;
    images: string[];
    createdAt: string;
    userId:string
  }

const ProductView = () => {

    const { id } = useParams<{ id: string }>(); 
    const [product, setProduct] = useState<Product | null>(null); 
    const [loading, setLoading] = useState<boolean>(true); 
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string | undefined>(undefined) 
  
    useEffect(() => {
      const fetchProduct = async () => {
        if (!id) {
          setError('Product ID is missing');
          setLoading(false);
          return;
        }
  
        try {
          const docRef = doc(db, 'products', id); 
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            const productData = docSnap.data() as Product;
            setProduct(productData); 
    setCurrentImage((prev)=>{
        if(prev === undefined){
            return product?.images[0]
        }
        return prev
    }) 

            const userDocRef = doc(db, 'users', productData.userId); 
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUsername(userDocSnap.data().username);
           
          } else {
            setError('User not found');
          }

          } else {
            setError('Product not found');
          }
        } catch (error) {
          console.error(error);
          setError('Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
      
    }, [id,product]); 

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }

    
  return (
    <>
    <Navbar/>
    <div className='flex p-6 gap-[50px]'>
        <div className="flex flex-col w-[60%]  gap-2">
         <div className=" flex align-middle just  justify-center border rounded-md p-2">
         <img src={currentImage} alt=""  className='h-[410px]'/>
         </div>
         <div className='flex p-2 gap-5 border rounded-md px-5'>
            { product?.images.length &&
             product.images.map((img, index) => {    
                    return <img key={id?+index : index} src={img} alt="" className='w-[90px] h-[80px] object-cover rounded-md '
                    onClick={()=> setCurrentImage(img)}
                    />
             })
            }
         </div>
        </div>

        <div className="w-[40%] flex flex-col gap-2">
        <div className=' flex flex-col gap-2 border rounded-md p-5 px-6'>
        <div className='flex justify-between'>
            <span className='font-bold text-[22px]'>₹ {product?.price}</span>
            <button>
                <img src={like_icon} alt="" />
            </button>
        </div>
        <div>
            <h1 className='text-[16px] font-semibold text-gray-600'>{product?.name}</h1>
        </div>
        <div className='flex justify-between text-[13px] text-gray-500'>
        <span>{product?.location}</span>
        <span onClick={()=> console.log(product?.createdAt)}> {displayDate(product?.createdAt?product?.createdAt:'')}</span>
        </div>
        </div>
        <div className='border rounded-md p-5'>
        <div className='flex flex-col align-middle gap-5'>
            <div className='flex'>
            <div><img src={profile_img} alt="" className='w-[60px] rounded-full' /></div>
            <div className='flex p-4 font-semibold text-[18px]'><p>{username}</p></div>
            </div>
            <div className=''>
                <button className='block w-full bg-gray-900 rounded-md p-2 text-white'>chat with seller</button>
            </div>
        </div>
        </div>
        <div className='flex flex-col gap-2 border rounded-md p-5'>
        <h1 className='font-bold text-[22px]'>Posted in</h1>
        <p className='text-[13px] text-gray-500'>{product?.location}</p>
        </div>
        <div className='border rounded-md p-5'>
            <h3 className='font-semibold mb-2'>Description</h3>
            <p className='text-[14px] text-gray-500'>{product?.description}</p>
        </div>
        </div>
    </div>
   </>
  )
}

export default ProductView