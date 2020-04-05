"use strict";
/**
 * 数据DAO层
 */
const dbUtil = require("../utils/mysql_util");
const BaseDao = require("../base/base_dao");
const dbConf = require("../config").db;
const moment = require("moment");
class DataDao extends BaseDao {

    constructor(...args) {
        super(...args);
        this.dbOuterData = dbUtil.getPool(dbConf);
    }
    /**
     * @function getUserInfo
     * @return {Array}
     */
    async getUserInfo() {

        const sql = `
        select 
            id as id, 
            l_nick_name as nickName, 
            l_phone as phone, 
            l_create_time as createTime, 
            l_update_time as updateTime
        from x_user`;
        const contentData = await dbUtil.query(sql, [], dbConf);
        return contentData;
    }
}

module.exports = new DataDao();