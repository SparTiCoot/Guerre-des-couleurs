export default class Joueur{
	pion;pionac;
	constructor(nom,or,color,chateau){
		this.nom = nom;
		this.or = or;
		this.color = color;
		this.chateau = chateau;
		this.pion = [];
		this.pionac = "";
	}

	get_nom(){return this.nom;}

	get_or(){return this.or;}
	retrait(perte){ return this.or - perte;}
	dépôt(gain){return this.or + gain;}


	get_color(){return this.color;}

	get_chateau(){return this.chateau;}
	destruc(){this.chateau -= 1;}
	addPion(piece){this.pion.push(piece);}
	pionPos(x,y){
		for (var i = 0; i < this.pion.length; i++) {
			if(this.pion[i].x==x && this.pion[i].y==y){
				return this.pion[i];
			} 
		}return false;
	}
	getPion(pion){this.pionac = pion;}
	deletePion(index){this.pion.splice(index,1);}

}