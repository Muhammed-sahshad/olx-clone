import olx_logo from "../assets/olx_icon.svg";
import search_icon from "../assets/search_icon.svg";
import dropdown_icon from "../assets/dropdown_icon.svg";
import search_icon_white from "../assets/search_icon_white.svg";
import like_icon from "../assets/like_icon.svg";
import sell_icon from "../assets/sell_button.svg";
import plus_icon from "../assets/plus_icon.svg";
import location_icon from "../assets/location_icon.svg";
import current_location_icon from "../assets/current_loaction_icon.svg";
import message_icon from '../assets/message_icon.svg'
import bell_icon from '../assets/bell_icon.svg'
import profile_icon from '/profile_icon.webp'
import { useEffect, useState } from "react";
import Login from "./Login";
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [locationInput, setLocationInput] = useState("India");
  const [isOpen, setIsOpen] = useState(false);
  const popularLocations = ["Kerala", "Tamil Nadu", "Punjab", "Maharashtra"];
  const [loginForm, setLoginForm] = useState(false)
  const [user, setUser] = useState<User | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth(); 
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);


  function handleLocationClick(location: string) {
    setLocationInput(location);
    setIsOpen((prev) => !prev);
  }

  if (loading) {
    return (
      <div className="flex justify-between items-center p-4">
        <Skeleton width={100} height={40} />
        <div className="flex gap-5 mt-1">
          <div className="flex relative w-80">
            <Skeleton width={230} height={40} />
          </div>
          <div className="flex gap-6">
            <Skeleton circle width={35} height={35} />
            <Skeleton width={60} height={30} />
            <Skeleton width={130} height={40} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex  align-middle px-4 py-2 gap-4 bg-slate-100`}>
      <button onClick={()=> navigate('/')}>
      <img src={olx_logo} alt="olx-logo" />
      </button>
      <div className="flex gap-5 mt-1">
        <div className="flex  relative">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Search city, area or location"
            className="rounded-md border-2 border-black  h-12  pl-10 w-[270px] "
          />
          <img
            className="absolute top-4 left-3"
            src={search_icon}
            alt=""
            width="18px"
          />
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <img
              src={dropdown_icon}
              alt=""
              className={`absolute right-4 top-4 transform transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              }`}
              width="20px"
            />
          </button>
          {isOpen && (
            <div className="absolute top-[50px] w-[270px] bg-white rounded-sm shadow-lg z-10">
              <ul className="max-h-60 overflow-y-auto">
                <div className=" flex gap-2 p-3 cursor-pointer">
                  <img src={current_location_icon} alt="" width="30px" />
                  <p className=" text-blue-600 font-semibold">
                    Use current location
                  </p>
                </div>
                <hr className="mb-3 border-t border-gray-300" />
                <p className="text-xs my-2 ml-4 text-gray-500">
                  POPULAR LOCATIONS
                </p>
                {popularLocations.map((location, index) => {
                  return (
                    <div  key={index}
                      className="flex hover:bg-cyan-100"
                      onClick={() => handleLocationClick(location)}
                    >
                      <img
                        src={location_icon}
                        alt=""
                        width="25px"
                        className="ml-4"
                      />
                      <li className="px-4 py-3 cursor-pointer">{location}</li>
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="flex flex-grow align-middle relative">
          <input
            type="text"
            placeholder="Find Cars, Mobile Phones and more..."
            className={`rounded-md border-2 border-black border-r-0 pl-3  h-12  ${user ? 'w-[440px]' : 'w-[540px]'}`}
          />
          <button className="bg-slate-700 h-12 border-0 rounded-r-md border-black w-12 absolute right-0">
            <img src={search_icon_white} alt="" className="ml-3" />
          </button>
        </div>
      </div>
      <div className="flex align-middle gap-5">
        <div className="flex align-middle gap-3">
          <p className="mt-4 font-semibold text-sm">ENGLISH</p>
          <img src={dropdown_icon} alt="" className="" width="20px" />
        </div>
        <div className="flex gap-5">
          <button className="mt-[9px] hover:bg-cyan-200 w-11 h-10 p-2 rounded-full">
            <img src={like_icon} alt="" className="" width="25px" />
          </button>
          { user &&
          <>
          <button><img src={message_icon} alt=""  className="mt-1"/></button>
          <button><img src={bell_icon} alt=""  className="mt-1"/></button>
          <button onClick={()=> navigate('/profile')}><img src={profile_icon} alt="" width='40px' className="rounded-full mt-1"/></button>
          </>
          }
    
       { !user &&  <div>
          <button onClick={()=> setLoginForm(true)} className="mt-3 font-semibold underline">Login</button>
        </div>}
          <button onClick={()=> user? navigate('/profile/sell'):setLoginForm(true)} className=" flex relative align-middle cursor-pointer">
            <div >
              <img src={sell_icon} alt="" width={user ? '110px' : '120px'}/>
            </div>
            <div className="absolute flex gap-2 top-[12px] left-[25px]">
              <img
                src={plus_icon}
                alt=""
                className=""
              />
              <span className="font-semibold ">
                SELL
              </span>
            </div>
          </button>
        </div>
      </div>

      {loginForm && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-lg w-96">
            <Login setLoginForm={setLoginForm}  />
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Navbar;
