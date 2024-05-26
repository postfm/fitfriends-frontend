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
  const trainingsQuery = useQuery({
    queryKey: ['trainings'],
    queryFn: async () => (await loadTrainings()).data,
    select: (data) => data.data,
  });

  const trainings = trainingsQuery.data || [];
  const specialForYouTrainings =
    trainings.filter((training) => {
      const levelMatch = training.level === currentUser.levelOfTrain;
      const genderMatch =
        currentUser.gender === UserGender.all ||
        training.gender === TrainingGender['неважно'] ||
        getEnumKeyByEnumValue(UserGender, currentUser.gender) ===
          getEnumKeyByEnumValue(TrainingGender, training.gender);
      const typeOfTrainingMatch = currentUser.typeOfTraining.includes(
        training.type
      );

      return levelMatch && genderMatch && typeOfTrainingMatch;
    }) || [];
  const specialOfferTrainings =
    trainings.filter((training) => training.specialOffer) || [];
  const popularTrainings =
    trainings.filter((training) => training.rating === MAX_TRAINING_RATING) ||
    [];

  const users = useQuery({
    queryKey: ['users'],
    queryFn: async () => (await loadUsers()).data,
  });
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
