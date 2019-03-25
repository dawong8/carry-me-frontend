This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Carry Me Frontend
## About this app
When people play multiplayer games, whenever someone is looking for someone else to play with, gamers post on forums, facebook groups, and reddit. The problem with that is that its super unorganized because the older posts become hidden and covered up by the newer posts.

My idea was to do a "tinder" style app in which users can swipe like/pass on each "post"/user; so, every post isn't lost or covered up despite the age of the post.

Another thing is that the gaming community is notorious for being angry, toxic, and filled with "trolls". So, my app also has a "yelp"-like feature, where you can leave anonymous reviews on players, which gets calculated into an overall rating.

This game is focused on the game Fortnite. Users must have an existing account with Fortnite/Epic Games to use. 

## Technologies Used
Frontend: 
* React.js, Redux
* React-router-dom


Technolgies implemented, but never used: 
I encounted a problem with Redux, whenever I refreshed the app, Redux resets data that was stored. At first, I added Redux-Persist, but I decided to store information in local storage instead. 

Firebase is also implemented, but I never used it. I wanted a realtime database with the messaging feature, but this feature is mixed in with the player-matching feature, which requires a relational database. 


### Future Plans
I wanted a realtime database; so, if I were to do this project differently, I would've carefully planned out more about what technologies to use. Also, my app is only for 1 game, Fortnite. In the future, I want to open it up to more games.



## Backend
The backend is a Flask API server, python with a SQL database. Here is the backend repo: [Here!](https://github.com/dawong8/carry-me-backend)

## Features

Since this app is focused on Fortnite, players can:
* view daily Fortnite item shop 
* match with players 
* connect with Fortnite account 
* message/view messages
* leave reviews 

## Screenshots
![](https://i.ibb.co/6D12GdH/image.png)
![](https://i.ibb.co/vk62cg3/1.png)
![](https://i.ibb.co/99Z0QHp/12.png)
![](https://i.ibb.co/pb9DmnX/122.png)


## Deployment

Deployed here on [Heroku](https://carryme-frontend.herokuapp.com/)

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


### Authors 

Danny Wong 
