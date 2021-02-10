var izquierda = document.getElementById("izquierda");
var derecha = document.getElementById("derecha");
var containerNews = document.getElementById("container-news");


class latestNews{
    posicionX = 0;
    idNew;
    referencia;
    
    constructor(referencia, posicion, id){
        if(typeof posicion === "string"){
            transformarNumero(posicion);
        }else{ this.posicionX = posicion; }
        this.referencia = referencia;
        this.idNew = id;
    }
    
    nuevaPosicion(cambioPosicion){
        if(typeof posicion === "string"){
            transformarNumero(cambioPosicion);
        }else{ this.posicionX += cambioPosicion; }
    } 
    
    transformarNumero(posicion){
        this.posicionX += parseInt(posicion);
    }
    
    mover(){
        this.referencia.style.left = ""+this.posicionX+"%";
    }
    
    mostrar(){
        this.referencia.style.display = "block";
    }
    
    ocultar(){
        this.referencia.style.display = "none";
    }

    reiniciarIzquierda(){
        this.posicionX = -102;
    }

    reiniciarDerecha(){
        this.posicionX = 136;
    }

}

var newsLista = [];
var count = 1;
var margenInicial = 0;



//noticias a cargas pagina
do{
    let referencia = new  latestNews(document.getElementById("news-"+count), margenInicial, count);
    newsLista.push(referencia);
    newsLista[count-1].mover();
    let referencia1 = count + 4;
    if(!document.getElementById("news-"+(referencia1))){
        let referencia2 = referencia1 - 1;
        if(document.getElementById("news-"+(referencia2))){
            margenInicial = -102;
        }else if(document.getElementById("news-"+(referencia2-1))){ 
            margenInicial = -68;
        }else{ 
            margenInicial = -34;
        }     
    }else{ 
         margenInicial += 34;
    }
    count++;
}while(document.getElementById("news-"+count));


/****
    Movimiento
    ***/
var estadoAnimacion = true;



izquierda.addEventListener("click", function(){
    if(estadoAnimacion){
        for(var i = 0 ; i < newsLista.length ; i++){
            if(newsLista[i].posicionX <= 102){
                newsLista[i].nuevaPosicion(34);
                newsLista[i].mostrar();
            }else if(newsLista[i].posicionX >= 136){
                newsLista[i].ocultar();
                newsLista[i].reiniciarIzquierda();  
            }
            newsLista[i].referencia.addEventListener("transitionend", function(){
                estadoAnimacion  = true;
            },true);
            newsLista[i].mover(); 
        }   
    }
    estadoAnimacion  = false; 
});



derecha.addEventListener("click", function(){
    if(estadoAnimacion){
        for(var i = 0 ; i < newsLista.length ; i++){
            if(newsLista[i].posicionX <= 136 && newsLista[i].posicionX > -90){
                newsLista[i].nuevaPosicion(-34);
                newsLista[i].mostrar();
            }else if(newsLista[i].posicionX <= -102){
                newsLista[i].ocultar();
                newsLista[i].reiniciarDerecha();  
            }
            newsLista[i].referencia.addEventListener("transitionend", function(){
                estadoAnimacion  = true;
            },true);
            newsLista[i].mover(); 
        }   
    }
    estadoAnimacion  = false; 
});

    
    
