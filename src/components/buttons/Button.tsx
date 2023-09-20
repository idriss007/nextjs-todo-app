import clsx from "clsx";

type ButtonProps = {
  children: any;
  bgColor?: string;
  textColor?: string;
  rounded?: string;
  padding?: string;
  height?: string;
  width?: string;
  hover?: string;
  position?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: any;
  onMouseDown?: any;
  disabled?: boolean;
  className?: string;
};

const Button = (props: ButtonProps) => {
  const {
    bgColor = "bg-black dark:bg-white",
    textColor = "text-white dark:text-black",
    rounded = "rounded-sm",
    padding = "p-2",
    height = "h-fit",
    width = "w-fit",
    hover = "dark:hover:bg-gray-200 hover:bg-gray-800 active:dark:bg-gray-300 active:bg-gray-700 focus:outline-none focus:dark:outline-none focus:ring focus:dark:ring focus:dark:ring-gray-500 focus:ring-gray-300",
    children,
    position,
    type = "button",
    className,
    ...rest
  } = props;

  return (
    <button
      className={clsx(
        bgColor,
        rounded,
        padding,
        textColor,
        height,
        width,
        hover,
        position,
        className
      )}
      type={type}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default Button;
