insert into "users" (
  "userName",
  "password"
) values (
  'username',
  'password'
);

insert into "outfits" (
  "userId",
  "outfitImg",
  "outfitName",
  "category",
  "bottoms",
  "makeup",
  "attachment",
  "star"
) values (
  1,
  'test.jpg',
  'Rock & Roll',
  'Synchro',
  'tan in boot',
  'nuetral tones',
  null,
  false
);

insert into "locations" (
  "locationName",
  "lat",
  "lng"
) values (
  'Irvine',
  33.68074,
  -117.745162
);


insert into "events" (
  "eventName",
  "startDate",
  "startTime",
  "endDate",
  "endTime",
  "locationId",
  "outfitId",
  "userId"
) values (
  'Competition',
  '11-11-2022',
  '9:30AM',
  '11-11-2022',
  '10:30PM',
  1,
  1,
  1
), (
  'Practice',
  '11-13-2022',
  '6:30PM',
  '11-13-2022',
  '8:30PM',
  1,
  1,
  1
);
