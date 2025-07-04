
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile'; 
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";

const ProfilePage = () => {
 
    const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/')
      } 
    })
  },[navigate])

  return (
    <div>
     <Profile /> 
    </div>
  );
};

export default ProfilePage;

