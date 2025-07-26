[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Demo CSV

Este projeto é uma aplicação desenvolvida para análise de dados massivos de empresas, disponíveis em arquivos CSV. A finalidade do projeto é coletar e filtrar informações sobre as coordenadas de cada cidade para calcular a distância entre a cidade em que a empresa foi instalada e as quatro cidades mais populacionais do estado.

## Pré-requesitos

Para executar este projeto, é necessário ter um servidor MySQL instalado e configurar um usuário apropriado. Além disso, é preciso ter o Node.js instalado em seu sistema.

### Instalando e Configurando o MYSQL no Linux (Debian-based)

Para instalar o MySQL em seu sistema, execute o seguinte comando::

```shell
sudo apt install mysql-server
```

Inicie o servidor MySQL com o seguinte comando:

```shell
sudo /etc/init.d/mysql start
```

Após iniciar o servidor do MySQL, execute os prompts de segurança com o comando:

```shell
sudo mysql_secure_installation
```

Para criar um usuário e conceder privilégios, siga os seguintes passos:

1. Faça login como root:
```shell
sudo mysql -u root -p
```

2. Crie um usuário e substitua o <'username'> e o <'password'> com seus dados:
```shell
mysql> CREATE USER '<username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
```

3. Conceda privilégios para esse usuário (pode conceder menos privilégios se quiser):

```shell
mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD, CREATE VIEW on *.* TO '<username>'@'localhost' WITH GRANT OPTION;
```

4. Saia do usuário root e logue com o usuário que acabou de criar. Crie um banco de dados com o script disponivel no arquivo [democsv.sql](https://github.com/NilloGabriel/demo-csv/blob/main/database/democsv.sql):

```shell
mysql> quit
$ mysql -u <username> -p
Enter password: ***
mysql> CREATE DATABASE democsv...
```

## Credenciais 

Crie um arquivo .env na raíz do projeto e informe as credenciais utilizando o padrão:

```
DATABASE_HOST=""
DATABASE_USERNAME=""
DATABASE_PASSWORD=""
DATABASE_NAME=""
```

## Instalando dependências do projeto

```shell
$ npm i
```

## Rodando o projeto

```shell
$ npm start
```
  
