/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for projectphoto
-- ----------------------------
DROP TABLE IF EXISTS `projectphoto`;
CREATE TABLE `projectphoto` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `name` varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `url` varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `projectId` int(25) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projectphoto
-- ----------------------------
INSERT INTO `projectphoto` VALUES ('51', 'tianmao (1).jpg', '\\upload_6e727f5db7a28a168e8e30fefa8f4557.jpg', '49');
