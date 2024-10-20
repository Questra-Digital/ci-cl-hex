// pages/index.tsx
import ProjectList from '@/app/containers/ProjectList';
import CreateProject from '@/app/containers/CreateProject';

const Home = () => {
  return (
    <div>
      <h1>Project Management</h1>
      <CreateProject />
      <ProjectList />
    </div>
  );
};

export default Home;
