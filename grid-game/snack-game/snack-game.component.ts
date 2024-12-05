import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Direction} from "../game/direction";
import {Food} from "../game/food";
import {Snake} from "../game/snake";
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-snack-game',
  templateUrl: './snack-game.component.html',
  styleUrls: ['./snack-game.component.scss']
})
export class SnackGameComponent implements OnInit {

  @Output() popupClosed: EventEmitter<void> = new EventEmitter<void>();

  private size: number = 20;
  public cells: number[] = new Array(this.size * this.size);
  public timestep: number = 100;
  public snake: Snake = new Snake();
  public bestUserScore !: User;
  public dead: boolean = false;
  public time: number = 0;

  private gridSize: number = this.size * this.size;
  private food: Food = new Food(this.gridSize, this.snake);
  public currentUser!: User;

  public constructor(private userService: UserService) {
  }

  public ngOnInit(): void {
    this.startGame();
  }

  public fermerPopup(): void {
    this.popupClosed.emit();
  }

  public startGame(): void {
    this.playGame();
    const storedUser: string | null = sessionStorage.getItem("userLogged");
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as User;
    }
    this.userService.getUserWithHighestScore().subscribe((data => {
      this.bestUserScore = data;
    }));
  }

  public restartGame(): void {
    this.snake = new Snake();
    this.dead = false;
    this.time = 0;
    this.food = new Food(this.gridSize, this.snake);
    this.playGame();
  }

  public isFood(idx: number): boolean {
    return idx === this.food.pos;
  }

  public playGame(): void {
    const runTime = (): void => {
      setTimeout((): void => {
        this.goStep();
        this.dead = this.snake.checkDead(this.size);
        this.time++;
        if (!this.dead) {
          runTime();
        } else {
          this.checkHighScore();
        }
      }, this.timestep)
    }
    runTime();
  }

  public checkHighScore(): void {

    if (this.snake.tail.length - 2 > this.currentUser.highScore) {

      this.currentUser.highScore = this.snake.tail.length - 2;
      this.userService.updateUser(this.currentUser).subscribe();
      if (this.snake.tail.length - 2 > this.bestUserScore.highScore) {
        this.bestUserScore = this.currentUser;

      }
    }

  }

  public isBorderCell(index: number): boolean {
    return index < this.size || index % this.size === 0 ||
      (index + 1) % this.size === 0 || index >= this.size * (this.size - 1);
  }


  @HostListener('window:keydown', ['$event'])
  public onKeypress(e: KeyboardEvent): void {
    if (!this.dead) {
      switch (e.key) {
        case 'ArrowRight':
          this.changeDirAndGoStep(Direction.RIGHT);
          break;
        case 'ArrowLeft':
          this.changeDirAndGoStep(Direction.LEFT);
          break;
        case 'ArrowUp':
          this.changeDirAndGoStep(Direction.UP);
          break;
        case 'ArrowDown':
          this.changeDirAndGoStep(Direction.DOWN);
          break;
      }

    }
  }

  public goStep(): void {
    this.snake.goStep(this.size);
    this.eatFood();
  }


  public eatFood(): void {
    if (this.snake.head.pos) {
      const pos: number = this.snake.head.pos;
      if (this.isFood(pos)) {
        this.doSpawnFood();
        this.snake.grow();
      }

    }

  }

  public changeDirAndGoStep(dir: Direction): void {
    if (dir) {
      const canChangeDir: boolean = this.getCanChangeDir(dir, this.snake.dir);
      if (canChangeDir) {
        this.snake.dir = dir;
        this.goStep();
      }
    }
  }

  public getCanChangeDir(d1: Direction, d2: Direction): boolean {
    const dirs: Direction[] = [d1, d2];
    const filteredUpDown: number = dirs.filter(
      dir => dir === Direction.UP || dir === Direction.DOWN).length;
    const onlyOneDir: boolean = filteredUpDown === 2 || filteredUpDown === 0;
    return !onlyOneDir;
  }

  public doSpawnFood(): void {
    this.food = new Food(this.gridSize, this.snake);
  }

}
