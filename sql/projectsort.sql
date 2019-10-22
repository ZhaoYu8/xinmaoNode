/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for projectsort
-- ----------------------------
DROP TABLE IF EXISTS `projectsort`;
CREATE TABLE `projectsort` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `parent` int(25) DEFAULT NULL,
  `company` int(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projectsort
-- ----------------------------
INSERT INTO `projectsort` VALUES ('34', '杯子', '0', '20');
INSERT INTO `projectsort` VALUES ('38', '尚浩亚', '34', '20');
INSERT INTO `projectsort` VALUES ('39', '精品1', '38', '20');
INSERT INTO `projectsort` VALUES ('40', '123', '39', '20');
