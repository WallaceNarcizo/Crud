var valores = [];
var id = 0;

function novo() {
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //mostra o formulário
    form.style.display = "block";
    //esconde lista
    lista.style.display = "none";

    //lista os inputs
    id = 0;
    var nome = document.getElementById("nome");
    var cidade = document.getElementById("cidade");
    var estado = document.getElementById("estado");
    var mes = document.getElementById("mes");
    var hotel = document.getElementById("hotel");
    nome.value = "";
    cidade.value = "";
    estado.value = "";
    mes.value="";
    hotel.value = "";

    //joga o foco no 1o campo:
    nome.focus();

}

function alterar(i) {
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //mostra o formulário
    form.style.display = "block";
    //esconde lista
    lista.style.display = "none";

    //lista os inputs
    id = valores[i].id;
    var nome = document.getElementById("nome");
    var cidade = document.getElementById("cidade");
    var estado = document.getElementById("estado");
    var mes = document.getElementById("mesartamento");
    var hotel = document.getElementById("hotel");
    nome.value = valores[i].nome;
    cidade.value = valores[i].cidade;
    estado.value = valores[i].estado;
    mes.value = valores[i].mes_maior_rotatividade;
    hotel.value = valores[i].hotel;

    //joga o foco no 1o campo:
    nome.focus();

}
function salvar() {
	//valida campos obrigatorios
	if (document.getElementById("nome").value == "") {
		alert("campo Nome é obrigatório!");
		return;
	}
	
	//pega os dados digitados pelo usuário e monta um objeto
	var p = {
		id: id,
		nome: document.getElementById("nome").value,
		cidade: document.getElementById("cidade").value,
		estado: document.getElementById("estado").value,
		mes: document.getElementById("mes").value,
		hotel: document.getElementById("hotel").value
	};

	//define se o método será para inserir ou alterar
	if (id == 0) {
		metodo = "POST";
	} else {
		metodo = "PUT";
	}
	
	//envia os dados para o servidor
	mostraLoading("aguarde, salvando dados...");
	fetch("http://localhost:8080/testeee/Ponto",
		{method: metodo,
		body: JSON.stringify(p)
		}
	).then(resp => resp.json())
    .then(function (retorno){
		escondeLoading();
		alert(retorno.mensagem);
		
		var form = document.getElementById("formulario");
	    var lista = document.getElementById("lista");
	
	    //esconde o formulário
	    form.style.display = "none";
	    //mostra a lista
	    lista.style.display = "block";
	    
	    //recarrega a lista
	    listar();
	});

}

function excluir(i) {
	
	id = valores[i].id;
	
	//envia os dados para o servidor
	mostraLoading("aguarde, excluindo...")
	fetch("http://localhost:8080/testeee/Ponto/" + id,
		{method: "DELETE"
		}
	).then(resp => resp.json())
    .then(function (retorno){
		escondeLoading();
		alert(retorno.mensagem);
		
		var form = document.getElementById("formulario");
	    var lista = document.getElementById("lista");
	
	    //esconde o formulário
	    form.style.display = "none";
	    //mostra a lista
	    lista.style.display = "block";
	    
	    //recarrega a lista
	    listar();
	});

}
function cancelar() {
    var form = document.getElementById("formulario");
    var lista = document.getElementById("lista");

    //esconde o formulário
    form.style.display = "none";
    //mostra a lista
    lista.style.display = "block";

}
function listar() {
    var lista = document.getElementById("dados");
    //limpa a lista
    lista.innerHTML = "<tr><td colspan=4>aguarde, carregando...</td></tr>";   
    
    
    fetch("http://localhost:8080/testeee/Ponto")
    .then(resp => resp.json())
    .then(dados => mostrar(dados));
}
function mostrar(dados) {
	valores = dados;
    var lista = document.getElementById("dados");
    //limpa a lista
    lista.innerHTML = "";   
    //percorre a lista
    for (var i in dados) {
        lista.innerHTML += "<tr>"
                        + "<td>" + dados[i].id + "</td>"                
                        + "<td>" + dados[i].nome + "</td>"
                        + "<td>" + dados[i].cidade + "</td>"
                        + "<td>" + dados[i].estado + "</td>"
                        + "<td>" + dados[i].mes_maior_rotatividade + "</td>"
                        + "<td>" + dados[i].hotel + "</td>"
                        + "<td>"
                        + "<input type='button' value='A' onclick='alterar("+i+")'/>"
                        + "<input type='button' value='X' onclick='excluir("+i+")'/>"
                        +"</td>"
                        + "</tr>";
    }      
}
function mostraLoading(msg) {
    var loa = document.getElementById("loading");
    var con = document.getElementById("conteudo");
    loa.style.display = "block";
    con.style.display = "none";
    loa.innerHTML = msg;
}
function escondeLoading() {
    var loa = document.getElementById("loading");
    var con = document.getElementById("conteudo");
    loa.style.display = "none";
    con.style.display = "block";	
}

listar();