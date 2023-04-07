import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout(props: any) {
    return (
        <React.Fragment>
            <div className="flex bg-gray-100 h-screen">
                <Sidebar />
                <div className="flex-1 ml-80">
                    <Navbar />
                    <div className="pt-5 mb-24 text-gray-900">
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}