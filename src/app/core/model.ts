export class Stock {
  id?: number;
  quantidade?: number;
  produto = new Produto();
}

export class Endereco {
  bairro?: string;
  rua?: string;
  numero?: string;
}

export class Entidade {
  id?: number;
  nome?:string;
  nuit?:string;
  tipo = 'CLIENTE';
  endereco = new Endereco();
}

export class TipoProduto {
  id?: number;
  descricao?: string;
}

export class Produto {
  id?: number;
  nome?: string;
  descricao?: string;
  referencia?: string;
  tamanho?: number;
  preco?: number;
  tipoProduto = new TipoProduto()
  //stock = new Stock();
}

export class Lancamento {
  id?: number;
  codigoBusiness?:string;
  descricao?:string;
  dataLancamento?: Date;
  estado = 'NA';
  //preco?: number;
  quantidade?: number;
  valorTotal?: number;
  produto = new Produto();
  //entidade = new Entidade();
}

export class Business {
  id?: number;
  codigoBusiness?: string;
  descricao?:string;
  dataBusiness?: Date;
  entidade = new Entidade();
  finalizado?: boolean;
  //lancamento = new Lancamento();
}

// classe de teste
export class Venda {
  id?: number;
  codigoBusiness?: string;
  entidade = new Entidade();
  produto = new Produto();
  estado = 'NA';
  quantidade?: number;
  dataVenda?: Date;
}
