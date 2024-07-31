import Logo from "@/components/logo";
import Menu from "@/components/menu";
import Settings from "@/components/settings";

type DashboardLayoutProps = {
    children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) { //children kavramini sor
    return (
        <>
            <div className="h-screen w-full bg-[#05050a] flex">
                <div className="w-[250px] h-full border-r border-gray-500 p-5 flex flex-shrink-0 flex-col justify-between">
                    {/* Logo */}
                    <Logo />
                    {/* Menu */}
                    <Menu />
                    {/* Settings */}
                    <Settings />
                </div>

                <div className="bg-white flex flex-col w-full">
                    {/* navbar */}
                    {/* <Navbar /> */}
                    {/* Content */}
                    <div>
                        {children}
                    </div>
                    
                    
                </div>
               
            </div>
        </>
    )
}