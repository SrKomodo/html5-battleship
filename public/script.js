/* eslint-env browser */

class Board {
  /**
   * Creates a new Board
   * @param {number} width The width of the board
   * @param {number} height The height of the board
   * @param {Ship[]} ships The ships the board has
   */
  constructor(width, height, ships) {
    this.width = width;
    this.height = height;
    this.ships = ships;
  }

  /**
   * Shoots at a given coord
   * @param {number} x The x coord of the shot
   * @param {number} y The y coord of the shot
   * @returns {boolean} Wether the shot was a hit or miss
   */
  shoot(x, y) {
    for (let ship of this.ships) {
      for (let i = 0; i < ship.size; i++) {
        switch (ship.direction) {
        case 0:
          if (ship.x + i === x && ship.y === y) {
            ship.hit(i);
            return true;
          }
          break;
        case 1:
          if (ship.x === x && ship.y + i === y) {
            ship.hit(i);
            return true;
          }
          break;
        case 2:
          if (ship.x - i === x && ship.y === y) {
            ship.hit(i);
            return true;
          }
          break;
        case 3:
          if (ship.x === x && ship.y - i === y) {
            ship.hit(i);
            return true;
          }
          break;
        }
      }
    }
    return false;
  }
}

class Ship {
  /**
   * Creates a new ship
   * @param {number} x
   * @param {number} y
   * @param {number} size
   * @param {0|1|2|3} direction
   */
  constructor(x, y, size, direction) {
    this.x = x;
    this.y = y;
    this.size = size;
    /** @type {boolean[]} */
    this.hits = Array(size).fill(false);
    this.direction = direction;
    this.sink = false;
  }

  /**
   * Hits the ship at a given point
   * @param {number} pos The position along the ship to hit
   */
  hit(pos) {
    this.hits[pos] = true;
    if (this.hits.every(hit => hit)) this.sink = true;
  }
}

const socket = io();
document.addEventListener("DOMContentLoaded", () => {
  const board = new Board(10, 10, []);
  console.log("Hello World!");
});