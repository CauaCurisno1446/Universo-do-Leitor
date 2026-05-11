type InputProps = {
  value: string;
  type?: string;
  placeholder: string;
  className?: string;
  onCriar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
};

function InputTexto({ value, type, placeholder, className, onCriar, id, name }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onCriar}
      placeholder={placeholder}
      id={id}
      name={name}
      required
      className={`border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[var(--marrom)] transition-colors placeholder:text-stone-300 bg-white ${className}`}
    />
  );
}

export { InputTexto };
