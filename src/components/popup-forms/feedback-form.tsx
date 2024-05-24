import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { NewReview } from '../../types';
import { createReview } from '../../api/createReview';

const GRADES = [1, 2, 3, 4, 5];

interface FeedbackFormProps {
  trainingId: number;
  onSave: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  trainingId,
  onSave,
}) => {
  const [grade, setGrade] = useState(5);
  const [text, setText] = useState('');
  const queryClient = useQueryClient();

  const handleInputhChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGrade(+evt.target.value);
  };

  const handleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };

  const newReview = useMutation({
    mutationKey: ['createReview'],
    mutationFn: (params: { trainingId: number; value: NewReview }) =>
      createReview(params.trainingId, params.value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['training'],
      });

      onSave();
    },
  });

  const handleButtonClick = () => {
    newReview.mutate({
      trainingId: trainingId,
      value: {
        grade,
        text,
      },
    });
  };

  return (
    <div className="popup__content popup__content--feedback">
      <h3 className="popup__feedback-title">Оцените тренировку</h3>
      <ul className="popup__rate-list">
        {GRADES.map((item) => (
          <li className="popup__rate-item" key={item}>
            <div className="popup__rate-item-wrap">
              <label>
                <input
                  type="radio"
                  name="оценка тренировки"
                  aria-label={`оценка ${item}.`}
                  value={item}
                  checked={item === grade}
                  onChange={handleInputhChange}
                />
                <span className="popup__rate-number">{item}</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
      <div className="popup__feedback">
        <h3 className="popup__feedback-title popup__feedback-title--text">
          Поделитесь своими впечатлениями о тренировке
        </h3>
        <div className="popup__feedback-textarea">
          <div className="custom-textarea">
            <label>
              <textarea
                name="description"
                placeholder="Введите сюда текст отзыва "
                value={text}
                onChange={handleTextAreaChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="popup__button">
        <button className="btn" type="button" onClick={handleButtonClick}>
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
