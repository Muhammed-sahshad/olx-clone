import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase"; 
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const SellProduct = () => {
  const [productName, setProductName] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productImages, setProductImages] = useState<File[]>([]);
  const [productCategory, setProductCategory] = useState<string>(""); 
  const [productLocation, setProductLocation] = useState<string>('')
  const [imageURLs, setImageURLs] = useState<string[]>([]); 
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate()
  const context = useContext(UserContext); 

  if (!context) {
    throw new Error('UserContext is not available');
  }

  const { user, loading } = context;

  useEffect(()=>{

    if (loading) return;

     if(!user){
      navigate('/')
     }
  },[navigate,user,loading])

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "olx-clone/products"); 
    
    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      return response.data.secure_url; 
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setProductImages(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !productDescription || !productPrice || productImages.length === 0) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const uploadedImageUrls = await Promise.all(productImages.map(uploadImageToCloudinary));
      setImageURLs(uploadedImageUrls);

      const user = getAuth().currentUser;

      if (!user) {
        setError("You must be logged in to sell a product.");
        setIsSubmitting(false);
        return;
      }

      const productData = {
        category:productCategory,
        name: productName,
        description: productDescription,
        price: productPrice,
        images: uploadedImageUrls,
        location:productLocation,
        userId: user.uid, 
        createdAt: new Date(),
      };

      const productsCollection = collection(db, "products");
      await setDoc(doc(productsCollection), productData);

      setProductCategory('')
      setProductLocation('')
      setProductName("");
      setProductDescription("");
      setProductPrice("");
      setProductImages([]);
      setImageURLs([]);
      setIsSubmitting(false);
      alert("Product successfully listed for sale!");
    } catch (error) {
        console.log(error)
      setError("Failed to sell product. Please try again.");
      setIsSubmitting(false);
    }
  };

  if(loading){
    return <div>Loading...</div>
  }

  return (
    
    <div className=" flex w-full align-middle justify-center mt-[50px]">
    <div className="flex flex-col items-center border rounded-md p-5 w-[50%]">
      <h2 className="font-semibold text-2xl p-2 text-slate-700">Sell Your Product</h2>
      {error && <p className="error">{error}</p>}
      <form className="flex flex-col gap-5 mt-3" onSubmit={handleSubmit}>
      <div className="flex gap-[100px] justify-between">
            <label className="mt-2 font-medium"> Category</label>
            <select className="w-[350px] border-2 p-2 rounded-md"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select category </option>
              <option value="car">CAR</option>
              <option value="bike">BIKE</option>
              <option value="mobile">MOBILE</option>
            </select>
          </div>

        <div className="flex justify-between">
          <label className="mt-2 font-medium"> Name</label>
          <input
          className="w-[350px] border-2 p-2 rounded-md"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="flex justify-between">
          <label className="mt-2 font-medium">Description</label>
          <textarea
          className="w-[350px] border-2 p-2 rounded-md"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            required
          />
        </div>

        <div className="flex justify-between">
          <label className="mt-2 font-medium">Price</label>
          <input
          className="w-[350px] border-2 p-2 rounded-md"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice((prev)=> {
               if(parseFloat(e.target.value) < 1 ){
                return prev
               }else{
                return e.target.value
               }
            })}
            placeholder="Enter product price"
            required
          />
        </div>

        <div className="flex justify-between">
          <label className="mt-2 font-medium">Location</label>
          <input
          className="w-[350px] border-2 p-2 rounded-md"
            type="text"
            value={productLocation}
            onChange={(e) => setProductLocation(e.target.value)}
            placeholder="Enter product location"
            required
          />
        </div>

        <div className="flex justify-between">
          <label className=" font-medium"> Images</label>
          <input
          className="w-[350px]"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>  

        {imageURLs.length > 0 && (
          <div>
            <h4>Uploaded Images</h4>
            <div className="image-previews">
              {imageURLs.map((url, index) => (
                <img key={index} src={url} alt={`product-image-${index}`} width={100} />
              ))}
            </div>
          </div>
        )}
        <div className="flex  justify-end mt-3">
        <button type="submit" disabled={isSubmitting} className="border rounded-full p-2 bg-black text-white w-[350px] ">
          {isSubmitting ? "Submitting..." : "Submit Product"}
        </button>  
        </div>
      </form>
    </div>
    </div>

  );
};

export default SellProduct;
