function Title({ title, className }) {
  return (
    <div  className={`text-center tracking-wide pb-10 px-4 text-dark/85 flex flex-col gap-4 ${className}`}>
      <h2 className="font-titles text-5xl font-thin">{title}</h2>
      {/* <p className="">{description}</p> */}
    </div>
  );
}

export default Title;
