// Função para exibir o pop-up
function showPopup() {
    document.getElementById("uploadPopup").style.display = "block";
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById("uploadPopup").style.display = "none";
}

// Função para adicionar ou atualizar aplicativos
function addOrUpdateApp() {
    const appName = document.getElementById("appName").value;
    const appLink = document.getElementById("appLink").value;

    // Verificar se os campos estão preenchidos
    if (!appName || !appLink) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Verificar se o link inserido é válido
    const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(appLink);
    if (!validURL) {
        alert("Por favor, insira um URL válido!");
        return;
    }

    // Salvar no localStorage
    let apps = JSON.parse(localStorage.getItem('apps')) || [];
    apps.push({ name: appName, link: appLink });
    localStorage.setItem('apps', JSON.stringify(apps));

    // Adiciona o aplicativo à tabela
    addAppToTable(appName, appLink);

    // Limpar os campos e fechar o pop-up
    document.getElementById("appName").value = "";
    document.getElementById("appLink").value = "";
    closePopup();
}

// Função para carregar os aplicativos salvos no localStorage
function loadApps() {
    const apps = JSON.parse(localStorage.getItem('apps')) || [];

    apps.forEach(app => {
        addAppToTable(app.name, app.link);
    });
}

// Função auxiliar para adicionar um aplicativo à tabela
function addAppToTable(appName, appLink) {
    const table = document.getElementById("appTable").getElementsByTagName("tbody")[0];
    const row = table.insertRow();

    const nameCell = row.insertCell(0);
    const linkCell = row.insertCell(1);
    const actionCell = row.insertCell(2);

    nameCell.innerHTML = appName;
    linkCell.innerHTML = `<a href="${appLink}" target="_blank">Baixar</a>`;
    actionCell.innerHTML = `<button onclick="deleteApp(this)">Excluir</button>`;
}

// Função para excluir um aplicativo da tabela e do localStorage
function deleteApp(button) {
    const row = button.parentElement.parentElement;
    const appName = row.cells[0].innerText;

    // Remover do localStorage
    let apps = JSON.parse(localStorage.getItem('apps')) || [];
    apps = apps.filter(app => app.name !== appName);
    localStorage.setItem('apps', JSON.stringify(apps));

    // Remover da tabela
    row.remove();
}

// Carregar os aplicativos ao iniciar
window.onload = loadApps;