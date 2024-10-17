// Função para cadastrar cliente
document.getElementById('clientForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const numeroString = document.getElementById('numero').value
    const numeroint = parseInt(numeroString);
    const formData = {
        name: document.getElementById('name').value,
        rg: document.getElementById('rg').value,
        // date_birth: document.getElementById('date_birth').value,
        type: document.getElementById('type').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        situation: document.getElementById('situation').checked,
        telefone: document.getElementById('telefone').value,
        celular: document.getElementById('celular').value,
        cep: document.getElementById('cep').value,
        logradouro: document.getElementById('logradouro').value,
        numero: numeroint,
        complemento: document.getElementById('complemento').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value
    };
    console.log(typeof(formData.numero));


    try {
        const response = await fetch('https://consumindo-api-render.onrender.com/erp/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            document.getElementById('clientForm').reset();
        } else {
            alert('Erro ao cadastrar cliente.');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função para obter clientes
document.getElementById('getClients').addEventListener('click', async function () {
    try {
        const response = await fetch('https://consumindo-api-render.onrender.com/erp/cliente');
        const data = await response.json();
        // console.log(clients);
        const clients = data.clientes
        
        const clientList = document.getElementById('clientList');
        clientList.innerHTML = ''; // Limpar a lista anterior
        if(Array.isArray(clients)) {
            clients.forEach(client => {
                const clientDiv = document.createElement('div');
                clientDiv.classList.add('client');
                clientDiv.innerHTML = `
                    <p>Nome: ${client.name}</p>
                    <p>Email: ${client.email}</p>
                    <p>CPF: ${client.cpf}</p>
                    <hr>
                `;
                clientList.appendChild(clientDiv);
            }); 
        }

    } catch (error) {
        console.error('Erro:', error);
    }
});
