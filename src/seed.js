// NOTE: replace 'kV1ilnQTJZQ7CGzW2ebSguy8niY2' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: 'kV1ilnQTJZQ7CGzW2ebSguy8niY2',
      username: 'atharwa_13',
      fullName: 'Atharwa',
      emailAddress: 'atharwa1310@gmail.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now()
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['kV1ilnQTJZQ7CGzW2ebSguy8niY2'],
      dateCreated: Date.now()
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['kV1ilnQTJZQ7CGzW2ebSguy8niY2'],
      dateCreated: Date.now()
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['kV1ilnQTJZQ7CGzW2ebSguy8niY2'],
      dateCreated: Date.now()
    }
  ];
  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k += 1) {
    firebase.firestore().collection('users').add(users[k]);
  }
  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; i += 1) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'dali',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'orwell',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}
