'use strict';

const Controller = require('egg').Controller;



class HomeController extends Controller {
  async index() {
    await this.ctx.render('home/corp.html');
  }

  async error() {
    await this.ctx.render('home/error.html');
  }

  async sercert() {
    await this.ctx.render('/home/MP_verify_JLi94vO16rP0kiBE.txt')
  }

  async h5Auth() {
    await this.ctx.render('/home/NIXjTcrlqy.txt');
  }
  
}

module.exports = HomeController;

