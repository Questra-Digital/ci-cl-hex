// pages/index.tsx
import ProjectList from '@/app/containers/ProjectList';
import CreateProject from '@/app/containers/CreateProject';
import HomePage from '@/app/components/ux/sidebar/sidebar';

const Home = () => {
  return (
    <div>
      <HomePage></HomePage>
      <ProjectList />
    </div>
  );
};

export default Home;
