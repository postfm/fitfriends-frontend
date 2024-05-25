import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { addFriend } from '../api/addFriend';
import { removeFriend } from '../api/removeFriend';
import { useUser } from './useUser';
import { loadFriendsUser } from '../api/loadFriendsUser';
import { loadFriendsCoach } from '../api/loadFriendsCoach';
import { Role } from '../types';

export const useFriendQuery = (friendId: number) => {
  const user = useUser();
  const [isFriend, setIsFriend] = useState(false);

  const friendsUser = useQuery({
    queryKey: ['friends'],
    queryFn: user.roles === Role.user ? loadFriendsUser : loadFriendsCoach,
  });

  useEffect(() => {
    if (friendsUser.data) {
      setIsFriend(
        friendsUser.data.data.some((friend) => friend.id === friendId)
      );
    }
  }, [friendsUser.data, friendId]);

  const addFriendQuery = useMutation({
    mutationKey: ['addFriend', friendId],
    mutationFn: (params: { friendId: number }) => addFriend(params.friendId),
    onSuccess: () => {
      setIsFriend(true);
    },
  });

  const removeFriendQuery = useMutation({
    mutationKey: ['removeFriend', friendId],
    mutationFn: (params: { friendId: number }) => removeFriend(params.friendId),
    onSuccess: () => {
      setIsFriend(false);
    },
  });

  const addRemoveFriend = () => {
    if (isFriend) {
      removeFriendQuery.mutate({ friendId });
    } else {
      addFriendQuery.mutate({ friendId });
    }
  };

  return {
    addRemoveFriend,
    isFriend,
  };
};
