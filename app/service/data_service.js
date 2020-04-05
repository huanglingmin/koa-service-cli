/* eslint-disable no-unused-vars */
"use strict";
/**
 * 数据逻辑服务
 */
const BaseService = require("../base/base_service");
const DataDao = require("../dao/data_dao");
const config = require("../config");
const { CommonConf } = config.app;
const Cache = require("../cache");
const moment = require("moment");
class DataService extends BaseService {

    constructor(...args) {
        super(...args);
        this.conf = CommonConf;
    }

    async init() {
        await Cache.initUpdateDataCache();
    }

    async getUserInfo(ctx, req) {
        const rsp = {};
        rsp.code = 0;
        rsp.message = "SUCCESS";
        const result = await DataDao.getUserInfo(ctx, req);
        return Object.assign(rsp, result);
    }

    /**
     * @function getCfg
     * @param {Object} ctx 
     * @param {Object} req 
     * @description 配置接口
     * 前端如果需要定制配置需求可重写该方法
     * 目前会直接返回page.hjson中的内容
     */
    async getCfg(ctx, req) {

        let rsp = {
            cfgTag: 0,
            strCfg: JSON.stringify({}),
            abTest: "",
            code: 0,
            message: "SUCCESS"
        };
        return rsp;
    }
}

module.exports = new DataService();
