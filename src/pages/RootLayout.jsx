import { Outlet } from 'react-router-dom';
import MainNav from '../components/mainNav';
function RootLayout() {
  return (
    <>
      <MainNav></MainNav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
}

export default RootLayout;
