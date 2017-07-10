function Map(rows, collumns) {
  this.SIZE = 32;
  this.victory = false;
  this.cells = [];
  this.comidas = [];
  this.armadilhas = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx, img) {
  
  for (var i = 0; i < this.comidas.length; i++) {
      this.comidas[i].desenharQuadrado(ctx);
      //this.tesouros[i].desenharObjeto(ctx, img.images[this.tesouros[i].imgKey]);
  }

  for (var i = 0; i < this.armadilhas.length; i++) {
      this.armadilhas[i].desenharQuadrado(ctx);
      //this.minas[i].desenharObjeto(ctx, img.images[this.minas[i].imgKey]);
  }

  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==2){
        /*ctx.fillStyle = "white";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);*/
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c]==3){
        ctx.fillStyle = "gray";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c] == 4){
        ctx.fillStyle = "yellow";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c] == 5){
        ctx.fillStyle = "red";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      if(this.cells[r][c] == 6){
        ctx.fillStyle = "darkblue";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
        ctx.fillStroke = "black";
        ctx.strokeRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }

  

};

/*Map.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.tesouros.length; i++) {
      if(this.tesouros[i].colidiuCom(alvo)){
        resolveColisao(this.tesouros[i], alvo);
      }
    }
};

Map.prototype.colidiuComTesouro = function(pc){
  for(var i = this.tesouros.length-1; i>=0; i--){

    this.colidiuCom(pc,
        function(tesouro){
            tesouro.visivel = true;
            console.log("aqui");
        }
      );
  }
};*/

/*Map.prototype.showInformations = function(ctx){
  
  // -- Minas --

  ctx.font="20px Verdana";
  ctx.fillStyle = "red";
  ctx.fillText("Minas: " + this.minasQtd, 285, 80);
  
  // -- Tesouros --

  ctx.fillStyle = "green";
  ctx.fillText("Tesouros: " + this.tesourosQtd, 285, 100);

  // -- Pontuação --

  ctx.fillStyle = "purple";
  ctx.fillText("Pontuação: " + this.pontuacao, 285, 120);

  // -- Tempo --

  ctx.fillStyle = "black"
  ctx.fillText("Tempo", 285, 20);
  if(!this.gameOver){
    ctx.fillStyle = "orange"
    ctx.fillRect(285, 30, this.tempo, 10);
    ctx.strokeRect(285, 30, this.tempo, 10);
  }
  
  // -- Fim de Jogo --

  if(this.gameOver){
    ctx.fillStyle = "blue";
    ctx.fillText("Game Over", 285, 225);
  }

  // -- Vitória -- 

  if(this.victory){
    ctx.fillStyle = "blue";
    ctx.fillText("Vitória", 285, 225);
  }

}*/

Map.prototype.getCells = function () {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      console.log(r);
      console.log(c);
    }
  }
};

Map.prototype.setModelo = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
      switch (newCells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          break;
        case 5:
          this.cells[i][j] = 5;
          break;
        default:
          this.cells[i][j] = 0;
      }
    }
  }
};

Map.prototype.setRandom = function (newCells) {

  //Crio um mapa padrão
  map.setModelo(newCells);

  //Crio randomicamente um mapa
  for (var i = 1; i < newCells.length-1; i++) {
    for (var j = 1; j < newCells[i].length-1; j++) {
      var cell;
      var celula = Math.round(Math.random()  * (10 - 1) + 1); 
      //Probabilidade de 20% de caminho no mapa inicial
      if(celula >= 0 && celula <= 3){
        this.cells[i][j]  = 3;
      } 
      //Probabilidade de 60% de parede no mapa inicial
      else if(celula > 3 && celula <= 8){
        this.cells[i][j]  = 1;
      } 
      //Probabilidade de 10% de comida no mapa inicial
      else if(celula > 8 && celula <= 9){
        this.cells[i][j]  = 4;
      } 
      //Probabilidade de 10% de armadilha no mapa inicial
      else if(celula > 9 && celula <= 10){
        this.cells[i][j]  = 5;
      }      
    }
  }

  //Verifico as paredes em todas as direções de uma célula
  var count;
  for (var i = 1; i < newCells.length-1; i++) {
    for (var j = 1; j < newCells[i].length-1; j++) {
      count = 0;
      if(this.cells[i][j] == 1){
        if(this.cells[i-1][j+1] == 1){
          count++;
        }
        if(this.cells[i-1][j] == 1){
          count++;
        }
        if(this.cells[i-1][j-1] == 1){
          count++;
        }
        if(this.cells[i][j-1] == 1){
          count++;
        }
        if(this.cells[i+1][j-1] == 1){
          count++;
        }
        if(this.cells[i+1][j] == 1){
          count++;
        }
        if(this.cells[i+1][j+1] == 1){
          count++;
        }
        if(this.cells[i][j+1] == 1){
          count++;
        }

        //Caso não haja nenhuma parede por perto de outra parede, colocar outra
        if(count == 0){
          //console.log("Aqui");
          var randomCellI = Math.round(Math.random()  * (2 - 0));
          //console.log(i);
          //console.log(randomCellI - 1);
          var randomCellJ = Math.round(Math.random()  * (2 - 0));
          //console.log(j);
          //console.log(randomCellJ - 1);
          this.cells[i + randomCellI - 1][j +randomCellJ - 1] = 1;
          //console.log(this.cells[i + randomCellI -1][j +randomCellJ - 1]);
        }
      }

    }
  }

  //Acrescentar mais caminhos, verificando se sempre uma célula de caminho está cercada por 2 caminhos
  for (var k = 0; k < newCells.length*2; k++) {
    for (var i = 1; i < newCells.length-1; i++) {
      for (var j = 1; j < newCells[i].length-1; j++) {
        for (var p = 0; p < newCells.length; p++) {
          this.cells[0][p] = 1;
          this.cells[p][0] = 1;
          this.cells[newCells.length - 1][p] = 1;
          this.cells[p][newCells.length - 1] = 1; 
        }
      count = 0;
      if(this.cells[i][j] == 2 || this.cells[i][j] == 3 || this.cells[i][j] == 4 || this.cells[i][j] == 5){
        
        console.log("Achou a célula i: " + i + ", j: " + j);
        if(this.cells[i-1][j] == 3){
          count++;
        }
        if(this.cells[i][j-1] == 3){
          count++;
        }
        if(this.cells[i+1][j] == 3){
          count++;
        }
        if(this.cells[i][j+1] == 3){
          count++;
        }

        if(count <= 1){

          console.log("Aqui");

          var escolha = Math.round(Math.random()  * (2 - 1)) + 1;
          var randomCellI = 0;
          var randomCellJ = 0;

          do{
            if(escolha == 1){
              randomCellI = Math.round(Math.random()  * (2 - 0)) - 1;
              console.log("Caminho I");
              console.log(i);
              console.log(j);
              console.log(randomCellI);
            } else {
              randomCellJ = Math.round(Math.random()  * (2 - 0)) - 1;
              console.log("Caminho J");
              console.log(i);
              console.log(j);
              console.log(randomCellJ);
            }
          } while(randomCellI == 0 && randomCellJ == 0)

          this.cells[i + randomCellI][j +randomCellJ] = 3;
          console.log("Resultado: ");
          console.log(this.cells[i + randomCellI][j +randomCellJ]);
          this.cells[1][1] = 2;
          this.cells[1][2] = 3;
          this.cells[2][1] = 3;
        }
      }
      // Seto a parede em volta do labirinto
      for (var p = 0; p < newCells.length; p++) {
        this.cells[0][p] = 1;
        this.cells[p][0] = 1;
        this.cells[newCells.length - 1][p] = 1;
        this.cells[p][newCells.length - 1] = 1;  
      }
    }
  }
}

// Seto novamente a parede em volta do labirinto
for (var p = 0; p < newCells.length; p++) {
    this.cells[0][p] = 1;
    this.cells[p][0] = 1;
    this.cells[newCells.length - 1][p] = 1;
    this.cells[p][newCells.length - 1] = 1;  
}

  for (var i = 1; i < newCells.length-1; i++) {
    for (var j = 1; j < newCells[i].length-1; j++) {
      switch (this.cells[i][j]) {
        case 1:
          this.cells[i][j] = 1;
          break;
        case 2:
          this.cells[i][j] = 2;
          break;
        case 3:
          this.cells[i][j] = 3;
          break;
        case 4:
          this.cells[i][j] = 4;
          newComida = new Sprite();
          newComida.y = (i+0.5)*this.SIZE;
          newComida.x = (j+0.5)*this.SIZE;
          newComida.imgKey = "comida";
          newComida.color = "red";
          this.comidas.push(newComida);
          break;
        case 5:
          this.cells[i][j] = 5;
          newArmadilha = new Sprite();
          newArmadilha.y = (i+0.5)*this.SIZE;
          newArmadilha.x = (j+0.5)*this.SIZE;
          newArmadilha.imgKey = "armadilha";
          newArmadilha.color = "green";
          this.armadilhas.push(newArmadilha);
          break;
        case 6:
          this.cells[i][j] = 6;
        default:
          this.cells[i][j] = 3;
      }
    }
  }

//Crio a saída do labirinto
  var saida = false;

  do{
  var r = Math.floor(Math.random() * (12 - 5) + 5);
  var c = Math.floor(Math.random() * (12 - 7) + 7);
    if(this.cells[r][c] == 3){
      this.cells[r-1][c] = 3;
      this.cells[r][c-1] = 3;
      this.cells[r][c] = 6;
      saida = true;
    }
  } while(!saida);

};

/*Map.prototype.verificarCaminho = function(){
  for (var i = 1; i < this.Cells.length-1; i++) {
    for (var j = 1; j < this.Cells[i].length-1; j++) {
      
    }
  }
}*/


/*Map.prototype.mover = function (dt) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].mover(this,dt);
  }
};
Map.prototype.perseguir = function (alvo) {
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].perseguir(alvo);
  }
};*/
