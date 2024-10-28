import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/vehicles.css';
import { useAuth } from '../app/AuthContext';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        type: '',
        capacity: '',
        price: ''
    });
    
    const { jwtToken } = useAuth();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                // const response = await axios.get('http://localhost:8081/api/vehicles/all');
                const response = await axios.get(`http://localhost:8081/api/vehicles/all`, {
                    params: {
                        token: jwtToken,
                    }
                });
                console.log(response.data);
                setVehicles(response.data);
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        };

        fetchVehicles();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredVehicles = vehicles.filter(vehicle => {
        return (
            vehicle.companyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filters.type ? vehicle.type === filters.type : true) &&
            (filters.capacity ? vehicle.capacity === parseInt(filters.capacity) : true) &&
            (filters.price ? vehicle.pricePerDay <= parseInt(filters.price) : true)
        );
    });

    return (
        <div className='vehicleContainer'>
            <h1>Vehicles</h1>
            <div className="filterVehicle">
                <input
                    type="text"
                    placeholder="Search by company name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select name="type" onChange={handleFilterChange}>
                    <option value="">Select Type</option>
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Electric">Electric</option>
                </select>

                <select name="capacity" onChange={handleFilterChange}>
                    <option value="">Select Capacity</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>

                <select name="price" onChange={handleFilterChange}>
                    <option value="">Select Max Price</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                    <option value="2000">2000</option>
                    <option value="2500">2500</option>
                    <option value="3000">3000</option>
                    <option value="3500">3500</option>
                </select>
            </div>

            <ul>
                {filteredVehicles.map(vehicle => (
                    <li key={vehicle.id}>
                        <img src={vehicle.imageUrl} alt={vehicle.model} width="100" />
                        <div className='vehicleDetail'> 
                            <h2>{vehicle.companyName} {vehicle.model}</h2>
                            <p>Type: {vehicle.type}</p>
                            <p>Capacity: {vehicle.capacity}</p>
                            <p>Price per Day: ${vehicle.pricePerDay}</p>
                            <p>Manufacturing Year: {vehicle.manufacturingYear}</p>
                            <p>Rating: {vehicle.rating}</p>
                            <p>Number Plate: {vehicle.numberPlate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Vehicles;
