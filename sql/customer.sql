/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:33:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(24) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `phone` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '联系方式',
  `address` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '地址合集',
  `detailAddress` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '详细地址',
  `photo` varchar(99) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createDate` datetime DEFAULT NULL COMMENT '创建日期',
  `createUser` varchar(20) DEFAULT NULL COMMENT '创建人',
  `company` int(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('43', '赵宇', '13370229012', '340000,340200,340225', '泥汊镇赵小自然村02501', '', '2019-09-03 11:30:04', '17', '20');
INSERT INTO `customer` VALUES ('44', '胡绿叶', '15821836343', '340000,340200,340225', '泥汊镇赵小自然村025', '', '2019-09-03 18:01:40', '17', '20');
