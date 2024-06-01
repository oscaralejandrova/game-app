import { Link } from 'react-router-dom';

const PrincipalHeader = () => {
  return (
    <header className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto">
        {/* Encabezado para pantallas grandes */}
        <div className="hidden lg:flex lg:justify-between lg:items-center">
          <h1 className="text-white text-3xl font-bold">
            <Link to="/">Games-App</Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/Register"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/Login"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/ListGamesPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  List Games Page
                </Link>
              </li>
              <li>
                <Link
                  to="/CartsPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Carts Page
                </Link>
              </li>
              <li>
                <Link
                  to="/RecordPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Record Page
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Encabezado para pantallas pequeñas */}
        <div className="block lg:hidden text-center">
          <h1 className="text-white text-3xl font-bold mb-4 mt-8"> 
            <Link to="/">Games-App</Link>
          </h1>
          <nav>
            <ul className="flex flex-wrap justify-center">
              <li className="mb-6"> 
                <Link
                  to="/Register"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Register
                </Link>
              </li>
              <li className="mb-6"> 
                <Link
                  to="/Login"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li className="mb-6"> 
                <Link
                  to="/ListGamesPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  List Games Page
                </Link>
              </li>
              <li className="mb-6"> 
                <Link
                  to="/CartsPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Carts Page
                </Link>
              </li>
              <li className="mb-6"> 
                <Link
                  to="/RecordPage"
                  className="text-white hover:text-gray-200 transition duration-300"
                >
                  Record Page
                </Link>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    </header>
  );
};

export default PrincipalHeader;
