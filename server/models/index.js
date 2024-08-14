'use strict';
// js 의 엄격모드(strict mode) 활성화
// - 잠재적 오류 방지, 더 안전한 코드 작성하도록 도와줌

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Todo = require('./Todo')(sequelize, Sequelize)

module.exports = db;
