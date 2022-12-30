import { Http } from "./http";
import urlJoin from "url-join";

export class Api {
    constructor(host, username = null, passwordHash = null) {
        this.host = host;
        this.http = new Http(username, passwordHash);
    }

    async executeQuery(query) {
        return await this.http.doPost(this.__url("/sql-executor"), {
            text: query
        });
    }

    async generateSchedule(scheduleId, fromMoment = null, toMoment = null) {
        if (!fromMoment) {
            const current = new Date();
            current.setDate(current.getDate() - 14);
            fromMoment = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        }
        if (!toMoment) {
            toMoment = `${new Date().getFullYear()}-12-31`;
        }
        return await this.http.doGet(this.__url(`/schedule/${scheduleId}/generate/${fromMoment}/${toMoment}`));
    }

    async tryLogin(email, passwordHash) {
        return await this.http.doGet(this.__url(`/user/login/${email}/${passwordHash}`));
    }

    async createActivity(activity) {
        return await this.http.doPost(this.__url("/activity"), activity);
    }

    async retrieveActivities() {
        return await this.http.doGet(this.__url("/activity"));
    }

    async retrieveActivity(activityId) {
        return await this.http.doGet(this.__url("/activity", activityId));
    }

    async updateActivity(activity) {
        return await this.http.doPut(this.__url("/activity", activity.id), activity);
    }

    async deleteActivity(activityId) {
        return await this.http.doDelete(this.__url("/activity", activityId));
    }

    async createDepartment(department) {
        return await this.http.doPost(this.__url("/department"), department);
    }

    async retrieveDepartments() {
        return await this.http.doGet(this.__url("/department"));
    }

    async retrieveDepartment(departmentId) {
        return await this.http.doGet(this.__url("/department", departmentId));
    }

    async updateDepartment(department) {
        return await this.http.doPut(this.__url("/department", department.id), department);
    }

    async deleteDepartment(departmentId) {
        return await this.http.doDelete(this.__url("/department", departmentId));
    }

    async createRole(role) {
        return await this.http.doPost(this.__url("/role"), role);
    }

    async retrieveRoles() {
        return await this.http.doGet(this.__url("/role"));
    }

    async retrieveRole(roleId) {
        return await this.http.doGet(this.__url("/role", roleId));
    }

    async updateRole(role) {
        return await this.http.doPut(this.__url("/role", role.id), role);
    }

    async deleteRole(roleId) {
        return await this.http.doDelete(this.__url("/role", roleId));
    }

    async createSchedule(schedule) {
        return await this.http.doPost(this.__url("/schedule"), schedule);
    }

    async retrieveSchedules() {
        return await this.http.doGet(this.__url("/schedule"));
    }

    async retrieveSchedule(scheduleId) {
        return await this.http.doGet(this.__url("/schedule", scheduleId));
    }

    async updateSchedule(schedule) {
        return await this.http.doPut(this.__url("/schedule", schedule.id), schedule);
    }

    async deleteSchedule(scheduleId) {
        return await this.http.doDelete(this.__url("/schedule", scheduleId));
    }

    async createScheduleItem(scheduleitem) {
        return await this.http.doPost(this.__url("/schedule-item"), scheduleitem);
    }

    async retrieveScheduleItems() {
        return await this.http.doGet(this.__url("/schedule-item"));
    }

    async retrieveScheduleItem(scheduleitemId) {
        return await this.http.doGet(this.__url("/schedule-item", scheduleitemId));
    }

    async updateScheduleItem(scheduleitem) {
        return await this.http.doPut(this.__url("/schedule-item", scheduleitem.id), scheduleitem);
    }

    async deleteScheduleItem(scheduleitemId) {
        return await this.http.doDelete(this.__url("/schedule-item", scheduleitemId));
    }

    async createSex(sex) {
        return await this.http.doPost(this.__url("/sex"), sex);
    }

    async retrieveSexes() {
        return await this.http.doGet(this.__url("/sex"));
    }

    async retrieveSex(sexId) {
        return await this.http.doGet(this.__url("/sex", sexId));
    }

    async updateSex(sex) {
        return await this.http.doPut(this.__url("/sex", sex.id), sex);
    }

    async deleteSex(sexId) {
        return await this.http.doDelete(this.__url("/sex", sexId));
    }

    async createTarget(target) {
        return await this.http.doPost(this.__url("/target"), target);
    }

    async retrieveTargets() {
        return await this.http.doGet(this.__url("/target"));
    }

    async retrieveTarget(targetId) {
        return await this.http.doGet(this.__url("/target", targetId));
    }

    async updateTarget(target) {
        return await this.http.doPut(this.__url("/target", target.id), target);
    }

    async deleteTarget(targetId) {
        return await this.http.doDelete(this.__url("/target", targetId));
    }

    async createUser(user) {
        return await this.http.doPost(this.__url("/user"), user);
    }

    async retrieveUsers() {
        return await this.http.doGet(this.__url("/user"));
    }

    async retrieveUser(userId) {
        return await this.http.doGet(this.__url("/user", userId));
    }

    async updateUser(user) {
        return await this.http.doPut(this.__url("/user", user.id), user);
    }

    async changePassword(userId, oldPasswordHash, newPasswordHash) {
        return await this.http.doPut(this.__url("/user", userId, "changePassword"), {oldPasswordHash, newPasswordHash});
    }

    async deleteUser(userId) {
        return await this.http.doDelete(this.__url("/user", userId));
    }

    __url(...parts) {
        return urlJoin(this.host, ...parts.map(p => {
            if (p) {
                return p.toString();
            }
            return "";
        }));
    }
};
