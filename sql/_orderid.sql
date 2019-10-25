/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-24 18:20:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for _orderid
-- ----------------------------
DROP TABLE IF EXISTS `_orderid`;
CREATE TABLE `_orderid` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `currentIndex` int(25) NOT NULL,
  `updateDate` date DEFAULT NULL COMMENT '创建日期',
  `company` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
