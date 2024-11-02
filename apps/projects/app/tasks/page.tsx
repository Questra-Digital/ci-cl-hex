// pages/index.tsx
import ProjectManagement from '@/app/containers/ProjectManagement';
import HomePage from '@/app/components/ux/sidebar/sidebar';

const Home = () => {
  return (
    <div>
      <HomePage>
        <ProjectManagement />
      </HomePage>
    </div>
  );
};

export default Home;
