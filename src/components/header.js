import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FireBaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
import useUser from '../hooks/use-user';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const { firebase } = useContext(FireBaseContext);
  const [search, setSearch] = useState('');
  const isInvalid = search === '';
  const location = useLocation();

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log('search', search);
    try {
      const usernameExists = await doesUsernameExist(search);
      if (usernameExists.length) {
        console.log('yes');
        console.log('location', location);
        window.location.pathname = `/p/${search}`;
      } else {
        console.log('no');
        window.location.pathname = `/not-found`;
      }
    } catch (error) {
      setSearch('');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-itmes cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
              </Link>
            </h1>
          </div>
          <div className="items-center">
            <form onSubmit={handleSearch}>
              <input
                aria-label="Search"
                icon="search"
                placeholder="Search"
                className="p-1 bg-gray-background justify-center mt-5 rounded w-70"
                type="text"
                onChange={({ target }) => setSearch(target.value)}
                value={search}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white rounded h-8 text-s p-1 mr-1
                ${isInvalid && 'opacity-50'}`}
              >
                Search
              </button>
            </form>
          </div>
          <div className="text-gray-700 text-center flex items-center alignitems">
            {user.username ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex itme-center cursor pointer">
                  <Link to={`/p/${user?.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user?.username}.jpg`}
                      alt={`${user?.username} profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-700 text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
