import { BsShieldFillCheck } from "react-icons/bs";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";

interface Props {
  color: string;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
}

const ServiceCard = ({ color, title, icon, subtitle }: Props) => {
  return (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
      <div
        className={`size-10 rounded-full flex justify-center items-center ${color}`}
      >
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1">
        <h1 className=" mt-2 text-lg text-white">{title}</h1>
        <p className="mt-2 text-sm text-white md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex lg:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 ">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center ">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed with our advanced encryption"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Exchange Rate"
          icon={<BsFillSearchHeartFill fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed with our advanced encryption"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Trust  "
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Security is guaranteed with our advanced encryption"
        />
      </div>
    </div>
  );
};
export default Services;
