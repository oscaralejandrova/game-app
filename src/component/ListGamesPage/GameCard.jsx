import React, { useState } from "react";
import { useAddToCartMutation } from '../../store/states/authApi';

const GameCard = ({ games }) => { 
  const [addToCart] = useAddToCartMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = async () => {
    try {
      await addToCart({ productId: games.id }); 
      console.log('Juego agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito', error);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getShortDescription = (description, maxLength = 150) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  return (
    <article className="p-4 border rounded-lg shadow-lg">
      <header className="mb-4">
        <img src={games.image} alt={games.name} className="w-full h-48 object-cover rounded-t-lg" />
      </header>
      <section className="mb-4">
        
        <h3 
          className="text-xl font-semibold text-blue-600 cursor-pointer hover:underline"
          onClick={toggleModal}
        >
          {games.name}
        </h3>
        <p className="font-semibold mb-2">Categorías:</p>
        <ul className="list-disc list-inside mb-2">
          {games.categories.map((category, index) => ( 
            <li key={index}>{category}</li>
          ))}
        </ul>
        <p className="text-lg font-semibold">Precio: {games.price}</p>
      </section>
      <footer>
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h2 className="text-xl">{games.name}</h2>
              <button 
                className="text-white text-2xl"
                onClick={toggleModal}
              >&times;</button>
            </header>
            <div className="p-4">
              <img src={games.image} alt={games.name} className="w-full h-48 object-cover rounded mb-4" />
              <p className="mb-4">{getShortDescription(games.description)}</p>
              <p className="font-semibold mb-2">Categorías:</p>
              <ul className="list-disc list-inside mb-4">
                {games.categories.map((category, index) => ( 
                  <li key={index}>{category}</li>
                ))}
              </ul>
              <p className="text-lg font-semibold">Precio: {games.price}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default GameCard;
