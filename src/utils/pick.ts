const pick = <T extends Record<string, any>, K extends keyof T>(
  object: T,
  keys: any
): Pick<T, K> => {
  return keys.reduce((obj: any, key: any) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as Pick<T, K>);
};

export default pick;
