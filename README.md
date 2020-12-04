<div align="center">
  <h1>Playlist Suggestion</h1>
</div>

<div align="center">

Aplicação que sugere playlist de acordo com a temperatura atual.

</div>

<div align="center">

[![Travis Build](https://travis-ci.com/JorgeLNJunior/playlist-suggestion.svg?branch=master)](https://travis-ci.com/github/JorgeLNJunior/playlist-suggestion)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/playlist-suggestion/badge.svg?branch=master&service=github)](https://coveralls.io/github/JorgeLNJunior/playlist-suggestion?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/playlist-suggestion)](https://github.com/JorgeLNJunior/playlist-suggestion/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/playlist-suggestion?color=lgreen)](https://github.com/JorgeLNJunior/playlist-suggestion/releases)

</div>

<div align="center">

[**API »**](https://playlist-suggestion.herokuapp.com/)

</div>

## Tabela de Conteúdos
* [Sobre o Projeto](https://github.com/JorgeLNJunior/playlist-suggestion#sobre-o-projeto)
* [Rotas](https://github.com/JorgeLNJunior/playlist-suggestion#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/playlist-suggestion#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/playlist-suggestion#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/playlist-suggestion#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/playlist-suggestion#instala%C3%A7%C3%A3o)
* [Licença](https://github.com/JorgeLNJunior/playlist-suggestion#licen%C3%A7a)

## Sobre o Projeto
Aplicação do [**backend challenge »**](https://github.com/ifood/vemproifood-backend) do ifood que sugere uma playlist com base na temperatura atual de uma cidade.


## Rotas

Informações básicas sobre as rotas da aplicação.
| HTTP   | Rota           | Descrição                    | Parâmetros             |
|--------|----------------|------------------------------|------------------------|
| GET    | /suggestion?   | sugere uma playlist          | cityName ou lat e lon  |

## Tecnologias
Este projeto foi construído com as seguintes tecnologias:
- [Node.js »](https://nodejs.org)
- [Express.js »](https://expressjs.com)
- [Typescript »](https://www.typescriptlang.org/)
- [Jest »](https://jestjs.io)
- [Travis CI »](https://travis-ci.org)

## Instalação e configuração
### Requisitos
  - [Node.js »](https://nodejs.org/en/download) na sua versão 12.x
  - Client ID e Client Secret da API do [**Spotify »**](https://developer.spotify.com/dashboard/applications)
  - Uma key da [**Open Weather API »**](https://openweathermap.org/api)

### Instalação
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/playlist-suggestion.git`
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env` e insira as chaves de API (exceto a variável `SPOTIFY_ACCESS_TOKEN`)
  4. Para iniciar a aplicação execute `npm start:dev`, para os testes execute `npm test`

## Licença
Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/typescript-project/blob/master/LICENSE.md)

