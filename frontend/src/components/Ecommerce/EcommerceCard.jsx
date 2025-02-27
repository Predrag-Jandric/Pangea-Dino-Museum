import { useSelector } from "react-redux";
import Button from "../../utils/Button";

function EcommerceCard({ item, handleAddToCart }) {
  const cart = useSelector((state) => state.shopping.inCart);
  const isInCart = cart.some((cartItem) => cartItem.id === item._id);
  return (
    <div
      key={item._id}
      className="flex flex-col bg-white rounded-custom border border-gray-200 p-5 shadow-custom hover:shadow-xl transition"
    >
      {/* Product Image */}
      <img
        src={item.imageSrc}
        alt={item.name}
        className="mb-4 h-52 w-full object-contain"
      />

      {/* Product Info */}
      <h2
        className={`mb-3 text-2xl text-dark/85 font-titles font-light tracking-wider ${item.name.length > 15 && "text-xl"}`}
      >
        {item.name}
      </h2>
      <p className="mb-1">
        Price: <span className="text-primary font-semibold">${item.price}</span>
      </p>
      <p className="mb-3">
        In Stock:{" "}
        <span
          className={`font-semibold ${
            item.inStock === 0 ? "text-red-500" : "text-primary"
          }`}
        >
          {item.inStock}
        </span>
      </p>

      {/* Add to Cart Button */}
      <Button
        onClick={() => handleAddToCart(item)}
        disabled={item.inStock === 0 || isInCart}
        className={`mt-auto ${
          item.inStock === 0 || isInCart
            ? "cursor-not-allowed !bg-gray-300 hover:bg-gray-300"
            : "hover:bg-primaryHover"
        }`}
      >
        {item.inStock === 0
          ? "Out of Stock"
          : isInCart
            ? "In Cart"
            : "Add to Cart"}
      </Button>
    </div>
  );
}

export default EcommerceCard;
