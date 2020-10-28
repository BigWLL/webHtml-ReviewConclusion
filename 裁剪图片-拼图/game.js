var tileArray = new Array(); //存储切片的二维数组
var img = new Image(); //在画布中要绘制的图片
var imgSize = 600; //图片大小
var ctx; //画笔
var emptyObj = new Object(); //空白图片
//游戏准备
function ready() {
  var puzzle = document.getElementById("puzzle"); //获得canvas标签
  ctx = puzzle.getContext("2d");
  img.src = document.getElementById("cankao").src; //获取参考图片
}
//改变参考图片
function changePic(ele) {
  document.getElementById("cankao").src = ele.src;
  img.src = ele.src;
}

var tilelen; //切片大小
//根据游戏级别初始化
function initGame(num) {
  //得到切片大小
  tilelen = imgSize / num;

  //将原图片坐标存入二维数组
  for (var i = 0; i < num; i++) {
    tileArray[i] = new Array(); //行
    for (var j = 0; j < num; j++) {
      var obj = new Object(); //定义一个对象
      obj.x = i;
      obj.y = j;
      tileArray[i][j] = obj; //列
    }
  }
  console.log("tileArray", tileArray);
  //对二维数组切片进行随机排列
  shuffle();
  //按照二维数组绘制图片到画布
  redraw();
}

//找到左上角(0,0)的位置设为空白，而且保证在正确的位置上
//随机排列二维数组
function shuffle() {
  //找到左上角(0,0)的位置设为空白，而且保证切片在正确的位置上
  var num = tileArray.length; //二维数组的长度
  for (var i = 0; i < num; i++) {
    for (var j = 0; j < num; j++) {
//如果横纵坐标都为0，则与数组里的(0,0)交换位置，确保左上角对应左上角
			if(tileArray[i][j].x==0 && tileArray[i][j].y==0){
				var t=tileArray[i][j];
				tileArray[i][j]=tileArray[0][0];
				tileArray[0][0]=t;
				break;
			}

      //获取随机位置
      var ri = Math.floor(Math.random() * num);
      var rj = Math.floor(Math.random() * num);
      //当前ij元素交换位置
      var t = tileArray[i][j];
      tileArray[i][j] = tileArray[ri][rj];
      tileArray[ri][rj] = t;
    }
  }
  emptyObj.i = 0;
  emptyObj.j = 0;
}

//重新绘制图片
function redraw() {
  ctx.clearRect(0, 0, imgSize, imgSize);
  var num = tileArray.length; //二维数组的长度
  for (var i = 0; i < num; i++) {
    for (var j = 0; j < num; j++) {
      //原图片的坐标
      var curimg = tileArray[i][j]; //得到真实图片的坐标
      console.log("curimg", curimg);
      //设置当前图片如果为空白的话就不绘制
      if (i == emptyObj.i && j == emptyObj.j) {
			
      } else {
        //绘制一个小切片
        ctx.drawImage(
          img,
          curimg.x * tilelen,
          curimg.y * tilelen,
          tilelen,
          tilelen,
          i * tilelen,
          j * tilelen,
          tilelen,
          tilelen
        );
      }
    }
  }
}

// 重置清空
function reset() {
  ctx.clearRect(0, 0, imgSize, imgSize);
  tileArray = [];
}

// 点击移动
function move(e) {
  // 获取点击的位置，获取下标
  var ci = Math.floor(e.offsetX / tilelen)
  var cj = Math.floor(e.offsetY / tilelen)
  // 如果点击的切片与空白相邻，则与空白交换位置。
  // 要么横坐标一样要么纵坐标一样，两个坐标分别相减等于1则相邻
  if (Math.abs(ci-emptyObj.i) + Math.abs(cj-emptyObj.j) == 1) {
    var t = tileArray[ci][cj];
    tileArray[ci][cj] = tileArray[emptyObj.i][emptyObj.j];
    tileArray[emptyObj.i][emptyObj.j] = t;
    // 修改空白图片的坐标
    emptyObj.i = ci;
    emptyObj.j = cj;
    // 重绘
    redraw();
  }
  console.log('offset--', Math.abs(e.offsetX / tilelen))
  console.log('offsety--', e.offsetY / tilelen)

  // 判断是否成功
  var success = isSuccess();
  // 如果success为true 则重新绘制成功整张图
  if (success) {
    ctx.drawImage(img, 0, 0, imgSize, imgSize, 0, 0, imgSize, imgSize);
    // 加文字
    ctx.font = 'bold 50px 宋体'; //字体
    ctx.fillStyle = '#ccffcc'; //颜色
    ctx.fillText("success！",imgSize/3,imgSize/3); //文字内容，位置
  }
}

//判断游戏是否完成
function isSuccess(){
	var num=tileArray.length;
	var success=true;
	for (var i = 0; i < num; i++) {
		for(var j = 0; j < num; j++){
			//当前ij与tileArray[i][j]存储元素完全相同，则完成；如果有一个不一样则返回false
			if(tileArray[i][j].x!=i||tileArray[i][j].y!=j){
				success=false;
				break;
			}
		}
	}
	return success;
}

// 完成： 选择的图片大小必须是600*600 否则再次将图片绘制到画布上时会发生错误
function done() {
  // 重新绘制图
  ctx.drawImage(img, 0, 0, imgSize, imgSize, 0, 0, imgSize, imgSize);
}