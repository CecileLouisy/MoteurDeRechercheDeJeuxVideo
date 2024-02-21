import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { slug } = useParams();
  const [game, setGame] = useState({});
  useEffect(() => {
    try {
      const apiKey = "2b1048eb0bba4d58be4ae694556905ec";
      const url = `https://api.rawg.io/api/games/${slug}?key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setGame(data);
        })
        .catch(() => {
          alert("Une erreur est survenue");
        });
      // const response= await fetch(url);
      // const game=await response.json();
      console.log(url);
    } catch (error) {
      alert("Une erreur est survenue", error.message);
    }
  }, []); //tableau vide que au démarrage
  return (
    <div>
    <h1 className="text-2xl font-bold text-center">{game.name}</h1>
    <br/>
    <img src={game.background_image}/>
    <br/>
    <h2 className="text-xl">Date de sortie : {game.released}</h2>
    <br/>
    <h2 className="text-xl">Description :</h2>
    <p>{game.description_raw}</p>
    </div>

    
    
    
  );
};
export default Details;
