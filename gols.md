# Ideas

ForeCast é uma plataforma de orçamentos online, mantenha seus  orçamentos em modo publico ou privado, a plataforma irá mostrar uma lista de melhores valores para sua melhor tomada de decisão.

O que eu quero solucionar?

- Orçamentos online que o cliente poça publica como se fosse uma rede social, qualquer empresa devidamente cadastrada e verificada poderia participar
- Orçamentos em modo privado, a empresa enviaria email e a pessoa orçaria através de uma página web.

O que o sistema tem que ter?

- Importar produtos?
- Cadastrar produtos?
- Abrir caixa?
- Fazer vendas?
- Gerenciar financeiro

Focar no orçamento não deveria ser a tarefa mais importante? Depois ir acrescentando os novos controles?

Um orçamento, por exemplo, deveria ter ser completo além dos dados necessários como itens e valores, deveria conter dados como:

- Data de expiração
- Lembrete da expiração
-

Que publico quero atingir?

- As pessoas já contém um monte de sistemas para gerenciar produtos, estoques, clientes, as pessoas contratariam mais um sistema apenas para fazer orçamentos?
- Talvez facilitar a importação desses dados para dentro do sistema com templates de tabelas ou ate mesmo disponibilizar api para ser consumida?

[https://whimsical.com/forecast-HxTBCWr4rMVNgzDAuCdLiK](https://whimsical.com/forecast-HxTBCWr4rMVNgzDAuCdLiK)

# Requisitos

**Requisitos não funcionais**

- [X]  Usar Mailtrap para envio de email em desenvolvimento
- [ ]  Usar Amazon SES para envio de email em produção

## SignIn

- [ ]  Deve conter opção de logar-se com o google
- [ ]  Ao logar-se com o google deve salvar os dados no banco de dados da aplicação

Mudanças
- [X]  Authenticação feita por backed próprio

## SignUp

- [X]  Deve ser obrigatório informar o nome completo, e-mail, senha e número celular
- [X]  Não deve permitir cadastrar um mesmo email
- [X]  Senha deve conter no mínimo 6 caracteres

## Dashboard

- [ ]  Deve se ter boas vidas ao usuário
- [ ]  Deve ser mostrado as Ordens abertas
- [ ]  Deve possível acessar uma ordem ou orçamento especifico
- [ ]  Deve conter uma sessão para informativos

## Perfil

**Requisito funcional**

- [ ]  Usuário deve preencher todos os campos
- [ ]  Deve ter separado em 3 abas dados, login e senha, configurações

**Regra de negócio**

- [ ]  Implementar com apis da receitar de conseguir todos os dados através da consulta do cpf/cnpj

## Companies

- [ ]  Necessário ter completado as informações no pefil
- [ ]  Usuário deve preencher todos os campos

## Orders

- [ ]  Necessário ter completado as informações no pefil
- [ ]  Todos os dados devem ser preenchidos
- [ ]  Ordem deve conter ao menos 1 item para ser salvo

**Regra de negócio**

- [ ]  Deve calcular a quantidade de horas que a ordem ficara aberta

## Budge

- [ ]  Necessário ter completado as informações no pefil

## Receivers

- [ ]  Necessário ter completado as informações no pefil

# Frontend

**Framework:** Nextjs

**Componentes:** Chakra

background: #181A22

primary: #44EE88

second: #282A36

disable: #C4C4C4 20%

## Authentications

Google → após a autenticação salvar no banco de dados na api

Cadastro normal → Já tem um esquema feito em outros projetos tanto a lógica frontend e backend

# Backend

Banco: Postgresql

### User

```ts
interface User {
	id: string;
  firstName: string;
  lastName: string;
  phone: string;
  fullName: string;
  email: string;
  individualTaxNumber: string;
  password: string;
  avatar: string;
}
```

### Company Type

```ts
type CompanyType {
	uuid: string;
	description: string;
}
```

### Company

```ts
interface Company {
	uuid: string;
	owners: User[];
	name: string;
  description: string;
  isHeadquarters: boolean
	email: string;
  phones: string[]
	stateRegistration: number;
	employerIdentificationNumber: number;
	providers: Company[]
	address: Address;

  //nest update
	imageUrl: string;
  companyType: CompanyType;
  employees: User[];
}
```

### Address

```ts
interface Address {
	street:	string;
	number:	string;
	complement: string;
	reference: string;
	district: string;
	city: string;
	state: string;
	state_acronym: string
	postal_code: string;
	lat: number;
	lng: number;

  //validation frontend
  // pattern: /^\d{5}-?\d{3}$/
}

```

### Transporter Responsibility

```ts
type TransporterResponsibility = ["Company","Provider"];
```

### Order

```ts
interface Order {
	uuid: string;
	createdBy: User;
	cloused: boolean;
	owner: Company;
	orderItemId: OrderItem;
	providers: Company[];
	shortId: string;
	description: string;
	schedulesInitial: Date;
	schedulesFinal: Date;
	expiresIn: Date;
	quantityOfItems: number;
	transporterResposability: TransporterResponsibility;
	createdAt: Date;
	updatedAt: Date;
}
```

### Order Item

```ts
interface OrderItem {
	uuid: string;
	itemId: number;
	description: string;
	quantity: string;
}
```

### Item

```ts
interface Item {
	unitPrice: number;
	quantity: number;
	name: string;
	price: number;
	discontPercent: number;
	discontValue: number;
	totalPrice: number;
	comments: string;
	imageUrl: string;
}
```

### Transporter

```ts
interface Transporter {
	uuid: string;
	name: string;
	price: number;
	predictionDate: Date;
}
```

### Budget

```ts
interface Budget {
	uuid: string;
	shortId: string;
	accepted: boolean;
	provider: Company;
	responsibleSeller: string
	order: Order;
	items: Item[];
	payments: Payment[];
	transporter: Transporter;
	discontPercent: number;
	discontValue: number;
	price: number;
	totalPrice: number;
	comments: string;
}
```
