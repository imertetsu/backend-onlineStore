const boom = require('boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.signature);
    return {
      user,
      token,
    };
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.signatureRecovery);
      const user = await service.findOne(payload.sub);

      if(user.recoveryToken !== token){
        throw boom.unauthorized("Token");
      }
      const hash = await bcrypt.hash(newPassword, 5);
      console.log(user , hash);
      await service.update(user.id, {password: hash, recoveryToken: null});
      return { message: 'Password Changed'}
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendMailRecovery(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
      role: user.role
    }
    const tokenRecovery = await jwt.sign(payload, config.signatureRecovery, {expiresIn: '15min'});
    await service.update(user.id, { recoveryToken: tokenRecovery });

    //nuestro frontend deberia tener una vista en donde nosotros enviaremos el token
    const link = `http://myfrontend.com/recovery?token=${tokenRecovery}`;
    const mail = {
      from: `"Foo Boo 👻" <${config.emailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recovery Password', // Subject line
      text: 'Hello World :) !', // plain text body
      html: `<b>Ingresa a este link para recuperar la contrasenia ${link}</b>`, // html body
    }
    const respt = await this.sendMail(mail);
    return respt;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }
}

module.exports = AuthService;
