import { useSelector } from "react-redux";
import Button from "../../utils/Button";

function EcommerceCard({ item, handleAddToCart }) {
  const cart = useSelector((state) => state.shopping.inCart);
  const isInCart = cart.some((cartItem) => cartItem.id === item._id);
  return (
    <div
      key={item._id}
      className="flex w-[17rem] flex-col bg-white rounded-lg border border-primary/30 p-4 shadow-md"
    >
      <img
        src={item.imageSrc}
        alt={item.name}
        className="mb-4 h-48 w-full object-contain rounded-xl bg-white"
      />

      {/* product info */}
      <h2
        className={`mb-2 font-semibold font-titles ${item.name.length > 15 && "text-xs"}`}
      >
        {item.name}
      </h2>
      <p className="mb-1 ">
        Price: <span className="font-bold ">${item.price}</span>
      </p>
      <p className="mb-3 ">
        In Stock:{" "}
        <span
          className={`font-bold ${
            item.inStock === 0 ? "font-bold text-primary" : ""
          }`}
        >
          {item.inStock}
        </span>
      </p>

      <Button
        onClick={() => handleAddToCart(item)}
        disabled={item.inStock === 0 || isInCart}
        className={`w-full px-4 py-2 transition duration-200 ${
          item.inStock === 0 || isInCart ? "cursor-not-allowed " : ""
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
