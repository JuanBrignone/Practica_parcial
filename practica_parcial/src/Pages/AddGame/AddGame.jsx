import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AddGame = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [players, setPlayers] = useState("")
    const [categories, setCategories] = useState("");
    const navigate = useNavigate();
    const buttonIsDisabled = !title || !description || !players || !categories; //habilita que se agrege un juego si todos los campos estan completos

    const handleAddGame = async () => {
        const response = await fetch("http://localhost:3000/api/games/", {
            method: "POST",                                               //POST para añadir juego
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({title, description, players, categories}), //se envian los datos ingresados como JSON
        });

        if(response.ok){
            navigate("/"); //si se agrega el juego correctamente se redirige a la pagina principal
        }
    };

    return (
        <div>
            <h1>Add Game</h1>
            <div>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /> 
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Number of Players"
                        value={players}
                        onChange={(e) => setPlayers(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                        type="text"
                        placeholder="Category"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="add-button"
                onClick={handleAddGame}
                disabled={buttonIsDisabled}
            >
                Add Game
            </button>

            <button onClick={() => navigate(-1)} className="back-button">
                Back
            </button>
        </div>
    );
};

export default AddGame;