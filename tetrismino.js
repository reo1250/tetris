const MINOS = [
    [
        [0,0,0,0],
        [1,1,1,1]
    ],
    [
        [0,1,1,0],
        [0,1,1,0]
    ],
    [
        [0,1,1,0],
        [1,1,0,0]
    ],
    [
        [1,1,0,0],
        [0,1,1,0]
    ],
    [
        [1,0,0,0],
        [1,1,1,0]
    ],
    [
        [0,0,1,0],
        [1,1,1,0]
    ],
    [
        [0,1,0,0],
        [1,1,1,0]
    ]
];
const COLORS = ["#66FFFF",//Iミノ
                "#FFFF33",//Oミノ
                "#ADFF2F",//Sミノ
                "#FF3300",//Zミノ
                "#0000ff",//Jミノ
                "#FF9900",//Lミノ
                "#9900FF"//Tミノ
];

const newMino = () => {
    let id = Math.floor(Math.random()*MINOS.length);
    let mino = [];
    for(let y= 0;y < 4;y++){
        mino[y]=[];
        for(let x= 0;x < 4;x++){
            mino[y][x]= 0;
            if(MINOS[id][y]){
                if(MINOS[id][y][x]){
                    mino[y][x]= id + 1;
                }
            }
        }
    }
    return mino;
};

const rotate_right = (mino) => {
    let rotated =[];
    for(let y = 0; y < 4; y++){
        rotated[y]= [];
        for(let x = 0; x < 4; x++){
            rotated[y][x]=mino[x][-y+3];
        }
    }
    return rotated;
  };

const rotate_left = (mino) => {
    let rotated = [];
    for(let y=0;y<4;y++){
        rotated[y]=[];
        for(let x=0;x<4;x++){
            rotated[y][x]=mino[-x+3][y];
        }
    }
    return rotated;
}
