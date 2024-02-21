import React, { useState, useContext } from "react";
import { Link, MyShop } from "react-router-dom";
import BookmarksContext from "../BookmarksContext";

const Home = () => {
  const { bookmarks, setBookmarks } = useContext(BookmarksContext);
  const [searchText, setSearchText] = useState("");

  //On utilise un state pour garder nos données
  const [games, setGames] = useState([]);
  const handleSearch = (e) => {
    e.preventDefault();
    const apiKey = "2b1048eb0bba4d58be4ae694556905ec";
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURI(
      searchText
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setGames(data.results);
      })
      .catch(() => {
        alert("Une erreur est survenue");
      });
  };
  const isBookmarked = (id) =>
    !!bookmarks.find((bookmark) => bookmark.id == id);
  const addBookmark = (game) => {
    if (isBookmarked(game.id)) {
      //A supprimer
      const index = bookmarks.indexOf(game);
      const tmp = [...bookmarks];
      tmp.splice(index, 1);
      setBookmarks(tmp);
    } else {
      const tmp = [...bookmarks];
      tmp.push(game);
      setBookmarks(tmp);
    }
  };

  return (
    <>
      {/*Un fragment doit être ajouté pour ne retourner qu'un seul composant*/}
      <form
        className="my-2 sm:w-full md:w-2/3 mx-auto flex px-2 text-2xl"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          autoFocus={true}
          onInput={(e) => {
            setSearchText(e.target.value);
          }}
          value={searchText}
          placeholder="Rechercher"
        />
        <button
          type="submit"
          className="bg-blue-700 rounded-r text-white px-4 py-2"
        >
          Rechercher
        </button>
      </form>
      <Link to={"/bookmarks"}>Favoris</Link>
      <Link to={"/shop"}>Mon magasin</Link>
      {/*Ajoutons notre liste*/}
      <ul className="sm:w-full md:w-2/3 mx-auto px-2 text-2xl">
        {games.map((game) => (
          <li className="py-2 px-4 border-b border-gray-500 flex" key={game.id}>
            <Link to={`/details/${game.slug}`} className="flex">
              <img src={game.background_image} alt="" className="w-24 pr-2" />
              <div className="text-2xl font-bold flex-grow">{game.name}</div>
              <div>{game.rating}</div>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                addBookmark(game);
              }}
            >
              { isBookmarked(game.id) ? "★" : "☆"}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
