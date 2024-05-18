import { TypesOfTrainings } from '../../constants/constants';

interface TypeOfTrainingProps {
  typeOfTraining: string[];
  setTypeOfTraining: (v: string[]) => void;
}

export const TypeOfTraining: React.FC<TypeOfTrainingProps> = ({
  setTypeOfTraining,
  typeOfTraining,
}) => (
  <div className="questionnaire-coach__block">
    <span className="questionnaire-coach__legend">
      Ваша специализация (тип) тренировок
    </span>
    <div className="specialization-checkbox questionnaire-coach__specializations">
      {TypesOfTrainings.map((training) => {
        const type = training.toLowerCase();
        return (
          <div className="btn-checkbox" key={type}>
            <label>
              <input
                className="visually-hidden"
                type="checkbox"
                name="specialization"
                onChange={(e) => {
                  if (!e.target.checked) {
                    setTypeOfTraining(typeOfTraining.filter((t) => t !== type));
                  } else {
                    setTypeOfTraining([...typeOfTraining, type]);
                  }
                }}
                checked={typeOfTraining.includes(type)}
              />
              <span className="btn-checkbox__btn">{training}</span>
            </label>
          </div>
        );
      })}
    </div>
  </div>
);
