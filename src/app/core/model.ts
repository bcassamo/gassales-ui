export class Stock {
  id?: number;
  quantidade?: number;
}

export class Entidade {
  id?: number;
  nome?:string;
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
  stock = new Stock();
}

export class Lancamento {
  id?: number;
  descricao?:string;
  dataLancamento?: Date;
  estado = 'NA';
  preco?: number;
  quantidade?: number;
  valorTotal?: number;
  produto = new Produto();
  entidade = new Entidade();
}

export class Business {
  id?: number;
  codigoBusiness?: string;
  descricao?:string;
  dataBusiness?: Date;
  finalizado?: boolean;
  lancamento = new Lancamento();
}
