import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api";

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_ANON_KEY
);

export default function Checkout() {
  const [session, setSession] = useState(null);
  const cart = useSelector((state) => state.shopping.inCart);
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });
  const [isComplete, setIsComplete] = useState(false);

  // get session info when starting page
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // get user Email
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setEmail(data.user.email);
    }
    fetchUser();
  }, []);

  //sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  // handle filling in form, save to formData object
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // get User ID
    const userId = session?.user?.id;

    //create new order object
    const newOrder = [
      {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address: formData.address,
        email: formData.email,
        total: cart
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2),
        user_id: userId,
      },
    ];

    try {
      const res = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({newOrder, cart}), // convert note into JSON format
      });

      if(!res.ok) throw new Error("Failed to create order")
      
      const data = await res.json();
      console.log("added:", data)
    } catch (error) {
      console.log(error);
    }
    // move to completed page
    setIsComplete(true);
  };

  // if user is not logged in. propt to login/create account
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center bg-dark">
        <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google", "github"]}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="h-svh bg-dark p-5 text-light">
      <div className="flex justify-between">
        <Link
          to="/shoppingCartPage"
          className="rounded-lg bg-primary p-1 hover:bg-highlight"
        >
          Back to Cart
        </Link>
        <p className="text-xs">
          {email}
          <button
            onClick={signOut}
            className="ml-3 rounded-lg bg-primary p-1 hover:bg-highlight"
          >
            Sign Out
          </button>
        </p>
      </div>
      {isComplete ? (
        <div>Order Complete!</div>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.name}
              className="m-3 flex justify-between rounded-lg bg-secondary/30 p-3 text-light"
            >
              <p>{item.name}</p>
              <p>
                {item.quantity} x {item.price}
              </p>
            </div>
          ))}
          <div className="text-right text-3xl font-bold text-highlight">
            Total: $
            {cart
              .reduce((sum, item) => sum + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex max-w-[400px] flex-col gap-3"
          >
            First Name:
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            Last Name:
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            Address:
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            Email:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />{" "}
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-primary p-3 text-light hover:bg-highlight"
            >
              Purchase
            </button>
          </form>
        </>
      )}
    </div>
  );
}
