import React, {useEffect, useState} from "react";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";

const getGameByID = async (id) => {
    const gameFetch = await fetch(`http://localhost:3000/api/games/${id}`); //es una peticion GET para obtener los datos del juego con ese id
    const game = await gameFetch.json(); //convierte la respuesta a json
    return game;
};

const Details = () => {
    const [game, setGame] = useState();
    const {id} = useParams(); //extrae el id del juego desde los parametros de la URL
    const navigate = useNavigate(); //hook para navegar entre rutas

    useEffect(() => {
        getGameByID(id).then((game) => setGame(game[0])); //llama a la funcion con el id del juego para obtener los datos del mismo
    }, [id]);                                             //luego actualiza el estado game con el primer juego devuelto por la API game[0]

    return(
        <div className="container">
            <h1>Details</h1>
            {game && ( //si el estado de game tiene un valor devuelto por la API se renderizan los detalles del juego
                <div>
                    <div className="detail">
                        <span className="detail-title">Name: </span>
                        <span className="detail-content">{game.title}</span>
                    </div>
                    <div className="detail">
                        <span className="detail-title">Description: </span>
                        <span className="detail-content">{game.description}</span>
                    </div>
                    <div className="detail">
                        <span className="detail-title">Number of Players: </span>
                        <span className="detail-content">{game.players}</span>
                    </div>
                    <div className="detail">
                        <span className="detail-title">Category: </span>
                        <span className="detail-content">{game.categories}</span>
                    </div>
                </div>
            )}

            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>

        </div>
    );
};

export default Details;