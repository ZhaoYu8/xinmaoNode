/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for orderprojectlist
-- ----------------------------
DROP TABLE IF EXISTS `orderprojectlist`;
CREATE TABLE `orderprojectlist` (
  `id` int(25) NOT NULL AUTO_INCREMENT,
  `projectId` int(25) DEFAULT NULL COMMENT '产品id',
  `sort` varchar(25) DEFAULT NULL COMMENT '产品分类',
  `units` varchar(25) DEFAULT NULL COMMENT '单位',
  `cost` varchar(25) DEFAULT NULL COMMENT '成本',
  `price` varchar(25) DEFAULT NULL COMMENT '单价',
  `count` varchar(25) DEFAULT NULL COMMENT '数量',
  `orderId` int(25) NOT NULL COMMENT '订单id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderprojectlist
-- ----------------------------
INSERT INTO `orderprojectlist` VALUES ('1', '33', '34,38,39', '个', '20', '25', '32', '4');
INSERT INTO `orderprojectlist` VALUES ('2', '33', '34,38,39', '个', '20', '32', '32', '5');
INSERT INTO `orderprojectlist` VALUES ('3', '32', '34,38', '个', '20', '12', '32', '5');
INSERT INTO `orderprojectlist` VALUES ('7', '39', '34,38,39', '个', '5', '8', '80', '7');
INSERT INTO `orderprojectlist` VALUES ('8', '36', '34,38,39', '个', '23', '35', '21', '8');
INSERT INTO `orderprojectlist` VALUES ('9', '32', '34,38', '个', '20', '30', '1', '9');
INSERT INTO `orderprojectlist` VALUES ('10', '36', '34,38,39', '个', '23', '35', '1', '10');
INSERT INTO `orderprojectlist` VALUES ('11', '33', '34,38,39', '个', '20', '25', '1', '11');
INSERT INTO `orderprojectlist` VALUES ('12', '32', '34,38', '个', '20', '30', '1', '12');
INSERT INTO `orderprojectlist` VALUES ('13', '33', '34,38,39', '个', '20', '25', '32', '13');
INSERT INTO `orderprojectlist` VALUES ('14', '32', '34,38', '个', '20', '30', '32', '13');
INSERT INTO `orderprojectlist` VALUES ('15', '33', '34,38,39', '个', '20', '25', '32', '14');
INSERT INTO `orderprojectlist` VALUES ('16', '32', '34,38', '个', '20', '30', '32', '14');
INSERT INTO `orderprojectlist` VALUES ('17', '33', '34,38,39', '个', '20', '25', '32', '15');
INSERT INTO `orderprojectlist` VALUES ('18', '32', '34,38', '个', '20', '30', '32', '15');
INSERT INTO `orderprojectlist` VALUES ('53', '36', '34,38,39', '个', '23', '12', '12', '6');
INSERT INTO `orderprojectlist` VALUES ('54', '32', '34,38', '个', '20', '30', '1', '6');
INSERT INTO `orderprojectlist` VALUES ('55', '32', '34,38', '个', '20', '12', '32', '6');
INSERT INTO `orderprojectlist` VALUES ('56', '32', '34,38', '个', '20', '30', '1', '16');
INSERT INTO `orderprojectlist` VALUES ('57', '32', '34,38', '个', '20', '30', '1', '17');
INSERT INTO `orderprojectlist` VALUES ('58', '32', '34,38', '个', '20', '30', '1', '18');
INSERT INTO `orderprojectlist` VALUES ('59', '32', '34,38', '个', '20', '30', '1', '20');
INSERT INTO `orderprojectlist` VALUES ('60', '32', '34,38', '个', '20', '30', '1', '21');
INSERT INTO `orderprojectlist` VALUES ('61', '36', '34,38,39', '个', '23', '35', '1', '22');
