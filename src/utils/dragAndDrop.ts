/**
 * Returns a new array which is a deep copy of passed one, means this function wouldn't change passed one.
 * It moves passed `targetItemIndex`'s item to `desticationIndex`.
 * @param list - The array of items to reorder
 * @param targetItemIndex - The index of an item you want to move
 * @param destinationIndex - the index where you want the item to be
 */
function reorderListItems<T>(list: T[], targetItemIndex: number, destinationIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(targetItemIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
}

export { reorderListItems };
