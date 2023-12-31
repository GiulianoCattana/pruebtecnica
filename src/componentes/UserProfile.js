import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import './UserProfile.css';



const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const googleMapUrl = "https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places";
  var rendered=false;

  useEffect(() => {
    if(!rendered)
    {
      console.log("usereffect");
      fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => setUserData(data.results[0]))
        .catch(error => console.error('Error obteniendo datos del usuario:', error));
        rendered=true;
    }

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
            draggable={false}    
            zoomControl={false}  
            defaultZoom={0}
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
        {userData && (
          <div className="user-info">
            <div className="user-picture">
            <h1>Usuario del Perfil</h1>
              <img src={userData.picture.large} alt="Imagen de perfil" />
            </div>
            
            <div className="user-details">
              <p><strong>Sexo:</strong><br/> {userData.gender}</p>
              <p><strong>Nombre y Apellido:</strong>{userData.name.title} {userData.name.first} {userData.name.last}</p>
              <p><strong>Correo electrónico:</strong> <br/> {userData.email}</p>
              <p><strong>Dirección:</strong> <br/> {userData.location.street.number} {userData.location.street.name}, {userData.location.city}, {userData.location.state}, {userData.location.country}, {userData.location.postcode}</p>
              <p><strong>Teléfono:</strong> <br/> {userData.phone}</p>
              
            </div>
          </div>
        )}
      {renderMap()}
    </div>
  );
};

export default UserProfile;