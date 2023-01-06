# ice-time

A full-stack application designed for figure skaters who want to store and manage events and outfits.

## Why I Built This

I have been learning figure skating since 2016 and in 2022, I joined a synchronized figure skating team. Joining the team meant there were many dates to remember and outfits to put together. It was a lot to keep track of so I wanted to make an application that could help me keep all of the information for my practices and competitions organized and in one place.

## Technologies Used

- React.js
- Webpack
- Bootstrap 5
- Node.js
- PostgreSQL
- HTML5
- CSS3
- AWS
- React-Calendar

## Live Demo

Try the application live at [https://ice-time.arieldonner.com/](https://ice-time.arieldonner.com/)

# MVP Features

- User can create an account
- User can login to an account
- User can view a calendar of all scheduled events
- User can create a new entry for an event
- User can edit an entry for an event
- User can delete an entry for an event
- User can create a new outfit
- User can view a list of all saved outfits
- User can view details for an outfit
- User can edit an outfit
- User can delete an outfit
- User can view an info page about the site
- User can view a list of upcoming scheduled events (pending)

## Stretch Features

- User can favorite an outfit
- User can set a date range for events
- User can share events
- User can share outfits

## Preview
![ice-time](ice-time-preview-1.gif)

![ice-time](ice-time-preview-2.gif)

## Development

### Sytem Requirements

- Node.js
- NPM
- PostgreSQL

### Getting Started

1. Clone the repository.

  ```shell
    git clone https://github.com/arieldonner/ice-time.git
    cd ice-time
  ```

2. Install all dependencies with NPM.

  ```shell
    npm install
  ```

3. Make a copy of the provided .env.example file. Name your copy .env. In the DATABASE_URL, change changeMe to iceTime.

  ```shell
    cp .env.example .env
  ```

4. Import the example database to PostgreSQL.

  ```shell
    sudo service postgresql start
    createdb iceTime
    npm run db:import
    pgweb --db=iceTime
  ```

5. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

  ```shell
    npm run dev
  ```
