import Image from "next/image";

//next link
import Link from "next/link";

//icons
import { HiArrowRight } from "react-icons/hi2";

const ProjectsBtn2 = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        href="/work"
        className="relative w-[185px] short:w-[110px] short:h-[110px] bottom-4 short:bottom-0 h-[185px] flex justify-center items-center z-10 pointer-events-auto"
      >
        <Image
          src="/rounded-text.png"
          width={126}
          height={132}
          alt=""
          className="animate-spin-slow"
        />

        <HiArrowRight className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300" />
      </Link>
    </div>
  );
};

export default ProjectsBtn2;
