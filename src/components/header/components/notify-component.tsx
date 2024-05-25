import classNames from 'classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getDateTime } from '../../../utils/date-helpers';
import { useState } from 'react';
import { deleteNotify } from '../../../api/deleteNotify';
import { Notify } from '../../../types';
import { toast } from 'react-toastify';

interface NotifyComponentProps {
  notify: Notify;
}

export function NotifyComponent({ notify }: NotifyComponentProps): JSX.Element {
  const [isNotifyActive, setIsNotifyActive] = useState(true);
  const queryClient = useQueryClient();

  const notifyDelete = useMutation({
    mutationKey: ['deleteNotify'],
    mutationFn: (params: { notifyId: number }) => deleteNotify(params.notifyId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['deleteNotify'],
      });
      toast.success('Notify deleted successfull');
    },
  });

  const handleListClick = () => {
    setIsNotifyActive(false);
    notifyDelete.mutate({ notifyId: notify.id });
  };

  return (
    <li className="main-nav__subitem" onClick={handleListClick}>
      <a
        className={classNames('notification', {
          'is-active': isNotifyActive,
        })}
      >
        <p className="notification__text">{notify.text}</p>
        <time className="notification__time" dateTime="2023-12-23 12:35">
          {getDateTime(notify.createdAt)}
        </time>
      </a>
    </li>
  );
}
