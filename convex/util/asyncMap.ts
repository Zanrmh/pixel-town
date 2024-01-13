/**
 * asyncMap returns the results of applying an async function over an list.
 *
 * @param list - Iterable object of items, e.g. an Array, Set, Object.keys
 * @param asyncTransform
 * @returns
 */
// chức năng thực hiện một hàm bất đồng bộ (async function) lên từng phần tử của một danh sách và trả về kết quả dưới dạng một mảng các kết quả lời hứa (Promise).
export async function asyncMap<FromType, ToType>(
  list: Iterable<FromType>,
  asyncTransform: (item: FromType, index: number) => Promise<ToType>,
): Promise<ToType[]> {
  const promises: Promise<ToType>[] = [];
  let idx = 0;
  for (const item of list) {
    promises.push(asyncTransform(item, idx));
    idx += 1;
  }
  return Promise.all(promises);
}
