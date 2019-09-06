/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-09-06 18:29:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for projectphoto
-- ----------------------------
DROP TABLE IF EXISTS `projectphoto`;
CREATE TABLE `projectphoto` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `photoName` varchar(888) DEFAULT NULL,
  `photoAddress` varchar(888) DEFAULT NULL,
  `projectId` int(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
