import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        not: '',
        then: Joi.string().required().min(6),
        otherwise: Joi.any(),
      }),
      password_confirmation: Joi.when('old_password', {
        not: '',
        then: Joi.string().required().valid(Joi.ref('password')),
        otherwise: Joi.any(),
      }),
    },
  }),
  profileController.update,
);

export default profileRouter;
