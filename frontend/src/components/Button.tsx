import React, { ButtonHTMLAttributes, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

const variants = {
  initial: (small: boolean) => ({
    width: small ? "20px" : "42px",
    background: "#8ECAE6",
    transition: { duration: 0.5, ease: "easeInOut" },
  }),
  animate: {
    width: "100%",
    background: "#8ECAE6",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Button = ({
  children,
  className = "",
  small = false,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  small?: boolean;
  onClick: () => void;
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick;
  };

  return (
    <motion.button
      className={
        `relative py-3 border-2 border-primary-dark text-black inline-block rounded-2xl overflow-hidden bg-foreground ` +
        className
      }
      onClick={handleClick}
      onHoverStart={() => !clicked && setHovered(true)}
      onHoverEnd={() => !clicked && setHovered(false)}
    >
      <motion.div
        style={{ height: "100%" }}
        className={`absolute top-0 left-0 flex justify-end items-center ${
          small ? "pr-1" : "pr-2"
        }`}
        initial="initial"
        animate={clicked || hovered ? "animate" : "initial"}
        variants={variants}
        custom={small}
      >
        {small ? (
          <LuArrowRight size={12} color="white" />
        ) : (
          <LuArrowRight size={24} color="white" />
        )}
      </motion.div>
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
};

export default Button;
