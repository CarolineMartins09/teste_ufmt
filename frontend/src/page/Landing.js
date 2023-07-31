import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constants";

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
        <div>
            <h1>Contador de Tags</h1>
            <div>
                <input type="text" value={url} onChange={handleInput} />
                <button onClick={buttonClick}>aqui</button>
            </div>
            <div>
                <h2>Resultado:</h2>
                <table>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Valor</th>
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
        </div>
    )
}

export default Landing;



// LINK CONTROLADOS
// https://legal-detail.surge.sh/
// http://chivalrous-cave.surge.sh/