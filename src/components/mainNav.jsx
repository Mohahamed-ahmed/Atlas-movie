import { NavLink, ScrollRestoration, useLocation } from 'react-router-dom';
import classes from './mainNav.module.css';
import { useEffect, useState } from 'react';
// import SearchBox from './Search';
import { useNavigate } from 'react-router-dom';

function MainNav() {
  const [searchQuery, SetSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchVariableHandler = (event) => {
    event.preventDefault();
    SetSearchQuery(event.target.value);

    navigate('/search', { state: { searchQuery: event.target.value } });
    // SetSearchQuery('');
  };

  const toggleNavHandler = () => {
    setToggleNav((prev) => !prev);
  };

  useEffect(() => {
    if (location.pathname !== '/search') {
      SetSearchQuery('');
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        // You can adjust the scroll threshold as needed
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const links = (
    <ul className={classes.links}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Movies
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/series"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          TV Shows
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/actors"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Actors
        </NavLink>
      </li>
      <ScrollRestoration></ScrollRestoration>
    </ul>
  );

  return (
    <div className={`${classes.header} ${scrolled ? classes.scrolled : ''}`}>
      <header className={classes['header-container']}>
        <nav>
          <p className={classes.logo}>Netflix</p>
          {links}
        </nav>
        <div className={classes.right}>
          <form>
            <input
              onChange={searchVariableHandler}
              type="text"
              placeholder="Search movies or series"
              value={searchQuery}
              className={`${classes['search-input']} ${
                scrolled ? classes.scrolledSearch : ''
              }`}
            ></input>
          </form>
        </div>
        <div
          className={`${classes.mobileNav} ${toggleNav ? classes.active : ''}`}
          onClick={toggleNavHandler}
        >
          <span></span>
          <span></span>
          <span></span>
          <div className={classes.links}>{links}</div>
        </div>
      </header>
    </div>
  );
}
export default MainNav;
