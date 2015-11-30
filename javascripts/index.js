(function(){
	var entrada = document.querySelector("#entry"),
		saida = document.querySelector("#result"),
		btn = document.querySelector("#montar"),
		auxMontador = new Montador();
	btn.addEventListener("click",function(){
		auxMontador.setCodigo(entrada.value);
		saida.value = auxMontador.montar();
	});
})();