
// Settings
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "@/components/logo";
import Menu from "@/components/menu";




type DashboardLayoutProps = {
    children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <>
            <div className="h-screen w-full bg-[#05050a] flex">
                <div className="w-[250px] h-full border-r border-gray-500 p-5 flex flex-shrink-0 flex-col justify-between">
                    {/* Logo */}
                     <Logo />

                    {/* Menu */}
                    <Menu />

                    {/* Settings */}

                    <div>
                        <DropdownMenu >
                            <DropdownMenuTrigger className="text-gray-300 w-full flex items-center space-x-2 hover:bg-gray-600 px-2 rounded-lg">
                                <div>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                                <span>example.gmail.com</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className=" w-[200px] bg-[#05050a] border-gray-500 ">
                                <DropdownMenuItem className="text-gray-300">Profile</DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300">Billing</DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300">Team</DropdownMenuItem>
                                <DropdownMenuItem className="text-gray-300">Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>

                </div>

                <div>
                    {/* navbar */}
                    {/* Content */}
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}