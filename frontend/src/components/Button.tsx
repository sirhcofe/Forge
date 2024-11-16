import React, { ButtonHTMLAttributes, useState } from "react";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

const variants = {
  initial: {
    width: "42px",
    background: "#8ECAE6",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  animate: {
    width: "100%",
    background: "#8ECAE6",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  onClick,
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
        `relative py-3 border-2 border-primary-dark text-black inline-block rounded-2xl overflow-hidden ` +
        className
      }
      onClick={handleClick}
      onHoverStart={() => !clicked && setHovered(true)}
      onHoverEnd={() => !clicked && setHovered(false)}
    >
      <motion.div
        style={{ height: "100%" }}
        className="absolute top-0 left-0 flex justify-end items-center pr-2"
        initial="initial"
        animate={clicked || hovered ? "animate" : "initial"}
        variants={variants}
      >
        <LuArrowRight size={24} color="white" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
};

export default Button;
