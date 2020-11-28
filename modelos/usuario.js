class Usuario {   
    constructor(nome, ra, senha) {
        this.nome = nome;
        this.ra = ra;
        this.senha = senha; 
    }
    
    // CRUD ------------------------------------------------------------------------------------------------
    salvar() {
        var nome = this.nome;
        var ra = this.ra;
        var senha = this.senha;
        db.transaction(function(armazenar) {
            armazenar.executeSql("INSERT INTO users (nome, ra, senha) VALUES (?, ?, ?)", [nome, ra, senha]);
        });
        alert("Cadastro concluído com sucesso!");
        setTimeout(() => {  window.location.replace("tela_principal.html"); }, 500);  
    }

    deletar() {
        let id = localStorage.getItem('id');
        db.transaction(function (apagar) {
            apagar.executeSql(`DELETE FROM users WHERE id = '${id}'`, []);
        });
        localStorage.clear();
        setTimeout(() => {  window.location.replace("login.html"); }, 2000);    
    }

    atualizar() {
        var nome = document.getElementById('name').value;
        var ra = document.getElementById('ra').value;
        var senha = document.getElementById('senha').value;
        
        if(nome == "" && ra == "" && senha == "") alert('Nenhum valor inserido');
        if(nome != "" && ra == "" && senha == "") {
            db.transaction(function(atualiza) {
                atualiza.executeSql(`UPDATE users SET nome = '${nome}' WHERE id = '${localStorage.getItem('id')}'`, []);
            });
            localStorage.setItem('nome', nome);
        } else if(nome != "" && ra != "" && senha == "") {
            db.transaction(function(atualiza) {
                atualiza.executeSql(`UPDATE users SET nome = '${nome}', ra = '${ra}' WHERE id = '${localStorage.getItem('id')}'`, []);
            });
            localStorage.setItem('nome', nome);
            localStorage.setItem('ra', ra);
        } else if(nome != "" && ra != "" && senha != "") {
            db.transaction(function(atualiza) {
                atualiza.executeSql(`UPDATE users SET nome = '${nome}', ra = '${ra}', senha = '${senha}' WHERE id = '${localStorage.getItem('id')}'`, []);
            });
            localStorage.setItem('nome', nome);
            localStorage.setItem('ra', ra);
            localStorage.setItem('senha', senha);
        }
    }

    mostraDados() {
        document.getElementById('nome').innerHTML = localStorage.getItem('nome');
        document.getElementById('ra').innerHTML = localStorage.getItem('ra');
        document.getElementById('senha').innerHTML = localStorage.getItem('senha');
    }

    // LOGIN ------------------------------------------------------------------------------------------------
    logar() {        
        var nome = this.nome;
        var ra = this.ra;
        var senha = this.senha;        
        db.readTransaction(function(transaction) {
            transaction.executeSql(`SELECT * FROM users WHERE nome='${nome}' and ra = '${ra}' and senha ='${senha}'`, 
            [], 
            function(transaction, result) {
                if (result != null && result.rows != null) {
                    if (result.rows.length == 0) {
                         alert('Credenciais erradas!');
                    }else{
                        let id_atual;
                        let nome_atual;
                        let ra_atual;
                        let senha_atual;
                         for ( var i = 0; i < result.rows.length; i++) {                         
                             id_atual = result.rows.item(i).id; 
                             nome_atual = result.rows.item(i).nome;
                             ra_atual = result.rows.item(i).ra;
                             senha_atual = result.rows.item(i).senha;
                             console.log('Yeah! row id = '+id_atual);
                         }               
                         localStorage.setItem('id', id_atual); 
                         localStorage.setItem('nome', nome); 
                         localStorage.setItem('ra', ra);
                         localStorage.setItem('senha', senha); 
                         window.location.replace("tela_principal.html");
                     }
                 }
            });
        });
    }

    // LOGOUT ------------------------------------------------------------------------------------------------
    logout() {
        localStorage.clear();
        window.location.replace("login.html");
    }
}