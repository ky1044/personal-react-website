import { motion } from "framer-motion";
import useWindow from "src/hooks/useWindow";

function HeroImage({ scrollHeight }: { scrollHeight: number }) {
  const { isMobile } = useWindow();
  const heroImage = isMobile ? "hero-mobile.jpg" : "hero.jpg";
  return (
    <div className="w-full max-w-[1600px] my-20 mx-auto h-[max(40vh,40vw)] max-h-[700px] relative overflow-x-clip">
      <img
        src={`${process.env.PUBLIC_URL}/${heroImage}`}
        className="w-full h-full object-cover"
      />
      <motion.div
        className="w-[180px] h-[180px] absolute bg-[rgba(154,186,201,0.4)] -top-5 left-[calc(40%-180px)] backdrop-blur-[15px]"
        animate={{
          x: -scrollHeight / 64,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
      <motion.div
        className="w-[150px] h-[150px] absolute bg-[rgba(39,121,148,0.4)] -bottom-5 left-[calc(25%-140px)] backdrop-blur-[10px]"
        animate={{
          x: -scrollHeight / 16,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
      <motion.div
        className="w-[120px] h-[120px] absolute bg-[rgba(92,155,255,0.4)] bottom-[18%] right-[calc(25%-120px)] backdrop-blur-[7px]"
        animate={{
          x: scrollHeight / 36,
          transition: {
            default: { type: "easeInOut" },
          }
        }}
      />
    </div>
  );
}

export default HeroImage;
