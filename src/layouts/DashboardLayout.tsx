import Footer from '@/components/dashboard/Footer';
import Header from '../components/dashboard/Header';
import Sidebar from '../components/dashboard/Sidebar';
import { useLocalStorage } from '@/context/LocalStorageContext';
import { useState } from 'react'
import { Outlet } from 'react-router';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>("admin.sidebar.collapsed", false);
  const [openMobile, setOpenMobile] = useState(false);

  return (
    <>
        <div className="min-h-dvh w-full flex bg-background">
        <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed((v) => !v)}
        />

        <div className="flex-1 flex flex-col">
            <Header setOpenMobile={setOpenMobile} />
            <main className="p-4">
                <Outlet />
            </main>
            <Footer />
        </div>

        {openMobile && (
            <div className="fixed inset-0 z-50 md:hidden">
                <div className="absolute inset-0 bg-black/30" onClick={() => setOpenMobile(false)} />
                <div className="absolute inset-y-0 left-0">
                <Sidebar
                    mobile
                    collapsed={false}
                    onToggle={() => {}}
                    onCloseMobile={() => setOpenMobile(false)}
                />
                </div>
            </div>
            )}
        </div>
        
    </>
  );
}

export default DashboardLayout