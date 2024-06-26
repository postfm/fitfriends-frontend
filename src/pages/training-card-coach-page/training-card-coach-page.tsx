import { Link, useParams } from 'react-router-dom';
import { AuthAppRoutes } from '../../constants/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReviewCard from '../../components/review/review-card';
import { loadTraining } from '../../api/loadTraining';
import TrainingInfoCard from './components/training-info-card';
import { NewTraining, Training } from '../../types';
import { updateTraining } from '../../api/updateTraining';
import { loadReviews } from '../../api/loadReviews';

const TrainingCardCoachPage: React.FC = () => {
  const { id } = useParams();
  const training = useQuery({
    queryKey: ['training', id],
    queryFn: async () => (await loadTraining(Number(id))).data,
  });

  String(training.data?.user?.avatar);

  const reviews = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => (await loadReviews(Number(id))).data,
  });

  const updateTrainingMutatation = useMutation({
    mutationKey: ['updateTraining', training.data?.training_id],
    mutationFn: (params: { value: NewTraining }) =>
      updateTraining(Number(training.data?.training_id), params.value),
  });

  if (!training.data || training.isLoading) {
    return <div>Loading</div>;
  }

  const handleSaveTraining = (training: Training) => {
    updateTrainingMutatation.mutate({
      value: training,
    });
  };

  return (
    <div className="wrapper">
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <Link
                  className="btn-flat btn-flat--underlined reviews-side-bar__back"
                  to={AuthAppRoutes.MyTrainings}
                >
                  <svg width={14} height={10} aria-hidden="true">
                    <use xlinkHref="#arrow-left" />
                  </svg>
                  <span>Назад</span>
                </Link>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {(reviews.data || []).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </ul>
                <button
                  className="btn btn--medium reviews-side-bar__button"
                  type="button"
                  disabled
                >
                  Оставить отзыв
                </button>
              </aside>
              <div className="training-card training-card--edit">
                <TrainingInfoCard
                  training={training.data}
                  onSave={handleSaveTraining}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TrainingCardCoachPage;
