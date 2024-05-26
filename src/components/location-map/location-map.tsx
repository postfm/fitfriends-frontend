import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Positions } from '../../types';

interface LocationMapProps {
  location: string | undefined;
}

const LocationMap: React.FC<LocationMapProps> = ({ location }) => {
  if (!location) {
    return null;
  }
  const position = Positions[location];
  return (
    <div className="popup__content-map">
      <div className="popup__map">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom
          style={{ height: '550px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <Marker position={position}>
            <Popup>Ст.м. {location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationMap;
