export default interface IQueryResult {
    success: boolean;
    id?: number;
    data?: any;
    errorFields?: any[];
    unmodifiedData?: any[]
}
