// pages/index.tsx
import ProjectList from '@/app/containers/ProjectList';
import HomePage from '@/app/components/ux/sidebar/sidebar';

const Home = () => {
  return (
    <div>
      <HomePage>
        <ProjectList />
      </HomePage>
      
    </div>
  );
};

export default Home;
