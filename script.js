const app = new PIXI.Application(
  {
    width: 512,
    height: 512,
    backgroundColor: 0x7799CC,
    antialias: true
  }
);

document.body.appendChild(app.view);

const sUtil = new SpriteUtilities(PIXI);
const keys = {}
let player;
let tileTextures;

app.loader.add('tilesheet', 'assets/images/platform.png');
app.loader.load(setup);

function setup() {
  tileTextures = sUtil.filmstrip(
    app.loader.resources['tilesheet'].url,
    64, 64
  );

  createMap();
  createPlayer();

  app.ticker.add(gameLoop);
}

function createMap() {
  let i = 0;
  let floorContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].floor[i]]
      );
      i++;
      return sprite;
    }
  )
  app.stage.addChild(floorContainer);

  i = 0;
  let wallsContainer = sUtil.grid(
    8, 8, 64, 64,
    false, 0, 0,
    () => {
      let sprite = new PIXI.Sprite(
        tileTextures[levels[0].walls[i]]
      );
      i++;
      return sprite;
    }
  )
  app.stage.addChild(wallsContainer);
}