import {Direction} from "./direction";
import {lowerNeighbor, upperNeighbor} from "./neighbor";
import {SnakeCell} from "./snackCell";

export class Snake {
  public cells: SnakeCell[] = [{
    pos: 3,
    prevPos: 2
  }, {
    pos: 2,
    prevPos: 1
  }, {
    pos: 1,
    prevPos: 0
  }];

  public dir: Direction = Direction.DOWN;

  public get head() {
    return this.cells[0];
  }

  public get tail() {
    const [_, ...tail] = this.cells;
    return tail
  }

  public grow(): void {
    this.cells.push({
      pos: this.cells[this.cells.length - 1].pos
    })
  }

  public isSnakeCell(cell: number): boolean {
    return this.cells.filter(elt => elt.pos === cell).length > 0;
  }

  public updateTail(): void {
    this.tail.forEach((elt: SnakeCell, idx: number): void => {
      elt.prevPos = elt.pos;
      elt.pos = this.cells[idx].prevPos;
    })
  }

  public checkDead(size: number): boolean {
    if (
      this.head.pos &&
      (this.head.pos % size === 0 ||
        this.head.pos % size === size - 1 ||
        this.head.pos < size ||
        this.head.pos >= size * (size - 1))
    ) {
      return true;
    }
    return this.tail.filter(elt => elt.pos === this.head.pos).length > 0;
  }


  public setNextPos(newPos: number): void {
    this.head.prevPos = this.head.pos;
    this.head.pos = newPos;
    this.updateTail();
  }

  public goStep(size: number): void {
    const cell: number | undefined = this.head.pos;
    const latticeSize: number = size;
    if (this.dir === Direction.LEFT) {
      this.setNextPos(lowerNeighbor(cell, 1, latticeSize));
    } else if (this.dir === Direction.RIGHT) {
      this.setNextPos(upperNeighbor(cell, 1, latticeSize));
    } else if (this.dir === Direction.UP) {
      this.setNextPos(lowerNeighbor(cell, 2, latticeSize));
    } else if (this.dir === Direction.DOWN) {
      this.setNextPos(upperNeighbor(cell, 2, latticeSize));
    } else {
      throw new Error('Unknown direction');
    }
  }
}


