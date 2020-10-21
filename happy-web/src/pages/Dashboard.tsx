import React, { useEffect, useMemo, useState } from 'react';
import { FiArrowRight, FiEdit3, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Card from '../components/Card';
import DashSidebar from '../components/DashSidebar';
import api from '../services/api';

import '../styles/pages/dashboard.css';

interface Orphanage {
  open_on_weekends: boolean;
  opening_hours: string;
  instructions: string;
  about: string;
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  confirmed: boolean;
  images: Array<{
    url: string;
  }>;
}
const Dashboard: React.FC = () => {
  const [switchMenu, setSwitchMenu] = useState(false);
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const history = useHistory();

  useEffect(() => {
    api.get('/orphanages').then(({ data }) => {
      setOrphanages(data);
    });
  }, []);

  const innerPage = useMemo(() => {
    if (!switchMenu) {
      const renderOrphanages = orphanages.filter(item => item.confirmed);
      return (
        <div>
          <main>
            <header className="header-dashboard">
              <h2>Orfanatos Cadastrados</h2>
              <span>{renderOrphanages.length} orfanatos</span>
            </header>
            <section className="orphanage-container">
              {renderOrphanages.map(({ name, latitude, longitude, id }) => (
                <Card
                  key={id}
                  item={{
                    name,
                    location: { latitude, longitude },
                  }}
                >
                  <button type="button">
                    <FiEdit3
                      color="#15C3D6"
                      size={24}
                      onClick={() => {
                        history.push(`/orphanages/${id}/edit`);
                      }}
                    />
                  </button>
                  <button type="button">
                    <FiTrash color="#15C3D6" size={24} />
                  </button>
                </Card>
              ))}
            </section>
          </main>
        </div>
      );
    }
    const renderOrphanages = orphanages.filter(item => !item.confirmed);
    return (
      <div>
        <main>
          <header className="header-dashboard">
            <h2>Cadastros Pendentes</h2>
            <span>{renderOrphanages.length} orfanato</span>
          </header>
          <section className="orphanage-container">
            {renderOrphanages.map(({ name, latitude, longitude, id }) => (
              <Card
                key={id}
                item={{
                  name,
                  location: { latitude, longitude },
                }}
              >
                <button type="button">
                  <FiArrowRight
                    color="#15C3D6"
                    size={24}
                    onClick={() => {
                      history.push(`/orphanages/${id}/confirm`);
                    }}
                  />
                </button>
              </Card>
            ))}
          </section>
        </main>
      </div>
    );
  }, [switchMenu, orphanages, history]);

  const handleSwitch = (state: boolean) => {
    setSwitchMenu(state);
  };
  return (
    <div className="page-dashboard">
      <DashSidebar switchMenu={switchMenu} setSwitchMenu={handleSwitch} />
      {innerPage}
    </div>
  );
};

export default Dashboard;
