import React from 'react';
import { FiArrowRight, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';


import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';

import '../styles/orphanages-map.css';


const OrphanagesMap: React.FC = () => {
  return (<div id="page-map">
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

    <Map center={[-16.2418623, -47.9633124]} zoom={15} style={{
      width: "100%",
      height: "100%"
    }}>
      <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker
        icon={mapIcon}
        position={[-16.2435623, -47.9620124]}>
        <Popup closeButton={false} minWidth={244} maxWidth={244} className="map-popup">
          Lar das Meninas <Link to="/orphanages/1"><FiArrowRight size={20} color="#FFF" /></Link>
        </Popup>
      </Marker>
    </Map>
    <Link to="/orphanages/create" className="create-orphanage">
      <FiPlus size={32} color="#FFF" />
    </Link>
  </div>);
}

export default OrphanagesMap;