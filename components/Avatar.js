// next image
import Image from "next/image";

const Avatar = () => {
  return <div className="hidden xl:flex xl:max-w-none mar" >
    <Image 
    src={'/femi.png'}
    width={737}
    height={678}
    alt=""
    className="translate-z-0 w-full h-full "
    />
  </div>;
};

export default Avatar;
