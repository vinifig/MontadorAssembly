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
			return codigoLimpo;
		}

		var montaString = function(){ // MONTA O CODIGO
			return preMontagem();
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