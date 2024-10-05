# MySQL

CREATE DATABASE IF NOT EXISTS `notes`;

USE `notes`;

CREATE TABLE IF NOT EXISTS `docs` (
    `id` CHAR(128) NOT NULL PRIMARY KEY,
    `title` TEXT NOT NULL,
    `author` CHAR(128) NOT NULL,
    `date` BIGINT NOT NULL,
    `data` TEXT NOT NULL,
    `meta` TEXT NOT NULL,
    `department` CHAR(128)
);

CREATE TABLE IF NOT EXISTS `users` (
    `username` CHAR(128) NOT NULL PRIMARY KEY,
    `description` TEXT NOT NULL,
    `nickname` TEXT NOT NULL,
    `password` CHAR(128) NOT NULL,
    `permission` BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `departments` (
    `id` CHAR(128) NOT NULL PRIMARY KEY,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `parent` CHAR(128),
    `leader` CHAR(128) NOT NULL,
    `members` TEXT NOT NULL
);