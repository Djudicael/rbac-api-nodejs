import {register} from '../repository/user.repository.js';
import User from '../models/user.model.js';
import { encryptPassword, isValidPassword } from '../helper/password.util.js';

export const registerPost = async ({email,password}) => {

    const user = new User({ email, password: await encryptPassword(password)});

    console.log(user);
    const createUser =await  register(user);

    return createUser;

};
