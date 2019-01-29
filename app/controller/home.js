'use strict';

const Controller = require('egg').Controller;



class HomeController extends Controller {
  async index() {
    await this.ctx.render('home/sliderdemo.html');
  }

  async error() {
    await this.ctx.render('home/error.html');
  }
  
}

module.exports = HomeController;

