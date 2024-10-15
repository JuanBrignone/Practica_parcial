import React from "react";
import "./styles.css";
import {useNavigate} from "react-router-dom";

const deleteGame = async (id) => {
    const gameDelete = await fetch("http://localhost:3000/api/games/" + id, {
        method: "DELETE", 
    }); //esta funcion hace una peticion HTTP a la API con el metodo DELETE para eliminar el game a traves de su id

    return gameDelete;
}

const Card = ({title, id, refreshGames}) => {
    const navigate = useNavigate(); //esta funcion permite redirigir al ususario a otra pagina  

    const handleDetailsClick = () => {
        navigate(`/details/${id}`); //cuando se toca el boton Details, se redirige al usuario a la pagina de detalles con esta URL
    };

    const handleDeleteClick = async () => {
        const response = await deleteGame(id); //se llama a la funcion deleteGame definida mas arriba cuando se da click al boton Delete
        if(response.ok){                       // y elimina el juego a traves del id 
            refreshGames();
        }
    };

    return (
        <div className="card">
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <div className="card-wrapp-buttons">
                    <button className="card-button" onClick={handleDetailsClick}>
                        Details
                    </button>
                    <button className="card-button" onClick={handleDeleteClick}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;