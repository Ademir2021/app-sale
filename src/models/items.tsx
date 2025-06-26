/**{
		"id": 1,
		"createdAt": "2025-06-24T10:30:18.066951",
		"updatedAt": null,
		"name": "Item Modelo 1",
		"priceMax": 250.6,
		"priceMin": 250.99,
		"brand": {
			"id": 1,
			"name": "Marca Modelo 1"
		},
		"sector": {
			"id": 1,
			"name": "Setor Modelo 1"
		},
		"barCode": "1234567890122",
		"imagem": "http://exemplo.com/imagem.jpg"
	}, */

type Brand ={
    id:number;
    name:string;
}

type Sector ={
    id:number;
    name:string;
}

export type Item ={
	id:number
    createdAt:string;
    updatedAt:string;
    name:string;
    priceMax:number;
    priceMin:number;
    brand:Brand;
	sector:Sector;
	barCode:string;
	imagem:string;
}