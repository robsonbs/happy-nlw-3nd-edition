import React, { HTMLAttributes } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  item: {
    name: string;
    location: { latitude: number; longitude: number };
  };
}
const Card: React.FC<CardProps> = ({
  item: { name, location },
  children,
}: CardProps) => {
  return (
    <div className="orphanage-card">
      <Map
        center={[location.latitude, location.longitude]}
        zoom={16}
        style={{ width: '100%', height: 280 }}
        dragging={false}
        touchZoom={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          //  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
        <Marker
          interactive={false}
          icon={mapIcon}
          position={[location.latitude, location.longitude]}
        />
      </Map>
      <div className="orphanage-card-details">
        <span>{name}</span>
        <div className="button-group">{children}</div>
      </div>
    </div>
  );
};

export default Card;
