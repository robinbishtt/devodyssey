import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './dashboardSidebar';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen mt-20 sm:flex-row">
            <DashboardSidebar />
            <div className="w-full p-6 text-white bg-black sm:w-[80%]">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
