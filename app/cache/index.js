"use strict";
/**
 * Cache服务总入口
 * 加载所有的cache组件并执行init操作
 * 新增cache时需要在本文件中追加内容
 */
const { updateInerval } = require("../config").app;
const CityCache = require("./city-cache");
const CacheLogger = require("../utils/log_util")("cache");
async function updateDataCache() {
    let tasks = [];
    tasks.push(CityCache.updateCity);
    for (let task of tasks) {
        try {
            await task();
        } catch (err) {
            CacheLogger.error(err);
        }
    }
    CacheLogger.info("update cache successful.");
}
let loopCnt = 0;
async function timedUpdate() {
    try {
        await updateDataCache();
    }
    catch (err) {
        //console.error(err);
        if (loopCnt === 0) throw err;
    }
    loopCnt++;
    setTimeout(timedUpdate, updateInerval || 10 * 60 * 1000);
}
async function initUpdateDataCache() {
    await timedUpdate();
}
exports.updateDataCache = updateDataCache;
exports.initUpdateDataCache = initUpdateDataCache;
exports.CityCache = CityCache;
