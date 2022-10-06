const { Router } = require('express');

const { authenticationUser } = require('../middlewares/authenticationUser');

const { validateToken } = require('../middlewares/validateToken');

const { dataValidation } = require('../middlewares/dataValidation');

const actionTalker = require('../functions/talkerActions');

const routes = Router();

routes.get('/talker/search', validateToken, actionTalker.searchTalker);

routes.get('/talker', actionTalker.getTalkers);
  
routes.get('/talker/:id', actionTalker.getTalkerSpecify);

routes.post('/login', authenticationUser);
  
routes.post('/talker', validateToken, dataValidation, actionTalker.registerTalker);

routes.put('/talker/:id', validateToken, dataValidation, actionTalker.updateTalker);

routes.delete('/talker/:id', validateToken, actionTalker.deleteTalker);

module.exports = { routes };