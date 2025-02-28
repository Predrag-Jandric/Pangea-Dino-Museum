import { IoIosClose } from "react-icons/io";

const Modal = ({ content, onClose, handleClickOutside }) => {
  return (
    <section
      id="modal-overlay"
      className="fixed inset-0 z-50 !m-0 flex items-center justify-center bg-dark bg-opacity-20"
      onClick={handleClickOutside}
    >
      <article className="dark:bg-dark-primary w-[30rem] rounded-lg bg-white p-10">
        <div className="flex items-center justify-between">
          <button
            className="mb-10 ml-auto flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white p-1 shadow transition duration-200 hover:text-red-600"
            onClick={onClose}
          >
            <IoIosClose className="size-14" />
          </button>
        </div>
        {content}
      </article>
    </section>
  );
};

export default Modal;
