const express = require('express');
const cors = require('cors');
const TrackingCorreios = require('tracking-correios');
const app = express();
app.use(cors());

const PORT = 3001;

const get = (object, path, fallback = null) => {
    const pathKeys = typeof path === "string" ? path.split(".").filter(key => key.length) : [];
    const result = pathKeys.reduce((dive, key) => dive && dive[key], object);
    return result || fallback;
  };

app.get('/', (req, res) => { 
    const tracking = get(req, 'query.tracking')


    TrackingCorreios.track(tracking)
    .then((result)=>{

        const events = get(result, '0.evento');

        res.json({message: 'OK', tracking, events});
    })
    .catch((error)=>{
        res.json({message: 'error', error});
    });
    
});

app.listen(PORT, () => console.log('listening on port' + PORT));





Oque é

Git é um sistema de controle de versão de arquivos. Através deles podemos desenvolver projetos na qual diversas
 pessoas podem contribuir simultaneamente no mesmo, editando e criando
 novos arquivos e permitindo que os mesmos possam existir sem o risco de suas alterações serem sobrescritas

O Git é um sistema de controle de versão utilizado pela grande maioria dos desenvolvedores atualmente.
Com ele podemos criar um histórico de alterações no código e facilmente voltar para um desses pontos de alterações

Além disso, o Git ajuda muito a controlar o fluxo de novas funcionalidades entre vários desenvolvedores
no mesmo projeto e ajuda na resolução de conflitos quando o mesmo arquivo é editado
por mais de uma pessoa em funcionalidades diferentes.


Pra que serve

 ex de uso: Seu chefe pediu para você deletar uma funcionalidade do sistema
 que não é utilizada. Após 3 meses ele decidiu que quer essa funcionalidade de volta.
 Com o git é possivel voltar e ver entre as alterações quais métodos foram apagados em x data.



parte técnica:

comandos do git:

git branch: O comando git branch permite criar, listar, renomear e excluir ramificações.

git commit: descreve e cria um histórico de alteração no código

git checkout: utilizado para mover-se entre os ramos/branch

cherry-pick

comandos para reverter mudanças
git reset: indicado pra reverter localmente
git revert: cria um novo commit com a alteração do próprio removida. é possivel dar um push e compartilhar

rebase: forma de combinar trabalho entre ramos. diferente do merge, rebase faz uma copia do commit e o coloca em outro 
lugar deixando-os em uma sequencia linear e mais organizada

merge: mescla o projeto, geralmente é utilizado para colocar um ramo/branch na main

head: seu local atual


oque é hash, um codigo que leva ao commit

-f utilizado para mover a branch

