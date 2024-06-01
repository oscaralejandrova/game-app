import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetGamesQuery } from "../store/states/games.slice";
import GameCard from "../component/ListGamesPage/GameCard";

const ListGamesPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const { data: games, error, isLoading } = useGetGamesQuery();

  useEffect(() => {}, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const gamesPerPage = 6;

  
  const filteredGames = games.results.filter(
    (game) => game.price >= priceRange[0] && game.price <= priceRange[1]
  );

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Selector de rango de precios */}
      <div className="my-4 flex justify-center">
        <div className="flex flex-col items-center">
          <label className="mb-2">Rango de precios: ${priceRange[0]} - ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="mb-2"
          />
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="mb-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-center">
        {currentGames.map((gameInfo) => (
          <GameCard key={gameInfo.id} games={gameInfo} />
        ))}
      </div>

      {/* Paginación */}
      <nav className="mt-4 flex justify-center items-center">
        <button
          className={`mr-4 px-4 py-2 bg-gray-200 rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          {"< Anterior"}
        </button>
        <ul className="pagination flex">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button
                className={`page-link ${
                  currentPage === i + 1 ? "font-bold" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          className={`ml-4 px-4 py-2 bg-gray-200 rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          {"Siguiente >"}
        </button>
      </nav>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <div>
          <p>© 2024 Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default ListGamesPage;
