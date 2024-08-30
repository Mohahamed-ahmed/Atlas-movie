import SearchBox from './Search';
import classes from './search.module.css';
import { useLocation } from 'react-router-dom';
function SaerchResult() {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  console.log(searchQuery);
  return (
    <div className={classes['section-container']}>
      <h2>Search Result</h2>
      {searchQuery === '' ? (
        <p>you should enter something</p>
      ) : (
        <SearchBox searchVarible={searchQuery}></SearchBox>
      )}
    </div>
  );
}
export default SaerchResult;
