import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_ANON_KEY
);

export default function Checkout() {
  const [session, setSession] = useState(null);
  const cart = useSelector((state) => state.shopping.inCart);
  const [email, setEmail] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
  });
  const [error, setError] = useState(false)
  const [isComplete, setIsComplete] = useState(false);

  // get session info when starting page
  useEffect(() => {
    const fetchSessionAndUserData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          const userEmail = data.user.email;
          setEmail(userEmail);
          setFormData((prevData) => ({
            ...prevData,
            email: userEmail,
          }));
        }
      }
    };
    fetchSessionAndUserData();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      fetchSessionAndUserData();
    });
    return () => subscription.unsubscribe();
  }, []);

  //sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("error signing out:", error);
    }
  }

  // handle filling in form, save to formData object
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    // validate form 
    const {firstName, lastName,address,email} = formData;
    if(!firstName || !lastName || !address || !email) {
      setError(true)
      return;
    }
    // get User ID
    const userId = session?.user?.id;

    //create new order object
    const newOrder = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address: formData.address,
      email: formData.email,
      total: +cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2),
      user_id: userId,
    };
    // create new order
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newOrder, cart }), // convert note into JSON format
      });
      // handle fetch error
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.error || "Failed to create order - original fetch"
        );
      }
      const data = await res.json();
    } catch (error) {
      console.log("Error from backend:", error.message);
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
          {email && email}
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
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="firstName">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {error && !formData.firstName && <span className="absolute right-0 text-xs top-2 text-highlight">required field</span>}
            </div>
            
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="firstName">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {error && !formData.lastName && <span className="absolute right-0 text-xs top-2 text-highlight">required field</span>}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="address">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              {error && !formData.address && <span className="absolute right-0 text-xs top-2 text-highlight">required field</span>}
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="address">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {error && !formData.email && <span className="absolute right-0 text-xs top-2 text-highlight">required field</span>}
            </div>
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-primary p-3 text-light hover:bg-highlight"
            >
              Purchase
            </button>
            {error && <div className="font-bold text-highlight">{error}</div>}
          </form>
        </>
      )}
    </div>
  );
}
