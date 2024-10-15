import React, {useEffect, useState} from "react";
import "./styles.css";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";


const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games") //trae con un GET todos los juegos de la API
    const games = await gamesFetch.json(); //los datos se convierten a JSON
    return games;
};

const Home = () => {
    const [games, setGames] = useState([]); //games es el estado que guarda los juegos obtenidos por la API
    const navigate = useNavigate();

    const refreshGames = async () => {
        const updatedGames = await getGames(); //llama a la funcion getGames para obtener la lista actualizada
        setGames(updatedGames);
    };

    useEffect(() => {
        refreshGames(); //se ejecuta al abrir la pagina, es para obtener la lista de juegos
    }, []);

    const handleAddGameClick = () => {
        navigate("/addGame"); //la ruta del addGame se setea aca ya que en la pagina Home aparece el boton de añadir juego
    };                        //por lo tanto, cada vez que se hace click en el boton, se navega hasta la ruta dicha en el navigate

    return (
        <div>
            <div className="home-title-wrapp">
                <h1>Juegos Olimpicos</h1>
                <button onClick={handleAddGameClick} className="add-game-button">
                    Add Game
                </button>
            </div>
            {games.length ? ( // si hay juegos en el estado games, se muestran en forma de tarjetas, utilizando Card
                <div className="home-grid-cards">
                    {games.map((game) => ( 
                        <Card
                            key={game.id}
                            title={game.title}
                            id={game.id}
                            refreshGames={refreshGames} //se pasa como prop para que luego de eliminar se actualice automaticamente
                        />
                    ))}
                </div>
            ): (
                <div className="home-no-games">No games to show </div>
            )}
        </div>
    );
};

export default Home;