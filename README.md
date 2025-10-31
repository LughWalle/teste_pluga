# pluga (Desafio Pluga)

Este projeto é uma aplicação React (Create React App) usada para o desafio júnior da Pluga. Abaixo estão as instruções básicas para rodar o projeto localmente, executar testes e construir a versão de produção.

## Pré-requisitos

- Node.js (recomendado >= 16) e npm
- Navegador moderno (Chrome, Firefox, Edge)

Verifique as versões instaladas:

```bash
node -v
npm -v
```

## Instalação

1. Abra o terminal na pasta do projeto `teste_pluga/`.
2. Instale as dependências:

```bash
npm install
```

## Executando em desenvolvimento

```bash
npm start
```

Isto inicia o servidor de desenvolvimento e abre a aplicação em `http://localhost:3000` (por padrão). O servidor recarrega automaticamente ao salvar alterações.

## Executando os testes

O projeto usa Jest + Testing Library. Para executar todos os testes:

```bash
npm test
```

Para rodar um teste específico uma vez (sem modo watch):

```bash
npm test -- src/__tests__/Modal.test.js --watchAll=false
```


## Build para produção

```bash
npm run build
```

O resultado será gerado na pasta `build/`.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do diretório `test_pluga/` com as variáveis necessárias. Exemplo:

```
REACT_APP_STORAGE_KEY=pluga:lastViewed
REACT_APP_API_URL=https://api.exemplo.com

# api esta fornecida no documento de descrição do teste
```

## Problemas conhecidos

- Caso veja alertas sobre `The resource was preloaded using link preload but not used...` é um warning que a propria api esta mandando, mas não interfere com o projeto.

---
