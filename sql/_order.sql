/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-10-22 17:32:58
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for _order
-- ----------------------------
DROP TABLE IF EXISTS `_order`;
CREATE TABLE `_order` (
  `id` int(30) NOT NULL AUTO_INCREMENT,
  `orderId` varchar(30) NOT NULL,
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户名称',
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式',
  `custAddress` varchar(25) DEFAULT NULL COMMENT '客户地址（只展示）',
  `sales` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '销售',
  `deliveryType` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '配送方式 1.送货上门 2.部分自己送+快递 3.快递',
  `address` varchar(25) DEFAULT NULL COMMENT '省区市',
  `shipping` varchar(25) DEFAULT NULL COMMENT '详细地址',
  `courier` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '快递单号',
  `orderDate` datetime DEFAULT NULL COMMENT '订单日期',
  `downPayment` varchar(25) DEFAULT NULL COMMENT '定金',
  `remark` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '备注',
  `createDate` datetime DEFAULT NULL COMMENT '创建日期',
  `createUser` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '创建人',
  `updateDate` datetime DEFAULT NULL COMMENT '修改时间',
  `updateUser` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '修改人',
  `company` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
