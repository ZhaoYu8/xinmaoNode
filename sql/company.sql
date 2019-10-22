/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `createDate` datetime NOT NULL,
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company
-- ----------------------------
INSERT INTO `company` VALUES ('20', '鑫茂杯业', '2019-09-03 11:01:23', '13370229059');
INSERT INTO `company` VALUES ('38', 'ceshi', '2019-10-21 17:13:00', '13370229052');
