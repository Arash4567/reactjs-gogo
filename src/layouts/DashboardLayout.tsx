import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const DashboardLayout = (props: any) => {
    return (
        <>
            <div className="flex bg-gray-100 h-screen">
                <Sidebar />
                <div className="flex-1 ml-0 transition-all duration-500 lg:ml-80">
                    <Navbar />
                    <div className="pt-5 mb-24 md:mb-0 ">
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;