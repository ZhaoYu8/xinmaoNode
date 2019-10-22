/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:33
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderpremium
-- ----------------------------
INSERT INTO `orderpremium` VALUES ('1', '支出', '-1', '2321', '4');
INSERT INTO `orderpremium` VALUES ('2', '1', '1', '1', '5');
INSERT INTO `orderpremium` VALUES ('3', '2', '2', '2', '5');
INSERT INTO `orderpremium` VALUES ('4', '3', '3', '3', '5');
INSERT INTO `orderpremium` VALUES ('5', '邮费', '-25', '123', '6');
INSERT INTO `orderpremium` VALUES ('6', '支出', '-1', '321', '6');
INSERT INTO `orderpremium` VALUES ('7', '支出', '-1', '', '7');
INSERT INTO `orderpremium` VALUES ('8', '支出', '-1', '', '8');
INSERT INTO `orderpremium` VALUES ('9', '1', '1', '1', '13');
INSERT INTO `orderpremium` VALUES ('10', '2', '2', '2', '13');
INSERT INTO `orderpremium` VALUES ('11', '3', '3', '3', '13');
INSERT INTO `orderpremium` VALUES ('12', '1', '1', '1', '14');
INSERT INTO `orderpremium` VALUES ('13', '2', '2', '2', '14');
INSERT INTO `orderpremium` VALUES ('14', '3', '3', '3', '14');
INSERT INTO `orderpremium` VALUES ('15', '1', '1', '1', '15');
INSERT INTO `orderpremium` VALUES ('16', '2', '2', '2', '15');
INSERT INTO `orderpremium` VALUES ('17', '3', '3', '3', '15');
INSERT INTO `orderpremium` VALUES ('27', '123', '123', '321', '6');
