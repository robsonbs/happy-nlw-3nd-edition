import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../services/api';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/pages/orphanages-map.css';

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const OrphanagesMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location => {
        setInitialPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    api.get<Orphanage[]>('/orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Luziânia</strong>
          <span>Goiás</span>
        </footer>
      </aside>

      <Map
        center={[initialPosition.latitude, initialPosition.longitude]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {orphanages &&
          orphanages.map(orphanage => (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={244}
                maxWidth={244}
                className="map-popup"
              >
                {orphanage.name}{' '}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          ))}
      </Map>
      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
};

export default OrphanagesMap;
