import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

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

const Form = () => {
  const [name, setName] = useState("");
  const utils = trpc.useContext();
  const postCompetition = trpc.competition.createCompetition.useMutation({
    onMutate: () => {
      onMutate: () => {
        utils.competition.getAll.cancel();
        const optimisticUpdate = utils.competition.getAll.getData();

        if (optimisticUpdate) {
          utils.competition.getAll.setData(optimisticUpdate);
        }
      };
    },
    onSettled: () => {
      utils.competition.getAll.invalidate();
    },
  });

  const { data: session } = useSession();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (session !== null) {
          postCompetition.mutate({
            name,
            userId: session.user?.id as string,
          });
        }
        setName("");
      }}
    >
      <input
        type="text"
        value={name}
        placeholder="Your competition name..."
        minLength={2}
        maxLength={50}
        onChange={(event) => setName(event.target.value)}
        className="text-black"
      />
      <button type="submit">Submit</button>
    </form>
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
            <Form />
            <button onClick={() => signOut()}>logout</button>
          </>
        ) : (
          <button onClick={() => signIn("discord")}>login with discord</button>
        )}
        <div>
          <Competitions />
        </div>
      </div>
    </main>
  );
};

export default Home;
