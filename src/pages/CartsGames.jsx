import React from 'react';
import { useGetCartQuery, useRemoveFromCartMutation, useBuyCartMutation } from '../store/states/authApi';
import { useGetGamesQuery } from '../store/states/games.slice';

const CartGames = () => {
  const { data: cart, error: cartError, isLoading: cartLoading } = useGetCartQuery();
  const { data: games, error: gamesError, isLoading: gamesLoading } = useGetGamesQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [buyCart] = useBuyCartMutation();

  if (cartLoading || gamesLoading) return <div className="text-center mt-10">Loading...</div>;
  if (cartError || gamesError) return <div className="text-center mt-10 text-red-500">Error loading data</div>;

  const cartGames = cart?.results[0]?.cart.map(cartItem => {
    const game = games?.results.find(game => game.id === cartItem.game);
    return {
      cartItemId: cartItem.id,
      id: game.id,
      title: game.name,
      image: game.image
    };
  });

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await removeFromCart({ productId: cartItemId }).unwrap();
    } catch (error) {
      console.error('Failed to remove game from cart: ', error);
    }
  };

  const handleBuyCartClick = async () => {
    try {
      await buyCart();
      console.log(buyCart)
    } catch (error) {
      console.error('Failed to buy cart: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Games in Cart</h1>
      <ul className="space-y-4">
        {cartGames.map(game => (
          <li key={game.id} className="bg-white p-4 rounded shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={game.image} alt={game.title} className="w-16 h-16 object-cover rounded" />
              <h2 className="text-xl font-semibold">{game.title}</h2>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => handleRemoveFromCart(game.cartItemId)} 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove from Cart
              </button>
              <button 
                onClick={handleBuyCartClick} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Buy Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartGames;
