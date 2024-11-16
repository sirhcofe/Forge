import React, { ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, onClick }) => {
    return <motion.button className={`p-3` + className} onClick={onClick}>{children}</motion.button>;
};

export default Button;