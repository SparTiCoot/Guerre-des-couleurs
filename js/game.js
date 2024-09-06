let cnv = document.getElementById('myCanvas');
let ctx = cnv.getContext('2d');
ctx.imageSmoothingEnabled= false;

import Joueur from "./joueur.js";
import {Pion, Guerrier, Demon, Skull, Roi, Chateau} from "./pion.js";

//-------------Variable global du jeu-------------//
const width = cnv.width;
const height = cnv.height;
var end = false;
var tour = 0;
var action = 3;
let pion_actuel = null;
let mode = "";
let x = 0;
let y = 0;
let slidex,slidey;
let move_act = false; 
let plateau = [
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""],
	["","","","","","","","","",""]
];

var cas = [];
var auto_map = [];
let herbe = new Image();
herbe.src = "../assets/map/grass.png";
//--------------------------//



//-------------Fonction lier a la map-------------//
function verify_presence(){
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if (j2.pionPos(j*100,i*100) != false || i == 9 && j == 9 ) {
				if(i != 9 && j != 9){
					plateau[i][j] = j2.pionPos(j*100,i*100);
					console.log	
				}
				
				
			}else if(j1.pionPos(j*100,i*100) != false || i == 0 && j == 0) {
				if(i != 0 && j != 0){
					plateau[i][j] = j1.pionPos(j*100,i*100);
				}
				
			}else{
				plateau[i][j] = "";
			}
		}
	}
}
function remplir_map(){
	for (var i = 0; i < 100; i++) {
		auto_map[i] = [Math.floor(Math.random()*4),Math.floor(Math.random()*4)];
	}
}
function create_map(){
	let index = 0;
	for (var i = 0; i < 10; i++) {
		cas[i] = []; 
		for (var j = 0; j < 10; j++) {
			ctx.beginPath();
			cas[i][j] = new Path2D();
			cas[i][j].rect(j*100,i*100,100,100);
			ctx.strokeStyle = "black";
			ctx.stroke(cas[i][j]);
			ctx.closePath();
			ctx.beginPath();
			ctx.drawImage(herbe,64*auto_map[index][0],64*auto_map[index][1],64,64,j*100,i*100,100,100);
			ctx.closePath();
			index++;
		}
	}
}
function estVide(x,y) {
	if(y> 10){return;}
	if(plateau[y][x]==""){return true;}
	return false;
}

function survol(cas){
	ctx.beginPath();
	ctx.rect(1250,350,500,300);
	ctx.stroke();
	ctx.closePath();
	if(y <1000 && x<1000){
		let xx = Math.floor(x/100);
		let yy = Math.floor(y/100);
		if(ctx.isPointInPath(cas[yy][xx],x,y)){
			ctx.beginPath();
			ctx.fillStyle = "red";
			ctx.fill(cas[yy][xx]);
			ctx.closePath();
		}

		if(j1.pionPos(xx*100,yy*100) != false){
			let pion = j1.pionPos(xx*100,yy*100);
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = j1.color;
			ctx.font = "bold 22px Comic Sans MS";
			ctx.fillText("Pv: "+pion.pv,1500,510);
			ctx.fillText("Pm: "+pion.pm,1500,540);
			ctx.fillText("Dgt: "+pion.dgt,1500,570);
			ctx.closePath();
		}
		
		if(j2.pionPos(xx*100,yy*100) != false){
			let pion = j2.pionPos(xx*100,yy*100);
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = j2.color;
			ctx.font = "bold 22px Comic Sans MS";
			ctx.fillText("Pv: "+pion.pv,1500,510);
			ctx.fillText("Pm: "+pion.pm,1500,540);
			ctx.fillText("Dgt: "+pion.dgt,1500,570);
			ctx.closePath();
		}
	}
	
}
//--------------------------//

//-------------Fonction lier aux Pions-------------//
function create_pion(joueur) {
	cnv.addEventListener('click', (e) => {
		let xx = Math.floor(x);
		let yy = Math.floor(y);
		joueur = j_turn(j1,j2);
		for (var i = 0; i < buttons.length; i++) {
			if(ctx.isPointInPath(buttons[i],xx,yy) && mode=="I"){
				let pion;
				if (Chateau_invoc(joueur) == false) { return;}
				var tab = Chateau_invoc(joueur);
				switch (i){
					case 0:
						pion = new Skull(tab[1]*100,tab[0]*100);
						if (joueur.or < pion.prix) {
							ctx.beginPath();
							ctx.textAlign = "center";
							ctx.fillStyle = "red";
							ctx.font = "bold 24px serif";
							ctx.fillText("Gold Insuffisant",1500,490);	
							ctx.closePath();
							mode = "";
							break;
						}
						joueur.addPion(pion);
						plateau[tab[0]][tab[1]] = pion;
						mode = "";
						action = action -1;
						joueur.or = joueur.or - pion.prix;
						console.log(mode);
						break;
					case 1:
						pion = new Guerrier(tab[1]*100,tab[0]*100);
						if (joueur.or < pion.prix) {
							ctx.beginPath();
							ctx.textAlign = "center";
							ctx.fillStyle = "red";
							ctx.font = "bold 24px serif";
							ctx.fillText("Gold Insuffisant",1500,490);	
							ctx.closePath();
							mode = "";
							break;
						}
						joueur.addPion(pion);
						plateau[tab[0]][tab[1]] = pion;
						mode = "";
						action = action -1;
						joueur.or = joueur.or - pion.prix;
						console.log(mode);
						break;
					case 2:
						pion = new Roi(tab[1]*100,tab[0]*100);
						if (joueur.or < pion.prix) {
							ctx.beginPath();
							ctx.textAlign = "center";
							ctx.fillStyle = "red";
							ctx.font = "bold 24px serif";
							ctx.fillText("Gold Insuffisant",1500,490);	
							ctx.closePath();
							mode = "";
							break;
						}
						joueur.addPion(pion);
						plateau[tab[0]][tab[1]] = pion;
						mode = "";
						action = action -1;
						joueur.or = joueur.or - pion.prix;
						console.log(mode);
						break;
					case 3:
						pion = new Demon(tab[1]*100,tab[0]*100);
						if (joueur.or < pion.prix) {
							ctx.beginPath();
							ctx.textAlign = "center";
							ctx.fillStyle = "red";
							ctx.font = "bold 24px serif";
							ctx.fillText("Gold Insuffisant",1500,490);	
							ctx.closePath();
							mode = "";
							break;
						}
						joueur.addPion(pion);
						plateau[tab[0]][tab[1]] = pion;
						mode = "";
						action = action -1;
						joueur.or = joueur.or - pion.prix;
						console.log(mode);
						break;
					default:
						break;
				}
			}		
		}		
	});					
}

function choix(joueur) {
	cnv.addEventListener('click', (e) => {
		if(mode == "C"){
			let xx = Math.floor(x/100)*100;
			let yy = Math.floor(y/100)*100;
			let pion = joueur.pionPos(xx,yy);
			if(pion != false){
				joueur.getPion(pion);
				mode = "";
			}
		}
	});
}

function move(joueur) {
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if (Math.abs(j - joueur.pionac.x/100) + Math.abs(i - joueur.pionac.y/100) <= joueur.pionac.pm
				&& estVide(j,i)){
				ctx.beginPath();
				ctx.strokeStyle = "red";
				ctx.stroke(cas[i][j]);
				ctx.closePath();
			}
		}
	}

	cnv.addEventListener('click', (e) => {
		let xx = Math.floor(x/100);
		let yy = Math.floor(y/100);
		joueur = j_turn(j1,j2);
		if(estVide(xx,yy) && mode == "M"){
			console.log(joueur.pionac.pm);
			if(joueur.pionac.x != xx*100 && Math.abs(xx - joueur.pionac.x/100) + Math.abs(yy - joueur.pionac.y/100) <= joueur.pionac.pm
				|| joueur.pionac.y != yy*100 && Math.abs(xx - joueur.pionac.x/100) + Math.abs(yy - joueur.pionac.y/100) <= joueur.pionac.pm){
				joueur.pionac.change_etat("walk");
				pion_actuel = joueur.pionac;
				slidex = xx*100;
				slidey = yy*100;
				plateau[yy][xx] = joueur.pionac;
				plateau[joueur.pionac.y/100][joueur.pionac.x/100] = "";
				if (!estVide(joueur.pionac.x/100,joueur.pionac.y/100)) {plateau[joueur.pionac.y/100][joueur.pionac.x/100] = "";}
				move_act = true;
				mode = "";
				joueur.pionac = "";
				action = action -1;
				
			}
			
		}
	});
}


function pion_move(){
	if(move_act == true && pion_actuel != null){
		if(pion_actuel.x != slidex){
			if (pion_actuel.x > slidex) {pion_actuel.x -= 100;}
			else {pion_actuel.x += 100;}
		}
		if(pion_actuel.y != slidey && pion_actuel.x == slidex){
			if (pion_actuel.y > slidey) {pion_actuel.y -= 100;}
			else {pion_actuel.y +=100;}
		}
		if(pion_actuel.x == slidex && pion_actuel.y ==slidey){
			move_act = false;
			slidex = null;
			slidey = null;
			pion_actuel.change_etat("idle");
			pion_actuel = null;
		}
	}
	
}

function attack(joueur){
	var joueur2;
	if (joueur == j1) {joueur2 = j2;}
	else{joueur2 = j1;}	
	cnv.addEventListener('click', (e) => {
		if (joueur.pionac != "") {

			let xx = Math.floor(x/100);
			let yy = Math.floor(y/100);
			joueur = j_turn(j1,j2);
			var pion = joueur2.pionPos(xx*100,yy*100);
			if (pion != false && Math.abs(pion.x - joueur.pionac.x) + 
				Math.abs(pion.y - joueur.pionac.y) <= 100 && mode == "A" && joueur.pionac != "") {
				console.log(pion.x,pion.y);
			joueur.pionac.change_etat("attack");
			let victime = joueur2.pionPos(xx*100,yy*100);
			action = action - 1;
			mode = "";
			victime.pv = victime.pv - joueur.pionac.dgt;
			if (victime.pv <= 0) {victime.change_etat("dead");plateau[yy][xx]="";if(!estVide(xx,yy)){plateau[yy][xx]="";}}
			joueur.pionac="";
			console.log(joueur.pionac);
			}else if (joueur2.chateau.x == xx*100 && joueur2.chateau.y == yy*100 && mode == "A") {
				joueur.pionac.change_etat("attack");
				let victime1 = joueur2.chateau;
				victime1.pv = victime1.pv - joueur.pionac.dgt;
				if (victime1.pv <= 0) {end = true; plateau[yy][xx] = "";return;}
				action = action - 1;
				mode = "";
				joueur.pionac="";
				verify_fin(joueur);
				
			}
	}
		
		
	});
}

//--------------------------//
function move_mouse(){
	var rect = cnv.getBoundingClientRect();
	cnv.addEventListener('mousemove', (e) => {
		x= e.clientX-rect.left;
		y= e.clientY-rect.top;
	});
}

document.addEventListener('keydown', (e) => {
	if(e.key == "m" || e.key =="M"){mode="M";}
	if(e.key == "a" || e.key =="A"){mode="A";}
	if(e.key == "i" || e.key =="I"){mode="I";}
	if(e.key == "s" || e.key =="S"){mode="S";}
	if(e.key == "c" || e.key =="C"){mode="C";}
	console.log(mode);
});




//-------------Contrôle du jeu-------------//
function j_turn(j1,j2) {
	if(tour%2==0){
		return j1;
	}else{
		return j2;
	}
}

function game(j1,j2){
	let player = j_turn(j1,j2);
	if (action==0) {player.or = player.or + player.chateau.gain;tour = tour+1;action = 3;}
	ctx.beginPath();
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	ctx.font = "bold 29px Comic Sans MS";
	ctx.fillText("Tour Joueur: "+player.nom,1500,370);
	ctx.font = "bold 22px Comic Sans MS";
	ctx.textAlign = "left";
	ctx.fillText("Chateau: "+player.chateau.pv+"pv",1250,400);
	ctx.fillText("Gold: "+player.or,1250,435);
	ctx.textAlign = "center";
	ctx.fillText("Action restante(s): "+action,1500,640);
	ctx.closePath();
	switch (mode){
		case "M":
			if (player.pionac=="") { 
				ctx.beginPath();
				ctx.textAlign = "center";
				ctx.fillStyle = "red";
				ctx.font = "bold 24px serif";
				ctx.fillText("Aucun Pion Choisi",1500,460);	
				ctx.closePath();
				return;}
			move(player);
			break;
		case "I":
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = "blue";
			ctx.font = "bold 24px serif";
			ctx.fillText("Choisissez Une Invocation",1500,460);	
			ctx.closePath();
			create_pion(player);
			break;
		case "C":
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = "blue";
			ctx.font = "bold 24px serif";
			ctx.fillText("Choisissez Un Pion",1500,460);	
			ctx.closePath();
			choix(player);
			break;
		case "S":
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = "blue";
			ctx.font = "bold 24px serif";
			ctx.fillText("Tour Suivant",1500,460);	
			ctx.closePath();
			action = 0;
			mode = "";
			break;
		case "A":
			if (player.pionac=="") { 
				ctx.beginPath();
				ctx.textAlign = "center";
				ctx.fillStyle = "red";
				ctx.font = "bold 24px serif";
				ctx.fillText("Aucun Pion Choisi",1500,460);	
				ctx.closePath();
				return;}
			ctx.beginPath();
			ctx.textAlign = "center";
			ctx.fillStyle = "blue";
			ctx.font = "bold 24px serif";
			ctx.fillText("Attaquer Un Pion",1500,460);	
			ctx.closePath();
			attack(player);
			break;
		default:
			return;
			break;
	}
}
//--------------------------//

//-------------Dessin des élements du jeu-------------//
function anim(nom,etat,frame,w,h,compt,x,y,scale){
	let img = new Image();
	img.src = nom+etat+".png";	
	let ral = compt%frame;
	ctx.beginPath();
	ctx.save();
	ctx.scale(scale,1);
	ctx.drawImage(img,w*ral,0,w,h,x*scale,y,scale*100,100);
	ctx.restore();
	ctx.closePath();
}
function draw(joueur,j2){
	let c = joueur.chateau;
	let img = new Image();
	img.src = c.name;
	c.compt++;
	let ral =c.compt%c.frame;
	ctx.beginPath();
	ctx.drawImage(img,100*ral,40,100,100,c.x,c.y,100,100);
	ctx.closePath();
	for (var i = 0; i < joueur.pion.length; i++) {
		joueur.pion[i].etat(joueur.pion[i].biblio);
		joueur.pion[i].compt++;
		if (joueur.pion[i].compt > joueur.pion[i].frame-1) {
			joueur.pion[i].compt = 0;
			if(joueur.pion[i].mode == "attack"){
				joueur.pion[i].change_etat("idle");
				joueur.pionac = "";
			}
			if (joueur.pion[i].mode == "dead"){
				joueur.deletePion(i);
			}
		}
		anim(joueur.pion[i].name,joueur.pion[i].mode,joueur.pion[i].frame,
			joueur.pion[i].w,joueur.pion[i].h,joueur.pion[i].compt,
			joueur.pion[i].x,joueur.pion[i].y,1)
		
	}
	let c1 = j2.chateau;
	let img1 = new Image();
	img1.src = c1.name;
	c1.compt++;
	let ral1 =c1.compt%c1.frame;
	ctx.beginPath();
	ctx.drawImage(img1,100*ral1,40,100,100,c1.x,c1.y,100,100);
	ctx.closePath();
	for (var i = 0; i < j2.pion.length; i++) {
		j2.pion[i].etat(j2.pion[i].biblio);
		j2.pion[i].compt++;
		if (j2.pion[i].compt > j2.pion[i].frame-1) {
			j2.pion[i].compt = 0;
			if(j2.pion[i].mode == "attack"){
				j2.pion[i].change_etat("idle");
				j2.pionac = "";
			}
			if (j2.pion[i].mode == "dead"){
				j2.deletePion(i);
			}
		}
		anim(j2.pion[i].name,j2.pion[i].mode,j2.pion[i].frame,
			j2.pion[i].w,j2.pion[i].h,j2.pion[i].compt,
			j2.pion[i].x,j2.pion[i].y,-1)
		
	}
}

var carte = [["Squelette","red",1300,70,2],["Guerrier","grey",1600,70,2],["Roi","#ffd700",1300,180,4],
	["Monstre","#2ab463",1600,180,5]];
var buttons = [];

function create_button() {
	ctx.beginPath();
	ctx.GlobalAlpha = 0.3;
	ctx.fillStyle = "#9e00ff";
	ctx.rect(1000,0,1000,300);
	ctx.fill();
	ctx.closePath();
	for (var i = 0; i < carte.length; i++) {
		buttons[i] = new Path2D();
		ctx.beginPath();
		ctx.fillStyle = carte[i][1];
		buttons[i].rect(carte[i][2], carte[i][3], 200, 60);
		ctx.fill(buttons[i]);
		ctx.textAlign = "center";
		ctx.fillStyle = "#f0f0f0";
		ctx.font = "bold 24px serif";
		ctx.fillText(carte[i][0],carte[i][2]+100, carte[i][3]+33);
		ctx.arc(carte[i][2]+200, carte[i][3],20,0,2 * Math.PI);
		ctx.fill();	
		ctx.fillStyle = carte[i][1];
		ctx.fillText(carte[i][4],carte[i][2]+200, carte[i][3]+7);
		ctx.closePath();
	}
}
//--------------------------//



function Chateau_invoc(joueur) {
	var c = joueur.chateau;
	var tab = []
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			if (Math.abs(j - c.x/100) + Math.abs(i - c.y/100) == 1 
				&& estVide(j,i) || Math.abs(j - c.x/100) == 1 && Math.abs(i - c.y/100) == 1
				&& estVide(j,i) ) {
				tab.push(i);
				tab.push(j);
			}
		}
	}
	if(tab.length == 0){return false}
	return [tab[0],tab[1]];
}


function verify_fin(joueur){
	if (end==true) {
		ctx.clearRect(0,0,cnv.width,cnv.height);
		console.log("dead");
		ctx.beginPath();
		ctx.textAlign = "center";
		ctx.fillStyle = joueur.color;
		ctx.font = "bold 100px serif";
		ctx.fillText("Victoire \n"+joueur.nom,width/2,height/3);	
		ctx.closePath();
	}
}

function explic() {
	ctx.beginPath();
	ctx.textAlign = "center";
	ctx.font = "bold 15px serif";
	ctx.fillText("Invocation: Appuyer sur I puis cliquer sur l'invocation de votre choix (Zone violette)",1500,700);	
	ctx.fillText("Choix: Appuyer sur C puis cliquer sur le personnage que vous voulez selectionner",1500,740);
	ctx.fillText("Mouvement: Appuyer sur M puis cliquer sur l'une des cases disponibles pour le personnage selectionné",1500,780);
	ctx.fillText("Attaque: Appuyer sur A puis cliquer sur le Pion/Chateau que vous voulez attaquer avec le personnage choisi",1500,820);
	ctx.fillText("Skip: Appuyer sur S pour sauter votre tour",1500,860);		
	ctx.closePath();

}
var c1 = new Chateau(0,0);
plateau[c1.y/100][c1.x/100] = c1;
var c2 = new Chateau(900,900);
plateau[c2.y/100][c2.x/100] = c2;
var j1 = new Joueur("As",15,"red",c1);
var j2 = new Joueur("Os",15,"blue",c2);

remplir_map();
function update(){
	ctx.clearRect(0,0,cnv.width,cnv.height);
	move_mouse();
	create_map();
	create_button();
	survol(cas);
	game(j1,j2);
	draw(j1,j2);
	pion_move();
	explic();
	verify_fin(j_turn(j1,j2));
	verify_presence();
}

setInterval(update,200);
