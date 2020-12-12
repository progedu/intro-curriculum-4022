'use strict';
const express = require('express');
const moment = require('moment-timezone');

const router = express.Router();
const Schedule = require('../models/schedule');


/* GET home page. */
router.get('/', (req, res, next) => {
  const title = '予定調整くん';
  if (req.user) {
    Schedule.findAll({
      where: {
        createdBy: req.user.id
      },
      order: [['updatedAt', 'DESC']]
    }).then((schedules) => {
      schedules.forEach(schedules => {
        // formattedUpdatedAt プロパティを schedule に新たに作り、moment で updatedAt を形式変換する
        schedules.formattedUpdatedAt = moment(schedules.updatedAt).tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm');
      });
      res.render('index', {
        title: title,
        user: req.user,
        schedules: schedules
      });
    });
  } else {
    res.render('index', { title: title, user: req.user });
  }
});

module.exports = router;
