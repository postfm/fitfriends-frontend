export default function FeedbackForm(): JSX.Element {
  return (
    <div className="popup__content popup__content--feedback">
      <h3 className="popup__feedback-title">Оцените тренировку</h3>
      <ul className="popup__rate-list">
        <li className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label="оценка 1."
                defaultValue={1}
              />
              <span className="popup__rate-number">1</span>
            </label>
          </div>
        </li>
        <li className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label="оценка 2."
                defaultValue={2}
              />
              <span className="popup__rate-number">2</span>
            </label>
          </div>
        </li>
        <li className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label="оценка 3."
                defaultValue={3}
              />
              <span className="popup__rate-number">3</span>
            </label>
          </div>
        </li>
        <li className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label="оценка 4."
                defaultValue={4}
              />
              <span className="popup__rate-number">4</span>
            </label>
          </div>
        </li>
        <li className="popup__rate-item">
          <div className="popup__rate-item-wrap">
            <label>
              <input
                type="radio"
                name="оценка тренировки"
                aria-label="оценка 5."
                defaultValue={5}
                defaultChecked
              />
              <span className="popup__rate-number">5</span>
            </label>
          </div>
        </li>
      </ul>
      <div className="popup__feedback">
        <h3 className="popup__feedback-title popup__feedback-title--text">
          Поделитесь своими впечатлениями о тренировке
        </h3>
        <div className="popup__feedback-textarea">
          <div className="custom-textarea">
            <label>
              <textarea name="description" placeholder=" " defaultValue={''} />
            </label>
          </div>
        </div>
      </div>
      <div className="popup__button">
        <button className="btn" type="button">
          Продолжить
        </button>
      </div>
    </div>
  );
}
