import { useState, useEffect, useContext } from 'react';
import { getPhotos, getUserByUserId } from '../services/firebase';

export default function usePhotos(user) {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    async function getTimelinePhotos() {
      if (user?.following?.length > 0) {
        let followedUserPhotos = [];
        followedUserPhotos = await getPhotos(user.userId, user.following);
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dareCreated);
        setPhotos(followedUserPhotos);
      }
    }
    getTimelinePhotos();
  }, [user?.userId, user?.following]);
  return { photos };
}
