class Despesa {
  constructor(ano, mes, dia, tipo, descricao, valor) {
    this.ano = ano;
    this.mes = mes;
    this.dia = dia;
    this.tipo = tipo;
    this.descricao = descricao;
    this.valor = valor;
  }

  validarDados() {
    for (let i in this) {
      if (this[i] == undefined || this[i] == "" || this[i] == null) {
        return false;
      }
    }
    return true;
  }
}

class Bd {
  constructor() {
    let id = localStorage.getItem("id");

    if (id === null) {
      localStorage.setItem("id", 0);
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem("id");
    return parseInt(proximoId) + 1;
  }

  gravar(d) {
    let id = this.getProximoId();

    localStorage.setItem(id, JSON.stringify(d));

    localStorage.setItem("id", id);
  }
}

let bd = new Bd();

function cadastrarDespesa() {
  let ano = document.getElementById("ano");
  let mes = document.getElementById("mes");
  let dia = document.getElementById("dia");
  let tipo = document.getElementById("tipo");
  let descricao = document.getElementById("descricao");
  let valor = document.getElementById("valor");

  let despesa = new Despesa(
    ano.value,
    mes.value,
    dia.value,
    tipo.value,
    descricao.value,
    valor.value
  );

  // 1) Verifica campos vazios ANTES de qualquer outra coisa
  const camposVazios = [ano, mes, dia, tipo, descricao, valor].some(
    (v) => v == null || String(v).trim() === ""
  );

  if (camposVazios) {
    $("#modalTitulo").text("Erro no cadastro");
    $("#modalCorpo").text("Faltam campos para serem preenchidos!");

    $("#modalRegistraDespesa .modal-header")
      .removeClass("text-success text-danger")
      .addClass("text-danger");

    $("#modalBotao")
      .removeClass("btn-success btn-danger")
      .addClass("btn-danger")
      .text("Corrigir");

    $("#modalRegistraDespesa").modal("show");
    return; // impede seguir adiante
  }

  // 2) Regras adicionais de validação do objeto
  if (!despesa.validarDados()) {
    $("#modalTitulo").text("Dados inválidos");
    $("#modalCorpo").text("Verifique os campos informados.");

    $("#modalRegistraDespesa .modal-header")
      .removeClass("text-success text-danger")
      .addClass("text-danger");

    $("#modalBotao")
      .removeClass("btn-success btn-danger")
      .addClass("btn-danger")
      .text("Corrigir");

    $("#modalRegistraDespesa").modal("show");
    return;
  }

  // 3) Sucesso: grava e exibe modal verde
  bd.gravar(despesa);

  $("#modalTitulo").text("Registro inserido com sucesso");
  $("#modalCorpo").text("Despesa foi cadastrada com sucesso!");

  $("#modalRegistraDespesa .modal-header")
    .removeClass("text-success text-danger")
    .addClass("text-success");

  $("#modalBotao")
    .removeClass("btn-success btn-danger")
    .addClass("btn-success")
    .text("Ok");

  $("#modalRegistraDespesa").modal("show");
}
