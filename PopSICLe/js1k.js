	a.style.display = "none";
	b.innerHTML+="<br><textarea rows=15 cols=50 id=x>Size 512 512\n" +
	"Color teal\n" +
	"RectF 0 0 512 512\n" +
	"Color beige\n" +
	"RectF 100 150 300 200\n" +
	"LinGrad 0 0 512 0\n" +
	"Color blue\n" +
	"ColStop 0\n" +
	"Color white\n" +
	"ColStop 100\n" +
	"RectF 100 150 300 20\n" +
	"Color Red\n" +
	"ArcF 390 160 7 0 360\n" +
	"Color gold\n" +
	"ArcF 370 160 7 0 360\n" +
	"</textarea><br><br></textarea><img id=i border=1>";
	r=()=>{
		cs=[];
		c.clearRect(0,0,c.width,c.height);
		x.value.split("\n").forEach(e=>{
			l=e.split(" ");
			c.fillStyle=c.strokeStyle=cs[cs.length-1];
			switch(l[0]){
				case "Size":
				c.width=c.canvas.width=l[1];
				c.height=c.canvas.height=l[2];
				break;
				case "Alpha":
				c.globalAlpha=Number(l[1])/100;
				break;
				case "Color":
				l.shift();
				cs.push(l.join(" "));
				break;
				case "RectF":
				c.fillRect(l[1],l[2],l[3],l[4]);
				break;
				case "RectS":
				c.strokeRect(l[1],l[2],l[3],l[4]);
				break;
				case "RectC":
				c.clearRect(l[1],l[2],l[3],l[4]);
				break;
				case "LinGrad":
				cs.push(c.createLinearGradient(l[1],l[2],l[3],l[4]));
				break;
				case "RadGrad":
				cs.push(c.createRadialGradient(l[1],l[2],l[3],l[4],l[5],l[6]));
				break;
				case "ColStop":
				cs[cs.length-2].addColorStop(Number(l[1])/100,cs[cs.length-1]);
				cs.pop();
				break;
				case "Font":
				l.shift();
				c.font=l.join(" ");
				break;
				case "TextF":
				case "TextS":
				m=l.shift();
				tx=l.shift();
				ty=l.shift();
				if(m=="TextF")
				c.fillText(l.join(" "),tx,ty);
				else
				c.strokeText(l.join(" "),tx,ty);
				break;
				case "LineWidth":
				c.lineWidth=Number(l[1]);
				break;
				case "Line":
				c.beginPath();
				c.moveTo(l[1],l[2]);
				c.lineTo(l[3],l[4]);
				c.stroke();
				break;
				case "ArcF":
				case "ArcS":
				c.beginPath();
				c.arc(l[1],l[2],l[3],Number(l[4])/180*Math.PI,Number(l[5])/180*Math.PI);
				if(l[0]=="ArcF")
				c.fill();
				else
				c.stroke();
				break;
				case "PopC":
				cs.pop();
				break;
			}
		});
		i.src=c.canvas.toDataURL();
	}
	r();
	x.oninput=r;