import { useSelector } from "react-redux";

function EcommerceCard({ item, handleAddToCart }) {
  const cart = useSelector((state) => state.shopping.inCart);
  const isInCart = cart.some((cartItem) => cartItem.id === item.id);
  return (
    <div
      key={item.id}
      className="mx-auto flex w-[17rem] flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md"
    >
      <img
        src={item.imageSrc}
        alt={item.name}
        className="mb-4 h-48 w-full object-contain"
      />

      {/* product info */}
      <h2 className="mb-2 text-lg font-semibold">{item.name}</h2>
      <p className="mb-1 text-gray-600">
        Price: <span className="font-bold text-green-600">${item.price}</span>
      </p>
      <p className="mb-3 text-gray-600">
        In Stock:{" "}
        <span
          className={`font-bold ${
            item.inStock === 0 ? "font-bold text-red-600" : "text-gray-600"
          }`}
        >
          {item.inStock}
        </span>
      </p>

      <button
        onClick={() => handleAddToCart(item)}
        disabled={item.inStock === 0 || isInCart}
        className={`w-full rounded-lg px-4 py-2 text-white transition duration-200 ${
          item.inStock === 0 || isInCart
            ? "cursor-not-allowed bg-gray-400"
            : "bg-primary hover:bg-primaryHover"
        }`}
      >
        {item.inStock === 0
          ? "Out of Stock"
          : isInCart
            ? "In the Cart"
            : "Add to Cart"}
      </button>
    </div>
  );
}

export default EcommerceCard;
