import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

const Competition = () => {
  const { id } = useRouter().query;
  const idToInt = parseInt(id as string, 10);
  const { data: competition, isLoading } =
    trpc.competition.getUniqueCompetition.useQuery({ id: idToInt });

  if (isLoading) return <div>Getting the unique competition...</div>;

  return (
    <div>
      <p>name of competition is: {competition?.name}</p>
      <p>name of user who created it is: {competition?.user.name}</p>
    </div>
  );
};

export default Competition;
