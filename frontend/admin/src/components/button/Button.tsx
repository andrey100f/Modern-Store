interface ButtonProps {
  bgColor: string;
  color: string;
  size: string;
  text: string;
  borderRadius: string;
}

function Button({ bgColor, color, size, text, borderRadius }: ButtonProps) {
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color: color, borderRadius: borderRadius }}
      className={ `w-full text-${size} p-1 hover:drop-shadow-xl` }>
      {text}
    </button>
  );
}

export default Button;