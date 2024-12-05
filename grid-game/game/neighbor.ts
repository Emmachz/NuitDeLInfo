export function upperNeighbor(
  cell: number | undefined, dimension: number, latticeSize: number): number {
  if (cell) {
    const props = getNeighborProperties(cell, latticeSize, dimension);
    return (cell + props.distanceToNeighbor) % props.rangelength + props.rangestart;
  }
  return 0;
}

export function lowerNeighbor(
  cell: number | undefined, dimension: number, latticeSize: number): number {
  if (cell) {
    const props = getNeighborProperties(cell, latticeSize, dimension);
    return (cell - props.distanceToNeighbor + props.rangelength) % props.rangelength + props.rangestart
  }
  return 0;
}

function getNeighborProperties(
  cell: number, latticeSize: number, dimension: number) {
  const rangelength = getRangeLength(latticeSize, dimension);
  return {
    distanceToNeighbor: getDistanceToNeighbor(latticeSize, dimension),
    rangelength: rangelength,
    rangestart: getRangeStart(cell, rangelength)
  }
}

function getDistanceToNeighbor(size: number, dimension: number) {
  return pow(size, dimension - 1);
}

function getRangeLength(size: number, dimension: number) {
  return pow(size, dimension);
}

function getRangeStart(cell: number, rangelength: number) {
  return Math.floor(cell / rangelength) * rangelength;
}

function pow(basis: number, exponent: number) {
  return Math.pow(basis, exponent);
}
