// ce sont des selections des balise html 7awelt ennawa3 fi comment selectonner les balises
const addButton=document.querySelector('#addButton')
const Titre=document.getElementById('Titre')
const addedCard=document.getElementById('addedCard')
const textarea=document.getElementById('textarea')
const template=document.querySelector('#template')
const cardChanger=document.getElementById('cardChanger')
const deleteButton=document.querySelector('.buttonDelete')
const templateModifier=document.getElementById('templateModifier')
const div=document.querySelector('.cardChange')
//compteur pour donner a chaque elemnt un id different
let s=0
let r=0
const hideUpdateCard=(cardOfUpdate,titleSelected,textareaSelected)=>{
    // acceder au input et textarea qui contient les modifications qui sont les fils du cardOfUpdate
    const inputChange=cardOfUpdate.childNodes[1].childNodes[1]
    const textAreaOfUpdate=cardOfUpdate.childNodes[1].childNodes[3]
    // inserer les nouveaux information dans l'ancien card
    titleSelected.textContent=`${inputChange.value}`
    textareaSelected.textContent=` ${textAreaOfUpdate.value} `
    //supprimer la card de la modification
    cardOfUpdate.remove()
    // retourner le compteur a zero pour que remove ne fait pas un erreur
    r=0
}


const afficherUpdateCard=(titleSelected,textareaSelected)=>{
    /* tout ca est fait pour effacer la redondance du carte de update car si j'appuis pour faire la mise a jour d'un element
    et je suis entraint de faire la mise a jour d'un autre element il va etre afficher donc ceci va effacer la card du mise
    a jour en utilisant un id */
    
    if(r>0){
    const cardOfChangerRemove=document.getElementById(`cardOfChanger${r}`)
    cardOfChangerRemove.remove()
    }
    
    r=r+1
    // on va faire une copie du modele qui se trouve dans la balise template
    const clone=document.importNode(templateModifier.content,true)
    // on va selectionner les balise html
    const buttonOfUpdateCard=clone.querySelector('#buttonOfUpdateCard')
    const cardOfUpdate=clone.querySelector('#cardOfChanger')
    const textAreaOfUpdate=clone.querySelector('.textarea2')
    const inputChange=clone.querySelector('.inputChange')
    const cardOfChanger=clone.querySelector('#cardOfChanger')
    // on va donner la valeur de l'input et le textarea , les valeur sont ce des card selectionner 
    inputChange.value=titleSelected.textContent
    textAreaOfUpdate.value=textareaSelected.textContent
    // donner au card un id pour pouvoir effacer la card aprés
    cardOfChanger.setAttribute('id',`cardOfChanger${r}`)
    // ajouter un evennement au button on a fait passer la balise du titre ou on va placer le titre modifier
    // et de memes pour le text area pour la card quand va la supprimée
    buttonOfUpdateCard.addEventListener('click',() => hideUpdateCard(cardOfUpdate,titleSelected,textareaSelected))
    // on ajoute le clone dans le document
    div.appendChild(clone)
   }


   const supprimerElement=(card)=>{
    // puisque on a passer le div quand a cloner qui contient tous les balises html on peut le suprimer facilement
      card.remove()
   }



const addCard = () => {
    s=s+1
    // on va cloner la temlate 
    const clone=document.importNode(template.content,true)
    //on va chercher les buttons
    const buttonUpdateTemplate=clone.querySelector('.buttonUpdate')
    const buttonDeleteTemplate=clone.querySelector('.buttonDelete')
    // on va chercher le titre
    const header=clone.querySelector('.card-header')
    // on va chercher le titre et la card
    const description=clone.querySelector('.card-text')
    const petitCard=clone.querySelector('.deletecard')
    // on va inserer le contenu demander
    header.textContent=`${Titre.value}`
    description.textContent=` ${textarea.value} `
    // on va donner des id pour distinguer les boutton ajouter (c pour moi on peut les effacées)
    buttonUpdateTemplate.setAttribute('id',`updateButton${s}`)
    petitCard.setAttribute('id',`petitCard${s}`)
    header.setAttribute('id',`header${s}`)
    description.setAttribute('id',`desc${s}`)
    //on va ajouter des modification dés quand clique sur l'un des buttons
    buttonUpdateTemplate.addEventListener('click',() => afficherUpdateCard(header,description))
    buttonDeleteTemplate.addEventListener('click',() => supprimerElement(petitCard))
    // on ajoute le clone dans le document
    addedCard.appendChild(clone)
    // vider l'input et le text area du derniére informations
    textarea.value=''
    Titre.value=''
}


addButton.addEventListener('click',() => addCard())