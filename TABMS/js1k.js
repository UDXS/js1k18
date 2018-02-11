b.innerHTML +=
	"<p id=m>200</p><canvas width=500 height=200 id=k></canvas><br><b>Stability: </b><input type=range min=0 max=100 value=50 id=s><br><b>Positivity: </b><input type=range min=0 max=100 value=50 id=p><br><b>Volatility: </b><input type=range min=0 max=100 value=50 id=v>";
c = k.getContext("2d");
y = 0; //current position on graph
v = 10; //value
c.lineWidth = 2;
c.beginPath();
c.moveTo(0, k.height);
q = 0;
r = k.height;
setInterval(() => {
	n = 0;
	if (Math.random() * 100 < s.value) {
		if (Math.random() * 100 < p.value)
			n = Math.random() * 100;
	} else
		n = Math.random() * -100;
	if (Math.random() * 100 < v.value)
		n *= Math.random() * (50 + Math.random() * 50);
	if (v + n > v)
		c.strokeStyle = "green";
	else if (v + n < v)
		c.strokeStyle = "red";
	else
		c.strokeStyle = "black";
	v += n;
	if (v < 0)
		v = Math.random() * 100;
	if (v > k.height || v < k.height / 1000) {
		c.beginPath();
		k.height = m.innerHTML = Math.round(v * 1.25);
		r = a.height - v;
	}
	y += 10;
	if (y > k.width) {
		y = 0;
		c.moveTo(0, k.height - v);
		c.beginPath();
		q = 0;
		r = k.height - v;
	}
	c.clearRect(y - 5, 0, 10, k.height);
	c.beginPath();
	c.lineWidth = 2;
	c.moveTo(q, r);
	c.lineTo(y, k.height - v);
	q = y;
	r = k.height - v;
	c.stroke();
}, 100);