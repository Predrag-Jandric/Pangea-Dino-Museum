function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary font-body shadow-custom transition hover:bg-primaryHover text-white font-medium py-2 px-4 rounded-custom ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
