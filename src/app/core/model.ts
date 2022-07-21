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
}

export class Transaccao {
  id?: number;
  idTransaccao?: string;
  tipo?: string;
  dataTransaccao?: Date;
  entidade = new Entidade();
  produto = new Produto();
  estado = 'NA';
  quantidade?: number;
  valorTotal?: number;
}
