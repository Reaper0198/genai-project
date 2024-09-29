import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../redux/user/userSlice';
import { toast } from 'react-hot-toast';


const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const { currentUser } = useSelector(state => state.user);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };
  const handleSignOut = () => {
    try{
      dispatch(signOut());
      toast.success('Sign out successful!');
      navigate('/');
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY > 130) {
      controls.start({
        height: '70px',
        backgroundColor: '#fff',
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({
        height: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        transition: { duration: 0.5 },
      });
    }
  }, [scrollY, controls]);

  return (
    <motion.div
      animate={controls}
      initial={{
        height: '100px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
      }}
      style={{
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: scrollY > 150 ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div className='w-full p-4 flex hover:cursor-pointer text-[#012f2c] items-center justify-evenly px-10'>
        <div onClick={() => navigate("/")}>
          <h1 className='italic text-3xl font-semibold'>MindFull</h1>
        </div>

        <div className='flex'>
          <ul className='flex gap-8 text-lg'>
            <li className='cursor-pointer hover:underline hover:text-[#00a884] transition-colors' onClick={() => navigate("/")}>Home</li>
            <li className='cursor-pointer hover:underline hover:text-[#00a884] transition-colors' onClick={() => navigate("/about")}>About</li>
            <li className='cursor-pointer hover:underline hover:text-[#00a884] transition-colors' onClick={() => navigate("/contact")}>Contact</li>
          </ul>
        </div>

        <div className='flex gap-4'>
          {
            currentUser ? (
              <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Profile"
                onClick={() => navigate('/profile')}
                className='px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200'
                >
                Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Profile"
                onClick={handleSignOut}
                className='px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200'
                >
                Sign out
              </motion.button>
                </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Log In"
                  onClick={() => navigate('/sign-in')}
                  className='px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200'
                >
                  Log In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Sign Up"
                  onClick={() => navigate('/sign-up')}
                  className='px-5 py-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-[#fefefd] transition-transform duration-200'
                >
                  Sign Up
                </motion.button>
              </>
            )
          }
        </div>
        
      </div>
    </motion.div>
  );
};

export default Navbar;
