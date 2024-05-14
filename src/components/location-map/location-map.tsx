const LocationMap = () => (
  <div className="popup__content-map">
    <div className="popup__map">
      <picture>
        <source
          type="image/webp"
          srcSet="/img/content/popup/map.webp, /img/content/popup/map@2x.webp 2x"
        />
        <img
          src="/img/content/popup/map.jpg"
          srcSet="/img/content/popup/map@2x.jpg 2x"
          width={1160}
          height={623}
          alt=""
        />
      </picture>
      <div className="popup__pin popup__pin--user">
        <svg
          className="popup__pin-icon"
          width={40}
          height={49}
          aria-hidden="true"
        >
          <use xlinkHref="#icon-pin-user" />
        </svg>
      </div>
    </div>
  </div>
);

export default LocationMap;
