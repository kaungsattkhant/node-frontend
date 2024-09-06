import React,{useEffect} from 'react';
import { useRouter } from 'next/router';

import Sidebar from './layouts/navbar';
import Navbar from './layouts/sidebar';
const AdminLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Function page
    router.replace('/function');
  }, [router]);

  return null; 
  // return (
  //   <div className="flex">
  //     <Navbar />
  //     <div className="flex-1">
  //     <Sidebar />
  //       <div className="p-6">
  //         {children}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AdminLayout;
