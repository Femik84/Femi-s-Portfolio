// links
import Link from "next/link";

// icons
import {
  RiGithubLine,
  RiWhatsappLine,
  RiTwitterXLine,
  RiInstagramLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";

const Socials = () => {
  return (
    <div className="flex items-center gap-x-5 text-lg">
      <Link
        href="https://github.com/Femik84"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiGithubLine />
      </Link>

      <Link
        href="https://wa.me/2349163046540"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiWhatsappLine />
      </Link>

      <Link
        href="https://twitter.com/Mr_Fe_mi"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiTwitterXLine />
      </Link>

      <Link
        href="https://instagram.com/F_emi_k"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiInstagramLine />
      </Link>

      <Link
        href="https://www.linkedin.com/in/femi-kayode-96ab123a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
        className="hover:text-accent transition-all duration-300"
        target="_blank"
      >
        <RiLinkedinBoxLine />
      </Link>
    </div>
  );
};

export default Socials;
