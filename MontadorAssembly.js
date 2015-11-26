(function(){
	var montador = function(codigoAssembly){
		
		// Privado
		
		codigoAssembly = codigoAssembly || "";
		var consts = []; // CONSTANTES

		var preMontagem = function(){ // PRE-PROCESSA A STRING
			var codigoLimpo = codigoAssembly.split("\n");	
		
			for(i in codigoLimpo){
				
				codigoLimpo[i] = codigoLimpo[i].split(";")[0]; // REMOÇÃO DE COMENTÁRIOS
				
				if( codigoLimpo[i].indexOf("EQU") != -1 ){ // INSERÇÃO DE CONSTANTES
					var params = codigoLimpo[i].split("EQU");
					consts[params[0]] = params[1];
					codigoLimpo.splice(i, 1);	
				}

			}
			codigoLimpo = codigoLimpo.join("\n");
			for(i in consts){
				codigoLimpo.replace(new RegExp(i, 'g'), consts[i]);
			}
			// LIMPANDO SUJEIRA
			codigoLimpo.replace(new RegExp("  ", 'g'), " ");
			codigoLimpo.replace(new RegExp(" ,", 'g'), ",");
			codigoLimpo.replace(new RegExp(", ", 'g'), ",");
			return codigoLimpo;
		}

		var montaString = function(){ // MONTA O CODIGO
			var codigo = preMontagem().split("\n");
			var codigoMontado = [];
			var expReg;
			for(i in codigo){
				var linha = codigo[i];
				
				// MOV A,[n]
				expReg = new RegExp("MOV A,\[[0-9]+\]");
				if( expReg.test(linha) ){
					codigoMontado.push("a0h");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
				}

			}
			return codigoMontado.join(" ");
		}

		// Público

		this.setCodigo = function(codigo){
			codigoAssembly = codigo;
		}
		
		this.getCodigo = function(){
			return codigoAssembly
		}

		this.montar = function(){
			return montaString();
		}

	}
	window.Montador = montador;
})();