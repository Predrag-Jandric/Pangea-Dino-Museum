import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_URL,
  import.meta.env.VITE_ANON_KEY,
);

export default function Checkout() {
  const [session, setSession] = useState(null);
  const cart = useSelector((state) => state.shopping.inCart);
  const [email, setEmail] = useState("");
  const [isComplete, setIsComplete] = useState(false);

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
  });

  //sign out
  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

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
  console.log(cart);

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
            <div className="m-3 flex justify-between rounded-lg bg-secondary/30 p-3 text-light">
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
          <div className="flex max-w-[400px] flex-col gap-3">
            Name:
            <input />
            Street:
            <input />
            City:
            <input />
            Zip Code:
            <input />
            Country
            <input />
          </div>
          <button
            className="mt-3 w-full rounded-lg bg-primary p-3 text-light hover:bg-highlight"
            onClick={() => setIsComplete(true)}
          >
            Purchase
          </button>
        </>
      )}
    </div>
  );
}
