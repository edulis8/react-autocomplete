import { useEffect, useState, useRef, useContext } from 'react';
import { debounce } from 'lodash';
import { fetchUsers } from './fetchService';
import { AppContext } from './AppContext';

// feedback
// clarify, write what i am going to do,
// bringing up debounce, minimum query length
// study Context
// race condition handling

// input box in here
// when user types in
// we use fecthService
// returns an array of strings
// render strings below the form
// as a list

// debouncing the input
// minimum query length 3 chars

// improvements:
// loading

// SHARING DATA ACROSS COMPONENTS
// 1) Props (callback function that parent can use):
// making the results appear more than just in this component
// <Autocomplete onResultsChange={handleResultsChange} />
// 2) Context Api
// 3) Redux or Zustand or other state management library

// race condition
// AbortController
// new search term aborts older ones
// caching search results
// hashmap

// user enters 'aaa' -------x
// user enters 'bbb' ----x

// when a fetch result comes back
// check cache
// also check current searchTerm in the box
// only render to page if searchTerm matches what is in the input box

// lookup of a searchTerm to results belonging
// {
//   searchTerm: promise -> results;
// }

// Reject a promise
// everytime a user gets searched
// const newUsersPromise = fetchUsers(searchTerm) // watch this promise

// [] context to get the results and display elsewhere
// [x] refs to close the box
// [x] loader
// [x] race condition handling

export default function Autocomplete() {
  // const [users, setUsers] = useState([]);
  const { users, setUsers } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [cache, setCache] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(true);
  const searchInputRef = useRef();
  const autocompleteContainerRef = useRef();

  const debouncedHandleFetchUsers = debounce(handleFetchUsers, 400);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    debouncedHandleFetchUsers();
    console.log({ users, cache });
  }, [searchTerm]);

  function handleClickOutside(e) {
    // if click is outsite autocompleteContainerRef
    // if autocompleteContainerRef does not INCLUDE clicked el
    console.log(e.target);
    if (!autocompleteContainerRef.current.contains(e.target)) {
      console.log('clicked outside!');
      setShowResults(false);
    }
  }

  async function handleFetchUsers() {
    // Get the current value of the search input.
    const currentSearchTerm = searchInputRef.current.value;

    // If the search term is less than 3 characters long, clear the users list and return early.
    if (currentSearchTerm.length < 3) {
      setUsers([]);
      return;
    }

    // If the search term is already in the cache, use the cached users and return early.
    if (cache[currentSearchTerm]) {
      console.log('cache hit', currentSearchTerm, cache);
      setUsers(cache[currentSearchTerm]);
      return;
    }

    // Set the loading state to true to indicate that a network request is in progress.
    setIsLoading(true);
    try {
      console.log('network call', currentSearchTerm);
      // Fetch the users from the server.
      const newUsers = await fetchUsers(currentSearchTerm);
      // Add the fetched users to the cache.
      const newCache = { ...cache, [currentSearchTerm]: newUsers };

      setCache(newCache);
      // Only update the users list if the search term hasn't changed while the network request was in progress.
      if (currentSearchTerm === searchInputRef.current.value) {
        setUsers(newUsers);
      } else {
        // This is just to show that later incoming results come in, but don't render
        console.log('debug2 stale: ', searchTerm);
      }
    } catch (e) {
      // If the network request fails, log an error message.
      console.error('Failed to fetch users', e);
    } finally {
      // Set the loading state to false to indicate that the network request has completed.
      setIsLoading(false);
    }
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <main>
      <h1>Autocomplete!</h1>
      <div className="container" ref={autocompleteContainerRef}>
        <section className="autocomplete-input">
          <form>
            <input
              ref={searchInputRef}
              onChange={handleSearchTermChange}
              onFocus={() => setShowResults(true)}
              placeholder="search..."
              type="search"
              // controlled component!
              value={searchTerm}
            />
          </form>
        </section>
        <section>
          {/* hide */}
          <ul>
            {isLoading && 'loading...🧐'}
            {!isLoading &&
              showResults &&
              users.map((user) => <li key={user}>{user}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
