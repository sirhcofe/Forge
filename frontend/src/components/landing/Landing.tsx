import { motion } from "framer-motion";
import { animationDelay } from "./animation";
import { useWeb3Auth } from "@/hooks/useWeb3Auth";

const DotVariants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const ThreeDotsWave = () => {
  return (
    <motion.div
      className="flex gap-x-2"
      animate="animate"
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.span
        className="w-2 h-2 bg-black rounded-full"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="w-2 h-2 bg-black rounded-full"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.span
        className="w-2 h-2 bg-black rounded-full"
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

const Landing = ({ ready, user }: { ready: boolean; user: any }) => {
  const { login } = useWeb3Auth();

  return (
    <>
      <motion.div className="absolute top-0 left-0 w-screen h-screen grid grid-cols-[repeat(16,minmax(0,1fr))] grid-rows-[repeat(9,minmax(0,1fr))] z-30">
        {Array.from({ length: 144 }, (_, index) => {
          const row = Math.floor(index / 16);
          const delay = animationDelay[row][index % 16];
          return (
            <motion.div
              className="w-full h-full bg-accent col-span-1 row-span-1"
              animate={
                !user && {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    delay: 1.45 - delay,
                  },
                }
              }
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: { delay: delay },
              }}
              key={index}
            />
          );
        })}
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 w-screen h-screen flex flex-col gap-y-8 items-center justify-center z-40"
        animate={
          !user && {
            opacity: 1,
            y: 0,
          }
        }
        exit={{ opacity: 0, y: -20 }}
      >
        <h1>PeerFlux</h1>
        <button
          className="w-56 h-16 flex items-center justify-center border-2 border-primary-dark text-black rounded-2xl bg-foreground"
          onClick={() => user === undefined && login()}
          disabled={!ready}
        >
          {ready ? !user && <h2>Sign in</h2> : <ThreeDotsWave />}
        </button>
      </motion.div>
    </>
  );
};

export default Landing;
