import { Link, generatePath } from 'react-router-dom';
import { Training } from '../../types';
import { renderCal, renderHashtag, renderPrice } from '../../utils';
import { AppRoutes } from '../../constants/constants';

interface TrainingCardProps {
  training: Training;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training }) => {
  const trainingPath = generatePath(AppRoutes.TrainingCard, {
    id: String(training.trainingId),
  });

  return (
    <div className="thumbnail-training">
      <div className="thumbnail-training__inner">
        <div className="thumbnail-training__image">
          <picture>
            <img
              src={training.image}
              srcSet={`${training.image}@2x.png 2x`}
              width={330}
              height={190}
              alt=""
            />
          </picture>
        </div>
        <p className="thumbnail-training__price">
          <span className="thumbnail-training__price-value">
            {renderPrice(training.price, training.specialOffer)}
          </span>
          <span>₽</span>
        </p>
        <h3 className="thumbnail-training__title">{training.name}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{renderHashtag(training.type)}</span>
              </div>
            </li>
            <li className="thumbnail-training__hashtags-item">
              <div className="hashtag thumbnail-training__hashtag">
                <span>{renderHashtag(renderCal(training.calories))}</span>
              </div>
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-star" />
            </svg>
            <span className="thumbnail-training__rate-value">{training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text">{training.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <Link
            className="btn btn--small thumbnail-training__button-catalog"
            to={trainingPath}
          >
            Подробнее
          </Link>
          <Link
            className="btn btn--small btn--outlined thumbnail-training__button-catalog"
            to={trainingPath}
          >
            Отзывы
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainingCard;
