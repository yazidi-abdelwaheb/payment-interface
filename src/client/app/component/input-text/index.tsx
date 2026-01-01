import "./style.css";

export interface InputTextProps {
  id: string;
  label: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  type?: string;
  disabled?: boolean;
}

export default function InputTextComponent({
  id,
  label,
  name,
  placeholder = "",
  value = "",
  onChange,
  required = false,
  className = "",
  type = "text",
  disabled = false,
}: InputTextProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>

      <input
        disabled={disabled} 
        id={id}
        type={type}
        name={name || id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full border rounded p-2 ${className}`}
      />
    </div>
  );
}
