/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-09-27 14:48:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for orderpremium
-- ----------------------------
DROP TABLE IF EXISTS `orderpremium`;
CREATE TABLE `orderpremium` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `money` varchar(25) DEFAULT NULL,
  `remark` varchar(25) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
