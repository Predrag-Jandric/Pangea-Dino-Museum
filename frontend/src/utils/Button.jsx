function Button({children, onClick, className}) {
    return (
        <button
        onClick={onClick}
        className={`bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-custom ${className}`}
      >
        {children}
      </button>
    )
}

export default Button
