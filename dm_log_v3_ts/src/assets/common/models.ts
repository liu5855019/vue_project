
class BaseEntity
{
    id: number = 0;
    version:number = 0;
    requestId: number = 0;
    createBy: string = "";
    updateBy: string = "";

    createDt: Date | null = null;
    updateDt: Date | null = null;
}

export class LogDotaRun extends BaseEntity
{
    deviceId: string = "";
    groupId: string = "";
    isShop: boolean = false;
}

