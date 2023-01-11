insert into "users" (
  "userName",
  "hashedPassword"
) values (
  'username',
  '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'
), (
  'user2',
  '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'
), (
  'user3',
  '$argon2i$v=19$m=4096,t=3,p=1$h7icQD/xZr8akZsX+hNA0A$h68atJWyjvunAwNOpSpMfg9sPvoMQ6dKwoh0dJhurWA'
);

insert into "outfits" (
  "userId",
  "outfitImg",
  "outfitName",
  "category",
  "bottoms",
  "makeup",
  "star"
) values (
  1,
  'https://litb-cgis.rightinthebox.com/images/384x500/202110/bps/product/inc/fqdfpu1635163742663.jpg',
  'Rock & Roll',
  'Synchro',
  'tan in boot',
  'nuetral tones',
  false
), (
  1,
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Wk6CVIhGdcFinwnLB7B1KWhjHOEiU6CX2zmPle-NMkCetOj1AaSUCJxijVlEQ2pcLxg&usqp=CAU',
  'Shatter Me',
  'Single',
  'tan in boot',
  'nuetral tones',
  false
);

insert into "events" (
  "eventName",
  "startDate",
  "startTime",
  "endTime",
  "locationName",
  "userId"
) values (
  'Competition',
  '02-05-2023',
  '9:30AM',
  '10:30PM',
  'Irvine',
  1
), (
  'Practice',
  '10-20-2023',
  '6:30PM',
  '8:30PM',
  'Simi Valley',
  1
), (
  'Competition',
  '11-13-2022',
  '12:30PM',
  '1:30PM',
  'Simi Valley',
  1
), (
  'Competition',
  '11-28-2022',
  '12:00PM',
  '2:00PM',
  'Chicago',
  2
);
