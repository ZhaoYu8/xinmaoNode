/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `parent` int(25) NOT NULL,
  `company` int(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of branch
-- ----------------------------
INSERT INTO `branch` VALUES ('1', '鑫茂杯业', '0', '20');
INSERT INTO `branch` VALUES ('2', '销售部', '1', '20');
INSERT INTO `branch` VALUES ('11', '客户部', '1', '20');
INSERT INTO `branch` VALUES ('12', '生产部', '1', '20');
INSERT INTO `branch` VALUES ('13', '售后部', '1', '20');
INSERT INTO `branch` VALUES ('15', 'ceshi', '0', '38');
