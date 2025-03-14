const Modal = ({ content, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="fixed inset-0 z-50 !m-0 flex items-center justify-center bg-dark bg-opacity-40"
      onClick={handleClickOutside}
    >
      <article className="m-6 w-[30rem] rounded-custom bg-white p-10 shadow-custom">
        {content}
      </article>
    </section>
  );
};

export default Modal;
