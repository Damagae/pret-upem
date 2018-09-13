import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ConventionPDF extends Component {
    constructor(props) {
      super(props)
      this.state = {
        convention: this.props.convention,
        user: this.props.user
      }

      const validations = this.props.convention.validations
      let v = {
        enseignant: validations.find(e => e.type.nom === 'enseignant'),
        agent: validations.find(e => e.type.nom === 'agent'),
        delegataire: validations.find(e => e.type.nom === 'delegataire'),
        reserve: validations.find(e => e.type.nom === 'reserve'),
        remise: validations.find(e => e.type.nom === 'remise')
      }
      this.state.validations = v
    }

    /* Transforme un format de date aaaa-mm-jj en jj/mm/aaaa */
    dateFormate(d) {
      const date = new Date(d)
      const j = date.getDate()
      const m = (date.getUTCMonth() + 1)
      const a = date.getUTCFullYear()
      return ("0" + j).slice(-2) + '/' + ("0" + m).slice(-2) + '/' + a
    }

    getDeletionUserName(deletion) {
      if (deletion.user) {
        return user.nom
      } else {
        return "l'étudiant"
      }
    }

    renderMateriel(materiel) {
      return materiel.map(e => {
        return (
          <li key={e.id}> {e.nom} ({e.quantite})</li>
        )
      })
    }

    renderDocument(url) {
      let urlSplit = url
      let extension = urlSplit.split('.').pop()
      if (extension === 'pdf') {
        return <iframe src={url} title="your_title" align="top" height="620" width="100%" frameborder="0" scrolling="auto" target="Message"></iframe>
      } else {
        return <img href={url} width="100%"></img>
      }
    }

    render() {
      const c = this.state.convention
      const u = this.state.user
      const v = this.state.validations

      const h = {
        marginBottom: 0,
        textAlign: 'right'
      }

      const h2 = {
        fontSize: 1.6 + 'rem'
      }

      const h3 = {
        fontSize: 1 + 'rem'
      }

      const subtitle = {
        paddingTop: 4 + 'px',
        fontSize: 1.2 + 'rem',
        fontWeight: 'bold',
        color: '#EA5A0B'
      }

      const right = {
        textAlign: 'right'
      }

      const etat = {
        fontWeight: '500',
        textAlign: 'right'
      }

      const tr = {
        verticalAlign: 'top',
        width: '100%'
      }

      const header = {
        verticalAlign: 'bottom',
        width: 100 + '%'
      }

      const title = {
        fontWeight: '600',
        fontSize: 0.8 + 'rem'
      }

      const largeTitle = {
        fontWeight: '600',
        fontSize: 0.8 + 'rem',
        width: 170 + 'px'
      }

      const p = {
        fontSize: 0.8 + 'rem'
      }

      const page = {
        minHeight: '97%'
      }

      return (
        <div>
          <div style={page}>
            <table width="100%">
              <tbody>
              <tr style={header}>
                <td>
                  <div>
                    <img src="https://www.u-pem.fr/charte-graphique/fileadmin/public/UPEMLV/charte-graphique/download/logos/upem/UPEM_LOGO_EDITION300DPI.png" width="140px"></img>
                    <div style={subtitle}>Prêt audiovisuel</div>
                  </div>
                </td>
                <td style={right}>
                  <h1 style={h}>Convention {c.num_eng}</h1>
                  <div style={etat}>{c.etat.nom}</div>
                </td>
              </tr>
            </tbody>
            </table>
            <h2 style={h2}>UPEM</h2>
            <table cellPadding="8">
              <tbody>
              <tr style={tr}>
                <td style={title}>Nom :</td>
                <td style={p}>Université PARIS-EST MARNE-LA-VALLEE, Etablissement Public à Caractère Scientifique, Culturel et Professionnel</td>
                <td style={title}>Adresse :</td>
                <td style={p}>Cité Descartes, Champs-sur-Marne, 5 boulevard Descartes, 77454 Marne-la-Vallée Cedex 2 </td>
              </tr>
              <tr style={tr}>
                <td style={title}>Président :</td>
                <td style={p}>Monsieur Gilles ROUSSEL, Agissant au nom et pour le compte du Campus Numérique</td>
                <td style={title}>Représentant du Campus Numérique :</td>
                <td style={p}>Monsieur Feriel GOULAMHOUSSEN</td>
              </tr>
              </tbody>
            </table>
            <h2 style={h2}>Emprunteur</h2>
            <table cellPadding="8">
              <tbody>
              <tr style={tr}>
                <td style={title}>Nom :</td>
                <td style={p}>{u.nom}</td>
                <td style={title}>Prénom :</td>
                <td style={p}>{u.prenom}</td>
              </tr>
              <tr style={tr}>
                <td style={title}>Adresse :</td>
                <td style={p}>{c.emprunteur_adr}<br/>{c.emprunteur_ville} {c.emprunteur_postal}</td>
                <td style={largeTitle}>Etudes poursuivies :</td>
                <td style={p}>{c.emprunteur_formation}</td>
              </tr>
              <tr style={tr}>
                <td style={title}>Nom de l'assurance :</td>
                <td style={p}>{c.assurance_nom}</td>
                <td style={title}>Numéro de police :</td>
                <td style={p}>{c.assurance_num}</td>
              </tr>
            </tbody>
            </table>
            <h2 style={h2}>Fiche de prêt</h2>
            <table cellPadding="8">
              <tbody>
              <tr style={tr}>
                <td style={title}>Nom du projet :</td>
                <td style={p}>{c.nom_projet}</td>
                <td style={title}>Etudiants participants :</td>
                <td style={p}>{c.membres_equipe}</td>
              </tr>
              <tr style={tr}>
                <td style={title}>Enseignant responsable :</td>
                <td style={p}>{c.enseignant_nom}</td>
                <td style={largeTitle}>Bureau de prêt :</td>
                <td style={p}>{c.bureaupret.nom}</td>
              </tr>
              <tr style={tr}>
                <td style={title}>Numéro de téléphone de l'emprunteur :</td>
                <td style={p}>{c.emprunteur_tel}</td>
                <td style={p}></td>
                <td style={p}></td>
              </tr>
              <tr style={tr}>
                <td style={title}>Date de début :</td>
                <td style={p}>{this.dateFormate(c.date_debut)}</td>
                <td style={title}>Date de fin :</td>
                <td style={p}>{this.dateFormate(c.date_fin)}</td>
              </tr>
              <tr style={tr}>
                <td style={title}>Matériel :</td>
                <td height="160px" style={p}>
                  <ul>
                    { c.materiel && this.renderMateriel(c.materiel) }
                  </ul>
                </td>
              </tr>
            </tbody>
            </table>
          </div>
          <div style={page}>
            <h2 style={h2}>Convention de prêt de l'UPEM</h2>
              <div>
                <h3 style={h3}>Article 1 – Objet</h3>
                <p style={p}>
                  La présente convention a pour objet de déterminer les modalités particulières d’usage du matériel dont l’<strong>UPEM</strong>, propriétaire, accepte de consentir le prêt à l’<strong>emprunteur</strong>. Cet emprunt est accordé à titre gratuit par l’<strong>UPEM</strong> à l’<strong>emprunteur</strong>.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 2 – Désignation du(des) matériel(s) prêté(s)</h3>
                <p style={p}>
                  Les matériels informatiques et audiovisuels prêtés sont détaillés dans la liste de prêt précisée dans la demande d'emprunt (partie "Matériel").
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 3 – Conditions et modalités d'emprunt</h3>
                <p style={p}>
                  Le prêt de matériels informatiques et audiovisuels est réservé aux étudiants régulièrement inscrit à l’<strong>UPEM</strong>. A ce titre, l’<strong>emprunteur</strong> doit fournir une photocopie recto-verso de sa carte d’étudiant en cours de validité (partie "Documents").
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 4 – Assurances</h3>
                <p style={p}>
                  L’<strong>emprunteur</strong> doit fournir une attestation d’assurance responsabilité civile couvrant l’ensemble des dommages qu’il pourrait causer.
                </p>
                <p style={p}>
                  Cette attestation qui doit impérativement couvrir l’intégralité de la période du prêt, est jointe à la présente convention (partie "Documents"). Il est d’autre part convenu que l’<strong>emprunteur</strong>, ou le cas échéant, l’assureur de ce dernier devra rembourser au prix du neuf le matériel prêté, en cas de vol, de perte ou de détérioration non prise en charge par l’assurance dommages aux biens de l’<strong>UPEM</strong>, c’est-à-dire  principalement en cas de négligence de l’<strong>emprunteur</strong> dans la garde du matériel prêté.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 5 – Fiche de prêt - présente convention</h3>
                <p style={p}>
                  L’<strong>emprunteur</strong> reconnaît que le matériel, tel que décrit dans l’article 2 est en parfait état de fonctionnement au moment de sa remise.
                </p>
                <p style={p}>
                  Une « fiche de prêt » est associée à chaque emprunt et annexée à la présente convention. Elle est renseignée et signée contradictoirement lors de la mise à disposition et du retour du matériel. Elle précise le type de matériel, sa configuration (système d’exploitation, logiciels, navigateur Internet, carte réseau...) son état de fonctionnement, les accessoires, les rayures et dégradations éventuelles, la durée du prêt, les dates, lieu et heures d’emprunt et de remise.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 6 – Conditions d'utilisation – Obligations de l'emprunteur</h3>
                <p style={p}>
                  L’<strong>emprunteur</strong> s’engage à faire un usage normal et paisible du matériel prêté « en bon père de famille » au sens de l’article 1880 du code civil. Il veille à la garde et à la conservation de la chose prêtée. L’<strong>emprunteur</strong> est la seule personne habilitée à utiliser le matériel qui ne peut être ni prêté ni loué. Pendant toute la durée du prêt, l’<strong>emprunteur</strong> s’engage à utiliser le matériel exclusivement dans le cadre des activités liées à ses études à l’<strong>UPEM</strong>. L’<strong>emprunteur</strong> s’engage à ne pas installer de logiciels et/ou programmes illicites et à ne pas modifier la configuration du matériel informatique.
                </p>
                <div style={p}>
                  En particulier, l’emprunteur n’est pas autorisé :
                  <ul style={p}>
                  <li>à installer sur le matériel des logiciels ou programmes dont l’université ne détiendrait pas les licences, ou tout logiciel ou programme sans relation avec les études et travaux universitaires de l’emprunteur,</li>
                  <li>à modifier la configuration matérielle du matériel emprunté.</li>
                  </ul>
                </div>
                <p style={p}>
                  L’<strong>UPEM</strong> ne peut être tenue pour responsable en cas d’utilisation frauduleuse ou illicite du matériel emprunté. L’<strong>emprunteur</strong> s’engage à respecter la charte informatique de l’<strong>UPEM</strong>. L’emprunteur prend toutes mesures utiles au maintien en état et à sa préservation contre le vol du matériel mis à sa disposition.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 7 – Dysfonctionnement - Réparation du matériel - Maintenance</h3>
                <p style={p}>
                  En cas de dysfonctionnement du matériel, ce dernier devra être immédiatement remis aux services compétents de l’<strong>UPEM</strong>, seuls habilités à intervenir sur le matériel en cas de réparation et de maintenance. Le dysfonctionnement sera précisément signalé par l’<strong>emprunteur</strong> et mentionné sur un « bon de dépôt » signé contradictoirement. L’<strong>emprunteur</strong> sera informé des modalités de prise en charge de la réparation et de la date de récupération du matériel. En cas de réparation sortant de la garantie assurée par le fournisseur, l’<strong>emprunteur</strong> s’engage à régler la totalité de la réparation du matériel.
                </p>
                <p style={p}>
                  L’<strong>emprunteur</strong> s’engage à remettre le matériel en cas d’opération de maintenance programmée par les services informatiques, et ce dans le délai fixé par ces derniers..
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 8 – Informations personnelles de l'emprunteur</h3>
                <p style={p}>
                  L’<strong>emprunteur</strong> est responsable de la sauvegarde de ses données personnelles. Aucune sauvegarde ne sera effectuée par le personnel de l’<strong>UPEM</strong>. A l’issue de la période de prêt, toutes les données informatiques personnelles présentes dans le matériel prêté sont effacées. Le traitement des données personnelles de l’emprunteur est régi par la loi n°78-17 du 6 janvier 1978 modifiée « Relative à l’informatique, aux fichiers et aux libertés ».
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 9 – Durée du prêt - Résiliation</h3>
                <p style={p}>
                  Le prêt est consenti pour une durée définie dans la demande de prêt (partie "Fiche de prêt") pour les dates de début et de fin elles aussi définie dans cette demande.
                </p>
                <p style={p}>
                  Le prêt ne peut être renouvelé sans établir une nouvelle convention. L’<strong>emprunteur</strong> devra effectuer une nouvelle demande d’emprunt auprès du Campus Numérique.
                </p>
                <p style={p}>
                  Chacune des Parties aura la faculté de procéder à la résiliation de la présente convention sous réserve de faire connaître sa volonté à l’autre Partie par lettre recommandée avec accusé de réception suivant un préavis de 15 jours.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 10 – Restitution du matériel</h3>
                <p style={p}>
                  L’<strong>emprunteur</strong> s’engage à restituer le matériel informatique et/ou audiovisuel à l’expiration du délai de prêt en parfait état de fonctionnement conformément aux règles du prêt à usage. Un examen contradictoire, daté et signé, du matériel sera effectué et mentionné sur la «fiche de prêt» à la restitution du matériel. Dans l’hypothèse où l’<strong>emprunteur</strong> se soustrairait à son obligation de restitution, malgré un premier rappel émanant du campus numérique, suivi d’une lettre de mise en demeure avec accusé réception adressée à son attention par l’<strong>UPEM</strong> et restée sans effet, cette dernière se réserve la possibilité d’engager toutes poursuites utiles (procédures disciplinaires, poursuites civiles ou pénales).
                </p>
                <p style={p}>
                  Sur toute demande de l’<strong>UPEM</strong>, propriétaire du matériel, l’<strong>emprunteur</strong> peut être conduit à le restituer au vu d’un délai raisonnable qui lui aura été signifié par l’<strong>UPEM</strong>.
                </p>
              </div>
              <div>
                <h3 style={h3}>Article 11 – Litiges</h3>
                <p style={p}>
                  En cas de litiges concernant l’interprétation ou l’application de la présente convention, les parties conviennent de s’en remettre, à défaut d’accord amiable, à l’appréciation des tribunaux compétents.
                </p>
              </div>
            </div>
            <div style={page}>
              <h2 style={h2}>Validations</h2>
              <div>
                <h3 style={h3}>Validation de l'enseignant responsable du projet</h3>
                {v.enseignant ? <p>Validé le {this.dateFormate(v.enseignant.created_at)} par {c.enseignant_nom}.</p> : <p>En attente.</p>}
              </div>
              <div>
                <h3 style={h3}>Validation du technicien audiovisuel</h3>
                {v.agent ? <p>Validé le {this.dateFormate(v.agent.created_at)} par {v.agent.user && v.agent.user.prenom} {v.agent.user && v.agent.user.nom}.</p> : <p>En attente.</p>}
              </div>
              <div>
                <h3 style={h3}>Validation de Gilles Roussel</h3>
                {v.delegataire ? <p>Validé le {this.dateFormate(v.delegataire.created_at)} par délégation par {v.delegataire.user.prenom} {v.delegataire.user.nom}.</p> : <p>En attente.</p>}
                {/*(v.delegataire && v.delegataire.signature) && <img width="200px" className="signature" src={"http://localhost:8000/document/signature/" + v.delegataire.user_id}></img>*/}
                {(v.delegataire && v.delegataire.signature) && <img width="200px" className="signature" src="http://localhost:8000/storage/signatures/kpTaUPR5JGx3ni4IQjvLOmh3ApQV3erIb0wLeHgd.png"></img>}
              </div>
              <div>
                <h3 style={h3}>Validation de remise</h3>
                {v.reserve ? <p>Matériel remis avec réserves le {this.dateFormate(v.reserve.created_at)} à {v.reserve.user.prenom} {v.reserve.user.nom}.</p> : ''}
                {v.remise ? <p>Validé le {this.dateFormate(v.remise.created_at)} par {v.remise.user.nom}.</p> : <p>En attente.</p>}
              </div>
              <div style={{marginTop: 3 + 'rem'}}>
                Créée le {this.dateFormate(c.created_at)} <br/>
                {c.modifications ? 'Modifié ' + c.modifications.length + ' fois' : 'Modifié 0 fois'}
                <ul>
                {c.modifications && c.modifications.map(e => {
                  return <li key={e.id}>le {this.dateFormate(e.created_at)} par {e.user && e.user.nom}</li>
                }) }
                </ul>
                {c.deletion && ('Supprimée le ' + this.dateFormate(c.deletion.created_at) + ' par ' + (this.getDeletionUserName(c.deletion)))}
              </div>
            </div>
        </div>
      )
    }
}

export default ConventionPDF
