// pages/index.tsx
import TeamList from '@/app/containers/TeamList';
import CreateTeam from '@/app/containers/CreateTeam';

const Home = () => {
  return (
    <div>
      <h1>Team Management</h1>
      <CreateTeam />
      <TeamList />
    </div>
  );
};

export default Home;
