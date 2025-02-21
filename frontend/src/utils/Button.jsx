function Button({children}) {
    return (
        <button className="bg-blue-500 transition hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-custom">
            {children}
        </button>
    )
}

export default Button
