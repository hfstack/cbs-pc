/**
 * 列表排序
 */
export default function(list, newIndex, oldIndex) {
  let item = list.splice(oldIndex, 1)[0];
  let i = list.length;
  for (; i > newIndex; i--) {
    list[i] = list[i - 1];
  }
  list[i] = item;

  return list;
};
