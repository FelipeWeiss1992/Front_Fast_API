var api_url = 'http://localhost:8000/api/V1/usuarios';


//funcao para pegar todos
function get_all(){
   //Fetch metodo JavaScript para acessar e manipular HTTP, tais como os pedidos e respostas.
   fetch(api_url)


   .then(response => response.text())
   .then(function(text) {
   //variavel body acessando o documento, html manipulando tag tbodyusuarios
     let tbody = document.getElementById('tbody-usuarios');
   //variavel let dados convertendo text para json
     let dados = JSON.parse(text);
   //tbody innerHtml recebe uma lista vazia
     tbody.innerHTML = '';

   //variavel dados que recebe o nosso texte entra em um foreach
   //criamos variavel de usuario
     dados.forEach(usuario => {
       //tbody inner html incrementando dados convertidos para incrementar nos hmtl
       tbody.innerHTML += ` <tr>
           <td>${usuario.id}</td>
           <td>${usuario.nome}</td>
           <td>${usuario.email}</td>
           <td class="alinhar__direita">
               <a href="usuarios_save.html?id=${usuario.id}">Editar</a> |
               <button onclick='remove(${usuario.id})'>Deletar</button>
           </td>
       </tr>
       `;
     });
   });
}


//Buscar por aluno
function search(){
   var api_url = 'http://localhost:8000/api/V1/usuarios'
   //variavel id usuario acessando documento html acessando campo idbuscae seu valor
   let id_usuario = document.getElementById('id-busca').value;
   //imprimindo id_usuario
   console.log(id_usuario)
   // se id usuario for diferente de vazio
   if(id_usuario != ''){
       //acesse api url da nossa string
       api_url = `${api_url}/${id_usuario}`
   }
   else{
       return;
   }


   fetch(api_url)
   .then(response => response.text())
   .then(function(text) {
     let tbody = document.getElementById('tbody-usuarios');     
     let usuarios = JSON.parse(text);
     console.log(usuarios);    
     
     tbody.innerHTML = ` 

        <tr>
       <td>${usuarios.id}</td>
       <td>${usuarios.nome}</td>
       <td>${usuarios.email}</td>
       <td class="alinhar__direita">
           <a href="usuarios_save.html?id=${usuarios.id}">Editar</a> |
           <button onclick='remove(${usuarios.id})'>Deletar</button>
       </td>
     </tr>`;
   });
}

// ela realiza uma busca de usuarios por id e retorna usuarios Json
function get_by_id(id_usuarios){
   let usuarios = fetch(`${api_url}/${id_usuarios}`)
   .then(response => response.text())
   .then(function(text) {    
     return JSON.parse(text);
   });   
   return usuarios;
}


function load_usuarios(id_usuarios){
   get_by_id(id_usuarios).then(usuarios =>{
       document.getElementById("id").value = usuarios.id;
       document.getElementById("nome").value = usuarios.nome;
       document.getElementById("email").value = usuarios.email;
   });
 
}



//Botao salvar tanto para criar quanto editar
function usuarios_save(){
   let id = document.getElementById("id").value;
   let nome = document.getElementById("nome").value;
   let email = document.getElementById("email").value;
      
   if(id != ''){
       console.log('editar')
       usuarios = {"id":id, "nome": nome, "email": email}
       update(usuarios);
   }
   else{
       usuarios = {"nome": nome, "email": email}
       create(usuarios);
   }       
}


function update(usuarios){
   let mensagem = document.getElementById("mensagem");
   fetch(`${api_url}/${usuarios.id}`,{
       method: 'PUT',
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
       },
       body: JSON.stringify(usuarios)
   })
   .then(response => {
       if(response.status == 202){
           mensagem.innerHTML = "Alterado com sucesso";
       }else{
           mensagem.innerHTML = "Erro";
       }
   })
}


function create(usuarios){
   let mensagem = document.getElementById("mensagem");
   fetch(api_url,{
       method: 'POST',
       headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
       },
       body: JSON.stringify(usuarios)
   })
   .then(response => {
       if(response.status == 201){
           mensagem.innerHTML = "Criado com sucesso";
       }else{
           mensagem.innerHTML = "Erro";
       }
   })
}


function remove(id){
   fetch(`${api_url}/${id}`,{
       method: 'DELETE',
       headers: {
           'Accept': 'application/json'
       }
   })
   .then(response => {
       if(response.status == 204){
           get_all();
       }else{
           alert("Erro");
       }
   })
}
