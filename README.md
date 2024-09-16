# CompassCar - Sistema de Aluguel de Automóveis

## Visão Geral

A Compass.UOL está ingressando em um novo ramo de mercado com a criação da CompassCar, uma empresa dedicada ao seguimento de locação de veículos.

### Principais Recursos:

- **Registro de veículos**: informações como marca, modelo, ano e itens relacionados.
- **Listagem de veículos**: Oferece paginação e filtros baseados em marca, modelo e ano.
- **Consulta por ID**: Obtém veículo específico.
- **Atualização de veículos**: modifica as informações de um veículo.
- **Remoção de veículos**: Exclui um veículo.

## Tecnologias Utilizadas

- MySQL
- Node.js
- Express
- Postman 
- Validação e gerenciamento de erros
- Conformidade com o padrão semântico para commits

## Requisitos

Antes de iniciar o projeto localmente, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

#como utilizar a API

### 1. Clone o Repositório

```bash
git clone https://github.com/Gabreel-Araujo/compassCar.git

cd compasscar
```
#Instale todas as dfependências
###no terminal coloque o comando
```npm install```
# Configure o banco de dados
###crie uma base de dados chamado compasscar no mysql

#Em seguida crie as tabelas

# Configure as credênciais do node para se conectar ao banco de dados
###Depois de conectado inicie o servidor com <h4>npm run star </h4> 

## Para testear a API, Precisará do POSTMAN
### Instale o postman
### coloque o endpoint que deseja (post, get, get Id, patch e delete)
###passando neste formato, por exemplo
####localhost:3000/api/v1/cars
####no corpo da requisição coloque:
```{
    "brand": "Chevrolet",
    "model": "Corsa",
    "year": 2017,
    "items": [
        "Câmbio automático",
        "Direção Hidráulica",
        "Trava Elétrica"
    ]
}
```
#### E em seguida faça a requisição

