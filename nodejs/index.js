var Montador = require("./MontadorAssembly_Node.js");
var fs       = require("fs");
var entrada = process.argv[2] || "./example_file.mont",
	  saida = process.argv[3] || "./montado.obj";

fs.readFile(entrada, function(err, data){
	if(err) return err;
	var montavel = new Montador(data.toString());
	fs.writeFileSync(saida, montavel.montar());
});


