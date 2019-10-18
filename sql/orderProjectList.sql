/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-18 18:02:54
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
