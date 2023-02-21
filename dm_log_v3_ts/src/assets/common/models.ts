
class BaseEntity
{
    id: number = 0;
    version:number = 0;
    requestId: number = 0;
    createBy: string = "";
    updateBy: string = "";

    createDt: Date | null = null;
    updateDt: Date | null = null;


    copy (obj: any) {
        this.id = obj.id,
        this.version = obj.version;
        this.requestId = obj.requestId;
        this.createBy = obj.createBy;
        this.updateBy = obj.updateBy;

        if (typeof(obj.createDt) == 'string') {
            this.createDt = new Date(obj.createDt);
        } else {
            this.createDt = obj.createDt;
        }

        if (typeof(obj.updateDt) == 'string') {
            this.updateDt = new Date(obj.updateDt);
        } else {
            this.updateDt = obj.updateDt;
        }

        return this;
    }
}

export class LogDotaRun extends BaseEntity
{
    deviceId: string = "";
    groupId: string = "";
    isShop: boolean = false;

    override copy(obj: any): this {
        super.copy(obj);
        this.deviceId = obj.deviceId;
        this.groupId = obj.groupId;
        this.isShop = obj.isShop;

        return this;
    }
}

