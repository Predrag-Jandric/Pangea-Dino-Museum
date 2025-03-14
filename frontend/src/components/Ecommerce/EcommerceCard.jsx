import { useSelector } from "react-redux";
import Button from "../../utils/Button";

// this component is each individual card in the ecommerce page that displays the dinosaur info
function EcommerceCard({ item, handleAddToCart }) {
  const cart = useSelector((state) => state.shopping.inCart);
  const isInCart = cart.some((cartItem) => cartItem.id === item._id);
  return (
    <div
      key={item._id}
      className="flex flex-col rounded-custom border border-grayOne/70 bg-white p-5 shadow-custom transition-all hover:shadow-xl"
    >
      <img
        src={item.imageSrc}
        alt={item.name}
        className="mb-4 h-52 w-full object-contain"
      />
      <h2
        className={`mb-3 font-titles text-2xl font-light tracking-wider text-dark/85 ${item.name.length > 15 && "text-xl"}`}
      >
        {item.name}
      </h2>
      <p className="mb-1">
        Price: <span className="font-semibold text-primary">${item.price}</span>
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
