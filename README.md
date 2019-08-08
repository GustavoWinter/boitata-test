# boitata-test


A Single Page Application, com o intuito de consumir um endpoint e mostrar os Posts derivados desta request. Sendo possível interagir com a mesma, através de:
- Filtros
- Pesquisa
- Criação de Post

### Setup

- Node
- Yarn
- Run the Project

**Node**

Accesse o [link](https://nodejs.org/en/download/) para baixar a versão atual do node 10.16.
_Escolha a sua plataforma_

**Yarn**

Siga o tutorial oficial do _Yarn_ para baixar a versão atual da ferramenta 1.17.
[tutorial](https://yarnpkg.com/lang/en/docs/install/#debian-stable)

**Run the project**

Tendo o Node e o Yarn instalados no computador você poderá utilizar um dos seguintes browser para testar **(IEegde+, Chrome e FF)**

No terminal rode os seguintes comandos:

- `yarn install`
- `yarn start`

Abra seu browser na url: `http://localhost:8080/`

#### Improvements

- Adicionar Motion a interface
- Edição de posts
- LocalStorage para os dados persistirem após reload
- Inverter ordem dos resultados dos filtros `(default: maior para o menor)`


### Features

- Filtros
 
 A aplicação possui 3 tipos de filtros, sendo eles ordenados do `maior para o menor/ mais recente para o menos recente`.
 
 **Date:** Irá ordenar os Posts em forma decrescente baseado na data em que o posts foi realizado.
 **Comentários:** Irá ordenar os Posts em forma decrescente baseado no numero de comentários.
 **Votes:** Irá ordenar os Posts de forma decrescente, baseando-se na popularidade de cada post `Up Vote number`
 
 **Obs.:** Os filtros iram funcionar em conjunto com o _Search_, assim, quando uma pesquisa for utilizada em conjunto com o filtro o resultará está ordenado pelo filtro selecionado.
 
 **Reset option** Irá retornar a lista de post ao estado original
 
 - Search bar
 
 A busca de posts funcionará da seguinte maneira: Caso a palavra/texto digitado esteja presente em algum dos campos do post o mesmo será retornado na pesquisa.
 **Campos que fazem parte da pesquisa:** Nome do Author, URL do Post, Conteúdo do Post, numero de comentários, numero de votos.
 
 **Obs.:** Caso não seja encontrado nenhum item durante a busca, uma mensagem de erro irá aparecer na tela, informando que a busca não teve resultados.
 
 - Criação de Posts
 
 Posts podem ser criado apenas para o usuário em questão, para isto será usado um usuário mockado. `não está implementado sistema de login/logout`
 
 Usuário Mockado: **Danil Ishutin**
 
 Durante a criação do Post será possível escolher uma das categorias já existentes, adicionar url do post e contéudo do mesmo.

