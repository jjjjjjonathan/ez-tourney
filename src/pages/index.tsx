import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";

const Competitions = () => {
  const { data: competitions, isLoading } = trpc.competition.getAll.useQuery();

  if (isLoading) return <div>Fetching competitions, just wait!</div>;

  return (
    <div>
      {competitions?.map((competition, index) => {
        return (
          <div key={index}>
            <p>{competition.name}</p>
          </div>
        );
      })}
    </div>
  );
};

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
            <Competitions />
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
