# Demo CSV

Aplicação que analisa dados de empresas que estão disponíveis em uma base de dados csv.

## Pré-requesitos

Você precisa de um servidor mysql instalado e configurar um usuário apropriado para executar o projeto. Também é preciso ter o nodejs instalado.

### Instalando e Configurando o MYSQL no Linux (Debian-based)

Instale o MYSQL:

```shell
sudo apt install mysql-server
```

Inicie o servidor do MYSQL:

```shell
sudo /etc/init.d/mysql start
```

Logo depois de iniciar o servidor do MySQL, execute os prompts de segurança do mysql, basta digita o comando:

```shell
sudo mysql_secure_installation
```

Faça login como root e adicione um usuário:

```shell
sudo mysql -u root -p
```

```shell
$ mysql -uroot
mysql> CREATE USER '<username>'@'localhost' IDENTIFIED WITH mysql_native_password BY '<password>';
```

Após criar o usuário preencha o <'username'> e o <'password'> no arquivo [database.js](https://github.com/NilloGabriel/demo-csv/blob/main/database/database.js).

Conceda privilégios para esse usuário (pode conceder menos privilégios se quiser):


```shell
mysql> GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD, CREATE VIEW on *.* TO '<username>'@'localhost' WITH GRANT OPTION;
```

Saia do usuário root, logue com o usuário que acabou de criar, e crie um banco de dados com o script disponivel no arquivo [democsv.sql](https://github.com/NilloGabriel/demo-csv/blob/main/database/democsv.sql):

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
$ node app.js
```




