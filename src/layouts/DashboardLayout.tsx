import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Index from '../pages/Index';

const DashboardLayout = (props: any) => {
    return (
        <>
            <div className="flex bg-gray-100 h-screen">
                <Sidebar />
                <div className="flex-1 ml-80">
                    <Navbar />
                    <div className="pt-5 mb-24 text-gray-900">
                        <Index />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;