import {skull,king,knight,demon} from "./anim.js";
export class Pion{
	constructor(name,x,y,pv,pm,prix,dgt,biblio){
		this.name = name;
		this.x = x;
		this.y = y;
		this.pv = pv;
		this.pm = pm;
		this.prix = prix;
		this.dgt = dgt;
		this.mode = "idle";
		this.frame = 0;
		this.w = 0;
		this.h = 0;
		this.dec_x = 0;
		this.dec_y = 0;
		this.compt = 0;
		this.biblio = biblio;
	}

	change_etat(etat){this.mode = etat;}
	etat(biblio){
		switch(this.mode){
			case "idle":
				this.frame = this.biblio[0].frame;
				this.w = this.biblio[0].w;
				this.h = this.biblio[0].h;
				this.dec_x = this.biblio[0].decal_x;
				this.dec_y = this.biblio[0].decal_y;
				break;
			case "attack":
				this.frame = this.biblio[1].frame;
				this.w = this.biblio[1].w;
				this.h = this.biblio[1].h;
				this.dec_x = this.biblio[0].decal_x;
				this.dec_y = this.biblio[0].decal_y;
				break;
			case "walk":
				this.frame = this.biblio[2].frame;
				this.w = this.biblio[2].w;
				this.h = this.biblio[2].h;
				this.dec_x = this.biblio[0].decal_x;
				this.dec_y = this.biblio[0].decal_y;
				break;
			case "dead":
				this.frame = this.biblio[3].frame;
				this.w = this.biblio[3].w;
				this.h = this.biblio[3].h;
				this.dec_x = this.biblio[0].decal_x;
				this.dec_y = this.biblio[0].decal_y;
				break;
		}
	}

	verify_dead(){
		if (this.pv <= 0) {
			return true;
		}
	}
}

export class Guerrier extends Pion{
	constructor(x,y){
		super("../assets/perso/knight/",x,y,3,3,2,2,knight);
		
	}
}

export class Demon extends Pion{
	constructor(x,y){
		super("../assets/perso/monster/",x,y,8,2,5,4,demon);

	}
}

export class Skull extends Pion{
	constructor(x,y){
		super("../assets/perso/skull2/",x,y,1,4,2,3,skull);

	}
}

export class Roi extends Pion{
	constructor(x,y){
		super("../assets/perso/king2/",x,y,6,3,4,3,king);

	}
}

export class Chateau{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.gain = 3;
		this.pv = 15;
		this.name = "../assets/perso/tower/chateau.png";
		this.compt = 0;
		this.frame = 11;
	}
}