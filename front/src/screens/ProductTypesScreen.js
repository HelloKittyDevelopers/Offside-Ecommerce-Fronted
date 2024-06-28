import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TypeService from '../service/TypeService'; 
import './TypeScreen.css'; 

const ProductTypesScreen = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const typesData = await TypeService.getAll();
                setTypes(typesData);
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching types:', error);
                setLoading(false); 
            }
        };

        fetchTypes();
    }, []);

    return (
        <div className="types-container">
            <h1>Select a Type</h1>
            {loading ? (
                <p>Loading types...</p> 
            ) : (
                <div className="type-buttons">
                    {types.map((type) => (
                        <Link key={type.id_type} to={`/type/${type.type}`} className="type-button">
                            {type.type}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductTypesScreen;
