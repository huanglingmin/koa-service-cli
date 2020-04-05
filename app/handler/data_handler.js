"use strict";
const BaseHandler = require("../base/base_handler");
const DataService = require("../service/data_service");

class DataHandler extends BaseHandler {

    constructor(...args) {
        super(...args);
        DataService.init();
    }
    /**
     * @function getForeignCountry
     * @param {koaContext} ctx 
     * @param {Object} req 
     * @description 按国家拉取海外疫情数据
     * @return {Object}
     */
    async getUserInfo(ctx, req) {
        const rsp = {};
        rsp.code = 0;
        rsp.message = "SUCCESS";
        const result = await DataService.getUserInfo(ctx, req);
        return Object.assign(rsp, result);
    }
}

module.exports = new DataHandler();
