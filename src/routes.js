const { Router } = require('express');
const expressJWT = require('express-jwt');

const config = require('./config');
const auth = require('./controllers/auth');
const car = require('./controllers/car');

const routes = Router();

const jwtMiddleware = expressJWT({
  secret: config.JWT_SECRET,
  algorithms: [config.JWT_ALGORITHM],
  issuer: config.JWT_ISSUER,
});

routes.get('/', (_, res) => {
  return res.json({ ping: 'pong!' });
});

routes.post('/register', auth.register);
routes.post('/login', auth.login);
routes.get('/profile', jwtMiddleware, auth.profile);
routes.put('/profile', jwtMiddleware, auth.edit);
routes.put('/profile/password', jwtMiddleware, auth.editPassword);

routes.post('/cars', jwtMiddleware, car.createCars);
routes.get('/cars', jwtMiddleware, car.allCars);
routes.put('/cars/:id', jwtMiddleware, car.updateCar);
routes.delete('/cars/:id', jwtMiddleware, car.deleteCar);

module.exports = routes;
