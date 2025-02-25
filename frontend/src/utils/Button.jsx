function Button({children, onClick, className, disabled}) {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-primary shadow-custom transition hover:bg-primaryHover text-white font-bold py-2 px-4 rounded-custom ${className}`}
      >
        {children}
      </button>
    )
}

export default Button
