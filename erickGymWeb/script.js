const tabelaAlunos = document.getElementById('tabela-alunos')
const cx_nome = document.getElementById('aluno-nome')
const cx_foto = document.getElementById('aluno-foto')
const cx_sexo = document.getElementById('aluno-sexo')
const cx_dt_nasc = document.getElementById('aluno-dt-nasc')
const cx_telefone = document.getElementById('aluno-telefone')
const cx_cpf = document.getElementById('aluno-cpf')
const btnCadastroAluno = document.getElementById('btn-cadastro-aluno')
const API_URL_aluno = 'https://erickgym.onrender.com/aluno/api'

function main(){
    
}

async function carregarAlunos(){
    await fetch(API_URL_aluno).then(async response => {
        if (response.status === 200){
            const alunos = await response.json()
            for (let aluno in alunos){
                adicionarAlunoTabela(aluno)
            }
        }
    })
}

async function salvarAluno(){
    nome = cx_nome.value
    foto = cx_foto.value
    sexo = cx_sexo.value
    data_nascimento = cx_dt_nasc.value
    telefone = cx_telefone.value
    cpf = cx_cpf.value

    const dados = {nome, foto, sexo, data_nascimento, telefone, cpf}

    const config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    }

    await fetch(API_URL_aluno, config).then(async response =>{
        if (response.status === 201){
            const aluno = await response.json()
            adicionarAlunoTabela(aluno)
            alert('aluno cadastrado com sucesso')
        }
        else{
            alert(`${response.status} erro ao cadastrar aluno`)
        }
    })
}

async function apagarAluno(id){
    const config = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'applications/json'
        }
    }

    await fetch(`${API_URL_aluno}/deletar/${id}`, config).then(response => {
        if (response.status >=200 && response.status <= 300){
            alert('Deletado com sucesso')
        }
        else{
            alert(`${response.status} erro ao deletar`)
        }
    })
}

async function iniciarModificarAluno(id){
    window.location.href = 'cadastro-aluno.html'

    await fetch(`${API_URL_aluno}/obter/${id}`)
}


function adicionarAlunoTabela(aluno){
    const row = document.createElement('tr')
    const nome = document.createElement('td')
    const foto = document.createElement('td')
    const sexo = document.createElement('td')
    const data_nasc = document.createElement('td')
    const telefone = document.createElement('td')
    const cpf = document.createElement('td')
    const modificar = document.createElement('td')
    const deletar = document.createElement('td')

    nome.innerText = `${aluno.nome}`
    foto.innerText = `${aluno.foto}`
    sexo.innerText = `${aluno.sexo}`
    data_nasc.innerText = `${aluno.data_nascimento}`
    telefone.innerText = `${aluno.telefone}`
    cpf.innerText = `${aluno.cpf}`
    modificar.innerHTML = `<button class="btn btn-warning" onclick="iniciarModificarAluno(${aluno.id})"><i class="fa-solid fa-pen-to-square"></i></button>`
    deletar.innerHTML = `<button class="btn btn-danger" onclick="apagarAluno(${aluno.id})"><i class="fa-solid fa-trash"></i></button>`


    row.appendChild(nome)
    row.appendChild(foto)
    row.appendChild(sexo)
    row.appendChild(data_nasc)
    row.appendChild(telefone)
    row.appendChild(cpf)
    row.appendChild(modificar)
    row.appendChild(deletar)

    tabelaAlunos.appendChild(row)
}