export type Params = {[key: string]: any}
export type QueryOptions = Params | Function

export async function getQuery(options: QueryOptions): Promise<string> {
  if (typeof options === 'function') {
    options = await options() || {};
  }
  return Object.keys(options).reduce((res, cur, index) => {
    res += `${index === 0 ? "" : "&"}${cur}=${(options as Params)[cur]}`;
    return res;
  }, "");
}