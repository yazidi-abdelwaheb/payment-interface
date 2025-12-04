import "./style.css";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: string;
  bgColor?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  paddingX?: string;
  paddingY?: string;
}


export default function ButtonComponent(props: ButtonProps) {
  const {
    label,
    onClick,
    color = "#ffffff",
    bgColor = "#3b82f6",
    disabled = false,
    className = "",
    type = "button",
    paddingX,
    paddingY,

  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md font-medium transition duration-200 ${className}`}
      style={{
        backgroundColor:bgColor,
        opacity: disabled ? 0.6 : 1,
        color: disabled ? "#f3f4f6" : color,
        cursor: disabled ? "not-allowed" : "pointer",
        paddingLeft: paddingX || "1rem",
        paddingRight:paddingX || "1rem",
        paddingTop:paddingY || "0.5rem",
        paddingBottom: paddingY || "0.5rem",
      }}
    >
      {label}
    </button>
  );
}
