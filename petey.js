var peteypath1 = "N1";
var peteypath2 = "N1";
var nscount = 1;
var scount = 0;
var nowi = 0;
var previ = 0;
var lang = "ja";
var col = [];
var mx, my, dx, dy;
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

document.write("<img src='peteypattern.png' style='position:absolute;left:" + "0" + "px;top:" + "0" + "px;' name='screen' id='peteypattern'>");
document.write("<img src='bosupakkun.png' width='47' height='57' style='position:absolute;left:" + "414" + "px;top:" + "10" + "px;' name='bosupakkun'>");
document.write("<img src='reset.png' width='100' style='position:absolute;left:" + "610" + "px;top:" + "490" + "px;' name='reset'>");
document.write("<img src='english.png' width='100' style='position:absolute;left:" + "610" + "px;top:" + "450" + "px;' name='english' id='english'>");
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
document.write("<div id='tweet' style='position:absolute;left:" + 10 + "px;top:" + 700 + "px;font-size:20px;color:rgb(0,0,0);'></div>");
document.write("<div id='howtouse' style='position:absolute;left:" + 0 + "px;top:" + 740 + "px;font-size:16px;color:rgb(0,0,0);'><b>使い方</b><br>ボスパックンが通った丸をクリックしてください。<br>青い丸を合計3回クリックすると、結果が表示されます。<br>デレ度は、そのルート以上に時間がかかるルートになる確率で計算しています。<br><font size='3'>(3番目に速いルートの場合、デレ度=3番目の確率+4番目の確率+...+774番目の確率)</font><br><br>クリックのかわりに、キーボードでも操作できます。<br>N1 ~ N6 : a ~ f キー または Shift + 1 ~ 6 キー<br>S1 ~ S8 : 1 ~ 8 キー<br><br>If you want to change the language, click [English] button.</div>");



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
document.onkeydown = keyDown;

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
	if (mx>610&&mx<710&&my>445&&my<485) //  言語ボタン
	{
		chgLang();
	}
	if (mx>610&&mx<710&&my>485&&my<525) //  リセット
	{
		reset();
	}
	for(var i=0;i<14;i++) //  ノードをクリック
	{
		dx = mx - pos_stop[i*2];
		dy = my - pos_stop[i*2+1];
		if (dx*dx+dy*dy<900)
		{
			if((i==1&&dy>-21)||(i==9&&dy<21)||(i!=1&&i!=9))
			{
				peteyMove(i);
			}
		}
	}
	//document.getElementById("test").innerHTML = "x:" + mx + ", y:" + my;
}

function msMove(e)
{
	
}

function keyDown(e)
{
	if(e.key=='a'){peteyMove(0);}
	if(e.key=='b'){peteyMove(1);}
	if(e.key=='c'){peteyMove(2);}
	if(e.key=='d'){peteyMove(3);}
	if(e.key=='e'){peteyMove(4);}
	if(e.key=='f'){peteyMove(5);}
	if(e.shiftKey){
		console.log(e.keyCode);
		if (e.keyCode==49||e.keyCode==50||e.keyCode==51||e.keyCode==52||e.keyCode==53||e.keyCode==54)
		{
			peteyMove(Number(e.keyCode)-49);
		}
	} else {
		if (e.key==1||e.key==2||e.key==3||e.key==4||e.key==5||e.key==6||e.key==7||e.key==8)
		{
			peteyMove(Number(e.key)+5);
		}
	}
	
	if(e.key=='r'){reset();}
}

function peteyMove(i)
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
			if ((i==8&&nowi==12)||(i==12&&nowi==8)){
				peteypath1 += "→S" + (i-5);
				peteypath2 += " N7 S" + (i-5);
			} else{
				peteypath1 += "→S" + (i-5);
				peteypath2 += " S" + (i-5);	
			}
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
	var rank = col[0];
	var time1 = timeFormat(col[3]);
	var time2 = timeFormat(col[4]);
	var time3 = timeFormat(col[3]-58958);
	var luck = ((1-(col[7]-col[8]))*100).toFixed(2);
	if (lang=="ja")
	{
		document.getElementById("rank").innerHTML = "<b>" + rank + "/774<font size='3'> 位</font></b>";
		document.getElementById("luck").innerHTML = "<b>" + luck + "<font size='3'> %</font></b>";
		document.getElementById("time1").innerHTML = "<b>" + time1 + "<font size='3'> 秒</font></b>";
		document.getElementById("time2").innerHTML = "<b>" + time2 + "<font size='3'> 秒</font></b>";
		document.getElementById("time3").innerHTML = "<b>" + time3 + "<font size='3'> 秒</font></b>";
		document.getElementById("tweet").innerHTML = "<a href='https://twitter.com/intent/tweet?text=私はボスパックンで" + (col[3]/1000).toFixed(3) + "秒ロスしました。(" + rank + "/774位)&url=https://naosanpoyo.github.io/PeteyPattern/&hashtags=ボスパックンデレ度チェッカー' rel='nofollow' onClick='window.open(encodeURI(decodeURI(this.href)),'twwindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1'); return false;'>結果をツイート</a>";
	} else {
		document.getElementById("rank").innerHTML = "<b>" + rank + "/774</b>";
		document.getElementById("luck").innerHTML = "<b>" + luck + "<font size='3'> %</font></b>";
		document.getElementById("time1").innerHTML = "<b>" + time1 + "<font size='3'> s</font></b>";
		document.getElementById("time2").innerHTML = "<b>" + time2 + "<font size='3'> s</font></b>";
		document.getElementById("time3").innerHTML = "<b>" + time3 + "<font size='3'> s</font></b>";
		document.getElementById("tweet").innerHTML = "<a href='https://twitter.com/intent/tweet?text=I wasted " + (col[3]/1000).toFixed(3) + " seconds because of Petey Piranha. (Ranking " + rank + "/774)&url=https://naosanpoyo.github.io/PeteyPattern/&hashtags=PeteyPatternChecker' rel='nofollow' onClick='window.open(encodeURI(decodeURI(this.href)),'twwindow','width=550, height=450, personalbar=0, toolbar=0, scrollbars=1'); return false;'>Tweet the results</a>";
	}
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

function chgLang(){
	if(lang=="ja")
	{
		lang = "en";
		document.getElementById("peteypattern").src="peteypatternen.png";
		document.getElementById("english").src="japanese.png";
		document.getElementById("text1").innerHTML = 
		"<b><font size='4'>Ranking</font></b>";
		document.getElementById("text2").innerHTML = 
		"<b><font size='4'>Luck</font></b>";
		document.getElementById("text3").innerHTML = "<b><font size='1'>Compared to </font><font size='4'>Fastest</font></b>";
		document.getElementById("text4").innerHTML = "<b><font size='1'>Compared to </font><font size='4'>Average</font></b>";
		document.getElementById("text5").innerHTML = "<b><font size='1'>Compared to </font><font size='4'>Slowest</font></b>";
		document.getElementById("rank").innerHTML = (document.getElementById("rank").innerHTML).slice(0,-28) + "</b>";
		document.getElementById("time1").innerHTML = (document.getElementById("time1").innerHTML).slice(0,-12) + "s</font></b>";
		document.getElementById("time2").innerHTML = (document.getElementById("time2").innerHTML).slice(0,-12) + "s</font></b>";
		document.getElementById("time3").innerHTML = (document.getElementById("time3").innerHTML).slice(0,-12) + "s</font></b>";
		document.getElementById("howtouse").innerHTML =
		"<b>How to use</b><br>Click the nodes which Petey Piranha passed.<br>After clicking the blue nodes three times, the result will be displayed.<br>Luck is the probability that time will be longer or equal to this pattern.<br><font size='3'>(In the case of the 3rd fastest pattern, Luck = 3rd + 4th + ... + 774th)</font><br><br>Instead of clicking, you can use your keyboard.<br>N1 ~ N6 : a ~ f key or Shift + 1 ~ 6 key<br>S1 ~ S8 : 1 ~ 8 key<br><br>言語を変えたい場合は、[日本語]ボタンを押してください。";
	} else {
		lang = "ja";
		document.getElementById("peteypattern").src="peteypattern.png";
		document.getElementById("english").src="english.png";
		document.getElementById("text1").innerHTML = 
		"<b><font size='4'>順位</font></b>";
		document.getElementById("text2").innerHTML = 
		"<b><font size='4'>デレ度</font></b>";
		document.getElementById("text3").innerHTML = "<b>最速<font size='3'> と比べて</font></b>";
		document.getElementById("text4").innerHTML = "<b>平均<font size='3'> と比べて</font></b>";
		document.getElementById("text5").innerHTML = "<b>最遅<font size='3'> と比べて</font></b>";
		document.getElementById("rank").innerHTML = (document.getElementById("rank").innerHTML).slice(0,-4) + "<font size='3'> 位</font></b>";
		document.getElementById("time1").innerHTML = (document.getElementById("time1").innerHTML).slice(0,-12) + "秒</font></b>";
		document.getElementById("time2").innerHTML = (document.getElementById("time2").innerHTML).slice(0,-12) + "秒</font></b>";
		document.getElementById("time3").innerHTML = (document.getElementById("time3").innerHTML).slice(0,-12) + "秒</font></b>";
		document.getElementById("howtouse").innerHTML =
		"<b>使い方</b><br>ボスパックンが通った丸をクリックしてください。<br>青い丸を合計3回クリックすると、結果が表示されます。<br>デレ度は、そのルート以上に時間がかかるルートになる確率で計算しています。<br><font size='3'>(3番目に速いルートの場合、デレ度=3番目の確率+4番目の確率+...+774番目の確率)</font><br><br>クリックのかわりに、キーボードでも操作できます。<br>N1 ~ N6 : a ~ f キー または Shift + 1 ~ 6 キー<br>S1 ~ S8 : 1 ~ 8 キー<br><br>If you want to change the language, click [English] button.";
	}
}

function reset(){
	peteypath1 = "N1";
	peteypath2 = "N1";
	nscount = 1;
	scount = 0;
	nowi = 0;
	previ = 0;
	document.bosupakkun.style.left = "414px";
	document.bosupakkun.style.top  = "10px";
	if (lang=="ja")
	{
		document.getElementById("path").innerHTML = "N1";
		document.getElementById("rank").innerHTML = "<b>???/774<font size='3'> 位</font></b>";
		document.getElementById("luck").innerHTML = "<b>???.??<font size='3'> %</font></b>";
		document.getElementById("time1").innerHTML = "<b>+ ??.???<font size='3'> 秒</font></b>";
		document.getElementById("time2").innerHTML = "<b>+ ??.???<font size='3'> 秒</font></b>";
		document.getElementById("time3").innerHTML = "<b>+ ??.???<font size='3'> 秒</font></b>";
	} else{
		document.getElementById("path").innerHTML = "N1";
		document.getElementById("rank").innerHTML = "<b>???/774</b>";
		document.getElementById("luck").innerHTML = "<b>???.??<font size='3'> %</font></b>";
		document.getElementById("time1").innerHTML = "<b>+ ??.???<font size='3'> s</font></b>";
		document.getElementById("time2").innerHTML = "<b>+ ??.???<font size='3'> s</font></b>";
		document.getElementById("time3").innerHTML = "<b>+ ??.???<font size='3'> s</font></b>";
	}
	
}