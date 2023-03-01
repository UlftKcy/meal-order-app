import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode,
  className: string,
}

const ButtonFullCard = ({ children, className, ...props }: ButtonProps) => {
  const classNames = ['absolute text-white bg-orange-400 hover:bg-orange-500 hover:animate-bounce transition-colors easy-in duration-300 rounded-xl ring-orange-700 p-1 z-10 mb-1', className].join(' ');
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={classNames}
    >
      {children}
    </button>
  );
};

export default ButtonFullCard;
