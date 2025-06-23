//next link
import Link from "next/link";

//components
import Socials from '../components/Socials'

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-16 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 py-8">
          {/* Text Logo */}
          <Link href={'/'}>
            <div className="text-3xl font-semibold  tracking-wide leading-none">
              <span className="text-white text-[28px] ">kayode {''}</span>
              <span className="text-gray-400">femi</span>
              <span className="text-accent">.</span>
            </div>
          </Link>

          {/* Socials */}
          <Socials />
        </div>
      </div>
    </header>
  );
};

export default Header;
