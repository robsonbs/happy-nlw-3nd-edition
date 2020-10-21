import React, { HTMLAttributes } from 'react';

import { FiInfo, FiMapPin, FiPower } from 'react-icons/fi';
import { useAuth } from '../contexts/auth';

import mapMarkerImg from '../images/map-marker.svg';
import '../styles/app-dashsidebar.css';

interface IDashSidebarProps extends HTMLAttributes<HTMLDivElement> {
  switchMenu: boolean;
  setSwitchMenu: (state: boolean) => void;
}
const DashSidebar: React.FC<IDashSidebarProps> = ({
  switchMenu,
  setSwitchMenu,
}: IDashSidebarProps) => {
  const { signOut } = useAuth();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="button-group">
        <button
          type="button"
          className={`${!switchMenu && 'active'}`}
          onClick={() => setSwitchMenu(false)}
        >
          <FiMapPin size={24} />
        </button>
        <button
          type="button"
          className={`${switchMenu && 'active'} pos-relative`}
          onClick={() => setSwitchMenu(true)}
        >
          <FiInfo size={24} color="#FFF" />
          <span className="signal-notification" />
        </button>
      </div>
      <button type="button" onClick={signOut}>
        <FiPower size={24} color="#FFF" />
      </button>
    </aside>
  );
};

export default DashSidebar;
