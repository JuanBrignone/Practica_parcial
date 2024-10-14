import React, {useEffect, useState} from "react";
import "./styles.css";
import Card from "../../Components/Card";
import { useNavigate } from "react-router-dom";


const getGames = async () => {
    const gamesFetch = await fetch("http://localhost:3000/api/games")
    const games = await gamesFetch.json();
    return games;
};

const Home = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    const refreshGames = async () => {
        const updatedGames = await getGames();
        setGames(updatedGames);
    };

    useEffect(() => {
        refreshGames();
    }, []);

    const handleAddGameClick = () => {
        navigate("/addGame");
    };

    return (
        <div>
            <div className="home-title-wrapp">
                <h1>Juegos Olimpicos</h1>
                <button onClick={handleAddGameClick} className="add-game-button">
                    Add Game
                </button>
            </div>
            {games.length ? (
                <div className="home-grid-cards">
                    {games.map((game) => (
                        <Card
                            key={game.id}
                            title={game.title}
                            id={game.id}
                            refreshGames={refreshGames}
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