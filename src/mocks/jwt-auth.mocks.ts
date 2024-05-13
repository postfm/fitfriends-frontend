// POST http://localhost:4000/fitfriends/auth/register HTTP/1.1
export const authUser = {
  id: 13,
  name: 'Mary',
  email: 'mary@user.com',
  avatar: '/store/avatar.jpg',
  gender: 'неважно',
  birthday: '2024-11-03',
  roles: ['пользователь'],
  description: 'Описание пользователя',
  location: 'Удельная',
  image: 'store/avatar.jpg',
  createdAt: '2024-05-11T12:29:07.273Z',
  updatedAt: '2024-05-11T12:29:07.273Z',
  levelOfTrain: 'новичок',
  typeOfTraining: ['стрейчинг', 'кроссфит'],
  timeOfTraining: '10-30 мин',
  caloriesToLose: 2000,
  caloriesPerDay: 2000,
  readyToTrain: true,
  certificates: null,
  merits: null,
  personalTrainings: null,
  refreshToken: null,
  friends: [],
};

export const authCoach = {
  id: 16,
  name: 'Lora',
  email: 'lora@trainer.com',
  avatar: '/store/avatar.jpg',
  gender: 'женский',
  birthday: '2024-11-03',
  roles: ['тренер'],
  description: 'Описание пользователя',
  location: 'Удельная',
  image: 'store/avatar.jpg',
  createdAt: '2024-05-11T12:53:31.631Z',
  updatedAt: '2024-05-11T12:53:31.631Z',
  levelOfTrain: 'профессионал',
  typeOfTraining: ['стрейчинг', 'кроссфит'],
  timeOfTraining: null,
  caloriesToLose: null,
  caloriesPerDay: null,
  readyToTrain: null,
  certificates: '/store/certificates.pdf',
  merits: 'Кандидат в мастера спорта',
  personalTrainings: true,
  refreshToken: null,
  friends: [],
};

// POST http://localhost:4000/fitfriends/auth/login HTTP/1.1

export const loginCoach = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJlbWFpbCI6ImpvaG5AdHJhaW5lci5jb20iLCJyb2xlcyI6ItGC0YDQtdC90LXRgCIsImlhdCI6MTcxNTQzMjIxNCwiZXhwIjoxNzE1NDMzMTE0fQ.syiVpR9qIX01Ks2hjE516AHkqTqIaYEHAjpT1pPDa-8',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJlbWFpbCI6ImpvaG5AdHJhaW5lci5jb20iLCJyb2xlcyI6ItGC0YDQtdC90LXRgCIsImlhdCI6MTcxNTQzMjIxNCwiZXhwIjoxNzE2MDM3MDE0fQ.bkzzLY20rFWcvlLU_zzF00EosHFWfjck6SJijEIcYFY',
};

export const loginUser = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6Im1hcnlAdXNlci5jb20iLCJyb2xlcyI6ItC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImlhdCI6MTcxNTQzMjI4NCwiZXhwIjoxNzE1NDMzMTg0fQ.ntrcd0ekBj1uIqaCf_KkmjZQ6zQQCCSqXsHZhZS4yTE',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6Im1hcnlAdXNlci5jb20iLCJyb2xlcyI6ItC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImlhdCI6MTcxNTQzMjI4NCwiZXhwIjoxNzE2MDM3MDg0fQ.tj-ndRCigSOP7RUg0MGiN9NoKBF_rNtmJzEnlOWoJkM',
};

// GET  http://localhost:4000/fitfriends/auth/refresh

export const tokenRefreshUser = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6Im1hcnlAdXNlci5jb20iLCJyb2xlcyI6ItC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImlhdCI6MTcxNTQzMjUxNywiZXhwIjoxNzE1NDMzNDE3fQ.zNHZnd6mx0gr_MxveKrO1mzJsNOSMDW9iG3syn2AVAY',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJlbWFpbCI6Im1hcnlAdXNlci5jb20iLCJyb2xlcyI6ItC_0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCIsImlhdCI6MTcxNTQzMjUxNywiZXhwIjoxNzE2MDM3MzE3fQ.M421dm5I3d9G1vnBXsm08gGHwLnmARfV7sfqFqx3E08',
};

export const tokenRefresh = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJlbWFpbCI6ImpvaG5AdHJhaW5lci5jb20iLCJyb2xlcyI6ItGC0YDQtdC90LXRgCIsImlhdCI6MTcxNTQzMjY0NSwiZXhwIjoxNzE1NDMzNTQ1fQ.l-cNY-41vGR47AQQLEmVNIazeQGHgh3iMQYTJNoMcXM',
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE0LCJlbWFpbCI6ImpvaG5AdHJhaW5lci5jb20iLCJyb2xlcyI6ItGC0YDQtdC90LXRgCIsImlhdCI6MTcxNTQzMjY0NSwiZXhwIjoxNzE2MDM3NDQ1fQ.88Do-2d-m0we2Pvs9QccVybFE6kaQPJOy6uSaa0IGlA',
};

// GET  http://localhost:4000/fitfriends/auth/logout HTTP/1.1

// HTTP/1.1 200 OK
// X-Powered-By: Express
// Date: Sat, 11 May 2024 13:04:23 GMT
// Connection: close
// Content-Length: 0
