function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-custom bg-primary px-4 py-2 font-body font-medium text-white shadow-custom transition hover:bg-primaryHover ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
