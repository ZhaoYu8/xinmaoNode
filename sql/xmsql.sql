/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : xinmao

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2019-11-27 09:55:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for _order
-- ----------------------------
DROP TABLE IF EXISTS `_order`;
CREATE TABLE `_order` (
`id`  int(30) NOT NULL AUTO_INCREMENT ,
`orderId`  varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户名称' ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系方式' ,
`custAddress`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '客户地址（只展示）' ,
`sales`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '销售' ,
`deliveryType`  varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '配送方式 1.送货上门 2.部分自己送+快递 3.快递' ,
`address`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '省区市' ,
`shipping`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`courier`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '快递单号' ,
`orderDate`  datetime NULL DEFAULT NULL COMMENT '订单日期' ,
`downPayment`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '定金' ,
`remark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '备注' ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`updateDate`  datetime NULL DEFAULT NULL COMMENT '修改时间' ,
`updateUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '修改人' ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for _orderid
-- ----------------------------
DROP TABLE IF EXISTS `_orderid`;
CREATE TABLE `_orderid` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`currentIndex`  int(25) NOT NULL ,
`updateDate`  date NULL DEFAULT NULL COMMENT '创建日期' ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for _projectid
-- ----------------------------
DROP TABLE IF EXISTS `_projectid`;
CREATE TABLE `_projectid` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`currentIndex`  int(25) NOT NULL ,
`company`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for branch
-- ----------------------------
DROP TABLE IF EXISTS `branch`;
CREATE TABLE `branch` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`parent`  int(25) NOT NULL ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for company
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`createDate`  datetime NOT NULL ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
`id`  int(24) NOT NULL AUTO_INCREMENT ,
`name`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名' ,
`phone`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系方式' ,
`address`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址合集' ,
`detailAddress`  varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`photo`  varchar(99) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for orderdelivery
-- ----------------------------
DROP TABLE IF EXISTS `orderdelivery`;
CREATE TABLE `orderdelivery` (
`id`  int(255) NOT NULL AUTO_INCREMENT ,
`orderId`  int(255) NULL DEFAULT NULL ,
`projectId`  int(255) NULL DEFAULT NULL ,
`num`  int(255) NULL DEFAULT NULL ,
`note`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderOperationId`  int(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Table structure for orderoperation
-- ----------------------------
DROP TABLE IF EXISTS `orderoperation`;
CREATE TABLE `orderoperation` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`orderId`  int(25) NOT NULL ,
`operationUser`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`operationDate`  datetime NULL DEFAULT NULL ,
`operationType`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`company`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Table structure for orderpremium
-- ----------------------------
DROP TABLE IF EXISTS `orderpremium`;
CREATE TABLE `orderpremium` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`money`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`remark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderId`  int(11) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for orderprojectlist
-- ----------------------------
DROP TABLE IF EXISTS `orderprojectlist`;
CREATE TABLE `orderprojectlist` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`projectId`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品id' ,
`sort`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品分类' ,
`units`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位' ,
`cost`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本' ,
`price`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单价' ,
`count`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数量' ,
`proRemark`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`orderId`  int(25) NOT NULL COMMENT '订单id' ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for print
-- ----------------------------
DROP TABLE IF EXISTS `print`;
CREATE TABLE `print` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`address`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`phone`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`bank`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`account`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`isCustAddress`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`isQrcode`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`company`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`proNumber`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '产品名称' ,
`sort`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '产品类别' ,
`units`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单位' ,
`cost`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '成本' ,
`price`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '单价' ,
`createDate`  datetime NULL DEFAULT NULL COMMENT '创建日期' ,
`createUser`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for projectphoto
-- ----------------------------
DROP TABLE IF EXISTS `projectphoto`;
CREATE TABLE `projectphoto` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`url`  varchar(888) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`projectId`  int(25) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for projectsort
-- ----------------------------
DROP TABLE IF EXISTS `projectsort`;
CREATE TABLE `projectsort` (
`id`  int(25) NOT NULL AUTO_INCREMENT ,
`name`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL ,
`parent`  int(25) NULL DEFAULT NULL ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`id`  int(99) NOT NULL AUTO_INCREMENT COMMENT 'id主键' ,
`name`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名' ,
`phone`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '手机号' ,
`position`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '职位' ,
`branch`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '部门' ,
`sex`  int(5) NULL DEFAULT 1 COMMENT '性别（1是男的 0是女的）' ,
`address`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址' ,
`detailAddress`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '详细地址' ,
`password`  varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码' ,
`dr`  int(50) NOT NULL COMMENT '状态(1是正常 0是删除)' ,
`sales`  int(5) NULL DEFAULT 1 COMMENT '是否显示在销售列表下（1是显示 0是不显示）' ,
`company`  int(25) NOT NULL ,
PRIMARY KEY (`id`)
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Auto increment value for _order
-- ----------------------------
ALTER TABLE `_order` AUTO_INCREMENT=49;

-- ----------------------------
-- Auto increment value for _orderid
-- ----------------------------
ALTER TABLE `_orderid` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for _projectid
-- ----------------------------
ALTER TABLE `_projectid` AUTO_INCREMENT=5;

-- ----------------------------
-- Auto increment value for branch
-- ----------------------------
ALTER TABLE `branch` AUTO_INCREMENT=16;

-- ----------------------------
-- Auto increment value for company
-- ----------------------------
ALTER TABLE `company` AUTO_INCREMENT=39;

-- ----------------------------
-- Auto increment value for customer
-- ----------------------------
ALTER TABLE `customer` AUTO_INCREMENT=49;

-- ----------------------------
-- Auto increment value for orderpremium
-- ----------------------------
ALTER TABLE `orderpremium` AUTO_INCREMENT=50;

-- ----------------------------
-- Auto increment value for orderprojectlist
-- ----------------------------
ALTER TABLE `orderprojectlist` AUTO_INCREMENT=99;

-- ----------------------------
-- Auto increment value for print
-- ----------------------------
ALTER TABLE `print` AUTO_INCREMENT=3;

-- ----------------------------
-- Auto increment value for project
-- ----------------------------
ALTER TABLE `project` AUTO_INCREMENT=52;

-- ----------------------------
-- Auto increment value for projectphoto
-- ----------------------------
ALTER TABLE `projectphoto` AUTO_INCREMENT=52;

-- ----------------------------
-- Auto increment value for projectsort
-- ----------------------------
ALTER TABLE `projectsort` AUTO_INCREMENT=48;

-- ----------------------------
-- Auto increment value for user
-- ----------------------------
ALTER TABLE `user` AUTO_INCREMENT=26;
