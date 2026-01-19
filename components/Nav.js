// icons
import {
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";
import { Home, User, Briefcase, FolderOpen, MessageSquare, Mail } from "lucide-react";

// next link
import Link from "next/link";

//next router
import { useRouter } from "next/router";

// nav data
export const navData = [
  { 
    name: "home", 
    path: "/", 
    icon: <Home className="w-6.5 h-6.5 lg:w-5 lg:h-5" fill="currentColor" />,
    mobileIcon: <Home className="w-6 h-6" fill="currentColor" />
  },
  { 
    name: "about", 
    path: "/about", 
    icon: <HiUser />,
    mobileIcon: <User className="w-6 h-6" />
  },
  { 
    name: "services", 
    path: "/services", 
    icon: <HiRectangleGroup />,
    mobileIcon: <Briefcase className="w-6 h-6" />
  },
  { 
    name: "work", 
    path: "/work", 
    icon: <HiViewColumns />,
    mobileIcon: <FolderOpen className="w-6 h-6" />
  },
  {
    name: "testimonials",
    path: "/testimonials",
    icon: <HiChatBubbleBottomCenterText />,
    mobileIcon: <MessageSquare className="w-6 h-6" />
  },
  {
    name: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
    mobileIcon: <Mail className="w-6 h-6" />
  },
];

const Nav = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen">
      {/* inner */}
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-6 md:px-40 xl:px-0 h-[70px] xl:h-max py-8 bg-white xl:bg-white/10 backdrop-blur-md shadow-[0_-2px_8px_rgba(0,0,0,0.05)] xl:shadow-none border-t border-gray-100 xl:border-none text-3xl xl:text-xl xl:rounded-full">
        {navData.map((link, index) => {
          const isActive = link.path === pathname;
          return (
            <Link
              className="relative flex items-center group transition-all duration-300"
              href={link.path}
              key={index}
            >
              {/* tooltip - desktop only */}
              <div className="absolute pr-14 right-0 hidden xl:group-hover:flex">
                <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                  <div className="text-[12px] leading-none font-semibold capitalize">
                    {link.name}
                  </div>

                  {/* triangle */}
                  <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
                </div>
              </div>

              {/* icon container with active state styling */}
              <div className={`flex items-center justify-center w-10 h-8 xl:w-auto xl:h-auto rounded-2xl xl:rounded-none relative transition-all duration-300 ${
                isActive ? "bg-blue-50 xl:bg-transparent" : ""
              } hover:text-accent`}>
                {/* icon - desktop shows original icon, mobile shows modern lucide icon */}
                <div className={`hidden xl:block ${isActive ? "text-accent" : ""}`}>
                  {link.icon}
                </div>
                <div className={`block xl:hidden ${isActive ? "text-blue-500" : "text-gray-600"}`}>
                  {link.mobileIcon}
                </div>
                
                {/* active indicator - mobile only */}
                {isActive && (
                  <div className="absolute -bottom-1.5 xl:hidden w-6 h-0.5 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default Nav;