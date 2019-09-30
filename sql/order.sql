/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-09-27 14:48:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL COMMENT '客户名称',
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '联系方式',
  `custAddress` varchar(25) DEFAULT NULL COMMENT '客户地址（只展示）',
  `sales` varchar(25) NOT NULL DEFAULT '' COMMENT '销售',
  `deliveryType` varchar(5) NOT NULL DEFAULT '1' COMMENT '配送方式 1.送货上门 2.部分自己送+快递 3.快递',
  `address` varchar(25) DEFAULT NULL COMMENT '省区市',
  `shipping` varchar(25) DEFAULT NULL COMMENT '详细地址',
  `courier` varchar(25) DEFAULT '' COMMENT '快递单号',
  `downPayment` varchar(25) DEFAULT NULL COMMENT '定金',
  `remark` varchar(25) DEFAULT '' COMMENT '备注',
  `company` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
