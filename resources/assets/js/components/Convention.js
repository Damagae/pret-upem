import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Convention extends Component {
    constructor(props) {
      super(props)
      this.state = {
      }
    }

    render(props) {
      const p = this.props
        return (
          <div className="row justify-content-center convention">
            <div className="col col-lg-8">
              {p.niveau == 1 ? <h1>Convention de prêt de l'UPEM</h1> : <h2>Convention de prêt de l'UPEM</h2>}
              <div>
                {p.niveau == 1 ? <h2>Article 1 – Objet</h2> : <h3>Article 1 – Objet</h3>}
                <p>
                  La présente convention a pour objet de déterminer les modalités particulières d’usage du matériel dont l’<strong>UPEM</strong>, propriétaire, accepte de consentir le prêt à l’<strong>emprunteur</strong>. Cet emprunt est accordé à titre gratuit par l’<strong>UPEM</strong> à l’<strong>emprunteur</strong>.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 2 – Désignation du(des) matériel(s) prêté(s)</h2> : <h3>Article 2 – Désignation du(des) matériel(s) prêté(s)</h3>}
                <p>
                  Les matériels informatiques et audiovisuels prêtés sont détaillés dans la liste de prêt précisée dans la demande d'emprunt (partie "Matériel").
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 3 – Conditions et modalités d'emprunt</h2> : <h3>Article 3 – Conditions et modalités d'emprunt</h3>}
                <p>
                  Le prêt de matériels informatiques et audiovisuels est réservé aux étudiants régulièrement inscrit à l’<strong>UPEM</strong>. A ce titre, l’<strong>emprunteur</strong> doit fournir une photocopie recto-verso de sa carte d’étudiant en cours de validité (partie "Documents").
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 4 – Assurances</h2> : <h3>Article 4 – Assurances</h3>}
                <p>
                  L’<strong>emprunteur</strong> doit fournir une attestation d’assurance responsabilité civile couvrant l’ensemble des dommages qu’il pourrait causer.
                </p>
                <p>
                  Cette attestation qui doit impérativement couvrir l’intégralité de la période du prêt, est jointe à la présente convention (partie "Documents"). Il est d’autre part convenu que l’<strong>emprunteur</strong>, ou le cas échéant, l’assureur de ce dernier devra rembourser au prix du neuf le matériel prêté, en cas de vol, de perte ou de détérioration non prise en charge par l’assurance dommages aux biens de l’<strong>UPEM</strong>, c’est-à-dire  principalement en cas de négligence de l’<strong>emprunteur</strong> dans la garde du matériel prêté.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 5 – Fiche de prêt - présente convention</h2> : <h3>Article 5 – Fiche de prêt - présente convention</h3>}
                <p>
                  L’<strong>emprunteur</strong> reconnaît que le matériel, tel que décrit dans l’article 2 est en parfait état de fonctionnement au moment de sa remise.
                </p>
                <p>
                  Une « fiche de prêt » est associée à chaque emprunt et annexée à la présente convention. Elle est renseignée et signée contradictoirement lors de la mise à disposition et du retour du matériel. Elle précise le type de matériel, sa configuration (système d’exploitation, logiciels, navigateur Internet, carte réseau...) son état de fonctionnement, les accessoires, les rayures et dégradations éventuelles, la durée du prêt, les dates, lieu et heures d’emprunt et de remise.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 6 – Conditions d'utilisation – Obligations de l'emprunteur</h2> : <h3>Article 6 – Conditions d'utilisation – Obligations de l'emprunteur</h3>}
                <p>
                  L’<strong>emprunteur</strong> s’engage à faire un usage normal et paisible du matériel prêté « en bon père de famille » au sens de l’article 1880 du code civil. Il veille à la garde et à la conservation de la chose prêtée. L’<strong>emprunteur</strong> est la seule personne habilitée à utiliser le matériel qui ne peut être ni prêté ni loué. Pendant toute la durée du prêt, l’<strong>emprunteur</strong> s’engage à utiliser le matériel exclusivement dans le cadre des activités liées à ses études à l’<strong>UPEM</strong>. L’<strong>emprunteur</strong> s’engage à ne pas installer de logiciels et/ou programmes illicites et à ne pas modifier la configuration du matériel informatique.
                </p>
                <p style={{marginBottom: 0}}>
                  En particulier, l’emprunteur n’est pas autorisé : </p>
                  <ul>
                  <li style={{marginLeft: 2 + 'rem'}}>à installer sur le matériel des logiciels ou programmes dont l’université ne détiendrait pas les licences, ou tout logiciel ou programme sans relation avec les études et travaux universitaires de l’emprunteur,</li>
                  <li style={{marginLeft: 2 + 'rem'}}>à modifier la configuration matérielle du matériel emprunté.</li>
                  </ul>
                <p>
                  L’<strong>UPEM</strong> ne peut être tenue pour responsable en cas d’utilisation frauduleuse ou illicite du matériel emprunté. L’<strong>emprunteur</strong> s’engage à respecter la charte informatique de l’<strong>UPEM</strong>. L’emprunteur prend toutes mesures utiles au maintien en état et à sa préservation contre le vol du matériel mis à sa disposition.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 7 – Dysfonctionnement - Réparation du matériel - Maintenance</h2> : <h3>Article 7 – Dysfonctionnement - Réparation du matériel - Maintenance</h3>}
                <p>
                  En cas de dysfonctionnement du matériel, ce dernier devra être immédiatement remis aux services compétents de l’<strong>UPEM</strong>, seuls habilités à intervenir sur le matériel en cas de réparation et de maintenance. Le dysfonctionnement sera précisément signalé par l’<strong>emprunteur</strong> et mentionné sur un « bon de dépôt » signé contradictoirement. L’<strong>emprunteur</strong> sera informé des modalités de prise en charge de la réparation et de la date de récupération du matériel. En cas de réparation sortant de la garantie assurée par le fournisseur, l’<strong>emprunteur</strong> s’engage à régler la totalité de la réparation du matériel.
                </p>
                <p>
                  L’<strong>emprunteur</strong> s’engage à remettre le matériel en cas d’opération de maintenance programmée par les services informatiques, et ce dans le délai fixé par ces derniers..
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 8 – Informations personnelles de l'emprunteur</h2> : <h3>Article 8 – Informations personnelles de l'emprunteur</h3>}
                <p>
                  L’<strong>emprunteur</strong> est responsable de la sauvegarde de ses données personnelles. Aucune sauvegarde ne sera effectuée par le personnel de l’<strong>UPEM</strong>. A l’issue de la période de prêt, toutes les données informatiques personnelles présentes dans le matériel prêté sont effacées. Le traitement des données personnelles de l’emprunteur est régi par la loi n°78-17 du 6 janvier 1978 modifiée « Relative à l’informatique, aux fichiers et aux libertés ».
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 9 – Durée du prêt - Résiliation</h2> : <h3>Article 9 – Durée du prêt - Résiliation</h3>}
                <p>
                  Le prêt est consenti pour une durée définie dans la demande de prêt (partie "Fiche de prêt") pour les dates de début et de fin elles aussi définie dans cette demande.
                </p>
                <p>
                  Le prêt ne peut être renouvelé sans établir une nouvelle convention. L’<strong>emprunteur</strong> devra effectuer une nouvelle demande d’emprunt auprès du Campus Numérique.
                </p>
                <p>
                  Chacune des Parties aura la faculté de procéder à la résiliation de la présente convention sous réserve de faire connaître sa volonté à l’autre Partie par lettre recommandée avec accusé de réception suivant un préavis de 15 jours.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 10 – Restitution du matériel</h2> : <h3>Article 10 – Restitution du matériel</h3>}
                <p>
                  L’<strong>emprunteur</strong> s’engage à restituer le matériel informatique et/ou audiovisuel à l’expiration du délai de prêt en parfait état de fonctionnement conformément aux règles du prêt à usage. Un examen contradictoire, daté et signé, du matériel sera effectué et mentionné sur la «fiche de prêt» à la restitution du matériel. Dans l’hypothèse où l’<strong>emprunteur</strong> se soustrairait à son obligation de restitution, malgré un premier rappel émanant du campus numérique, suivi d’une lettre de mise en demeure avec accusé réception adressée à son attention par l’<strong>UPEM</strong> et restée sans effet, cette dernière se réserve la possibilité d’engager toutes poursuites utiles (procédures disciplinaires, poursuites civiles ou pénales).
                </p>
                <p>
                  Sur toute demande de l’<strong>UPEM</strong>, propriétaire du matériel, l’<strong>emprunteur</strong> peut être conduit à le restituer au vu d’un délai raisonnable qui lui aura été signifié par l’<strong>UPEM</strong>.
                </p>
              </div>
              <div>
                {p.niveau == 1 ? <h2>Article 11 – Litiges</h2> : <h3>Article 11 – Litiges</h3>}
                <p>
                  En cas de litiges concernant l’interprétation ou l’application de la présente convention, les parties conviennent de s’en remettre, à défaut d’accord amiable, à l’appréciation des tribunaux compétents.
                </p>
              </div>
            </div>
          </div>
        )
    }
}

export default Convention
