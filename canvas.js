var doc=document;
var canvas=doc.getElementById("drawingCanvas");
var context=canvas.getContext("2d");
	var lastImg=null;
	var isDrawing=false;
var buttons=doc.getElementsByTagName('Button');

	startDrawing();
	// 保存
// alert(buttons.length);
//保存1
buttons[0].onclick=function(){
	changeColor('red',this);
}
buttons[1].onclick=function(){
	changeColor('green',this);
}
buttons[2].onclick=function(){
	changeColor('blue',this);
}
buttons[3].onclick=function(){
	changeThickness('10',this);
}
buttons[4].onclick=function(){
	changeThickness('20',this);
}
buttons[5].onclick=function(){
	changeThickness('30',this);
}
buttons[6].onclick=function(){
	straightLine();
}
buttons[7].onclick=function(){
	PaintRect();
}
buttons[8].onclick=function(){
	startDrawing();
}
buttons[9].onclick=function(){
	res();
}
buttons[10].onclick=function(){
	clearCanvas();
}
buttons[11].onclick=function(){
	//将当前窗口置换成该URL，回去后自动刷新canvas页面
	// window.location=canvas.toDataURL();
	//新建窗口打开页面：
	window.open(canvas.toDataURL());
}
//保存2
buttons[12].onclick=function(){
	//找到img元素
	var imageCopy=doc.getElementById("savedImageCopy");
	//在图像中显示画布数据
	imageCopy.src=canvas.toDataURL();
	//显示包含img元素的div,以便将图像显示出来
	var imageContainer=doc.getElementById("savedCopyContainer");
	imageContainer.style.display="block";
}



	//直线
	function straightLine(){
		canvas.onmousedown=function (ev) {
		var oldX,oldY,newX,newY;
		o=new Object();
       	lastImg = context.getImageData(0,0,canvas.width,canvas.height);
        //每次 画之前。应该开启新的路径
        context.beginPath();
        //鼠标按下的位置
        oldX = ev.offsetX;
        oldY = ev.offsetY;   
        //让画笔移到鼠标按下的位置
        context.moveTo(oldX,oldY);
 
        document.onmousemove=function (ev) {
	           	//鼠标所在的位置
	            newX=ev.offsetX
	            newY=ev.offsetY
	       
	            context.lineTo(ev.offsetX,ev.offsetY);
            context.stroke();    
        };
        document.onmouseup=function () {
            document.onmousemove=null;
            document.onmouseup =null;
            res();
            context.beginPath();
            context.moveTo(oldX,oldY);
            context.lineTo(newX,newY);
            context.stroke();
        }
	 	};
	}
	//矩形:只能根据对角线画出
	function PaintRect(){
		canvas.onmousedown=function (ev) {
		var oldX,oldY,newX,newY;
		o=new Object();
       	lastImg = context.getImageData(0,0,canvas.width,canvas.height);
        //每次 画之前。应该开启新的路径
        context.beginPath();
        //鼠标按下的位置
        oldX = ev.offsetX;
        oldY = ev.offsetY;   
        //让画笔移到鼠标按下的位置
        context.moveTo(oldX,oldY);
 
        document.onmousemove=function (ev) {
           	//鼠标所在的位置
            newX=ev.offsetX
            newY=ev.offsetY
            context.lineTo(ev.offsetX,ev.offsetY);
            context.stroke();    
        };
        document.onmouseup=function () {
            document.onmousemove=null;
            document.onmouseup =null;
            res();
            context.beginPath();
          	context.strokeRect(oldX,oldY,newX-oldX,newY-oldY);
            context.stroke();
        }
	 	};
	 }
	//画画
	function startDrawing(){
  	canvas.onmousedown=function (ev) {
		var oldX,oldY,newX,newY;
		o=new Object();
       	lastImg = context.getImageData(0,0,canvas.width,canvas.height);
        //每次 画之前。应该开启新的路径
        context.beginPath();
        //鼠标按下的位置
        oldX = ev.offsetX;
        oldY = ev.offsetY;   
        //让画笔移到鼠标按下的位置
        context.moveTo(oldX,oldY);
 
        document.onmousemove=function (ev) {
	           	//鼠标所在的位置
	            newX=ev.offsetX
	            newY=ev.offsetY
	       
	            context.lineTo(ev.offsetX,ev.offsetY);
            context.stroke();    
        };
        document.onmouseup=function () {
            document.onmousemove=null;
            document.onmouseup =null;     
        }
   	 	};
   	 }
	//撤回
function res(){
	context.putImageData(lastImg,  0,  0);
}
//清除
function clearCanvas(){
	context.clearRect(0,0,canvas.width,canvas.height);
}
//颜色：记录此前为选择颜色如图被单击的div
var previousColorElement;
function changeColor(color,Element){
	//重新设置当前绘图要使用的颜色
	context.strokeStyle=color;
	//为刚被点击的元素应用上新样式
	Element.className="selected";
	//恢复上一次点击的样式
	if(previousColorElement!=null) previousColorElement.className="";
	previousColorElement=Element;
}
// 粗细：记录此前选择的
var previousThicknessElement;
function changeThickness(thickness,Element){
	context.lineWidth=thickness;
	Element.className="selected";
	if(previousThicknessElement!=null) previousThicknessElement.className="";
	previousThicknessElement=Element;
}