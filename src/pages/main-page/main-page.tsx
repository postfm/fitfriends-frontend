import { useQuery } from '@tanstack/react-query';
import {
  LookingForCompanySlider,
  PopularTrainingsSlider,
  SpecialOffersSlider,
} from './components/sliders';
import { SpecialForYouSlider } from './components/sliders/special-for-you-slider';
import { loadTrainings } from '../../api/loadTrainings';
import { TrainingGender, UserGender } from '../../types';
import { getEnumKeyByEnumValue } from '../../utils';
import { loadUsers } from '../../api/loadUsers';
import { useUser } from '../../hooks';

const MAX_TRAINING_RATING = 5;

export default function MainPage(): JSX.Element {
  const currentUser = useUser();
  const trainings = useQuery({
    queryKey: ['trainings'],
    queryFn: loadTrainings,
  });
  const specialForYouTrainings =
    trainings.data?.filter((training) => {
      const levelMatch = training.level === currentUser.levelOfTrain;
      const genderMatch =
        currentUser.gender === UserGender.all ||
        training.gender === TrainingGender.all ||
        getEnumKeyByEnumValue(UserGender, currentUser.gender) ===
          getEnumKeyByEnumValue(TrainingGender, training.gender);
      const typeOfTrainingMatch = currentUser.typeOfTraining.includes(
        training.type
      );

      return levelMatch && genderMatch && typeOfTrainingMatch;
    }) || [];
  const specialOfferTrainings =
    trainings.data?.filter((training) => training.specialOffer) || [];
  const popularTrainings =
    trainings.data?.filter(
      (training) => training.rating === MAX_TRAINING_RATING
    ) || [];

  const users = useQuery({ queryKey: ['users'], queryFn: loadUsers });
  const lookingForCompanyUsers =
    users.data?.filter((user) => user.readyToTrain) || [];

  return (
    <div className="wrapper">
      <main>
        <h1 className="visually-hidden">
          FitFriends — Время находить тренировки, спортзалы и друзей спортсменов
        </h1>
        <SpecialForYouSlider trainings={specialForYouTrainings} />
        <SpecialOffersSlider trainings={specialOfferTrainings} />
        <PopularTrainingsSlider trainings={popularTrainings} />
        <LookingForCompanySlider
          lookingForCompanyUsers={lookingForCompanyUsers}
        />
      </main>
    </div>
  );
}
