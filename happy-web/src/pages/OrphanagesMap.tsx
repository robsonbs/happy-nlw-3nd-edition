import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

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

    <Map center={[-16.2428623,-47.9713124]} zoom={15} style={{ 
      width:'100%',
      height:'100%'
     }}>
       <TileLayer url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
</Map>
    <Link to="detail" className="create-orphanage">
      <FiPlus size={32} color="#FFF" />
    </Link>
  </div>);
}

export default OrphanagesMap;