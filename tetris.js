const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");//2Dグラフィックを書く時の決まり文句

const FIELD_W = 300, FIELD_H = 630;
const COLS = 10, ROWS = 21
const BLOCK_W = FIELD_W / COLS, BLOCK_H = FIELD_H / ROWS;
let current_x = 3, current_y = 1;//定数宣言はエラー出る
let current_mino = newMino();//定数宣言はエラー出る
let field =[];
for (let y = 0; y < ROWS; y++) {
  field[y] = [];
  for (let x = 0; x < COLS; x++) {
    field[y][x] = 0;
  }
}

const canMove = (move_x, move_y,move_mino) => {
  const next_x = current_x + move_x;
  const next_y = current_y + move_y;
  const next_mino = move_mino || current_mino;
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++){
      if(next_mino[y][x]){
        if(next_y + y >= ROWS
          || next_x + x < 0
          || next_x + x >= COLS
          || field[next_y + y][next_x + x]){
          return false;
        }
      }
    }
  }
  return true;
};

const fix = () =>{
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++){
      if(current_mino[y][x]){
        field[current_y + y][current_x + x] = current_mino[y][x];
      }
    }
  }
};

const drawBlock = (x,y,block) => {
  if(block){
    ctx.fillStyle = COLORS[block - 1];
    ctx.fillRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W, BLOCK_H);
    ctx.strokeRect(x * BLOCK_W, y * BLOCK_H, BLOCK_W-1, BLOCK_H-1);
  }
};

const render = () => {
  ctx.clearRect(0,0,FIELD_W,FIELD_H);
  ctx.strokeStyle = "black";
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++){
      drawBlock(x, y, field[y][x]);
    }
  }
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++){
      drawBlock(current_x + x ,current_y + y,current_mino[y][x]);
    }
  }
};

const clearRows = () => {
  for(let y = ROWS-1; y >= 0;y--){
    let fill = true;
    for(let x=0;x<COLS;x++){
      if(field[y][x]==0){
        fill = false;
        break;
      }
    }
    if(fill){
      for(let v = y-1; v >= 0;v--){
        for(let x=0;x<COLS;x++){
          field[v+1][x] = field[v][x];
        }
      }
      y++;
    }
  }
}

const tick = () => {
  if(canMove(0,1)){
    current_y++;
  }else{
    fix();
    clearRows();
    current_mino = newMino();
    current_x = 3;
    current_y = 1;
  }
  render();
};



document.body.onkeydown = (e) => {
  switch (e.keyCode) {
    case 37||65:
      if (canMove(-1, 0)) {
        current_x--;
      }
      break;
    case 39||68:
      if (canMove(1, 0)) {
        current_x++;
      }
      break;
    case 40||83:
      if (canMove(0, 1)) {
        current_y++;
      }
      break;
    case 38||87:
      rotated = rotate_right(current_mino);
      if (canMove(0, 0, rotated)) {
        current_mino = rotated;
      }
      break;
    case 17||81:
      rotated = rotate_left(current_mino);
      if (canMove(0, 0, rotated)) {
        current_mino = rotated;
      }
      break;
  }
  render();
}
render();
setInterval(tick, 1000);

