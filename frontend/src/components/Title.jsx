function Title({ title, description }) {
    return (
        <div className="text-center pb-10 px-4 text-dark flex flex-col gap-4">
            <h2 className="font-titles text-5xl font-medium">{title}</h2> 
            <p className="">{description}</p>
        </div>
    )
}

export default Title;