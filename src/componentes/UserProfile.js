import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './UserProfile.css';



const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places";

  useEffect(() => {
    fetch('https://randomuser.me/api/')
      .then(response => response.json())
      .then(data => setUserData(data.results[0]))
      .catch(error => console.error('Error obteniendo datos del usuario:', error));
  }, []);

  const renderMap = () => {
    console.log(userData);
    if (userData) 
    {
      console.log(userData.location.coordinates.latitude);
      console.log(userData.location.coordinates.longitude);
      return (
        <div className="map-container">
          <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCHJ79rv52T6W-do9FAniXG07eRr6F1-ug' }}
            defaultCenter={{
              lat: parseFloat(userData.location.coordinates.latitude),
              lng: parseFloat(userData.location.coordinates.longitude)
            }}
            defaultZoom={10}
          >
            <div
              lat={parseFloat(userData.location.coordinates.latitude)}
              lng={parseFloat(userData.location.coordinates.longitude)}
              className="map-pin"
            >
              <img src={userData.picture.medium} alt="Ubicación del usuario" />
            </div>
          </GoogleMapReact>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="profile-container">
      <h2>Perfil de Usuario</h2>
      {userData && (
        <div className="user-info">
          <img src={userData.picture.large} alt="Imagen de perfil" />
          <p><strong>Sexo:</strong> {userData.gender}</p>
          <p><strong>Nombre y Apellido:</strong> {userData.name.title} {userData.name.first} {userData.name.last}</p>
          <p><strong>Correo electrónico:</strong> {userData.email}</p>
          <p><strong>Dirección:</strong> {userData.location.street.number} {userData.location.street.name}, {userData.location.city}, {userData.location.state}, {userData.location.country}, {userData.location.postcode}</p>
          <p><strong>Teléfono:</strong> {userData.phone}</p>
        </div>
      )}
      {renderMap()}
    </div>
  );
};

export default UserProfile;