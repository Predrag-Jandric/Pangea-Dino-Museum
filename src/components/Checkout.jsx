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
    <div className="h-svh bg-dark p-5">
      <div className="flex justify-between text-light">
        <Link
          to="/shoppingCartPage"
          className="ml-3 rounded-lg bg-primary p-1 hover:bg-highlight"
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
      {cart.map((item) => (
        <div className="m-3 rounded-lg bg-secondary/30 p-3 text-light">
          {item.name}: {item.price}
        </div>
      ))}
      <div className="text-3xl font-bold text-primary text-right">
        Total: {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      </div>
    </div>
  );
}
