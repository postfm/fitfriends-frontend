import { Training } from '../../types';
import TrainingCard from '../training-card';

interface TrainingCardProps {
  training: Training;
}

const PopularTrainingCard: React.FC<TrainingCardProps> = ({ training }) => (
  <li className="popular-trainings__item">
    <TrainingCard training={training} />
  </li>
);

export default PopularTrainingCard;
