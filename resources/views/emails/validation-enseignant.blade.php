<h1 style="font-family: sans-serif; max-width: 100%; background-color: #EA5A0B; text-align: right; padding: 30px 30px 40px 0; color: white;">Demande de prêt de matériel audiovisuel</h1>
<h2 style="font-family: sans-serif">Validation du projet par l'enseignant</h2>
<?php if ($debug) {
  echo "<div style='font-family: sans-serif; background-color: red; color: white;'>
    <h2> APPLICATION EN PHASE DE TEST </h2>
    <p> Veuillez ne pas tenir compte de ce mail et nous excuser pour la gêne occasionnée. </p>
  </div>";
} ?>
<div style="font-family: sans-serif">
  <p> L'étudiant(e) {{ $etudiant }} (formation {{ $formation }}) souhaite emprunter du matériel audiovisuel.</p>
  <p> Vous avez été renseigné(e) comme enseignant(e) responsable du projet "{{ $nom_projet }}".</p>
  <p> Pour que l'étudiant(e) puisse emprunter le matériel, vous devez valider le projet. </p>
  <p> Veuillez cliquer sur ce lien pour valider ou annuler le projet :</p>
  <p> <a href="{{ $url }}">{{ $url }}</a> </p>
</div>

<p style="font-family: sans-serif; font-size: 0.8rem;"> Ce mail est envoyé automatiquement, veuillez ne pas répondre. </p>
