import { Training } from '../../types';
import TrainingCard from '../training-card';

interface TrainingCardProps {
  training: Training;
}

const MyTrainingCard: React.FC<TrainingCardProps> = ({ training }) => (
  <li className="my-trainings__item">
    <TrainingCard training={training} />
  </li>
);

export default MyTrainingCard;
