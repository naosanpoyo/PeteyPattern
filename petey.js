var peteypath1 = "N1";
var peteypath2 = "N1";
var nscount = 1;
var scount = 0;
var nowi = 0;
var previ = 0;
var mx, my, dx, dy;
var result = [];
var patterns = getCSV('PeteyPatternProbabilities.csv');
var adjacency = [[0,1,0,0,0,0,1,0,0,1,0,0,0,1],
					 [1,0,0,0,1,0,1,0,0,0,1,0,0,0],
					 [0,0,0,0,1,0,0,1,1,0,0,0,1,0],
					 [0,0,0,0,0,1,1,1,0,0,0,0,0,1],
					 [0,1,1,0,0,0,0,0,0,0,1,0,1,0],
					 [0,0,0,1,0,0,0,0,1,0,0,0,0,0],
					 [1,1,0,1,0,0,0,1,0,0,0,0,0,0],
					 [0,0,1,1,0,0,1,0,1,0,0,0,0,0],
					 [0,0,1,0,0,1,0,1,0,0,0,0,1,0],
					 [1,0,0,0,0,0,0,0,0,0,1,0,0,0],
					 [0,1,0,0,1,0,0,0,0,1,0,1,0,0],
					 [0,0,0,0,0,0,0,0,0,0,1,0,1,0],
					 [0,0,1,0,1,0,0,0,1,0,0,1,0,0],
					 [1,0,0,1,0,0,0,0,0,0,0,0,0,0]];
var pos_stop = [434,58,317,108,387,202,659,147,152,175,628,329,
412,116,439,207,501,412,320,66,145,48,47,154,107,307,510,66];

document.write("<img src='peteypattern.png' style='position:absolute;left:" + "0" + "px;top:" + "0" + "px;' name='screen'>");
document.write("<img src='bosupakkun.png' width='47' height='57' style='position:absolute;left:" + "414" + "px;top:" + "10" + "px;' name='bosupakkun'>");
document.write("<div id='path' style='position:absolute;left:" + 0 + "px;top:" + 545 + "px;font-size:20px;color:rgb(0,0,0);'>" + peteypath1 + "</div>");
document.write("<div id='text1' style='position:absolute;left:" + 0 + "px;top:" + 605 + "px;font-size:34px;color:rgb(0,0,0);'><b><font size='4'>順位</font></b></div>");
document.write("<div id='text2' style='position:absolute;left:" + 200 + "px;top:" + 605 + "px;font-size:34px;color:rgb(0,0,0);'><b><font size='4'>デレ度</font></b></div>");
document.write("<div id='text3' style='position:absolute;left:" + 370 + "px;top:" + 540 + "px;font-size:34px;color:rgb(0,0,0);'><b>最速<font size='3'> と比べて</font></b></div>");
document.write("<div id='text4' style='position:absolute;left:" + 370 + "px;top:" + 585 + "px;font-size:34px;color:rgb(0,0,0);'><b>平均<font size='3'> と比べて</font></b></div>");
document.write("<div id='text5' style='position:absolute;left:" + 370 + "px;top:" + 630 + "px;font-size:34px;color:rgb(0,0,0);'><b>最遅<font size='3'> と比べて</font></b></div>");
document.write("<div id='rank' style='position:absolute;right:" + 535 + "px;top:" + 630 + "px;font-size:34px;color:rgb(0,0,0);'><b>???/774<font size='3'> 位</font></b></div>");
document.write("<div id='luck' style='position:absolute;right:" + 365 + "px;top:" + 630 + "px;font-size:34px;color:rgb(0,0,0);'><b>???.??<font size='3'> %</font></b></div>");
document.write("<div id='time1' style='position:absolute;right:" + 10 + "px;top:" + 540 + "px;font-size:34px;color:rgb(0,0,0);'><b>+ ??.???<font size='3'> 秒</font></b></div>");
document.write("<div id='time2' style='position:absolute;right:" + 10 + "px;top:" + 585 + "px;font-size:34px;color:rgb(0,0,0);'><b>+ ??.???<font size='3'> 秒</font></b></div>");
document.write("<div id='time3' style='position:absolute;right:" + 10 + "px;top:" + 630 + "px;font-size:34px;color:rgb(0,0,0);'><b>+ ??.???<font size='3'> 秒</font></b></div>");
//document.write("<div id='test' style='position:absolute;left:" + "0" + "px;top:" + "0" + "px;font-size:20px;color:rgb(255,255,255);'>" + patterns[2][2] + ", " + "0" + "</div>");

var bw = 0;//　ブラウザチェック
if (document.getElementById) {bw = 1; }// ネスケ６～　IE５～なら真
if ((document.all) && (bw == 1)) {bw = 2; }//　IE４～なら真

//　イベントの設定
if (bw == 2) //　ＩＥの場合
{
   document.onmousedown = msDown;//　ボタンが押されたら･･･
   document.onmousemove = msMove;//　マウスが動いたら･･･
} else {//　ネスケの場合
   window.captureEvents(Event.mousedown);//　ボタンが押されたら･･･
   document.onmousedown = msDown;
   window.captureEvents(Event.mousemove);//　マウスが動いたら･･･
   document.onmousemove = msMove;
}

function msDown(e)
{
   if (bw == 2)//　ＩＥの場合
   {
		mx = document.body.scrollLeft+event.clientX;//　マウスの座標を取得
   	my = document.body.scrollTop+event.clientY;
   } else {//　ネスケの場合
		mx = e.pageX;//　マウスの座標を取得
   	my = e.pageY;
   }
	for(var i=0;i<14;i++)
	{
		dx = mx - pos_stop[i*2];
		dy = my - pos_stop[i*2+1];
		if (dx*dx+dy*dy<900)
		{
			if((i==1&&dy>-21)||(i==9&&dy<21)||(i!=1&&i!=9))
			{
				if(adjacency[nowi][i]==1 && i!=previ)
				{
					document.bosupakkun.style.left = (pos_stop[i*2]-20) + "px";
					document.bosupakkun.style.top  = 	(pos_stop[i*2+1]-48) + "px";
					if(i<6)
					{
						peteypath1 += "→N" + (i+1);
						peteypath2 += " N" + (i+1);
					} else {
						peteypath1 += "→S" + (i-5);
						peteypath2 += " S" + (i-5);
						scount += 1;
					}
					if(nscount==7){
						peteypath1 += "<br>";
					}
					document.getElementById("path").innerHTML = peteypath1;
					nscount += 1;
					previ = nowi;
					nowi = i;
					
					if(scount==3){
						showResult();	
					}
				}
			}
		}
	}
	//document.getElementById("test").innerHTML = "x:" + dx + ", y:" + dy;
}

function msMove(e)
{
	
}

function getCSV(url){
  //CSVファイルを文字列で取得。
  var txt = new XMLHttpRequest();
  txt.open('get', url, false);
  txt.send();

  //改行ごとに配列化
  var arr = txt.responseText.split('\n');

  //1次元配列を2次元配列に変換
  var res = [];
  for(var i = 0; i < arr.length; i++){
    //空白行が出てきた時点で終了
    if(arr[i] == '') break;

    //","ごとに配列化
    res[i] = arr[i].split(',');

    /*for(var i2 = 0; i2 < res[i].length; i2++){
      //数字の場合は「"」を削除
      if(res[i][i2].match(/\-?\d+(.\d+)?(e[\+\-]d+)?/)){
        res[i][i2] = parseFloat(res[i][i2].replace('"', ''));
      }
    }*/
  }

  return res;
}

function showResult(){
	idx = patterns.findIndex(function(value,index){return value[1]==peteypath2;});
	col = patterns[idx];
	console.log(col);
	var rank = col[0];
	var time1 = timeFormat(col[3]);
	var time2 = timeFormat(col[4]);
	var time3 = timeFormat(col[5]);
	console.log(1-(col[7]-col[8]));
	var luck = ((1-(col[7]-col[8]))*100).toFixed(2);
	document.getElementById("rank").innerHTML = "<b>" + rank + "/774<font size='3'> 位</font></b>";
	document.getElementById("luck").innerHTML = "<b>" + luck + "<font size='3'> %</font></b>"
	document.getElementById("time1").innerHTML = "<b>" + time1 + "<font size='3'> 秒</font></b>";
	document.getElementById("time2").innerHTML = "<b>" + time2 + "<font size='3'> 秒</font></b>";
	document.getElementById("time3").innerHTML = "<b>" + time3 + "<font size='3'> 秒</font></b>";
}

function timeFormat(num){
	num = num/1000;
	if(num>=10){str = "+ " + num.toFixed(3);}
	else if(num>0) {str = "+ 0" + num.toFixed(3);}
	else if(num==0) {str = "± 0" + num.toFixed(3);}
	else if(num>-10) {str = "- 0" + (-num).toFixed(3);}
	else {str = "- " + (-num).toFixed(3);}
	return str;
}