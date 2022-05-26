/**
 * Returns a new array which is a deep copy of passed one, means this function wouldn't change passed one.
 * It moves passed `targetItemIndex`'s item to `desticationIndex`.
 * @param list - The array of items to reorder
 * @param targetItemIndex - The index of an item you want to move
 * @param destinationIndex - the index where you want the item to be
 */
function reorderSameListItems<T>(list: T[], targetItemIndex: number, destinationIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(targetItemIndex, 1);
  result.splice(destinationIndex, 0, removed);

  return result;
}

/**
 * Move passed `targetItemIndex`'s item from given source array to destination array on given `destinationIndex`.
 * Returns a result of given arrays afterwards.
 * @param sourceList - source of the list, means where the item originaly was
 * @param destinationList - destination of the lsit, means where the item is goring toward
 * @param targetItemIndex - index of the original position in source list
 * @param destinationIndex - index of the destination position in destination list
 * @returns - { resultSource, resultDestination }
 */
function moveItemToAnotherList<T>(
  sourceList: T[],
  destinationList: T[],
  targetItemIndex: number,
  destinationIndex: number,
): { resultSource: T[]; resultDestination: T[] } {
  const resultSource = Array.from(sourceList);
  const resultDestination = Array.from(destinationList);

  const [removed] = resultSource.splice(targetItemIndex, 1);
  resultDestination.splice(destinationIndex, 0, removed);

  return { resultSource, resultDestination };
}

export { reorderSameListItems, moveItemToAnotherList };
