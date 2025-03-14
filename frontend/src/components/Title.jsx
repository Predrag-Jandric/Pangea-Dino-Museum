function Title({ title, className }) {
  return (
    <div
      className={`flex flex-col gap-4 px-4 pb-10 text-center tracking-wide text-dark/85 ${className}`}
    >
      <h2 className="font-titles text-5xl font-thin">{title}</h2>
      {/* <p className="">{description}</p> */}
    </div>
  );
}

export default Title;
