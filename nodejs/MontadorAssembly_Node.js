var Montador = function(codigoAssembly){
	
	// Privado
	
	codigoAssembly = codigoAssembly || "";
	var consts = []; // CONSTANTES
	var instrucoes = [
		"ADD",
		"SUB",
		"MOV",
		"CMP",
		"JMP",
		"JC",
		"JNC",
		"JZ",
		"JNZ",
	];

	var preMontagem = function(){ // PRE-PROCESSA A STRING
		var codigoLimpo = codigoAssembly.split("\n");	
	
		for(i in codigoLimpo){
			
			codigoLimpo[i] = codigoLimpo[i].split(";")[0]; // REMOÇÃO DE COMENTÁRIOS
			
			if( codigoLimpo[i].indexOf("EQU") != -1 ){ // INSERÇÃO DE CONSTANTES
				var params = codigoLimpo[i].split("EQU");
				consts[params[0].trim()] = params[1].trim();
				codigoLimpo.splice(i, 1);	
				continue;
			}
			var instrucao = codigoLimpo[i].split(" ");
			if(instrucoes.indexOf(instrucao[0]) == -1){ // EH ROTULO
				consts[instrucao[0]] = i; // INSERE A LINHA PARA ONDE VAI
				instrucao.splice(0,1);
				codigoLimpo[i] = instrucao.join(" ");
			}

		}
		codigoLimpo = codigoLimpo.join("\n");
		for(i in consts){
			codigoLimpo =	codigoLimpo.replace(new RegExp(i, 'g'), consts[i]);
		}
		// LIMPANDO SUJEIRA
		codigoLimpo = codigoLimpo.replace(new RegExp("  ", 'g'), " ");
		codigoLimpo = codigoLimpo.replace(new RegExp(" ,", 'g'), ",");
		codigoLimpo = codigoLimpo.replace(new RegExp(", ", 'g'), ",");
		return codigoLimpo;
	}

	var montaString = function(){ // MONTA O CODIGO
		var codigo = preMontagem().split("\n");
		var codigoMontado = [];
		var expReg;
		for(i in codigo){
			var linha = codigo[i].split("\r")[0];
			// INSTRUÇÕES MOV

				// MOV A,n
				expReg = new RegExp("MOV A,[0-9]+");
				if( expReg.test(linha) ){
					codigoMontado.push("b0h");
					codigoMontado.push( linha.split(",")[1] );
					continue;
				}

				// MOV A,[n]
				expReg = new RegExp("MOV A,\[[0-9]+\]");
				if( expReg.test(linha) ){
					codigoMontado.push("a0h");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
					continue;
				}

				// MOV [n],A
				expReg = new RegExp("MOV \[[0-9]+\],A");
				if( expReg.test(linha) ){
					codigoMontado.push("a2h");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
					continue;
				}

			// INSTRUÇÕES ADD

				// ADD A,n
				expReg = new RegExp("ADD A,[0-9]+");
				if( expReg.test(linha) ){
					codigoMontado.push("04h");
					codigoMontado.push( linha.split(",")[1]);
					continue;
				}

				// ADD A,[n]
				expReg = new RegExp("ADD A,\[[0-9]+\]");
				if( expReg.test(linha) ){
					codigoMontado.push("02h");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
					continue;
				}

			// INSTRUÇÕES SUB

				// SUB A,n
				expReg = new RegExp("SUB A,[0-9]+");
				if( expReg.test(linha) ){
					codigoMontado.push("2ch");
					codigoMontado.push( linha.split(",")[1]);
					continue;
				}

				// ADD A,[n]
				expReg = new RegExp("SUB A,\[[0-9]+\]");
				if( expReg.test(linha) ){
					codigoMontado.push("2ah");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
					continue;
				}

			// INSTRUÇÕES CMP

				// CMP A,n
				expReg = new RegExp("CMP A,[0-9]+");
				if( expReg.test(linha) ){
					codigoMontado.push("3ch");
					codigoMontado.push( linha.split(",")[1]);
					continue;
				}

				// CMP A,[n]
				expReg = new RegExp("CMP A,\[[0-9]+\]");
				if( expReg.test(linha) ){
					codigoMontado.push("3ah");
					codigoMontado.push( linha.split("[")[1].split("]")[0] );
					continue;
				}

			// INSTRUÇÕES DE JUMP

				// JMP n
				expReg = new RegExp("JMP [0-9]");
				if( expReg.test(linha) ){
					codigoMontado.push("ebh");
					codigoMontado.push( linha.split(" ")[1]);
					continue;
				}

				// JC n
				expReg = new RegExp("JC [0-9]");
				if( expReg.test(linha) ){
					codigoMontado.push("72h");
					codigoMontado.push( linha.split(" ")[1]);
					continue;
				}

				// JNC n
				expReg = new RegExp("JNC [0-9]");
				if( expReg.test(linha) ){
					codigoMontado.push("73h");
					codigoMontado.push( linha.split(" ")[1]);
					continue;
				}
				
				// JZ n
				expReg = new RegExp("JZ [0-9]");
				if( expReg.test(linha) ){
					codigoMontado.push("74h");
					codigoMontado.push( linha.split(" ")[1]);
					continue;
				}

				// JNZ n
				expReg = new RegExp("JNZ [0-9]");
				if( expReg.test(linha) ){
					codigoMontado.push("75h");
					codigoMontado.push( linha.split(" ")[1]);
					continue;
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

module.exports = Montador;