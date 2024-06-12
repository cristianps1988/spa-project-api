const json = (param: any): any => {
    return JSON.stringify(
        param,
        (_key, value) => (typeof value === "bigint" ? Number(value.toString()) : value) // return everything else unchanged
    );
};
export default json;