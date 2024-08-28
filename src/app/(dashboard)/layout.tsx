import { getSession } from "@/actions/auth/session-action";
import Logo from "@/components/logo";
import Menu from "@/components/menu";
import Settings from "@/components/settings";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
    children: React.ReactNode
}
export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const session = await getSession();
    if(!session.isLoggedIn) {
      redirect('/login')
    }
   
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