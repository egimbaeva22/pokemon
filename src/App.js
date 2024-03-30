import React, {useEffect, useState} from 'react';
import axios from "axios";

const App = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/')
                const responseData = response.data.results
                console.log(responseData)
                const imgData = await Promise.all(responseData.map(async(pokemon) => {
                    const urlData = await axios.get(pokemon.url)
                    return urlData.data
                }))
                setData(imgData)
            }catch (e) {
                console.log('ошибка', e)
            }

        }
        fetchData()
    }, []);
    return (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {data && data.map((item, index) => (
                <div key={index} style={{ border: '3px solid black', borderRadius: '10px', padding: '10px', width: '200px' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>{item.name}</h1>
                    {item.sprites && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={item.sprites.front_default} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default App;