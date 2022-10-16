
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
    snake: Snake
    food: Food
    scorePanel: ScorePanel
    direction = ""
    isLive = true

    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()
        this.init()
    }
    init() {
        document.addEventListener("keydown", this.keydownHandler.bind(this))

        this.run()
    }
    keydownHandler(e: KeyboardEvent) {

        this.direction = e.key
        console.log(this.direction);

    }
    run() {
        let X = this.snake.X
        let Y = this.snake.Y
        switch (this.direction) {
            case "ArrowUp" || "Up":
                Y -= 10
                break
            case "ArrowDown" || "Down":
                Y += 10
                break
            case "ArrowLeft" || "Left":
                X -= 10
                break
            case "ArrowRight" || "Right":
                X += 10
                break
        }

        this.checkEat(X, Y)

        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e: any) {
            alert(e.message)
            this.isLive = false
        }
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)

    }

    checkEat(X: number, Y: number) {

        if (X === this.food.X && Y === this.food.Y) {
            this.food.change()
            this.scorePanel.addScore()
            this.snake.addBody()
        }
    }

}

export default GameControl