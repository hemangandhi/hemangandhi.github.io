//credits: http://thecodeplayer.com/walkthrough/matrix-rain-animation-html5-canvas-javascript
var c = document.getElementById("mat-text-canvas");
var ctx = c.getContext("2d");

//making the canvas full screen
c.height = window.outerHeight;
c.width = 500 * document.getElementsByClassName("content").length;

//katakana characters - taken from the unicode charset
var meaningfuls = ["\u79c1\u306f\u30d8\u30de\u30f3\u30ac\u30f3\u30b8 ", //watashi wa heman ganji
                   "\u65e5\u672c\u8a9e\u308f\u304b\u308a\u307e\u3059 ", //nihongo wakarimasu
                   "\u30af\u30ed\u30b8\u30e3\u30d7\u30ed\u30b0\u30e9\u30df\u30cc\u30b0\u8a00\u8a9e\u306f\u5927\u597d ",
                   //kurojya puroguraminugu gengo wa daisuki
                   "Bienvenido \u00e1 mi curriculum interactivo ", //accented a...
                   "Aprend\u00ed espa\u00f1ol en la preparatoria ", //accented i and n-yeh.
                   "\u306f\u3058\u3081\u3066\u3001\u3088\u308d\u3057\u304f\u304a\u306d\u304c\u3044\u3057\u307e\u3059 ",
                   //hajimete, yoroshiku onegaishimasu
                   "\u30e9\u30c8\u30ac\u30b9\u306b\u30bd\u30d5\u30e2\u3067\u3059 ", //ratogasu ni sofumo desu
                   "Gracias para leer eso. ",
                   "\u4f55\u3067\u3053\u308c\u3092\u8aad\u307f\u307e\u3059\u304b? ", //nande kore wo yomimasuka?
                   ":(){ :|: & };: ", //fork bomb
                   "\u82f1\u8a9e\u3082\u308f\u304b\u308a\u307e\u3059 ", //eigo mo wakarimasu
                   "La vida esta loca ",
                   "\u56f2\u7881\u3082\u5927\u597d ", //igo mo daisuki
];

var randInd = function(arr){
    return Math.floor(Math.random() * arr.length);
}

var font_size = 10;
var columns = c.width/font_size; //number of columns for the rain
//an array of drops - one per column
var drops = [];
//x below is the x coordinate
//1 = y co-ordinate of the drop(same for every drop initially)
for(var x = 0; x < columns; x++){
    var mInd = randInd(meaningfuls);
	drops[x] = [1, mInd, randInd(meaningfuls[mInd])];
}

//drawing the characters
function draw(){
	//Black BG for the canvas
	//translucent BG to show trail
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, c.width, c.height);
	
	ctx.fillStyle = "rgba(0, 256, 0, 0.4)"; //green text
	ctx.font = font_size + "px arial";
	//looping over drops
	for(var i = 0; i < drops.length; i++)
	{
		//a random chinese character to print
        var charInd = (drops[i][0] + drops[i][2]) % meaningfuls[drops[i][1]].length;
		var text = meaningfuls[drops[i][1]][charInd];
		//x = i*font_size, y = value of drops[i]*font_size
		ctx.fillText(text, i*font_size, drops[i][0]*font_size);
		
		//sending the drop back to the top randomly after it has crossed the screen
		//adding a randomness to the reset to make the drops scattered on the Y axis
		if(drops[i][0]*font_size > c.height && Math.random() > 0.9){
            var mInd = randInd(meaningfuls);
			drops[i] = [0, mInd, randInd(meaningfuls[mInd])];
        }
		
		//incrementing Y coordinate
		drops[i][0]++;
	}
}

setInterval(draw, 150);
