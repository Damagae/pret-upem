<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>FAKE Service Central d'Authentification</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        <!-- BOOTSTRAP Latest compiled and minified CSS -->
        <link href="{{asset('css/fakecas.css')}}" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/jquery-ui.min.js"></script>
        <script type="text/javascript" src="{{asset('js/fakecas.js')}}"></script>
    </head>
    <body>
      <div class="flc-screenNavigator-view-container">
        <div class="fl-screenNavigator-view">
            <div id="header" class="flc-screenNavigator-navbar fl-navbar fl-table">
                <!--<h1 id="app-name" class="fl-table-cell">Central Authentication Service (CAS)</h1>-->
                <h1 id="app-name" class="fl-table-cell"><small>FAKE</small> Service Central d'Authentification</h1>
            </div>
            <div id="content" class="fl-screenNavigator-scroll-container">
   <div id="texte_gauche">
      <p>
            Vous pouvez vous authentifier maintenant afin de pouvoir acc&eacute;der
            ult&eacute;rieurement &agrave; des services prot&eacute;g&eacute;s.
      </p>
      <p>
        Entrez votre nom d'utilisateur et votre mot de passe puis cliquez sur le bouton <b>Connexion</b> ci-dessous pour continuer.
      </p>
    </div>
    <div id="texte_droite"><p>
        M&eacute;fiez-vous de tous les programmes et pages web qui vous demandent de vous authentifier.
        Les pages web de l'Universit&eacute; Paris-Est Marne-la-Vall&eacute;e vous demandant votre nom
        d'utilisateur et votre mot de passe ont des URLs de la forme https://xxx.u-pem.fr ou https://xxx.univ-mlv.fr .
        De plus, votre navigateur doit indiquer que vous acc&eacute;dez une page s&eacute;curis&eacute;e.</p>
    </div>


			<form id="fm1" class="fm-v clearfix" action="/login?service=https://ent.u-pem.fr/uPortal/Login" method="post" autocomplete="off">

                <div class="box" id="login">

                    <h2>Entrez votre identifiant et votre mot de passe.</h2>
                    <div class="row">
                        <label for="username"><span class="accesskey">U</span>tilisateur:</label>




						<input id="username" name="username" class="required" tabindex="1" accesskey="u" type="text" value="" size="20" autocomplete="false"/>

                    </div>
                    <div class="row">
                        <label for="password"><span class="accesskey">M</span>ot de passe:</label>


						<input id="password" name="password" class="required" tabindex="2" accesskey="m" type="password" value="" size="20" autocomplete="off"/>
                    </div>
                    <div class="row check">
                        <input id="warn" name="warn" value="true" tabindex="3" accesskey="p" type="checkbox" />
                        <label for="warn"><span class="accesskey">P</span>révenez-moi avant d'accéder à d'autres services.</label>
                    </div>
                    <div class="row btn-row">
						<input type="hidden" name="lt" value="80E3D620D9A23B57708D7A0729659F85566E1DE7AF45DD0E75EC4FC91004DEAC7D178368A60C844022B5EC7D01A44EAD" />
						<input type="hidden" name="_eventId" value="submit" />

                        <input class="btn-submit" name="submit" accesskey="l" value="Connexion" tabindex="4" type="submit" />
			<!--                        <input class="btn-reset" name="reset" accesskey="c" value="Effacer" tabindex="5" type="reset" /> -->
                    </div>
                </div>

	            <div id="sidebar">
	                <p>Pour des raisons de sécurité, veuillez vous déconnecter et fermer votre navigateur lorsque vous avez fini d'accéder aux services authentifiés.</p>
	                <div id="list-languages">


	                </div>
	            </div>
        	</form>
    </div>
    </body>
</html>
