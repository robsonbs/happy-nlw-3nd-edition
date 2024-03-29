import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { LeafletMouseEvent } from 'leaflet';
import { FiCheck, FiPlus, FiX, FiXCircle } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import Sidebar from '../components/Sidebar';
import api from '../services/api';

import '../styles/pages/create-orphanage.css';
import mapIcon from '../utils/mapIcon';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();

  const [initialPosition, setInitialPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isConfirmation, setIsConfirmation] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(location => {
      setInitialPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    });
    const locationVar = document.location.pathname.match(/confirm\b/);
    setIsConfirmation(locationVar ? locationVar.length !== 0 : false);
  }, []);

  const divConfirmation = useMemo(
    () =>
      isConfirmation ? (
        <div className="confirmation-button-group">
          <button type="button" className="deny">
            <FiXCircle /> Recusar
          </button>
          <button type="button" className="accept">
            <FiCheck /> Aceitar
          </button>
        </div>
      ) : null,
    [isConfirmation],
  );
  const divConfirmation_cad = useMemo(
    () =>
      !isConfirmation ? (
        <button className="confirm-button" type="submit">
          Confirmar
        </button>
      ) : null,
    [isConfirmation],
  );
  useEffect(() => {
    if (id) {
      api.get(`/orphanages/${id}`).then(({ data }) => {
        setPosition({ latitude: data.latitude, longitude: data.longitude });
        setInitialPosition({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        setAbout(data.about);
        setImages(data.images);
        setName(data.name);
        setOpenOnWeekends(data.open_on_weekends);
        setOpeningHours(data.opening_hours);
        setInstructions(data.instructions);
        setPreviewImages(
          data.images.map((image: { id: number; url: string }) => image.url),
        );
      });
    }
  }, [id]);

  const handleMapClick = useCallback((event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    setPosition({ latitude: lat, longitude: lng });
  }, []);

  const handleSelectImages = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }
      const selectedImages = Array.from(event.target.files);

      setImages([...images, ...selectedImages]);

      const selectedImagesPreview = selectedImages.map(image => {
        return URL.createObjectURL(image);
      });
      setPreviewImages([...previewImages, ...selectedImagesPreview]);
    },
    [images, previewImages],
  );

  const handleRemoveImage = useCallback(
    (index: number) => {
      setImages(images.filter((image, idx) => index !== idx));
      setPreviewImages(previewImages.filter((image, idx) => index !== idx));
    },
    [images, previewImages],
  );

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const { latitude, longitude } = position;
      const data = new FormData();
      data.append('name', name);
      data.append('about', about);
      data.append('latitude', String(latitude));
      data.append('longitude', String(longitude));
      data.append('instructions', instructions);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('opening_hours', opening_hours);
      images.forEach(image => {
        data.append('images', image);
      });

      api.post('/orphanages', data);
      history.push('/app');
    },
    [
      position,
      name,
      about,
      instructions,
      open_on_weekends,
      opening_hours,
      images,
      history,
    ],
  );

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit}>
          <div className="create-orphanage-form">
            <fieldset>
              <legend>Dados</legend>

              <Map
                center={[initialPosition.latitude, initialPosition.longitude]}
                style={{ width: '100%', height: 280 }}
                zoom={15}
                onclick={handleMapClick}
              >
                <TileLayer
                  url="http://a.tile.openstreetmap.org/{z}/{x}/{y}.png"

                  // url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {position.latitude !== 0 && (
                  <Marker
                    interactive={false}
                    icon={mapIcon}
                    position={[position.latitude, position.longitude]}
                  />
                )}
              </Map>

              <div className="input-block">
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="about">
                  Sobre <span>Máximo de 300 caracteres</span>
                </label>
                <textarea
                  id="about"
                  maxLength={300}
                  value={about}
                  onChange={e => {
                    setAbout(e.target.value);
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="images">Fotos</label>

                <div className="images-container">
                  {previewImages.map((image, index) => {
                    return (
                      <div key={image} className="image-item">
                        <img src={image} alt={name} />
                        <button
                          type="button"
                          onClick={() => {
                            handleRemoveImage(index);
                          }}
                        >
                          <FiX size={24} />
                        </button>
                      </div>
                    );
                  })}
                  <label htmlFor="image[]" className="new-image">
                    <FiPlus size={24} color="#15b6d6" />
                  </label>
                </div>
                <input
                  multiple
                  onChange={handleSelectImages}
                  type="file"
                  id="image[]"
                />
              </div>
            </fieldset>

            <fieldset>
              <legend>Visitação</legend>

              <div className="input-block">
                <label htmlFor="instructions">Instruções</label>
                <textarea
                  id="instructions"
                  value={instructions}
                  onChange={e => {
                    setInstructions(e.target.value);
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="opening_hours">Horário das visitas</label>
                <input
                  id="opening_hours"
                  value={opening_hours}
                  onChange={e => {
                    setOpeningHours(e.target.value);
                  }}
                />
              </div>

              <div className="input-block">
                <label htmlFor="open_on_weekends">Atende fim de semana</label>

                <div className="button-select">
                  <button
                    type="button"
                    className={open_on_weekends ? 'active' : ''}
                    onClick={() => {
                      setOpenOnWeekends(true);
                    }}
                  >
                    Sim
                  </button>
                  <button
                    type="button"
                    className={!open_on_weekends ? 'active not' : ''}
                    onClick={() => {
                      setOpenOnWeekends(false);
                    }}
                  >
                    Não
                  </button>
                </div>
              </div>
            </fieldset>
            {divConfirmation_cad}
          </div>
          {divConfirmation}
        </form>
      </main>
    </div>
  );
};

export default CreateOrphanage;
// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
