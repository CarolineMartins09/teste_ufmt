import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import "./LandingStyled.css"

function Landing() {
    const [url, setUrl] = useState('');
    const [tagCounts, setTagCounts] = useState([]);

    const handleInput = (event) => {
        setUrl(event.target.value);
    }

    const buttonClick = async () => {
        try {
            await axios.post(`${BASE_URL}/html`, { url: url });
            const response = await axios.get(`${BASE_URL}/response`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    url: url,
                }
            });
            console.log(response.data)
            setTagCounts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main>
            <h1>Contador de Tags</h1>
            <p>"URL para exemplo:<br/>
            https://legal-detail.surge.sh/ <br/>
            http://chivalrous-cave.surge.sh/"
            </p>
            <div className="input-container">
                <input type="text" value={url} onChange={handleInput} placeholder="Insira sua URL HTML Aqui!"/>
                <button onClick={buttonClick}>Conferir contagem</button>
            </div>
            <div>
                <h2>Resultado:</h2>
                <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {tagCounts && tagCounts.map((tagCount, index) => (
              <tr key={index}>
                <td>{tagCount.tag}</td>
                <td>{tagCount.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </main>
    )
}

export default Landing;



// LINK CONTROLADOS
// https://legal-detail.surge.sh/
// http://chivalrous-cave.surge.sh/