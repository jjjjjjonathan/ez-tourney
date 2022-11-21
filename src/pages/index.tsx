import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <h1>hello world</h1>
      <div>
        {session ? (
          <>
            <p>hi {session.user?.name}</p>
            <button onClick={() => signOut()}>logout</button>
          </>
        ) : (
          <button onClick={() => signIn("discord")}>login with discord</button>
        )}
      </div>
    </main>
  );
};

export default Home;
